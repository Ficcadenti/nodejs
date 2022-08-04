const express = require("express");
const {
  getTodos,
  getTodoById,
  deleteTodo,
  addTodo,
  updateTodo,
} = require("../../controllers/todosController");

const router = express.Router();
const logger = (req, resp, next) => {
  console.log(
    "TODOS: Chiamata al server con params: " + JSON.stringify(req.params)
  );
  next();
};

router.get("/", logger, async (req, res) => {
  try {
    const result = await getTodos();
    res.json(result);
  } catch (e) {
    res.status(500).send(e.toString());
  }
});

router.get("/:id([0-9]+)", logger, async (req, res) => {
  try {
    const todo = await getTodoById(req.params.id);
    res.status(todo ? 200 : 404).json(todo ? todo : null);
  } catch (e) {
    res.status(500).send(e.toString());
  }
});

router.delete("/:id([0-9]+)", logger, async (req, res) => {
  try {
    const deleted = await deleteTodo(req.params.id);
    console.log(deleted);
    res.status(deleted ? 200 : 404).json(deleted ? deleted : null);
  } catch (e) {
    res.status(500).send(e.toString());
  }
});

router.patch("/:id([0-9]+)", async (req, res) => {
  try {
    console.log(`body=${JSON.stringify(req.body)}, id=${req.params.id}`);
    const updTodo = await updateTodo(req.params.id, req.body);
    res
      .status(updTodo ? 200 : 404)
      .json(updTodo ? updTodo : " Record not found");
  } catch (e) {
    res.status(500).send(e.toString());
  }
});

router.post("/", logger, async (req, res) => {
  try {
    console.log(req.body);
    const result = await addTodo(req.body);
    res.json(result);
  } catch (e) {
    res.status(500).send(e.toString());
  }
});

module.exports = { router };
