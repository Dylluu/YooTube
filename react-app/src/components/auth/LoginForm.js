import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css';
import googleLogo from '../../assets/newGoogle.png';
import circleCross from '../../assets/circleCross.png';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const onDemo = async (e) => {
    e.preventDefault();
    await dispatch(login('demo@aa.io', 'password'));
  };

  useEffect(() => {
    const loginEmail = document.getElementById('login-email');
    const loginEmailLabel = document.getElementById('login-email-label');
    const loginPassword = document.getElementById('login-password');
    const loginPasswordLabel = document.getElementById('login-password-label');

    loginEmail.addEventListener('focusout', () => {
      loginEmailLabel.classList.add('focus-out-input');
    })
    loginPassword.addEventListener('focusout', () => {
      loginPasswordLabel.classList.add('focus-out-input');
    })
    if(email.length) {
      loginEmailLabel.classList.add('placeholder-with-text-first-last');
    }
    if(!email.length) {
      loginEmailLabel.classList.remove('placeholder-with-text-first-last');
    }
    if(password.length) {
      loginPasswordLabel.classList.add('placeholder-with-text-first-last');
    }
    if(!password.length) {
      loginPasswordLabel.classList.remove('placeholder-with-text-first-last');
    }
  }, [email, password])

  useEffect(() => {
    const loginEmail = document.getElementById('login-email');
    const loginPassword = document.getElementById('login-password');
    if(Object.values(errors).length){
      loginEmail.classList.add('red-border');
      // loginEmail.classList.add('red-outline');
      loginPassword.classList.add('red-border');
      // loginPassword.classList.add('red-outline');
    }
  }, [errors])

  useEffect(() => {
    if (errors.email) {
      const loginEmail = document.getElementById('login-email');
      loginEmail.classList.add('red-border');
      // loginEmail.classList.add('red-outline');
    }
    if (!errors.email) {
      const loginEmail = document.getElementById('login-email');
      loginEmail.classList.remove('red-border');
      // loginEmail.classList.remove('red-outline');
    }
  }, [errors.email])

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
    <div className='login-form-page-container'>
    <div className='login-form-outer-wrapper'>
    <form className='login-form-wrapper' onSubmit={onLogin}>
    <div className='login-form-header'>
      <img alt='googleLogo' src={googleLogo} id='google-logo'/>
      {/* <img alt='circleCross' src={circleCross} id='circleCross'/> */}
      <span id='create-your-google-text'>Sign in</span>
      <span id='to-continue-to-text'>to continue to YooTube</span>
    </div>
    <div className='login-form-inner-wrapper'>
    <div>
      <div className='login-form-input-fields-wrapper'>
      {/* <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div> */}
      <div>
        <input
          name='email'
          type='text'
          value={email}
          onChange={updateEmail}
          className='login-form-input'
          id='login-email'
          autoFocus
        />
        <label htmlFor='email' className='placeholder' id='login-email-label'>Email</label>
      </div>
      <div>
        <input
          name='password'
          type='password'
          value={password}
          onChange={updatePassword}
          className='login-form-input'
          id='login-password'
        />
        <label htmlFor='password' className='placeholder' id='login-password-label'>Password</label>
      </div>
      {/* {(email.length == 0 || password.length == 0) && (
        <div className='login-form-errors'><i className="fa-solid fa-circle-exclamation" id='error-exclaimation'/>Please enter your email and password</div>
      )} */}
      {Object.values(errors).length > 0 && (
        <div className='login-form-errors'><i className="fa-solid fa-circle-exclamation" id='error-exclaimation'/>Couldn't login with the provided credentials</div>
      )}
      </div>
    </div>
        <div className='demo-user'>
          <span className='new-user'>New guest? Sign in as</span>
          <span className='demo-user-button'
          onClick={onDemo}
          >Demo User</span>
        </div>
        <div className='signup-and-signin-button'>
        <NavLink to='/signup'><span id='create-account-instead'>Create Account</span></NavLink>
        <button type='submit' id='login-form-submit'
        >Sign in</button>
        </div>
    </div>
    </form>
    </div>
    </div>
  );
};

export default LoginForm;
