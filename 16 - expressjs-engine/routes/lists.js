const express = require("express");
const router = express.Router();

const {
  getLists,
  getListById,
  deleteList,
  updateList,
  addList,
} = require("../controllers/listsController");
const { getTodosByListId } = require("../controllers/todosController");
const list = require("../models/list");

const logger = (req, resp, next) => {
  console.log(
    "LISTS: Chiamata al server con params: " + JSON.stringify(req.params)
  );
  next();
};

router.get("/", logger, async (req, res) => {
  try {
    const { q } = req.query;
    const result = await getLists({ q });
    const names = result.map((object) => {
      return {
        name: object.name,
        id: object.id,
        total: object.dataValues.total,
      };
    });
    res.render("home", { lists: names, showBackButton: false, q });
  } catch (e) {
    res.status(500).send(e.toString());
  }
});

router.get("/new", logger, async (req, res) => {
  try {
    res.render("list/newList", { showBackButton: true });
  } catch (e) {
    res.status(500).send(e.toString());
  }
});

router.get("/:list_id([0-9]+)/edit", logger, async (req, res) => {
  try {
    const listId = req.params.list_id;
    const listObj = await getListById(listId);
    const values = listObj.dataValues;
    console.log(JSON.stringify(values));

    res.render("list/edit", { ...values });
  } catch (e) {
    res.status(500).send(e.toString());
  }
});

router.get("/:list_id([0-9]+)/todos", logger, async (req, res) => {
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

router.delete("/:list_id([0-9]+)/", logger, async (req, res) => {
  try {
    const deleted = await deleteList(req.params.list_id);
    res.redirect("/");
    //res.status(deleted ? 200 : 404).json(deleted ? deleted : null);
  } catch (e) {
    //res.status(500).send(e.toString());
  }
});

router.patch("/:list_id([0-9]+)", async (req, resp) => {
  try {
    const updated = await updateList(req.params.list_id, req.body.list_name);
    resp.redirect("/");
    // resp.status(deleted ? 200 : 404).json(deleted ? deleted : null);
  } catch (e) {
    resp.status(500).send(e.toString());
  }
});

router.post("/", async (req, resp) => {
  try {
    const updated = await addList(req.body.list_name);
    resp.redirect("/");
    // resp.status(deleted ? 200 : 404).json(deleted ? deleted : null);
  } catch (e) {
    resp.status(500).send(e.toString());
  }
});

module.exports = { router };
