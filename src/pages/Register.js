import React from 'react';
import Auth from '../components/Auth';

const Register = () => {
  return (
    <div>
      <h1>注册</h1>
      <Auth isLogin={false} />
    </div>
  );
};

export default Register;
