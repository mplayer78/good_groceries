/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ShoppingList from "./ShoppingList";
import { Providers } from "../Providers";

const setMenuHidden = jest.fn(() => {});

afterEach(cleanup);
test("Renders main page", () => {
  render(
    <div>
      <Providers>
        <ShoppingList />
      </Providers>
    </div>
  );
  // const closeButton = screen.getByAltText(/close/i);
  // userEvent.click(closeButton);
  const lineItems = screen.getByText(/Shopping List/i);
  expect(lineItems).toBeInTheDocument();
});
