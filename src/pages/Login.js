import React from 'react';
import Auth from '../components/Auth';

const Login = () => {
  return (
    <div>
      <h1>登录</h1>
      <Auth isLogin={true} />
    </div>
  );
};

export default Login;
