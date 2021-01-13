import React, { useReducer } from "react";
import { useContext } from "react";

const defaultState: UIStateType = {
  menuExposed: false,
};

type UIStateType = {
  menuExposed: boolean;
};

type ActionTypes = { type: "EXPOSE_MENU" } | { type: "HIDE_MENU" };

interface ContextProps {
  state: UIStateType;
  dispatch: React.Dispatch<ActionTypes>;
}

// const UIContext = React.createContext<[UIStateType, React.Dispatch<ActionTypes>]|null>(null)
const UIContext = React.createContext<ContextProps>({
  state: defaultState,
  dispatch: () => {},
});

function UIReducer(state: UIStateType, action: ActionTypes) {
  switch (action.type) {
    case "EXPOSE_MENU":
      return { ...state, menuExposed: true };
    case "HIDE_MENU":
      return { ...state, menuExposed: false };
    default:
      return state;
  }
}

function UIStateProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(UIReducer, defaultState);
  return (
    <UIContext.Provider value={{ state, dispatch }}>
      {children}
    </UIContext.Provider>
  );
}
export { UIStateProvider };

export function useUIState() {
  /**
   * Returns an object with the individual actions in 1st position, state & dispatch in the 2nd & third
   */
  const ctx = useContext(UIContext);
  return {
    setMenuExposed: () => ctx.dispatch({ type: "EXPOSE_MENU" }),
    setMenuHidden: () => ctx.dispatch({ type: "HIDE_MENU" }),
    menuExposed: ctx.state.menuExposed,
  };
}
