process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app.js");
const connection = require("../db/connection.js");

beforeEach(() => connection.seed.run());
afterAll(() => connection.destroy());

describe("/api", () => {
  test("should return 200 with msg that the api is responding", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((res) => {
        expect(res.body.msg).toEqual("responding");
      });
  });
  test("should return 404 if given an invalid sub-path ", () => {
    return request(app)
      .get("/api/notapath")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toEqual("path not found");
      });
  });
});

describe("/api/topics", () => {
  test("should return 404 if given an invalid sub-path ", () => {
    return request(app)
      .get("/api/misspelled")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toEqual("path not found");
      });
  });
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
    test("should return a 405 status if method not allowed ", () => {
      const invalidMethods = ["delete", "post", "patch"];
      const requests = invalidMethods.map((method) => {
        return request(app)
          [method]("/api/topics")
          .expect(405)
          .then((res) => {
            expect(res.body.msg).toBe("invalid method");
          });
      });
      return Promise.all(requests);
    });
  });
});

describe("/api/users", () => {
  describe("GET", () => {
    test("should return a 405 status if method not allowed ", () => {
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
    describe(":username", () => {
      test("should return a 200 status and the user by given username", () => {
        return request(app)
          .get("/api/users/butter_bridge")
          .expect(200)
          .then((res) => {
            expect(res.body).toEqual({
              user: {
                username: "butter_bridge",
                name: "jonny",
                avatar_url:
                  "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
              },
            });
          });
      });
      test("should return 404 if given an non-existent username", () => {
        return request(app)
          .get("/api/topics/notauser")
          .expect(404)
          .then((res) => {
            expect(res.body.msg).toEqual("path not found");
          });
      });
    });
  });
});

describe("/api/articles", () => {
  describe("GET", () => {
    test("should return an array of all articles", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then((result) => {
          result.body.articles.forEach((article) => {
            expect(article).toHaveProperty("article_id");
            expect(article).toHaveProperty("author");
            expect(article).toHaveProperty("topic");
            expect(article).toHaveProperty("title");
            expect(article).toHaveProperty("body");
            expect(article).toHaveProperty("created_at");
            expect(article).toHaveProperty("votes");
            expect(article).toHaveProperty("comment_count");
          });
        });
    });
    test("should return 404 for an invalid path", () => {
      return request(app)
        .get("/api/misspelled")
        .expect(404)
        .then((res) => {
          expect(res.body.msg).toEqual("path not found");
        });
    });
    describe("queries", () => {
      test("should default sort by date descending ", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then((result) => {
            expect(result.body.articles[0]).toEqual({
              article_id: 1,
              title: "Living in the shadow of a great man",
              body: "I find this existence challenging",
              votes: 100,
              topic: "mitch",
              author: "butter_bridge",
              created_at: "2018-11-15T12:21:54.171Z",
              comment_count: "13",
            });
            expect(result.body.articles[9]).toEqual({
              article_id: 10,
              title: "Seven inspirational thought leaders from Manchester UK",
              body: "Who are we kidding, there is only one, and it's Mitch!",
              votes: 0,
              topic: "mitch",
              author: "rogersop",
              created_at: "1982-11-24T12:21:54.171Z",
              comment_count: "0",
            });
          });
      });
      test("should be able to sort by chosen column in chosen order ", () => {
        return request(app)
          .get("/api/articles?sort_by=votes")
          .expect(200)
          .then((result) => {
            expect(result.body.articles[0]).toEqual({
              article_id: 1,
              title: "Living in the shadow of a great man",
              body: "I find this existence challenging",
              votes: 100,
              topic: "mitch",
              author: "butter_bridge",
              created_at: "2018-11-15T12:21:54.171Z",
              comment_count: "13",
            });
          });
      });
      test("should filter results by author", () => {
        return request(app)
          .get("/api/articles?author=icellusedkars")
          .expect(200)
          .then((result) => {
            result.body.articles.forEach((article) => {
              expect(article.author).toEqual("icellusedkars");
            });
          });
      });
      test("should return a 200 and empty array if author has no articles", () => {
        return request(app)
          .get("/api/articles?author=lurker")
          .expect(200)
          .then((result) => {
            result.body.articles.forEach((article) => {
              expect(article.body).toEqual({ articles: [] });
            });
          });
      });
      test("should filter results by topic", () => {
        return request(app)
          .get("/api/articles?topic=mitch")
          .expect(200)
          .then((result) => {
            result.body.articles.forEach((article) => {
              expect(article.topic).toEqual("mitch");
            });
          });
      });
      describe("pagination", () => {
        test("should limit the number of responses to 10 by default", () => {
          return request(app)
            .get("/api/articles")
            .expect(200)
            .then((result) => {
              expect(result.body.articles.length).toEqual(10);
            });
        });
        test("should limit the number of responses by query amount, defaulting to 10", () => {
          return request(app)
            .get("/api/articles?limit=5")
            .expect(200)
            .then((result) => {
              expect(result.body.articles.length).toEqual(5);
            });
        });
      });
      describe("errors", () => {
        test("should return a 400 status when given a non-existent column", () => {
          return request(app)
            .get("/api/articles?sort_by=not-a-column")
            .expect(400)
            .then((res) => {
              expect(res.body.msg).toEqual("bad request");
            });
        });
        test("should return a 404 status when given a non-existent topic", () => {
          return request(app)
            .get("/api/articles?topic=not-a-topic")
            .expect(404)
            .then((res) => {
              expect(res.body.msg).toEqual("topic not found");
            });
        });
        test("should return a 404 status when given a non-existent author", () => {
          return request(app)
            .get("/api/articles?author=not-an-author")
            .expect(404)
            .then((res) => {
              expect(res.body.msg).toEqual("user not found");
            });
        });
      });
    });
  });
  describe(":article_id", () => {
    test("should return a 200 status and the article by given id", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual({
            article: {
              article_id: 1,
              title: "Living in the shadow of a great man",
              body: "I find this existence challenging",
              votes: 100,
              topic: "mitch",
              author: "butter_bridge",
              created_at: "2018-11-15T12:21:54.171Z",
              comment_count: "13",
            },
          });
        });
    });
    describe("errors", () => {
      test("should return 404 if given a non-existent id", () => {
        return request(app)
          .get("/api/articles/9999")
          .expect(404)
          .then((res) => {
            expect(res.body.msg).toEqual("not found");
          });
      });
      test("should return 400 if given an invalid data type for id ", () => {
        return request(app)
          .get("/api/articles/notanint")
          .expect(400)
          .then((res) => {
            expect(res.body.msg).toEqual("bad request");
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
      test("should return status 200 and empty array if existing article has no comments", () => {
        return request(app)
          .get("/api/articles/2/comments")
          .expect(200)
          .then((res) => {
            expect(res.body).toEqual({ comments: [] });
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
  });
  describe("PATCH", () => {
    describe("/:article_id", () => {
      test("should update article with given information", () => {
        return request(app)
          .patch("/api/articles/1")
          .send({ body: "I'M CHANGING THIS TO SOMETHING NEW!" })
          .expect(201)
          .then((res) => {
            expect(res.body).toEqual({
              article: [
                {
                  article_id: 1,
                  title: "Living in the shadow of a great man",
                  body: "I'M CHANGING THIS TO SOMETHING NEW!",
                  votes: 100,
                  topic: "mitch",
                  author: "butter_bridge",
                  created_at: "2018-11-15T12:21:54.171Z",
                },
              ],
            });
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
              result.body.comment.forEach((comment) => {
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
      test("should return a 201 status and increase or decrease comment votes", () => {
        return request(app)
          .patch("/api/comments/1")
          .send({ inc_votes: 2 })
          .expect(201)
          .then((res) => {
            expect(res.body).toEqual({
              comment: {
                comment_id: 1,
                body:
                  "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
                article_id: 9,
                author: "butter_bridge",
                votes: 18,
                created_at: "2017-11-22T12:36:03.389Z",
              },
            });
          });
      });
    });
  });
  describe("DELETE", () => {
    describe(":comment_id", () => {
      test("should delete comment by id", async () => {
        return request(app).del("/api/comments/3").expect(204);
      });
      test("should return 400 if given an invalid data type for id ", () => {
        return request(app)
          .del("/api/comments/notanint")
          .expect(400)
          .then((res) => {
            expect(res.body.msg).toEqual("bad request");
          });
      });
    });
  });
});
