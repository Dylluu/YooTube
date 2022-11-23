import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css';
import googleLogo from '../../assets/googleLogo.png';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
      const data = await dispatch(signUp(first_name, last_name, username, email, password));
      if (data) {
        setErrors(data)
        console.log(errors)
      }
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  }

  const updateLastName = (e) => {
    setLastName(e.target.value);
  }

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='signup-form-page-container'>
    <div className='signup-form-outer-wrapper'>
    <div className='signup-form-wrapper'>
    <div className='signup-form-header'>
      <img alt='googleLogo' src={googleLogo} id='google-logo'/>
      <span id='create-your-google-text'>Create your Google Account</span>
      <span id='to-continue-to-text'>to continue to YooTube</span>
    </div>
    <div className='signup-form-inner-wrapper'>
    <form onSubmit={onSignUp}>
      {/* <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div> */}
      <div className='signup-first-and-last'>
        {/* <label>First Name</label> */}
        <input
          type='text'
          name='first_name'
          onChange={updateFirstName}
          value={first_name}
          placeholder='First name'
          className='signup-form-input-first-last'
        ></input>
        {/* <label>Last Name</label> */}
        <input
          type='text'
          name='last_name'
          onChange={updateLastName}
          value={last_name}
          placeholder='Last name'
          className='signup-form-input-first-last'
        ></input>
      </div>
      {errors.first_name && errors.last_name && (
              <div className='signup-error-message-first-and-last'>
                <span id='please-enter-first-name'>{errors.first_name}</span>
                <span id='please-enter-last-name'>{errors.last_name}</span>
              </div>
            )}
            {errors.first_name && !errors.last_name && (
              <div className='signup-error-message'>{errors.first_name}</div>
            )}
            {!errors.first_name && errors.last_name && (
              <div className='signup-error-message-first-and-last'>
                <span id='please-enter-first-name'></span>
                <span id='please-enter-last-name'>{errors.last_name}</span>
              </div>
            )}
      <div>
        {/* <label>Email</label> */}
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
          placeholder='Email address'
          className='signup-form-input'
        ></input>
      </div>
      {errors.email && <div className='signup-form-errors'>{errors.email}</div>}
      <div>
        {/* <label>Username</label> */}
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
          placeholder='Username'
          className='signup-form-input'
        ></input>
      </div>
      {errors.username && <div className='signup-form-errors'>{errors.username}</div>}
      <div>
        {/* <label>Password</label> */}
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
          placeholder='Password'
          className='signup-form-input'
        ></input>
      </div>
      {errors.password && <div className='signup-form-errors'>{errors.password}</div>}
      {/* <div>
        <label>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div> */}
      <div className='signin-and-signup-button'>
      <NavLink to='/login'><span id='signin-instead'>Sign in instead</span></NavLink>
      <button type='submit' id='signup-form-submit'>Create Account</button>
      </div>
    </form>
    </div>
    </div>
    </div>
    </div>
  );
};

export default SignUpForm;
