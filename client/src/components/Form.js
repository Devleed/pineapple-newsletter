import React, { useState } from 'react';
import sprite from '../images/sprite.svg';
import Header from './Header';
import SocialStack from './SocialStack';
import axios from 'axios';

const saveEmail = async email => {
  try {
    const { data } = await axios.post('http://localhost:5000/subscribe', {
      email
    });

    console.log(data);

    return 1;
  } catch (error) {
    console.log(error);
    return error.response?.data || 'server error';
  }
};

const Form = () => {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState(null);

  const onEmailSubmit = async e => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email) setError('Email address is required');
    else if (!emailRegex.test(email))
      setError('Please provide a valid email address');
    else if (!checked) setError('You must accept the terms and conditions');
    else {
      // everything looks good
      setError(null);

      const res = await saveEmail(email);

      if (res !== 1) setError(res);
      else setSubmitted(true);
    }
  };

  const handleCheckboxToggle = e => {
    setChecked(e.target.checked);
  };

  return (
    <div className="form">
      <Header />
      {!submitted ? (
        <div className="form__content">
          <h2 className="main__heading">Subscribe to newsletter</h2>
          <h4 className="slogan">
            Subscribe to our newsletter and get 10% discount on pineapple
            glasses.
          </h4>

          <div className="email">
            <input
              type="email"
              className="email__input"
              placeholder="Type your email address here..."
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <svg className="email__icon" onClick={onEmailSubmit}>
              <use xlinkHref={`${sprite}#ic_arrow`}></use>
            </svg>
          </div>
          <div className="checkbox">
            <input
              type="checkbox"
              name="terms-checkbox"
              id="terms-checkbox"
              onChange={handleCheckboxToggle}
              checked={checked}
            />

            <label htmlFor="terms-checkbox" className="checkbox__label">
              <div className="checkbox__container">
                <svg className="checkbox__icon">
                  <use xlinkHref={`${sprite}#check`}></use>
                </svg>
              </div>
              <span className="label__text">
                I agree to <a href="#">terms and service</a>
              </span>
            </label>
          </div>
          {error ? <p className="error_message">{error}</p> : null}
        </div>
      ) : (
        <div className="form__content">
          <img
            src={require('../images/success.png')}
            className="success__icon"
          />
          <h2 className="main__heading">Thanks for subscribing!</h2>
          <h4 className="slogan">
            You have successfully subscribed to our email listing. Check your
            email for the discount code.
          </h4>
        </div>
      )}
      <div className="line"></div>
      <SocialStack />
    </div>
  );
};

export default Form;
