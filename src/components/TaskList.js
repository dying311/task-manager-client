import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';

const API_URL = process.env.REACT_APP_API_URL;

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const token = localStorage.getItem('token');

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (error) {
      console.error('获取任务失败:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (error) {
      console.error('删除任务失败:', error);
    }
  };

  // ✅ 独立处理任务完成状态的切换
  const handleToggleComplete = async (task) => {
    try {
      await axios.put(`${API_URL}/api/tasks/${task._id}`, 
        { completed: !task.completed, title: task.title },  // 只更新 completed
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTasks();
    } catch (error) {
      console.error('更新任务状态失败:', error);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);  // 传递完整的任务对象，包括 title 和 completed
  };  

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="task-container">
      <h2>任务列表</h2>
      <TaskForm fetchTasks={fetchTasks} editingTask={editingTask} setEditingTask={setEditingTask} />
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task._id} className="task-item">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleComplete(task)}  // 只处理完成状态
              className="checkbox"
            />
            <span className={`task-title ${task.completed ? 'completed' : ''}`}>
              {task.title}
            </span>
            <div className="task-actions">
              <button onClick={() => handleEditTask(task)}>编辑</button>
              <button onClick={() => handleDeleteTask(task._id)}>删除</button>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={handleLogout} className="logout-button">退出登录</button>
    </div>
  );
};

export default TaskList;
