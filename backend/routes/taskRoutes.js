const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const Task = require("../models/Task");

const {
  createTask,
  getTasks,
  updateTask,
} = require("../controllers/taskController");

// ✅ CREATE TASK
router.post("/", auth, createTask);

// ✅ GET TASKS BY BOARD
router.get("/:boardId", auth, getTasks);

// ✅ UPDATE TASK (drag)
router.put("/:id", auth, updateTask);

// ✅ DELETE TASK
router.delete("/:id", auth, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Delete failed" });
  }
});

module.exports = router;