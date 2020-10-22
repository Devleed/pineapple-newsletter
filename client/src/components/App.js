import React from 'react';

import '../styles/main.scss';
import Form from './Form';

const App = () => {
  return (
    <div className="wrapper">
      <Form />
      <img
        src={require('../images/bg.jpeg')}
        alt="background pineapple image"
        className="bg-image"
      />
    </div>
  );
};

export default App;
