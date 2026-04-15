const Task = require("../models/Task");

// Create Task
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      text: req.body.text,
      status: req.body.status,
      boardId: req.body.boardId, // ✅ MUST EXIST
      dueDate: req.body.dueDate,
    });

    res.json(task);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
};

// Get Tasks by Board
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ boardId: req.params.boardId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Update Task Status
exports.updateTask = async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
  console.error("FULL ERROR 👉", err); // 🔥 ADD THIS
  res.status(500).json({ error: err.message });
}
};
