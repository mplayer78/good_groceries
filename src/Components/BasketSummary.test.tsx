/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup, screen } from "@testing-library/react";
import BasketSummary from "./BasketSummary";

afterEach(cleanup);
test("Renders main page", () => {
  render(
    <div>
      <BasketSummary />
    </div>
  );
  const basketIcon = screen.getByAltText(/shopping basket/i);
  expect(basketIcon).toBeInTheDocument();
  const basketSummaryTotal = screen.queryByTestId("basketSummaryTotal");
  expect(basketSummaryTotal).toBeNull();
  const basketSummaryQuantity = screen.queryByTestId("basketSummaryQuantity");
  expect(basketSummaryQuantity).toBeNull();
});
