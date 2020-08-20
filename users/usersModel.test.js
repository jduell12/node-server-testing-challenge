const db = require("../data/dbConfig");
const Users = require("./usersModel");

describe("UsersModel", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  describe("addUser()", () => {
    it("inserts a user into the database", async () => {
      await Users.addUser({ name: "kelly" });
      const users = await db("users");
      expect(users).toHaveLength(1);
    });
  });

  describe("deleteUser()", () => {
    it("deletes a user in the database", async () => {
      await Users.addUser({ name: "kelly" });
      await Users.addUser({ name: "sam" });
      await Users.addUser({ name: "frodo" });
      await Users.deleteUser("sam");
      const users = await db("users");
      expect(users).toHaveLength(2);
    });
  });

  describe("getUsers()", () => {
    it("gets an empty array of users", async () => {
      const users = await Users.getUsers();
      expect(users).toHaveLength(0);
    });

    it("gets an array of users", async () => {
      await Users.addUser({ name: "kelly" });
      await Users.addUser({ name: "sam" });
      await Users.addUser({ name: "frodo" });
      const users = await Users.getUsers();
      expect(users).toHaveLength(3);
    });
  });
});
