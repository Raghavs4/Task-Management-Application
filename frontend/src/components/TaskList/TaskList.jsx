import "./TaskList.css";
import { apiRequest } from "../../api/api";
import { useState } from "react";

const TaskList = ({ tasks, refresh }) => {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: "", description: "", status: "Pending" });

  const deleteTask = async (id) => {
    await apiRequest(`/tasks/${id}`, "DELETE");
    refresh();
  };

  const startEdit = (task) => {
    setEditingId(task._id);
    setEditData({
      title: task.title,
      description: task.description,
      status: task.status || "Pending"
    });
  };

  const updateTask = async (id) => {
    await apiRequest(`/tasks/${id}`, "PUT", editData);
    setEditingId(null);
    refresh();
  };

  return (
    <div className="task-list">
      {tasks.map(task => (
        <div className="task-card" key={task._id}>
          {editingId === task._id ? (
            <>
              <input
                value={editData.title}
                onChange={e => setEditData({ ...editData, title: e.target.value })}
              />

              <input
                value={editData.description}
                onChange={e => setEditData({ ...editData, description: e.target.value })}
              />

              <select
                value={editData.status}
                onChange={e => setEditData({ ...editData, status: e.target.value })}
              >
                <option>Pending</option>
                <option>Completed</option>
              </select>

              <div className="task-actions">
                <button className="save-btn" onClick={() => updateTask(task._id)}>Save</button>
                <button className="cancel-btn" onClick={() => setEditingId(null)}>Cancel</button>
              </div>
            </>
          ) : (
            <>
              <h4>{task.title}</h4>
              <p>{task.description}</p>

              <span className={`status ${task.status === "Completed" ? "done" : "pending"}`}>
                {task.status || "Pending"}
              </span>

              <div className="task-actions">
                <button className="edit-btn" onClick={() => startEdit(task)}>Edit</button>
                <button className="delete-btn" onClick={() => deleteTask(task._id)}>Delete</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
