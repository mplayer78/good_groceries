import React, { useReducer } from "react";
import { useContext } from "react";

const defaultState: ProductStateType = {
  basket: [],
};

type ProductStateType = {
  basket: Array<BasketItem>;
};

// basket items will be stored as individual items then collated in basket calcs
type BasketItem = {
  productID: number;
  productName: string;
  basketProductId: number;
  unitPrice: number;
};

type ActionTypes =
  | { type: "ADD_PRODUCT"; productID: number }
  | { type: "REMOVE_PRODUCT"; basketProductID: number };

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
    case "ADD_PRODUCT":
      return {
        ...state,
        // TODO handle product update
      };
    case "REMOVE_PRODUCT":
      return {
        ...state,
        // TODO handle product update
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

export function useUIState() {
  /**
   * Returns an object with the individual actions in 1st position, state & dispatch in the 2nd & third
   */
  const ctx = useContext(ProductContext);
  return {
    addProduct: (productID: number) =>
      ctx.dispatch({ type: "ADD_PRODUCT", productID }),
    removeProduct: (basketProductID: number) =>
      ctx.dispatch({ type: "REMOVE_PRODUCT", basketProductID }),
    ...ctx,
  };
}
