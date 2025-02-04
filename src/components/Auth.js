import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;

const Auth = ({ isLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

    try {
      const response = await axios.post(`${API_URL}${endpoint}`, formData);
      if (isLogin) {
        localStorage.setItem('token', response.data.token);
        navigate('/tasks');
      } else {
        setMessage('注册成功！请登录。');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || '请求失败');
    }
  };

  return (
    <div className="auth-container">
      <h2>欢迎使用任务管理系统</h2> {/* 修改标题 */}
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="用户名" onChange={handleChange} required />
        <input type="password" name="password" placeholder="密码" onChange={handleChange} required />
        <button type="submit">{isLogin ? '登录' : '注册'}</button>
      </form>
      <p>{isLogin ? '没有账户？' : '已有账户？'} <a href={isLogin ? "/register" : "/login"}>{isLogin ? '去注册' : '去登录'}</a></p>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Auth;
