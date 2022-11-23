import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    const firstNameLabel = document.getElementById('first-name-label');
    const lastNameLabel = document.getElementById('last-name-label');
    const usernameLabel = document.getElementById('username-label');
    const emailLabel = document.getElementById('email-label');
    const passwordLabel = document.getElementById('password-label');
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    firstNameInput.addEventListener('focusout', () => {
      firstNameLabel.classList.add('focus-out-input')
    })
    lastNameInput.addEventListener('focusout', () => {
      lastNameLabel.classList.add('focus-out-input')
    })
    emailInput.addEventListener('focusout', () => {
      emailLabel.classList.add('focus-out-input')
    })
    usernameInput.addEventListener('focusout', () => {
      usernameLabel.classList.add('focus-out-input')
    })
    passwordInput.addEventListener('focusout', () => {
      passwordLabel.classList.add('focus-out-input')
    })

    if(first_name.length) {
      firstNameLabel.classList.add('placeholder-with-text-first-last');
    }
    if(!first_name.length) {
      firstNameLabel.classList.remove('placeholder-with-text-first-last');
    }
    if(last_name.length) {
      lastNameLabel.classList.add('placeholder-with-text-first-last');
    }
    if(!last_name.length) {
      lastNameLabel.classList.remove('placeholder-with-text-first-last');
    }
    if(username.length) {
      usernameLabel.classList.add('placeholder-with-text');
    }
    if(!username.length) {
      usernameLabel.classList.remove('placeholder-with-text');
    }
    if(email.length) {
      emailLabel.classList.add('placeholder-with-text');
    }
    if(!email.length) {
      emailLabel.classList.remove('placeholder-with-text');
    }
    if(password.length) {
      passwordLabel.classList.add('placeholder-with-text');
    }
    if(!password.length) {
      passwordLabel.classList.remove('placeholder-with-text');
    }

  }, [first_name, last_name, username, email, password])

  useEffect(() => {
    if (errors.first_name) {
      const firstName = document.getElementById('firstName')
      firstName.classList.add('red-border')
    }
    if (!errors.first_name) {
      const firstName = document.getElementById('firstName')
      firstName.classList.remove('red-border')
    }
  }, [errors.first_name])

  useEffect(() => {
    if (errors.last_name) {
      const lastName = document.getElementById('lastName')
      lastName.classList.add('red-border')
    }
    if (!errors.last_name) {
      const lastName = document.getElementById('lastName')
      lastName.classList.remove('red-border')
    }
  }, [errors.last_name])

  useEffect(() => {
    if (errors.email) {
      const emailInput = document.getElementById('email')
      emailInput.classList.add('red-border')
    }
    if (!errors.email) {
      const emailInput = document.getElementById('email')
      emailInput.classList.remove('red-border')
    }
  }, [errors.email])

  useEffect(() => {
    if (errors.username) {
      const username = document.getElementById('username')
      username.classList.add('red-border')
    }
    if(!errors.username) {
      const username = document.getElementById('username')
      username.classList.remove('red-border')
    }
  })

  useEffect(() => {
    if (errors.password) {
      const password = document.getElementById('password')
      password.classList.add('red-border')
    }
    if(!errors.password) {
      const password = document.getElementById('password')
      password.classList.remove('red-border')
    }
  })

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
    errors.first_name = null;
  }

  const updateLastName = (e) => {
    setLastName(e.target.value);
    errors.last_name = null;
  }

  const updateUsername = (e) => {
    setUsername(e.target.value);
    errors.username = null;
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
    errors.email = null;
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
    errors.password = null;
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
      <div className='signup-form-input-fields-wrapper'>
      {/* <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div> */}
      <div className='signup-first-and-last'>
        <input
          type='text'
          name='first_name'
          onChange={updateFirstName}
          value={first_name}
          // placeholder='First name'
          className='signup-form-input-first-last'
          id='firstName'
        ></input>
        <label for='first_name' className='placeholder' id='first-name-label'>First Name</label>
        <input
          type='text'
          name='last_name'
          onChange={updateLastName}
          value={last_name}
          // placeholder='Last name'
          className='signup-form-input-first-last'
          id='lastName'
        ></input>
        <label className='placeholder' for='last_name' id='last-name-label'>Last Name</label>
      </div>
      {errors.first_name && errors.last_name && (
              <div className='signup-error-message-first-and-last'>
                <span id='please-enter-first-name'><i className="fa-solid fa-circle-exclamation" id='error-exclaimation'/>{errors.first_name}</span>
                <span id='please-enter-last-name'><i className="fa-solid fa-circle-exclamation" id='error-exclaimation'/>{errors.last_name}</span>
              </div>
            )}
            {errors.first_name && !errors.last_name && (
              <div className='signup-error-message-first-only'><i className="fa-solid fa-circle-exclamation" id='error-exclaimation'/>{errors.first_name}</div>
            )}
            {!errors.first_name && errors.last_name && (
              <div className='signup-error-message-first-and-last'>
                <span id='please-enter-first-name'></span>
                <span id='please-enter-last-name'><i className="fa-solid fa-circle-exclamation" id='error-exclaimation'/>{errors.last_name}</span>
              </div>
            )}
      <div>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
          // placeholder='Email address'
          className='signup-form-input'
          id='email'
        ></input>
        <label className='placeholder' for='email' id='email-label'>Email</label>
      </div>
      {errors.email && <div className='signup-form-errors'><i className="fa-solid fa-circle-exclamation" id='error-exclaimation'/>{errors.email}</div>}
      <div>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
          // placeholder='Username'
          className='signup-form-input'
          id='username'
        ></input>
        <label className='placeholder' for='username' id='username-label'>Username</label>
      </div>
      {errors.username && <div className='signup-form-errors'><i className="fa-solid fa-circle-exclamation" id='error-exclaimation'/>{errors.username}</div>}
      <div>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
          // placeholder='Password'
          className='signup-form-input'
          id='password'
        ></input>
        <label className='placeholder' for='password' id='password-label'>Password</label>
      </div>
      {errors.password && <div className='signup-form-errors'><i className="fa-solid fa-circle-exclamation" id='error-exclaimation'/>{errors.password}</div>}
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
      </div>
    </form>
      <div className='signin-and-signup-button'>
      <NavLink to='/login'><span id='signin-instead'>Sign in instead</span></NavLink>
      <button type='submit' id='signup-form-submit'
      onClick={onSignUp}
      >Create Account</button>
      </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default SignUpForm;
