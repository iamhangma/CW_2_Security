import React, { useState, useEffect } from 'react';
import axios from "axios";
import { PayPalButton } from 'react-paypal-button-v2';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdDoneAll } from 'react-icons/io';
import HashLoader from "react-spinners/HashLoader";
import { getOrderDetails, payOrder, deliverOrder } from "../../actions/orderActions";
import './Order.css';
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../../constants/orderConstants';
import { Button } from '@chakra-ui/button';

const Order = ({ match, history }) => {
    const [sdkReady, setSdkReady] = useState(false);
    const orderId = match.params.id;
    const dispatch = useDispatch();

    const orderDetails = useSelector(state => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const orderPay = useSelector(state => state.orderPay);
    const { loading: loadingPay, success: successPay } = orderPay;

    const orderDeliver = useSelector(state => state.orderDeliver);
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    };

    if (!loading) {
        order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0));
    }

    useEffect(() => {
        if (!userInfo) {
            history.push('/login');
        }

        const addPaypalscript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };

        if (!order || successPay || successDeliver || order._id !== orderId) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch({ type: ORDER_DELIVER_RESET });
            dispatch(getOrderDetails(orderId));
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPaypalscript();
            } else {
                setSdkReady(true);
            }
        }
    }, [dispatch, orderId, successPay, successDeliver, userInfo, order, history]);

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult));
    };

    const deliverHandler = () => {
        dispatch(deliverOrder(order));
    };

    const loadingSpinner = <HashLoader color={"#1e1e2c"} loading={loading || loadingDeliver || loadingPay} size={50} />;

    return loading || loadingDeliver || loadingPay ? (
        <div className='loading-product'>
            {loadingSpinner}
        </div>
    ) : error ? (
        <h1>{error}</h1>
    ) : (
        <div className="placeorder">
            <Helmet>
                <title>Order</title>
            </Helmet>
            <div className="informations-placeorder">
                <div className="shipping-placeorder">
                    <h2>Shipping</h2>
                    <p>
                        <strong>Name: </strong>
                        {order.user.name}
                    </p>
                    <p>
                        <strong>Email: </strong>
                        <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                    </p>
                    <p>
                        <strong>Address: </strong>
                        {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.cp}, {order.shippingAddress.country}
                        {order.isDelivered ? (
                            <div className='paid'>Delivered at {order.deliveredAt}</div>
                        ) : (
                            <div className='notpaid'>NOT Delivered YET</div>
                        )}
                    </p>
                </div>
                <hr className='hr' />
                <div className="payment-placeorder">
                    <h2>Payment Method</h2>
                    <p>
                        <strong>Method: </strong>
                        {order.paymentMethod}
                        {order.isPaid ? (
                            <div className='paid'>PAID AT {order.paidAt}</div>
                        ) : (
                            <div className='notpaid'>NOT PAID YET</div>
                        )}
                    </p>
                </div>
                <hr className='hr' />
                <div>
                    <h2>Order Items: </h2>
                    {order.orderItems.length === 0 ? (
                        <p>Your order is empty</p>
                    ) : (
                        <div className="orders-placeorder">
                            {order.orderItems.map((item, index) => (
                                <p key={index}>
                                    <span className="color-name">
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </span>{" "}
                                    <b>{item.qty} x ${item.price} = ${item.qty * item.price}</b>
                                    <hr className='hr' />
                                </p>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="your-products">
                <div className="cart-summ">
                    <h1>Order Summary</h1>
                    <div className="calculs-placeorder">
                        <h3>Items: </h3><p>${order.itemsPrice}</p>
                        <h3>Shipping: </h3><p>${order.shippingPrice}</p>
                        <h3>Tax: </h3><p>${order.taxPrice}</p>
                        <h3>Total: </h3><p>${order.totalPrice}</p>
                    </div>
                </div>
                <div className='bottominfos'>
                    <h1 className='orderid'>Order : {order._id}</h1>
                    {!order.isPaid && (
                        <>
                            {loadingPay && (
                                <div className='loading-product'>
                                    {loadingSpinner}
                                </div>
                            )}
                            {!sdkReady ? (
                                <div className='loading-product'>
                                    {loadingSpinner}
                                </div>
                            ) : (
                                <div className='paypalbuttons'>
                                    <PayPalButton
                                        amount={order.totalPrice}
                                        onSuccess={successPaymentHandler}
                                    />
                                </div>
                            )}
                        </>
                    )}
                    {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                        <Button
                            height="40px"
                            width="200px"
                            size="lg"
                            onClick={deliverHandler}
                            leftIcon={<IoMdDoneAll size='16' />}
                            colorScheme='blue'
                        >
                            DELIVERED
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Order;
