import formatMoney from "./formatMoney";

test("money strings are formatted properly", () => {
  expect(formatMoney(1)).toBe("1p");
  expect(formatMoney(99)).toBe("99p");
  expect(formatMoney(123)).toBe("£1.23");
});
