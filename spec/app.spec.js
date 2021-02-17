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
      it("200 - Responds with an array of message objects", () => {
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
      it("201 - Adds a message to the DB and responds with that message", () => {
        return request(app)
          .post("/api/messages")
          .send({ content: "test message" })
          .expect(201)
          .then((res) => {
            expect(res.body.message).to.have.all.keys([
              "id",
              "content",
              "retrieval_count",
            ]);
            expect(res.body.message.content).to.equal("test message");
          });
      });
      // ERRORS
      it("400 - Responds with an error when no message content is provided", () => {
        return request(app)
          .post("/api/messages")
          .send({})
          .expect(400)
          .then((res) => {
            expect(res.body.msg).to.equal("No message content provided");
          });
      });
      it("400 - Responds with an error when the content contains HTML tags", () => {
        return request(app)
          .post("/api/messages")
          .send({ content: "<h1>test message</h1>" })
          .expect(400)
          .then((res) => {
            expect(res.body.msg).to.equal("Message cannot contain HTML tags");
          });
      });
      it("400 - Responds with an error when the content is too long", () => {
        return request(app)
          .post("/api/messages")
          .send({
            content:
              "Skate ipsum dolor sit amet, axle noseblunt slide soul skate Tracker. Nose slide pressure flip Jai Alai Banks boned out lip. Invert slap maxwell kickflip ollie hole. Skater 1080 wheels poseur. Slob air tailslide Burnside rail slide gap. Darkslide egg plant.",
          })
          .expect(400)
          .then((res) => {
            expect(res.body.msg).to.equal(
              "Maximum message length exceeded (255)"
            );
          });
      });
    });
  });
  describe("/messages/:id", () => {
    describe("GET", () => {
      it("200 - Responds with a specific message when given its message ID ", () => {
        return request(app)
          .post("/api/messages")
          .send({ content: "test message" })
          .then((res) => {
            const ID = res.body.message.id;
            return Promise.all([
              ID,
              request(app).get(`/api/messages/${ID}`).expect(200),
            ]);
          })
          .then(([ID, res]) => {
            expect(res.body.message.id).to.equal(ID);
            expect(res.body.message.content).to.equal("test message");
          });
      });
      it("200 - Increases the retrieval count by one each time a message is requested", () => {
        return request(app)
          .post("/api/messages")
          .send({ content: "test message" })
          .then((res) => {
            const ID = res.body.message.id;
            return request(app).get(`/api/messages/${ID}`);
          })
          .then((res) => {
            expect(res.body.message.retrieval_count).to.equal(1);
            const ID = res.body.message.id;
            return request(app).get(`/api/messages/${ID}`);
          })
          .then((res) => {
            expect(res.body.message.retrieval_count).to.equal(2);
          });
      });
      it("200 - Doesn't increase the retrieval count of other messages", () => {
        return request(app)
          .get("/api/messages")
          .then((res) => {
            return Promise.all([
              res.body.messages[0].id,
              request(app).get(`/api/messages/${res.body.messages[1].id}`),
              request(app).get(`/api/messages/${res.body.messages[1].id}`),
            ]);
          })
          .then(([id]) => {
            return request(app).get(`/api/messages/${id}`);
          })
          .then((res) => {
            expect(res.body.message.retrieval_count).to.equal(1);
            expect(res.body.message.retrieval_count).to.not.equal(2);
          });
      });
      // ERRORS
      it("404 - Responds with an error when the ID does not exist", () => {
        const fake_id = "2b6357ab-0613-454f-ad96-c36749104d78";
        return request(app)
          .get(`/api/messages/${fake_id}`)
          .expect(404)
          .then((res) => {
            expect(res.body.msg).to.equal("Message not found");
          });
      });
      it('400 - Responds with "Incorrect format for message ID"', () => {
        const bad_id = "123";
        return request(app)
          .get(`/api/messages/${bad_id}`)
          .expect(400)
          .then((res) => {
            expect(res.body.msg).to.equal("Incorrect format for message ID");
          });
      });
    });
    describe("PATCH", () => {
      it("200 - Accepts a new message content and responds with the updated message", () => {
        return request(app)
          .post("/api/messages")
          .send({ content: "test message" })
          .then((res) => {
            const ID = res.body.message.id;
            return request(app)
              .patch(`/api/messages/${ID}`)
              .send({ content: "updated message" })
              .expect(200);
          })
          .then((res) => {
            expect(res.body.message.content).to.equal("updated message");
          });
      });
      // ERRORS
      it("404 - Responds with an error when the ID does not exist", () => {
        const fake_id = "2b6357ab-0613-454f-ad96-c36749104d78";
        return request(app)
          .patch(`/api/messages/${fake_id}`)
          .send({ content: "updated message" })
          .expect(404)
          .then((res) => {
            expect(res.body.msg).to.equal("Message not found");
          });
      });
      it("400 - Responds with an error when the ID is not a UUID", () => {
        const bad_id = "123";
        return request(app)
          .patch(`/api/messages/${bad_id}`)
          .send({ content: "updated message" })
          .expect(400)
          .then((res) => {
            expect(res.body.msg).to.equal("Incorrect format for message ID");
          });
      });
      it("400 - Responds with an error when the content contains HTML tags", () => {
        return request(app)
          .post("/api/messages")
          .send({ content: "test message" })
          .then((res) => {
            const ID = res.body.message.id;
            return request(app)
              .patch(`/api/messages/${ID}`)
              .send({ content: "<h1>test message</h1>" })
              .expect(400);
          })
          .then((res) => {
            expect(res.body.msg).to.equal("Message cannot contain HTML tags");
          });
      });
      it("400 - Responds with an error when the content is too long", () => {
        return request(app)
          .post("/api/messages")
          .send({ content: "test message" })
          .then((res) => {
            const ID = res.body.message.id;
            return request(app)
              .patch(`/api/messages/${ID}`)
              .send({
                content:
                  "Skate ipsum dolor sit amet, axle noseblunt slide soul skate Tracker. Nose slide pressure flip Jai Alai Banks boned out lip. Invert slap maxwell kickflip ollie hole. Skater 1080 wheels poseur. Slob air tailslide Burnside rail slide gap. Darkslide egg plant.",
              })
              .expect(400);
          })
          .then((res) => {
            expect(res.body.msg).to.equal(
              "Maximum message length exceeded (255)"
            );
          });
      });
      it("400 - Responds with an error when no message content is provided", () => {
        return request(app)
          .post("/api/messages")
          .send({ content: "test message" })
          .then((res) => {
            const ID = res.body.message.id;
            return request(app)
              .patch(`/api/messages/${ID}`)
              .send({})
              .expect(400);
          })
          .then((res) => {
            expect(res.body.msg).to.equal("No message content provided");
          });
      });
    });
    describe("DELETE", () => {
      it("204 - deletes the message", () => {
        return request(app)
          .post("/api/messages")
          .send({ content: "test message" })
          .then((res) => {
            const ID = res.body.message.id;
            return request(app).delete(`/api/messages/${ID}`).expect(204);
          });
      });
      // ERRORS
      it("404 - Responds with an error when the ID does not exist", () => {
        const fake_id = "2b6357ab-0613-454f-ad96-c36749104d78";
        return request(app)
          .delete(`/api/messages/${fake_id}`)
          .expect(404)
          .then((res) => {
            expect(res.body.msg).to.equal("Message not found");
          });
      });
      it("400 - Responds with an error when the ID is not a UUID", () => {
        const bad_id = "123";
        return request(app)
          .delete(`/api/messages/${bad_id}`)
          .expect(400)
          .then((res) => {
            expect(res.body.msg).to.equal("Incorrect format for message ID");
          });
      });
    });
  });
});
