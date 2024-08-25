import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { BsArrowRight } from "react-icons/bs";
import login from '../../actions/userActions';
import login_svg from './img/login.svg';
import wave from './img/wavev.png';
import './logincss.css';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';  // Spinner for loading state

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);  // Loading state

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userLogin = useSelector(state => state.userLogin);
  const { error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!email || !password) {
      alert('Please fill in both fields');
      return;
    }

    setLoading(true);  // Set loading to true when submitting

    try {
      // Fetch CSRF token (adjust the API endpoint as necessary)
      const { data } = await axios.get('/api/csrf-token');
      axios.defaults.headers.post['X-CSRF-Token'] = data.csrfToken;

      dispatch(login(email, password));
    } catch (error) {
      console.error('CSRF Token error:', error);
    }

    setLoading(false);  // Set loading to false after submission
  };

  return (
    <div>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Image className="wave" src={wave} />
      
      <div className="containera">
        <div className="imga">
          <Image src={login_svg} alt="Login Illustration" />
        </div>
        <div className="login-content">
          <form onSubmit={submitHandler}>
            <h1>Member Login</h1>
            {error && <div className="error-message">{error}</div>}
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-envelope" aria-hidden="true"></i>
              </div>
              <div className="div">
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  className="inputa"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="input-div pass">
              <div className="i">
                <i className="fas fa-lock" aria-hidden="true"></i>
              </div>
              <div className="div">
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  className="inputa"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <button type="submit" className="btna" disabled={loading}>
              {loading ? <ClipLoader color="#ffffff" size={15} /> : 'Login'}
            </button>
            <div className='div-forgot'>
              <span>Forgot </span>
              <Link className='text-forgot' to='/forgot'>Password? </Link>
            </div>
            <Link className="createAcc" to={redirect ? `/register?redirect=${redirect}` : '/register'}>
              Create your Account <BsArrowRight size="25" />
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
