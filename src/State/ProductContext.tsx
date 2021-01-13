import React, { useCallback, useReducer } from "react";
import { useContext } from "react";
import { uuidv4 } from "../util/uuidv4";

const defaultState: ProductStateType = {
  basket: [],
  products: [],
  offers: [],
};

type ProductStateType = {
  basket: Array<BasketItem>;
  products: Array<Product>;
  offers: Array<Offer>;
};

// basket items will be stored as individual items then collated in basket calcs
export type Product = {
  productID: number;
  productName: string;
  productUnitPrice: number;
  productImgUrl: string;
};

export interface Sellable {
  unitPrice: number;
  quantity: number;
}

export class BasketItem implements Sellable {
  public productID: number;
  productName: string;
  basketProductID: string;
  unitPrice: number;
  quantity: number;
  constructor(product: Product) {
    const { productID, productName, productUnitPrice } = product;
    this.productID = productID;
    this.productName = productName;
    this.basketProductID = uuidv4();
    this.unitPrice = productUnitPrice;
    this.quantity = 1;
  }
}

export type Offer = {
  specialID: number;
  specialTitle: string;
  conditionalProducts: Array<number>;
  addedProducts: Array<number>;
  discountApplied: number;
};

type ActionTypes =
  | { type: "ADD_PRODUCT_TO_BASKET"; productID: number }
  | { type: "REMOVE_PRODUCT_FROM_BASKET"; basketProductID: number }
  | { type: "HYDRATE_ALL_PRODUCTS"; products: Array<Product> }
  | { type: "HYDRATE_ALL_OFFERS"; offers: Array<Offer> };

interface ContextProps {
  state: ProductStateType;
  dispatch: React.Dispatch<ActionTypes>;
}

// const UIContext = React.createContext<[UIStateType, React.Dispatch<ActionTypes>]|null>(null)
const ProductContext = React.createContext<ContextProps>({
  state: defaultState,
  dispatch: () => {},
});

function UIReducer(state: ProductStateType, action: ActionTypes) {
  switch (action.type) {
    case "ADD_PRODUCT_TO_BASKET":
      try {
        // assumes unique ID number
        const found = state.products.find(
          (v) => v.productID === action.productID
        );
        if (!found) {
          throw new Error("Product not found");
        }
        const newBasketProduct = new BasketItem(found);
        return {
          ...state,
          basket: [...state.basket, newBasketProduct],
        };
      } catch (error) {
        // TODO Handle error properly.
        console.error(error);
      }
      return state;
    case "REMOVE_PRODUCT_FROM_BASKET":
      const idx = state.basket.findIndex(
        (v) => v.productID === action.basketProductID
      );
      // TODO, handle invalid productID
      return {
        ...state,
        basket: state.basket.filter((val, ind) => ind !== idx),
      };
    case "HYDRATE_ALL_PRODUCTS":
      return {
        ...state,
        products: action.products,
      };
    case "HYDRATE_ALL_OFFERS":
      return {
        ...state,
        offers: action.offers,
      };
    default:
      return state;
  }
}

function ProductStateProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(UIReducer, defaultState);
  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
}
export { ProductStateProvider };

export function useProductState() {
  /**
   * Returns an object with the individual actions in 1st position, state & dispatch in the 2nd & third
   */
  const { state, dispatch } = useContext(ProductContext);
  // wrapped in a callback to prevent continuous rerender if included as a dependency
  const hydrateProducts = useCallback(
    (products: Array<Product>) =>
      dispatch({ type: "HYDRATE_ALL_PRODUCTS", products }),
    [dispatch]
  );
  const hydrateOffers = useCallback(
    (offers: Array<Offer>) => dispatch({ type: "HYDRATE_ALL_OFFERS", offers }),
    [dispatch]
  );
  return {
    addProduct: (productID: number) =>
      dispatch({ type: "ADD_PRODUCT_TO_BASKET", productID }),
    removeProduct: (basketProductID: number) =>
      dispatch({ type: "REMOVE_PRODUCT_FROM_BASKET", basketProductID }),
    hydrateProducts,
    hydrateOffers,
    allProducts: state.products,
    allBasket: state.basket,
    allOffers: state.offers,
    state,
  };
}
