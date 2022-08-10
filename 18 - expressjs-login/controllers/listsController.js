const data = require("../data.json");
const List = require("../models").List;
const Todo = require("../models").Todo;
const Op = require("../models").Sequelize.Op;

const attributes_count = {
  include: [
    [List.sequelize.fn("COUNT", List.sequelize.col("Todos.id")), "total"],
  ],
  exclude: ["userId", "user_id", "UserId", "createdAt", "updatedAt"],
};
const attributes = ["id", "name", "user_id", "created_at", "updated_at"];

async function getLists(pars = {}) {
  const where = pars.q
    ? {
        name: {
          [Op.like]: "%" + pars.q + "%",
        },
      }
    : {};

  const result = await List.findAll({
    attributes: attributes_count,
    subQuery: false,
    limit: 20,
    include: [{ model: Todo, attributes: [] }],
    group: ["List.id"],
    order: [["createdAt", "DESC"]],
    where: where,
  });
  return result;
}

async function getListById(id) {
  const result = await List.findByPk(id, { attributes });
  return result;
}

async function deleteList(id) {
  const result = await List.destroy({ where: { id } });
  return result;
}

async function addList(name) {
  const result = await List.create({ user_id: 1, name });
  return result;
}

async function updateList(id, name) {
  const result = await List.update({ name: name }, { where: { id } });
  return result;
}
module.exports = {
  getLists,
  getListById,
  deleteList,
  addList,
  updateList,
};
