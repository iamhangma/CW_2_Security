import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import PasswordStrengthBar from 'react-password-strength-bar';
import avatarRegister from './img/avatarRegister.svg';
import wave from './img/wavev.png';
import { register } from '../actions/userActions';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userRegister = useSelector((state) => state.userRegister);
  const { error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  useEffect(() => {
    validatePassword(password);
  }, [password]);

  const validatePassword = (password) => {
    const lengthValid = password.length >= 8 && password.length <= 12;
    const uppercaseValid = /[A-Z]/.test(password);
    const lowercaseValid = /[a-z]/.test(password);
    const numberValid = /[0-9]/.test(password);
    const specialCharValid = /[!@#$%^&*]/.test(password);

    setPasswordValidations({
      length: lengthValid,
      uppercase: uppercaseValid,
      lowercase: lowercaseValid,
      number: numberValid,
      specialChar: specialCharValid,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else if (Object.values(passwordValidations).includes(false)) {
      setMessage(
        'Password must be 8-12 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.'
      );
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <div className="registerSc">
      <Helmet>
        <title>Register</title>
      </Helmet>
      <Image className="wave" src={wave} />

      <div className="containera">
        <div className="imga">
          <Image src={avatarRegister} />
        </div>
        <div className="login-content">
          <form onSubmit={submitHandler}>
            <h1>Create Account</h1>
            {error && <div className="error-message">{error}</div>}
            {message && <div className="error-message">{message}</div>}
            <div className="input-div zz">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                <input
                  type="text"
                  value={name}
                  className="inputa"
                  placeholder="Enter name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="input-div one">
              <div className="i">
                <i className="fas fa-envelope"></i>
              </div>
              <div className="div">
                <input
                  type="text"
                  value={email}
                  className="inputa"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="input-div pass">
              <div className="i">
                <i className="fas fa-lock"></i>
              </div>
              <div className="div">
                <input
                  type="password"
                  value={password}
                  className="inputa"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
{/* 
            Password Complexity Indicators
            <div className="password-complexity">
              <small className={passwordValidations.length ? 'strong' : 'invalid'}>
                {passwordValidations.length ? '✔' : '✘'} Password is 8-12 characters long
              </small>
              <small className={passwordValidations.uppercase ? 'strong' : 'invalid'}>
                {passwordValidations.uppercase ? '✔' : '✘'} Contains an uppercase letter
              </small>
              <small className={passwordValidations.lowercase ? 'strong' : 'invalid'}>
                {passwordValidations.lowercase ? '✔' : '✘'} Contains a lowercase letter
              </small>
              <small className={passwordValidations.number ? 'strong' : 'invalid'}>
                {passwordValidations.number ? '✔' : '✘'} Contains a number
              </small>
              <small className={passwordValidations.specialChar ? 'strong' : 'invalid'}>
                {passwordValidations.specialChar ? '✔' : '✘'} Contains a special character (!@#$%^&*)
              </small>
            </div> */}

            {/* Password Strength Indicator */}
            <PasswordStrengthBar password={password} />

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

            <input type="submit" className="btna2" value="Sign up" />
            <div className='div-forgot'>
              <span>Have an Account? </span>
              <Link className='text-forgot' to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
