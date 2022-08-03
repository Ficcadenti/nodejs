const data = require("../data.json");
const pool = require("../db");

async function getTodos() {
  const [result] = await pool.query("SELECT * FROM todos");
  return result;
}

async function getTodosByListId(list_id) {
  const [result] = await pool.query("SELECT * FROM todos WHERE list_id= ?", [
    list_id,
  ]);
  return result[0];
}

async function getTodoById(id) {
  const [result] = await pool.query("SELECT * FROM todos WHERE id= ?", [id]);
  return result[0];
}

async function deleteTodo(id) {
  const [result] = await pool.query("DELETE FROM todos WHERE id= ?", [id]);
  return result.affectedRows;
}

async function addTodo({ todo, completed, list_id }) {
  const created_at = new Date();
  const [result] = await pool.query(
    "INSERT INTO todos (todo,completed,list_id,created_at) values (?,?,?,?)",
    [todo, completed, list_id, created_at]
  );
  console.log(result);
  const todoAdd = await getTodoById(result.insertId);
  return todoAdd;
}

async function updateTodo(id, newTodo) {
  const updated_at = new Date();
  const [result] = await pool.query(
    "UPDATE todos SET todo=?, completed=?, list_id=?, updated_at=? WHERE id=?",
    [newTodo.todo, newTodo.completed, newTodo.list_id, updated_at, id]
  );
  const todo = await getTodoById(id);
  return todo;
}

module.exports = {
  getTodos,
  getTodoById,
  deleteTodo,
  addTodo,
  updateTodo,
  getTodosByListId,
};
