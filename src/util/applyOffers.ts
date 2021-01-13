import { BasketItem, Offer } from "../State/ProductContext";

export default function applyOffers(
  basket: Array<BasketItem>,
  offers: Array<Offer>,
  validOffers: Array<Offer> = []
): Array<Offer> {
  if (offers.length < 1) {
    return validOffers;
  } else {
    let currentOffer = offers.pop();
    if (currentOffer) {
      let offerApplications = checkOfferValidity(basket, currentOffer);
      let offersToBeApplied = new Array(offerApplications).fill({
        ...currentOffer,
      });
      return applyOffers(basket, offers, [
        ...validOffers,
        ...offersToBeApplied,
      ]);
    }
  }
  return [];
}

function checkOfferValidity(
  basket: Array<BasketItem>,
  offer: Offer,
  validOffers: number = 0
): number {
  let indexPositions = [];
  for (let dependency of offer.conditionalProducts) {
    let foundIndex = basket.findIndex((b) => {
      return b.productID === dependency;
    });
    if (foundIndex < 0) {
      return validOffers;
    } else {
      indexPositions.push(foundIndex);
    }
  }
  for (let idx of indexPositions) {
    basket.splice(idx, 1);
  }
  return checkOfferValidity(basket, offer, validOffers + 1);
}
