import "./TaskForm.css";
import { apiRequest } from "../../api/api";

const TaskForm = ({ refresh }) => {
  const submitTask = async (e) => {
    e.preventDefault();

    await apiRequest("/tasks", "POST", {
      title: e.target.title.value,
      description: e.target.description.value
    });

    e.target.reset();
    refresh();
  };

  return (
    <form className="task-form" onSubmit={submitTask}>
  <h3>Add New Task</h3>
  <input name="title" placeholder="Task title" required />
  <input name="description" placeholder="Description" />
  <button>Add Task</button>
</form>

  );
};

export default TaskForm;
