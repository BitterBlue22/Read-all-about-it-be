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
                  comment_count: "13",
                },
              ],
            });
          });
      });
    });
    describe(":article_id/comments", () => {
      test("should return status 200 and array of comments by article id", () => {
        return request(app)
          .get("/api/articles/9/comments")
          .expect(200)
          .then((res) => {
            expect(res.body).toEqual({
              comments: [
                {
                  article_id: 9,
                  author: "butter_bridge",
                  body:
                    "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
                  comment_id: 1,
                  created_at: "2017-11-22T12:36:03.389Z",
                  votes: 16,
                },
                {
                  article_id: 9,
                  author: "icellusedkars",
                  body: "The owls are not what they seem.",
                  comment_id: 17,
                  created_at: "2001-11-26T12:36:03.389Z",
                  votes: 20,
                },
              ],
            });
          });
      });
      test("should accept orderBy query defaulting to desc unless specified otherwise", () => {
        return request(app)
          .get("/api/articles/9/comments?order=asc")
          .expect(200)
          .then((res) => {
            expect(res.body.comments[0]).toEqual({
              article_id: 9,
              author: "icellusedkars",
              body: "The owls are not what they seem.",
              comment_id: 17,
              created_at: "2001-11-26T12:36:03.389Z",
              votes: 20,
            });
          });
      });
      test("should order by any valid column", () => {
        return request(app)
          .get("/api/articles/1/comments?sort_by=votes")
          .expect(200)
          .then((res) => {
            expect(res.body.comments[0]).toEqual({
              article_id: 1,
              author: "icellusedkars",
              body:
                "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.",
              comment_id: 3,
              created_at: "2015-11-23T12:36:03.389Z",
              votes: 100,
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
    describe("POST", () => {
      describe(":article_id", () => {
        describe("comments", () => {
          test("should post a comment to the article with the provided id ", () => {
            return request(app)
              .post("/api/articles/5/comments")
              .send({
                body: "Random test comment",
                username: "ucellusedkars",
              })
              .expect(201)
              .then((result) => {
                result.body.new_comment.forEach((comment) => {
                  expect(comment).toHaveProperty("comment_id");
                  expect(comment).toHaveProperty("author");
                  expect(comment).toHaveProperty("article_id");
                  expect(comment).toHaveProperty("votes");
                  expect(comment).toHaveProperty("body");
                  expect(comment).toHaveProperty("created_at");
                });
              });
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
                "updated comment": [
                  {
                    comment_id: 1,
                    body: "I'M CHANGING THIS TO SOMETHING NEW!",
                    article_id: 9,
                    author: "butter_bridge",
                    votes: 16,
                    created_at: "2017-11-22T12:36:03.389Z",
                  },
                ],
              });
            });
        });
      });
    });
    describe("DELETE", () => {
      describe(":comment_id", () => {
        it("should delete comment by id", async () => {
          return request(app).del("/api/comments/3").expect(204);
        });
      });
    });
  });

  describe("error handlers", () => {
    describe("405 errors", () => {
      it("should return a 405 status if method not allowed ", () => {
        const invalidMethods = ["delete", "post"];
        const requests = invalidMethods.map((method) => {
          return request(app)
            [method]("/api/users")
            .expect(405)
            .then((res) => {
              expect(res.body.msg).toBe("invalid method");
            });
        });
        return Promise.all(requests);
      });
    });
  });
});
