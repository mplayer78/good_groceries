import { Fragment, ReactNode } from "react";
import styled from "styled-components";
import HeaderBar from "./HeaderBar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <StyledPage>
      <HeaderBar />
      <Fragment>{children}</Fragment>
    </StyledPage>
  );
}

const StyledPage = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: minmax(var(--med-padding), 1fr) minmax(0px, 960px) minmax(
      var(--med-padding),
      1fr
    );
  grid-template-rows: var(--header-height) fit-content(500px) 1fr;
  & > * {
    grid-column: 2 / 3;
  }
`;
