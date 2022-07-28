const express = require("express");
const {
  getTodos,
  getTodoById,
  deleteTodo,
  addTodo,
  updateTodo,
} = require("../controllers/todosController");
const router = express.Router();

const logger = (req, resp, next) => {
  console.log("Chiamata al server con params: " + JSON.stringify(req.params));
  next();
};

router.get("/", logger, (req, res) => {
  res.json(getTodos());
});

router.get("/:id([0-9]+)", logger, (req, res) => {
  res.json(getTodoById(req.params.id));
});

router.delete("/:id([0-9]+)", logger, (req, res) => {
  const deleted = deleteTodo(req.params.id);
  console.log(deleted);
  res.status(deleted ? 200 : 404).json(deleted ? deleted : null);
});

router.patch("/:id([0-9]+)", (req, res) => {
  console.log(req.body, req.params.id);
  const updTodo = updateTodo(req.params.id, req.body);
  res.status(updTodo ? 200 : 404).json(updTodo ? updTodo : " Record not found");
});

router.post("/", logger, (req, res) => {
  console.log(req.body);
  res.json(addTodo(req.body));
});

module.exports = { router };
