import { BasketItem, useProductState } from "../State/ProductContext";
import formatMoney from "../util/formatMoney";
import { StyledLineItem } from "./StyledComponents/StyledLineItem";

export function ShoppingListLineItem({
  itemDetails,
}: {
  itemDetails: BasketItem;
}) {
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
