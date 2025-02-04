import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const TaskForm = ({ fetchTasks, editingTask, setEditingTask }) => {
  const [title, setTitle] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);  // 填充当前任务标题
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTask) {
        // ✅ 同时更新任务名称和完成状态
        await axios.put(`${API_URL}/api/tasks/${editingTask._id}`, 
          { title, completed: editingTask.completed },  // 保留 completed 字段
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEditingTask(null);  // 退出编辑模式
      } else {
        // ✅ 创建新任务，默认未完成
        await axios.post(`${API_URL}/api/tasks`, 
          { title, completed: false }, 
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      setTitle('');  // 清空输入框
      fetchTasks();  // 强制刷新任务列表
    } catch (error) {
      console.error('提交任务失败:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="任务标题"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <button type="submit">{editingTask ? '更新任务' : '添加任务'}</button>
    </form>
  );
};

export default TaskForm;
