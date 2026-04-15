const Board = require("../models/Board");

// CREATE BOARD
exports.createBoard = async (req, res) => {
  try {
    const board = await Board.create({
      name: req.body.name,
      userId: "testUser", // ✅ FIX (temporary)
    });

    res.status(201).json(board);
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
};

// GET BOARDS
exports.getBoards = async (req, res) => {
  try {
    const boards = await Board.find({
      userId: "testUser", // ✅ SAME VALUE
    });

    res.json(boards);
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
};