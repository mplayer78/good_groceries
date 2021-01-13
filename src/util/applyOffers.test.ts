import applyOffers from "./applyOffers";
import offers from "../../public/specials.json";

const mockBasket = [
  {
    productID: 3,
    productName: "cheese",
    basketProductID: "8237e9a8-886e-4903-8f54-7f15b42007ab",
    unitPrice: 90,
    quantity: 1,
  },
  {
    productID: 1,
    productName: "bread",
    basketProductID: "2e4ec0d0-356b-4888-82e4-4d7f0524c63a",
    unitPrice: 110,
    quantity: 1,
  },
  {
    productID: 1,
    productName: "bread",
    basketProductID: "efc2c032-10a2-4678-94fa-84de31b79c26",
    unitPrice: 110,
    quantity: 1,
  },
  {
    productID: 4,
    productName: "soup",
    basketProductID: "e4967b7f-e6da-445d-9eeb-ea87ba076741",
    unitPrice: 60,
    quantity: 1,
  },
  {
    productID: 5,
    productName: "butter",
    basketProductID: "9317b429-9b26-4753-8a95-1fbae8881c13",
    unitPrice: 120,
    quantity: 1,
  },
];

test("Calculates discount correctly", () => {
  const discountApplied = applyOffers(mockBasket, offers);
  expect(discountApplied).toHaveLength(3);
});
