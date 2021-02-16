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
    describe("POST", () => {
      it("201 - adds a message to the DB and reponds with that message", () => {
        return request(app)
          .post("/api/messages")
          .send({ content: "test message" })
          .expect(201)
          .then((req) => {
            expect(req.body.message).to.have.all.keys([
              "id",
              "content",
              "retrieval_count",
            ]);
            expect(req.body.message.content).to.equal("test message");
          });
      });
      // ERRORS
      it("400 - contains HMTML tags", () => {
        return request(app)
          .post("/api/messages")
          .send({ content: "<h1>test message</h1>" })
          .expect(400)
          .then((req) => {
            expect(req.body.msg).to.equal("Message cannot contain HTML tags");
          });
      });
      it("400 - content too long (max 255 char)", () => {
        return request(app)
          .post("/api/messages")
          .send({
            content:
              "Skate ipsum dolor sit amet, axle noseblunt slide soul skate Tracker. Nose slide pressure flip Jai Alai Banks boned out lip. Invert slap maxwell kickflip ollie hole. Skater 1080 wheels poseur. Slob air tailslide Burnside rail slide gap. Darkslide egg plant.",
          })
          .expect(400)
          .then((req) => {
            expect(req.body.msg).to.equal(
              "Maximum message length exceeded (255)"
            );
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
