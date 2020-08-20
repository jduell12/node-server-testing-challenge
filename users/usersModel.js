const db = require("../data/dbConfig");

module.exports = {
  getUsers,
  addUser,
  deleteUser,
};

function getUsers() {
  return db("users");
}

async function addUser(user) {
  return db("users").insert(user, "id");
}

async function deleteUser(user) {
  return db("users").where({ name: user }).del();
}
