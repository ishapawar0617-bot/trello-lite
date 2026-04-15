const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["todo", "doing", "done"],
    default: "todo",
  },
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board",
    required: true, // ⚠️ IMPORTANT
  },
  dueDate: {
    type: Date,
  },
});

// ✅ FIX HERE
module.exports = mongoose.models.Task || mongoose.model("Task", taskSchema)