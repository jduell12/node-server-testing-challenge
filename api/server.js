const express = require("express");
const server = express();

const usersRouter = require("../users/usersRouter");

server.use(express.json());
server.use("/users", usersRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "working" });
});

module.exports = server;
