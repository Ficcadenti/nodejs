const express = require("express");
const {
  getLists,
  getListById,
  deleteList,
  addList,
  updateList,
} = require("../controllers/listsController");

const router = express.Router();
const logger = (req, resp, next) => {
  console.log("Chiamata al server con params: " + JSON.stringify(req.params));
  next();
};

router.get("/", logger, (req, res) => {
  res.json(getLists());
});

router.get("/:id([0-9]+)", logger, (req, res) => {
  const list = getListById(req.params.id);
  res.status(list ? 200 : 404).json(list ? list : null);
});

router.delete("/:id([0-9]+)", logger, (req, res) => {
  const deleted = deleteList(req.params.id);
  console.log(deleted);
  res.status(deleted ? 200 : 404).json(deleted ? deleted : null);
});

router.patch("/:id([0-9]+)", (req, res) => {
  console.log(req.body, req.params.id);
  const updTodo = updateList(req.params.id, req.body);
  res.status(updTodo ? 200 : 404).json(updTodo ? updTodo : " Record not found");
});

router.post("/", logger, (req, res) => {
    console.log(req.body);
    res.json(addList(req.body));
  });

module.exports = { router };
