import { Sellable } from "../State/ProductContext";
import formatMoney from "./formatMoney";
import sumItems from "./sumItems";

test("item values are summed correctly", () => {
  const basket = [
    { quantity: 3, unitPrice: 123 },
    { quantity: 1, unitPrice: 90 },
  ];
  const discounts = [
    { quantity: 2, unitPrice: -50 },
    { quantity: 1, unitPrice: -90 },
  ];
  expect(sumItems(basket)).toBe(459);
  expect(sumItems([...basket, ...discounts])).toBe(269);
});
