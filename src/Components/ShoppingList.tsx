import styled from "styled-components";
import { BasketItem, useProductState } from "../State/ProductContext";
import applyOffers from "../util/applyOffers";
import formatMoney from "../util/formatMoney";
import sumItems from "../util/sumItems";

export default function ShoppingList() {
  const { allBasket, allOffers } = useProductState();
  const aggregatedProducts = allBasket.reduce((acc: any, val: BasketItem) => {
    return {
      ...acc,
      [val.productID]: {
        ...val,
        quantity: (acc[val.productID]?.quantity ?? 0) + 1,
      },
    };
  }, {});
  // only 1 offer can be applied to an item
  const offersApplied = applyOffers(allBasket, allOffers);
  const subTotal = sumItems(allBasket);
  return (
    <StyledShoppingList>
      <h3>Shopping List</h3>
      {Object.keys(aggregatedProducts).map((key: string) => (
        <ShoppingListLineItem key={key} itemDetails={aggregatedProducts[key]} />
      ))}
      <br />
      <StyledLineItem>
        <span className="title secondary">Subtotal</span>
        <span className="title secondary lineTotal">
          {formatMoney(subTotal)}
        </span>
      </StyledLineItem>
      <hr />
      <h3>Discounts</h3>
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
`;

function ShoppingListLineItem({ itemDetails }: { itemDetails: BasketItem }) {
  const { addProduct, removeProduct } = useProductState();
  const handleIncrement = () => addProduct(itemDetails.productID);
  const handleDecrement = () => removeProduct(itemDetails.productID);
  return (
    <StyledLineItem>
      <span className="productName">{`${itemDetails.productName} x ${itemDetails.quantity}`}</span>
      <span className="lineTotal">{`${formatMoney(
        itemDetails.unitPrice * itemDetails.quantity
      )}`}</span>
      <button className="shoppingLineButton" onClick={handleIncrement}>
        +
      </button>
      <button className="shoppingLineButton" onClick={handleDecrement}>
        -
      </button>
    </StyledLineItem>
  );
}

const StyledLineItem = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 30px 30px;
  & .lineTotal {
    text-align: right;
    padding-right: var(--med-padding);
  }
  & .shoppingLineButton {
    outline: none;
    border: none;
    font-size: inherit;
    font-weight: bold;
  }
  & .title {
    font-size: 22px;
  }
  & .secondary {
    color: var(--light-grey);
  }
`;
