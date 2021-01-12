import { Sellable } from "../State/ProductContext";

export default function sumItems(items: Array<Sellable>) {
  return items.reduce((acc, val) => acc + val.unitPrice * val.quantity, 0);
}
