const express = require("express");
const {
  getLists,
  getListById,
  deleteList,
  addList,
  updateList,
} = require("../controllers/listsController");

const { getTodosByListId } = require("../controllers/todosController");

const router = express.Router();
const logger = (req, resp, next) => {
  console.log("Chiamata al server con params: " + JSON.stringify(req.params));
  next();
};

router.get("/", logger, async (req, res) => {
  try {
    const result = await getLists();
    res.json(result);
  } catch (e) {
    res.status(500).send(e.toString());
  }
});

router.get("/:id([0-9]+)", logger, async (req, res) => {
  try {
    const list = await getListById(req.params.id);
    res.status(list ? 200 : 404).json(list ? list : null);
  } catch (e) {
    res.status(500).send(e.toString());
  }
});

router.get("/:list_id([0-9]+)/todos", logger, async (req, res) => {
  try {
    const list = await getTodosByListId(req.params.list_id);
    console.log(list);
    res.status(list ? 200 : 404).json(list ? list : null);
  } catch (e) {
    res.status(500).send(e.toString());
  }
});

router.delete("/:id([0-9]+)", logger, async (req, res) => {
  try {
    const deleted = await deleteList(req.params.id);
    console.log(deleted);
    res.status(deleted ? 200 : 404).json(deleted ? deleted : null);
  } catch (e) {
    res.status(500).send(e.toString());
  }
});

router.patch("/:id([0-9]+)", async (req, res) => {
  try {
    console.log(`body=${JSON.stringify(req.body)}, id=${req.params.id}`);
    const updTodo = await updateList(req.params.id, req.body);
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
    const result = await addList(req.body);
    res.json(result);
  } catch (e) {
    res.status(500).send(e.toString());
  }
});

module.exports = { router };
