process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app.js");
const connection = require("../db/connection.js");

beforeEach(() => connection.seed.run());
afterAll(() => {
  return connection.destroy();
});

describe("/api", () => {
  test("return 200 status with msg of api working", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((res) => {
        expect(res.body.msg).toEqual("responding");
      });
  });
});

describe("/api/topics", () => {
  describe("GET", () => {
    test("should return status 200 and array of topics ", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual({
            topics: [
              { description: "The man, the Mitch, the legend", slug: "mitch" },
              { description: "Not dogs", slug: "cats" },
              { description: "what books are made of", slug: "paper" },
            ],
          });
        });
    });
  });
});

describe("/api/users", () => {
  describe("GET", () => {
    describe(":username", () => {
      test("should return a 200 status and the user by given username", () => {
        return request(app)
          .get("/api/users/butter_bridge")
          .expect(200)
          .then((res) => {
            expect(res.body).toEqual({
              user: [
                {
                  username: "butter_bridge",
                  name: "jonny",
                  avatar_url:
                    "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
                },
              ],
            });
          });
      });
    });
  });
});

describe("/api/articles", () => {
  describe("GET", () => {
    describe(":article_id", () => {
      test("should return a 200 status and the article by given id", () => {
        return request(app)
          .get("/api/articles/1")
          .expect(200)
          .then((res) => {
            expect(res.body).toEqual({
              article: [
                {
                  article_id: 1,
                  title: "Living in the shadow of a great man",
                  body: "I find this existence challenging",
                  votes: 100,
                  topic: "mitch",
                  author: "butter_bridge",
                  created_at: "2018-11-15T12:21:54.171Z",
                  comment_count: "0",
                },
              ],
            });
          });
      });
    });
  });

  describe("PATCH", () => {
    describe("/:article_id", () => {
      test("should ", () => {
        return request(app)
          .patch("/api/articles/1")
          .send({ body: "I'M CHANGING THIS TO SOMETHING NEW!" })
          .expect(201)
          .then((res) => {
            expect(res.body).toEqual([
              {
                article_id: 1,
                title: "Living in the shadow of a great man",
                body: "I'M CHANGING THIS TO SOMETHING NEW!",
                votes: 100,
                topic: "mitch",
                author: "butter_bridge",
                created_at: "2018-11-15T12:21:54.171Z",
              },
            ]);
          });
      });
    });
  });
});
describe("/api/comments", () => {
  describe("PATCH", () => {
    describe(":comment_id", () => {
      test("should return a 201 status and update the comment by given id", () => {
        return request(app)
          .patch("/api/comments/1")
          .send({ body: "I'M CHANGING THIS TO SOMETHING NEW!" })
          .expect(201)
          .then((res) => {
            expect(res.body).toEqual({
              comment_id: 1,
              body: "I'M CHANGING THIS TO SOMETHING NEW!",
              article_id: 1, //this appears as null, why?
              author: "butter_bridge",
              votes: 16,
              created_at: "2017-11-22T12:36:03.389Z",
            });
          });
      });
    });
  });
});

describe("error handlers", () => {});
