import React, { Fragment } from "react";
import BasketSummary from "./BasketSummary";
import Logo from "./Logo";
import SiteNavigation from "./SiteNavigation";
import styled from "styled-components";
import ShoppingList from "./ShoppingList";

export default function HeaderBar() {
  return (
    <Fragment>
      <StyledBackground></StyledBackground>
      <StyledHeaderBar>
        <Logo />
        <BasketSummary />
        <ShoppingList />
      </StyledHeaderBar>
      <SiteNavigation />
    </Fragment>
  );
}

const StyledHeaderBar = styled.nav`
  padding: 20px 0px;
  display: flex;
  justify-content: space-between;
  grid-row: 1;
  align-items: center;
  position: relative;
`;

// bump specificity of header to override page grid
const StyledBackground = styled.div`
  && {
    background-color: var(--brand-primary-400);
    grid-row: 1;
    grid-column: 1 / -1;
  }
`;
