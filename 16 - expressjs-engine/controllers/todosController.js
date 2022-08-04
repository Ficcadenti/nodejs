const data = require("../data.json");
const pool = require("../db");
const Todo = require("../models").Todo;
const attributes = ["id", "todo", "list_id", "created_at", "updated_at"];

async function getTodos() {
  const result = Todo.findAll({
    attributes,
    limit: 20,
  });
  return result;
}

async function getTodosByListId(list_id) {
  const result = await Todo.findAll({
    attributes,
    limit: 20,
    where: { list_id: list_id },
  });
  return result;
}

async function getTodoById(id) {
  const result = await Todo.findByPk(id, { attributes });
  return result;
}

async function deleteTodo(id) {
  const result = await Todo.destroy({ where: { id } });
  return result;
}

async function addTodo({ todo, completed, list_id }) {
  const result = await Todo.create({ todo, completed, list_id });
  return result;
}

async function updateTodo(id, { todo, list_id, completed }) {
  const result = await Todo.update(
    { todo, list_id, completed },
    { where: { id } }
  );
  const list = await getTodoById(id);
  return list;
}

module.exports = {
  getTodos,
  getTodoById,
  deleteTodo,
  addTodo,
  updateTodo,
  getTodosByListId,
};
