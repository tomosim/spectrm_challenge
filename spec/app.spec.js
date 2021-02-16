process.env.NODE_ENV = "test";

const { expect } = require("chai");
const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection");

describe("/api", () => {
  beforeEach(() => {
    return connection.seed.run();
  });
  after(() => {
    return connection.destroy();
  });
  describe("/messages", () => {
    describe("GET", () => {
      it("200 - responds with an array of message objects", () => {
        return request(app)
          .get("/api/messages")
          .expect(200)
          .then((res) => {
            res.body.messages.forEach((message) => {
              expect(message).to.have.all.keys([
                "id",
                "content",
                "retrieval_count",
              ]);
            });
          });
      });
    });
  });
  describe("/messages/:id", () => {
    describe("GET", () => {
      // ERRORS
      // 404 id not found
      // 400 not uuid
    });
    describe("POST", () => {
      // ERRORS
      // 400 contains HTML
      // 400 too long
    });
    describe("PATCH", () => {
      // ERRORS
      // 404 id not found
      // 400 not uuid
      // 400 contains HTML
      // 400 too long
    });
    describe("DELETE", () => {
      // ERRORS
      // 404 id not found
      // 400 not uuid
    });
  });
});
