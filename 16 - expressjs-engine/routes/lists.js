const express = require("express");
const router = express.Router();
const { getLists, getListById } = require("../controllers/listsController");
const { getTodosByListId } = require("../controllers/todosController");
router.get("/", async (req, res) => {
  try {
    const result = await getLists();
    const names = result.map((object) => {
      return { name: object.name, id: object.id };
    });
    res.render("home", { lists: names });
  } catch (e) {
    res.status(500).send(e.toString());
  }
});
router.get("/:list_id([0-9]+)/todos", async (req, res) => {
  try {
    const listId = req.params.list_id;
    const listObj = await getListById(listId);
    const result = await getTodosByListId(listId);

    const todos = result.map((object) => {
      return { todo: object.todo, id: object.id };
    });

    res.render("todos", { todos: todos, list_name: listObj.name });
  } catch (e) {
    res.status(500).send(e.toString());
  }
});
module.exports = router;
