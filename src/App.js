import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import TaskList from './components/TaskList';
import HomePage from './components/HomePage';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} /> {/* 默认跳转到登录页面 */}
        <Route path="/tasks" element={isAuthenticated ? <TaskList /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Auth isLogin={true} />} />
        <Route path="/register" element={<Auth isLogin={false} />} />
      </Routes>
    </Router>
  );
};

export default App;