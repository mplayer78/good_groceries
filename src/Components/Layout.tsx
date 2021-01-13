import { Fragment, ReactNode, useEffect, useState } from "react";
import styled from "styled-components";
import { useProductState } from "../State/ProductContext";
import HeaderBar from "./HeaderBar";

export default function Layout({ children }: { children: ReactNode }) {
  const { hydrateProducts, hydrateOffers } = useProductState();
  const [products, setProducts] = useState([]);
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    async function getProducts() {
      fetch("data.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((apiResponse) => apiResponse.json())
        .then((productData) => setProducts(productData));
    }
    getProducts();
  }, []);

  useEffect(() => {
    async function getOffers() {
      fetch("specials.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((apiResponse) => apiResponse.json())
        .then((offerData) => setOffers(offerData));
    }
    getOffers();
  }, []);

  // Hydrate context object after fetching data to local state to ensure proper
  // order of re-renders

  useEffect(() => {
    hydrateOffers(offers);
    hydrateProducts(products);
  }, [products, offers, hydrateProducts, hydrateOffers]);

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
