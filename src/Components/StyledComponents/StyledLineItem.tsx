import styled from "styled-components";

export const StyledLineItem = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 30px 30px;
  & .lineTotal {
    text-align: right;
    padding-right: var(--med-padding);
  }
  & .shoppingLineButton {
    outline: none;
    border: none;
    font-size: inherit;
    font-weight: bold;
  }
  & .title {
    font-size: 22px;
  }
  & .secondary {
    color: var(--light-grey);
  }
`;
