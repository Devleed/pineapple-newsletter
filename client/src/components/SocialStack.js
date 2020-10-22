import React from 'react';
import sprite from '../images/sprite.svg';

const SocialStack = () => {
  return (
    <div className="social__icons">
      <svg className="social_icon">
        <use xlinkHref={`${sprite}#ic_facebook`}></use>
      </svg>
      <svg className="social_icon">
        <use xlinkHref={`${sprite}#ic instagram`}></use>
      </svg>
      <svg className="social_icon">
        <use xlinkHref={`${sprite}#ic_twitter`}></use>
      </svg>
      <svg className="social_icon">
        <use xlinkHref={`${sprite}#ic youtube`}></use>
      </svg>
    </div>
  );
};

export default SocialStack;
