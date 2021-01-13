import { useEffect, useState } from "react";
import styled from "styled-components";
import { BasketItem, Offer, useProductState } from "../State/ProductContext";
import { useUIState } from "../State/UIContext";
import applyOffers from "../util/applyOffers";
import formatMoney from "../util/formatMoney";
import sumItems from "../util/sumItems";
import { ShoppingListLineItem } from "./ShoppingListLineItem";
import { StyledLineItem } from "./StyledComponents/StyledLineItem";

export default function ShoppingList() {
  const { allBasket, allOffers, allProducts } = useProductState();
  const { setMenuHidden, menuExposed } = useUIState();
  // TODO, type dispatch
  const [validOffers, setValidOffers]: [Array<Offer>, any] = useState([]);
  // console.log("validOffers", validOffers);
  useEffect(() => {
    if (allOffers.length > 0 && allBasket.length > 0) {
      const validOffers = applyOffers([...allBasket], [...allOffers]);
      setValidOffers(validOffers);
    }
  }, [allOffers, allBasket]);
  const aggregatedProducts = allBasket.reduce((acc: any, val: BasketItem) => {
    return {
      ...acc,
      [val.productID]: {
        ...val,
        quantity: (acc[val.productID]?.quantity ?? 0) + 1,
      },
    };
  }, {});
  const getProductById = (id: number) => {
    return allProducts.find((v) => v.productID === id);
  };
  const specialsProducts = validOffers.map((val) => {
    // return : conditional product, target product, additional item, discount
    const conditionalProduct = getProductById(val.conditionalProducts[0]);
    const targetProduct = getProductById(val.addedProducts[0]);
    return { ...val, conditionalProduct, targetProduct };
  });
  const totalDiscount = specialsProducts.reduce(
    (acc, val) => acc + val.discountApplied,
    0
  );
  // only 1 offer can be applied to an item
  const subTotal = sumItems(allBasket);
  return (
    <StyledShoppingList
      style={{ visibility: menuExposed ? "visible" : "hidden" }}
    >
      <CloseButton onClick={setMenuHidden}>
        <img
          src="images/close-icon.svg"
          style={{ width: "30px", height: "30px" }}
          alt="close"
        />
      </CloseButton>
      <h3>Shopping List</h3>
      {Object.keys(aggregatedProducts).map((key: string) => (
        <ShoppingListLineItem key={key} itemDetails={aggregatedProducts[key]} />
      ))}
      <br />
      <StyledLineItem>
        <span className="title secondary">Subtotal</span>
        <span className="title secondary lineTotal">
          {subTotal > 0 && formatMoney(subTotal)}
        </span>
      </StyledLineItem>
      <hr />
      <h3>Specials</h3>
      {specialsProducts.map((val) => {
        return <ShoppingListSpecial key={val.specialID} specialDetails={val} />;
      })}
      <br />
      <StyledLineItem>
        <span className="title secondary">Discounts</span>
        <span className="title secondary lineTotal">
          {totalDiscount > 0 && formatMoney(totalDiscount)}
        </span>
      </StyledLineItem>
      <hr />
      <br />
      <StyledLineItem>
        <span className="title ">Total</span>
        <span className="title lineTotal">
          {totalDiscount > 0 && formatMoney(subTotal - totalDiscount)}
        </span>
      </StyledLineItem>
      <br />
      <CheckoutButton>
        Checkout
        <img
          src="images/right-arrow.svg"
          style={{ width: "30px", height: "30px" }}
          alt="checkout"
        />
      </CheckoutButton>
    </StyledShoppingList>
  );
}

const StyledShoppingList = styled.div`
  grid-row: 2;
  position: absolute;
  right: 0;
  top: 100%;
  z-index: 20;
  background-color: var(--opaque-white);
  padding: var(--large-padding);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  position: absolute;
  right: var(--med-padding);
  & :hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const CheckoutButton = styled(CloseButton)`
  display: flex;
  position: relative;
  align-self: center;
  font-size: inherit;
  font-weight: 600;
  align-items: center;
  text-transform: uppercase;
  gap: var(--med-padding);
`;

function ShoppingListSpecial({ specialDetails }: { specialDetails: any }) {
  const { specialTitle, discountApplied, conditionalProduct } = specialDetails;

  return (
    <StyledSpecial>
      <span className="productName">{`${
        conditionalProduct ? conditionalProduct.productName : ""
      } - ${specialTitle}`}</span>
      <span className="lineTotal">{`-${formatMoney(discountApplied)}`}</span>
    </StyledSpecial>
  );
}

const StyledSpecial = styled(StyledLineItem)``;
