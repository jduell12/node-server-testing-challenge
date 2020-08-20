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
});
