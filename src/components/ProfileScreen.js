import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import avatarRegister from './img/avatarRegister.svg';
import addUs from './img/new.svg';
import wave from './img/wavev.png';
import { Helmet } from 'react-helmet';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { IoIosArrowDown } from 'react-icons/io';
import HashLoader from 'react-spinners/HashLoader';
import {
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
import { AiOutlineEdit } from 'react-icons/ai';

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [showOrders, setShowOrders] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [isEditableName, setIsEditableName] = useState(false);
  const [isEditableEmail, setIsEditableEmail] = useState(false);

  const nameInput = useRef(null);
  const emailInput = useRef(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderMylist = useSelector((state) => state.orderMylist);
  const { loading: loadingOrders, error: errorOrders, orders } = orderMylist;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (user && user.name) { // Check if user exists and has a name
        setName(user.name);
        setEmail(user.email);
      } else {
        dispatch(getUserDetails('profile'));
        dispatch(listMyOrders());
      }
    }
  }, [dispatch, history, userInfo, user]);
  

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  const handleEditName = () => {
    setIsEditableName(!isEditableName);
    if (!isEditableName) {
      nameInput.current.focus();
    }
  };

  const handleEditEmail = () => {
    setIsEditableEmail(!isEditableEmail);
    if (!isEditableEmail) {
      emailInput.current.focus();
    }
  };

  return (
    <div className="registerSc">
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <Image className="wave" src={wave} />
      <div className="containera">
        <div className="imga">
          <Image src={addUs} />
        </div>
        <div className="rightinfos">
          <div className="showbtn" onClick={() => setShowOrders(!showOrders)}>
            {showOrders ? 'Show my info' : 'Show my orders'} <IoIosArrowDown />
          </div>
          {!showOrders ? (
            <div className="login-content">
              <form onSubmit={submitHandler}>
                <Image src={avatarRegister} />
                {error && <h4>{error}</h4>}
                {success && <h4>Profile Updated</h4>}
                
                {/* Only render the form if `user` exists */}
                {user ? (
                  <>
                    <div className="input-div zz">
                      <div className="i">
                        <i className="fas fa-user"></i>
                      </div>
                      <div className="div">
                        <input
                          type="text"
                          value={name}
                          readOnly={!isEditableName}
                          ref={nameInput}
                          className="inputa"
                          placeholder="Enter name"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                    <AiOutlineEdit size="26" className="edit" onClick={handleEditName} />
                    <div className="input-div one">
                      <div className="i">
                        <i className="fas fa-envelope"></i>
                      </div>
                      <div className="div">
                        <input
                          type="text"
                          value={email}
                          readOnly={!isEditableEmail}
                          ref={emailInput}
                          className="inputa"
                          placeholder="Enter email"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <AiOutlineEdit size="26" className="edit" onClick={handleEditEmail} />
                    <div className="input-div pass">
                      <div className="i">
                        <i className="fas fa-lock"></i>
                      </div>
                      <div className="div">
                        <input
                          type="password"
                          value={password}
                          required
                          className="inputa"
                          placeholder="Enter password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="input-div passconf">
                      <div className="i">
                        <i className="fas fa-lock"></i>
                      </div>
                      <div className="div">
                        <input
                          type="password"
                          value={confirmPassword}
                          className="inputa"
                          placeholder="Confirm password"
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    {message && <h4 className="Message">{message}</h4>}
                    <input type="submit" className="btna2" value="Update" />
                  </>
                ) : (
                  <div>Loading...</div> // Or any other placeholder
                )}
              </form>
            </div>
          ) : (
            <div className="tableorder">
              {loadingOrders ? (
                <div className="loading">
                  <HashLoader color={"#fff"} loading={loadingOrders} size={40} />
                </div>
              ) : errorOrders ? (
                <h1>{errorOrders}</h1>
              ) : (
                <Table size="sm">
                  <Thead>
                    <Tr>
                      <Th>ID</Th>
                      <Th>DATE</Th>
                      <Th>TOTAL</Th>
                      <Th>PAID</Th>
                      <Th>DELIVERED</Th>
                      <Th></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {orders.map((order) => (
                      <Tr key={order._id}>
                        <Td>{order._id}</Td>
                        <Td>{order.createdAt.substring(0, 10)}</Td>
                        <Td>{order.totalPrice}</Td>
                        <Td>{order.isPaid ? order.paidAt.substring(0, 10) : 'Not Paid Yet'}</Td>
                        <Td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'Not Yet'}</Td>
                        <Td>
                          <Link to={`/order/${order._id}`}>
                            <Button size="xs">DETAILS</Button>
                          </Link>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );  
};

export default ProfileScreen;
