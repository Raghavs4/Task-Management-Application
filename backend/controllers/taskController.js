import Task from "../models/Task.js";

// CREATE TASK
export const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Task title is required" });
    }

    const task = await Task.create({
      user: req.user._id,
      title,
      description,
      status
    });

    return res.status(201).json(task);
  } catch (error) {
    console.error("Create Task Error:", error.message);
    return res.status(500).json({ message: "Server error while creating task" });
  }
};

// GET TASKS
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    return res.json(tasks);
  } catch (error) {
    console.error("Get Tasks Error:", error.message);
    return res.status(500).json({ message: "Server error while fetching tasks" });
  }
};

// UPDATE TASK
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Forbidden: Not your task" });
    }

    task.title = req.body.title ?? task.title;
    task.description = req.body.description ?? task.description;
    task.status = req.body.status ?? task.status;

    const updatedTask = await task.save();
    return res.json(updatedTask);
  } catch (error) {
    console.error("Update Task Error:", error.message);
    return res.status(500).json({ message: "Server error while updating task" });
  }
};

// DELETE TASK
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Forbidden: Not your task" });
    }

    await task.deleteOne();
    return res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Delete Task Error:", error.message);
    return res.status(500).json({ message: "Server error while deleting task" });
  }
};

