import React from 'react';

const Header = () => {
  return (
    <div className="header">
      <img src={require('../images/Union.png')} alt="logo" className="logo" />
      <h3 className="logo__text">pineapple.</h3>
      <a href="#" className="header__link">
        about
      </a>
      <a href="#" className="header__link">
        how it works
      </a>
      <a href="#" className="header__link">
        about
      </a>
    </div>
  );
};

export default Header;
