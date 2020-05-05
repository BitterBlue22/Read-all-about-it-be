process.ENV.Node_ENV = "test";

const request = require("supertest");
const app = request("../app.js");
const connection = require("../db/connection");

beforeEach(() => connection.seed.run());
afterAll(() => {
  return connection.destroy();
});

describe("/api", () => {
  describe("/topics", () => {});
});
