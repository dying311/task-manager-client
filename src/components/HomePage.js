import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-container">
      <h1>欢迎使用任务管理系统</h1>
      <Link to="/login">
        <button>登录</button>
      </Link>
      <Link to="/register">
        <button>注册</button>
      </Link>
    </div>
  );
};

export default HomePage;