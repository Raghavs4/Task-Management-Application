import "./Dashboard.css";
import { useEffect, useState } from "react";
import { apiRequest } from "../../api/api";
import Navbar from "../../components/Navbar/Navbar";
import TaskForm from "../../components/TaskForm/TaskForm";
import TaskList from "../../components/TaskList/TaskList";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const data = await apiRequest("/tasks");
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <>
      <Navbar />
     <div className="dashboard">
  <div className="dashboard-container">
    <div className="dashboard-header">
      <h2>Your Tasks</h2>
      <p>Manage your daily work efficiently</p>
    </div>

    <div className="dashboard-content">
      <TaskForm refresh={loadTasks} />
    </div>

    <TaskList tasks={tasks} refresh={loadTasks} />
  </div>
</div>

    </>
  );
};

export default Dashboard;
