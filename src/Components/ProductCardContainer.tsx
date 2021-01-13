import { Product, useProductState } from "../State/ProductContext";
import styled from "styled-components";
import formatMoney from "../util/formatMoney";

export default function ProductCardContainer() {
  const { allProducts } = useProductState();
  return (
    <StyledCardContainer>
      {allProducts.map((val: Product) => (
        <ProductCard key={val.productID} productInfo={val} />
      ))}
    </StyledCardContainer>
  );
}

const StyledCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 40px;
  padding: 40px 0px;
`;

function ProductCard({ productInfo }: { productInfo: Product }) {
  const { addProduct } = useProductState();

  const {
    productID,
    productName,
    productUnitPrice,
    productImgUrl,
  } = productInfo;

  const handleAddButton = () => {
    addProduct(productID);
  };

  return (
    <StyledProductCard onClick={handleAddButton}>
      <StyledProductCardHeader>
        <span style={{ textTransform: "capitalize" }}>{productName}</span>
        <span></span>
      </StyledProductCardHeader>
      <StyledImageContainer>
        <StyledImage src={productImgUrl} alt={productName} />
      </StyledImageContainer>
      <StyledProductCardFooter>
        <p>{formatMoney(productUnitPrice)}</p>
        <StyledAddButton>add...</StyledAddButton>
      </StyledProductCardFooter>
    </StyledProductCard>
  );
}

const StyledProductCard = styled.div`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  overflow: hidden;
`;

const StyledProductCardBanner = styled.div`
  margin: 0;
  padding: 16px 32px;
  & > p {
    margin: 0;
  }
  display: flex;
  justify-content: space-between;
`;

const StyledProductCardHeader = styled(StyledProductCardBanner)`
  background-color: #ffdc16;
`;

const StyledProductCardFooter = styled(StyledProductCardBanner)`
  background-color: white;
`;

const StyledImage = styled.img`
  object-fit: cover;
  object-position: 100% 10%;
  width: 100%;
  height: 100%;
`;

const StyledImageContainer = styled.div`
  overflow: hidden;
  max-height: 150px;
`;

const StyledAddButton = styled.button`
  outline: none;
  border: none;
  font-size: inherit;
  font-family: inherit;
  background-color: inherit;
`;
