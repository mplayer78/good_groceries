import styled from "styled-components";
import { useProductState } from "../State/ProductContext";
import { useUIState } from "../State/UIContext";
import formatMoney from "../util/formatMoney";
import sumItems from "../util/sumItems";

export default function BasketSummary() {
  const { allBasket } = useProductState();
  const { setMenuExposed } = useUIState();
  const basketTotal = sumItems(allBasket);
  const basketQuantity = allBasket.length;
  return (
    <StyledBasketSummary>
      {basketTotal > 0 && (
        <p data-testid="basketSummaryTotal">{formatMoney(basketTotal)}</p>
      )}
      <StyledImageContainer onClick={setMenuExposed}>
        <img src="/images/shopping-basket.svg" alt="shopping basket" />
      </StyledImageContainer>
      {basketTotal > 0 && (
        <StyledQuantityBackground data-testid="basketSummaryQuantity">
          {basketQuantity}
        </StyledQuantityBackground>
      )}
    </StyledBasketSummary>
  );
}

const StyledQuantityBackground = styled.div`
  width: 24px;
  height: 24px;
  font-size: 16px;
  font-family: var(--brand-font);
  border-radius: 50%;
  background: red;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: var(--med-padding);
  right: var(--med-padding);
`;

const StyledBasketSummary = styled.div`
  display: flex;
  gap: var(--med-padding);
  overflow: hidden;
`;

const StyledImageContainer = styled.div`
  width: 40px;
`;
