const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
  },
});

module.exports =
  mongoose.models.Board || mongoose.model("Board", boardSchema);