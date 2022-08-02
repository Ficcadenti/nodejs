const data = require("../data.json");

function getLists() {
  return data.lists;
}

function getListById(id) {
  return data.lists.find((List) => List.id == id);
}

function deleteList(id) {
  const idx = data.lists.findIndex((List) => List.id == id);
  if (idx > -1) {
    const ele = data.lists.splice(idx, 1);
    return ele;
  }
  return 0;
}

function addList({ name }) {
  const ids = data.lists.map((object) => {
    return object.id;
  });
  console.log(ids);
  let max = Math.max(...ids);
  console.log(`New id: ${max + 1}`);
  const newList = { name, id: ++max };
  data.lists.unshift(newList);
  return newList;
}

function updateList(id, newList) {
  const oldList = getListById(id);
  if (oldList) {
    const idx = data.lists.findIndex((list) => list.id === +id);
    data.lists[idx] = { ...oldList, ...newList };
    return data.lists[idx];
  }
  return false;
}
module.exports = {
  getLists,
  getListById,
  deleteList,
  addList,
  updateList,
};
