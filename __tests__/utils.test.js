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
