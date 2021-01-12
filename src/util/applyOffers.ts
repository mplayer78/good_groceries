import { BasketItem, Offer } from "../State/ProductContext";

export default function applyOffers(
  basket: Array<BasketItem>,
  offers: Array<Offer>
) {
  let currentBasket = basket;
  let index = 0;
  while (index < offers.length) {
    const currentOffer = offers[index];
    console.log("currentOffer", currentOffer);
    let dep;
    for (dep of currentOffer.conditionalProducts) {
      console.log(dep);
    }
    index++;
  }
}
