const supertest = require("supertest");
const server = require("./server");
const db = require("../data/dbConfig");

describe("server", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  describe("GET /", () => {
    it("returns 200 OK ", () => {
      return supertest(server)
        .get("/")
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
  });

  describe("GET /users", () => {
    it("returns 200 OK", async () => {
      const res = await supertest(server).get("/users");
      expect(res.status).toBe(200);
    });
  });

  describe("POST /users", () => {
    it("adds a user to an empty database", async () => {
      await supertest(server).post("/users").send({ name: "kelly" });

      //check data is in the database without using GET route
      const users = await db("users");
      expect(users).toHaveLength(1);
    });

    it("adds multiple users to a database", async () => {
      await supertest(server).post("/users").send({ name: "kelly" });
      await supertest(server).post("/users").send({ name: "sam" });
      await supertest(server).post("/users").send({ name: "wolf" });

      //check data is in the database without using GET route
      const users = await db("users");
      expect(users).toHaveLength(3);
    });

    it("returns 201 OK after adding user", async () => {
      const res = await supertest(server)
        .post("/users")
        .send({ name: "kelly" });
      expect(res.status).toBe(201);
    });
  });

  describe("DELETE /users", () => {
    it("deletes a user from a database containing one user", async () => {
      //adds user to db
      const users = await db("users").insert({ name: "kelly" });
      //checks only 1 user in db
      expect(users).toHaveLength(1);

      await supertest(server).delete("/users").send({ name: "kelly" });
      const userList = await db("users");
      expect(userList).toHaveLength(0);
    });

    it("deletes a user from a database containing multiple users", async () => {
      await db("users").insert({ name: "kelly" });
      await db("users").insert({ name: "sam" });
      await db("users").insert({ name: "wolf" });
      const users = await db("users");
      expect(users).toHaveLength(3);

      await supertest(server).delete("/users").send({ name: "kelly" });
      const userList = await db("users");
      expect(userList).toHaveLength(2);
    });

    it("receives 200 OK after deleting using", async () => {
      await db("users").insert({ name: "kelly" });
      await db("users").insert({ name: "sam" });
      await db("users").insert({ name: "wolf" });
      const users = await db("users");
      expect(users).toHaveLength(3);

      const res = await supertest(server)
        .delete("/users")
        .send({ name: "kelly" });
      expect(res.status).toBe(200);
    });
  });
});
