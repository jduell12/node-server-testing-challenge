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
    it("adds a user", async () => {
      await supertest(server).post("/users").send({ name: "kelly" });

      //check data is in the database without using GET route
      const users = await db("users");
      expect(users).toHaveLength(1);
    });

    it("returns 201 OK after adding user", async () => {
      const res = await supertest(server)
        .post("/users")
        .send({ name: "kelly" });
      expect(res.status).toBe(201);
    });
  });
});
