import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup, screen } from "@testing-library/react";
import App from "./App";

afterEach(cleanup);
test("Renders main page", () => {
  render(
    <div>
      <App />
    </div>
  );
  const headerText = screen.getAllByText(/good groceries/i);
  expect(headerText[0]).toBeInTheDocument();
  const nav = screen.getAllByText(/Home \/ Products/i);
  expect(nav[0]).toBeInTheDocument();
});
