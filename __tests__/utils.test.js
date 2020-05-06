const {
  formatDates,
  makeRefObj,
  formatComments,
} = require("../db/utils/utils");
const { articleData } = require("../db/data/test-data/index");

describe("formatDates", () => {
  test("returns an array when passed one", () => {
    expect(formatDates([])).toEqual([]);
  });
  test("returns an array with formatted dates", () => {
    const date = formatDates(articleData);
    expect(date[0].created_at).toEqual(new Date(1542284514171));
  });
  test("checks that array has not mutated the original", () => {
    formatDates(articleData);
    expect(articleData).toEqual(articleData);
  });
  test("checks that the returned array is not the original", () => {
    const output = formatDates(articleData);
    expect(output[0]).not.toBe(articleData[0]);
  });
});

describe("makeRefObj", () => {
  test("returns an object when passed an array", () => {
    expect(makeRefObj([{}])).toEqual({});
  });
  test("returns a destructured object when keys and values are entered", () => {
    expect(
      makeRefObj([{ title: "nonesense", article_id: 1 }], "article_id", "title")
    ).toEqual({ 1: "nonesense" });
  });
  test("works for an array of objects", () => {
    const input = [
      { title: "lorem100", article_id: 1 },
      { title: "lorem80", article_id: 2 },
      { title: "lorem60", article_id: 3 },
      { title: "lorem40", article_id: 4 },
    ];
    const output = { 1: "lorem100", 2: "lorem80", 3: "lorem60", 4: "lorem40" };
    expect(makeRefObj(input)).toEqual(output);
  });
  test("return object does not share the same mem ref as original", () => {
    const input = [
      { title: "lorem100", article_id: 1 },
      { title: "lorem80", article_id: 2 },
      { title: "lorem60", article_id: 3 },
      { title: "lorem40", article_id: 4 },
    ];
    const result = makeRefObj(input);
    expect(result).not.toBe(input);
  });
  test("check does not mutate original array", () => {
    const input = [
      { title: "lorem100", article_id: 1 },
      { title: "lorem80", article_id: 2 },
      { title: "lorem60", article_id: 3 },
      { title: "lorem40", article_id: 4 },
    ];
    const control = [
      { title: "lorem100", article_id: 1 },
      { title: "lorem80", article_id: 2 },
      { title: "lorem60", article_id: 3 },
      { title: "lorem40", article_id: 4 },
    ];
    makeRefObj(input);
    expect(input).toEqual(control);
  });
});

describe("formatComments", () => {
  test("returns an array", () => {
    expect(formatComments([])).toEqual([]);
  });
  test("updateds values when passed a key, value and refObj ", () => {
    const input = [
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        belongs_to: "Living in the shadow of a great man",
        author: "butter_bridge",
        comment_votes: 14,
        created_at: new Date(1479818163389),
      },
    ];
    const refObj = { "Living in the shadow of a great man": 1 };
    const result = [
      {
        author: "butter_bridge",
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        comment_votes: 14,
        // article_id: 1,
        created_at: new Date(1479818163389),
      },
    ];
    expect(formatComments(input, refObj)).toEqual(result);
  });
  test("does not mutate the original array ", () => {
    const input = [
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        belongs_to: "Living in the shadow of a great man",
        author: "butter_bridge",
        comment_votes: 14,
        created_at: new Date(1479818163389),
      },
    ];
    const refObj = { "Living in the shadow of a great man": 1 };
    formatComments(input, refObj);
    expect(input).toEqual(input);
  });
  test("array returned does not have the same memory ref as original ", () => {
    const input = [
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        belongs_to: "Living in the shadow of a great man",
        author: "butter_bridge",
        comment_votes: 14,
        created_at: new Date(1479818163389),
      },
    ];

    const refObj = { "Living in the shadow of a great man": 1 };
    const output = formatComments(input, refObj);
    expect(input).not.toBe(output);
  });
});
