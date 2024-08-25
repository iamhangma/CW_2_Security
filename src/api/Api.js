import axios from 'axios';

const csrfToken = document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1];


const Api = axios.create({
    baseURL: 'https://localhost:5053',
    withCredentials: true, 
    headers: {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': csrfToken,  
    },
});

const setAuthToken = (token) => {
    if (token) {
        Api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete Api.defaults.headers.common['Authorization'];
    }
};

// User APIs
export const loginUserApi = (data) => Api.post('/api/users/login', data);
export const registerUserApi = (data) => Api.post('/api/users', data);
export const getUsersApi = () => Api.get('/api/users');
export const deleteUserApi = (id) => Api.delete(`/api/users/${id}`);
export const getUserByIdApi = (id) => Api.get(`/api/users/${id}`);
export const updateUserApi = (id, data) => Api.put(`/api/users/${id}`, data);

// Product APIs
export const getProductsApi = () => Api.get('/api/products');
export const getProductByIdApi = (id) => Api.get(`/api/products/${id}`);
export const createProductApi = (data) => Api.post('/api/products', data);
export const updateProductApi = (id, data) => Api.put(`/api/products/${id}`, data);
export const deleteProductApi = (id) => Api.delete(`/api/products/${id}`);

// Order APIs
export const createOrderApi = (data) => Api.post('/api/orders', data);
export const getOrderByIdApi = (id) => Api.get(`/api/orders/${id}`);
export const updateOrderToPaidApi = (id, data) => Api.put(`/api/orders/${id}/pay`, data);
export const updateOrderToDeliveredApi = (id) => Api.put(`/api/orders/${id}/deliver`);
export const getOrdersApi = () => Api.get('/api/orders');

// PayPal API
export const getPaypalClientIdApi = () => Api.get('/api/config/paypal');

// Authenticated User APIs
export const getUserProfileApi = (token) => {
    setAuthToken(token);
    return Api.get('/api/users/profile');
};

export const updateUserProfileApi = (data, token) => {
    setAuthToken(token);
    return Api.put('/api/users/profile', data);
};

export const getMyOrdersApi = (token) => {
    setAuthToken(token);
    return Api.get('/api/orders/myorders');
};

export default Api;
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';

app.use(mongoSanitize()); 
app.use(xss()); 


import bodyParser from 'body-parser';
import csurf from 'csurf';

const parseForm = bodyParser.urlencoded({ extended: false });

const csrfProtection = csurf({ cookie: true });

app.use(csrfProtection);

app.use((req, res, next) => {
  res.cookie('XSRF-TOKEN', req.csrfToken()); 
  next();
});

const imageFileFilter = (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb({ message: "Only images allowed!" }, false);
    }
  };
  
