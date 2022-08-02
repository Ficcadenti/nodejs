const data = require("../data.json");
const pool = require("../db");

async function getLists() {
  const [result] = await pool.query("SELECT * FROM lists");
  return result;
}

async function getListById(id) {
  const [result] = await pool.query("SELECT * FROM lists WHERE id= ?", [id]);
  return result[0];
}

async function deleteList(id) {
  const [result] = await pool.query("DELETE FROM lists WHERE id= ?", [id]);
  return result;
}

async function addList({ name }) {
  const created_at = new Date();
  const [result] = await pool.query(
    "INSERT INTO lists (name,user_id,created_at) values (?,?,?)",
    [name, 2, created_at]
  );
  const list = await getListById(result.insertId);
  return list;
}

async function updateList(id, newList) {
  const updated_at = new Date();
  const [result] = await pool.query(
    "UPDATE  lists SET name =?, updated_at=? where id=?",
    [newList.name, updated_at, id]
  );
  const list = await getListById(id);
  return list;
}
module.exports = {
  getLists,
  getListById,
  deleteList,
  addList,
  updateList,
};
