import { useEffect } from "react";
import { useProductState } from "../State/ProductContext";
import Hero from "./Hero";
import ProductCardContainer from "./ProductCardContainer";
import ShoppingList from "./ShoppingList";

export default function FrontPage() {
  const { hydrateProducts, hydrateOffers } = useProductState();

  useEffect(() => {
    async function getProducts() {
      const products = await fetch("data.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }).then((apiResponse) => apiResponse.json());
      hydrateProducts(products);
    }
    getProducts();
  }, [hydrateProducts]);

  useEffect(() => {
    async function getOffers() {
      const offers = await fetch("specials.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }).then((apiResponse) => apiResponse.json());
      hydrateOffers(offers);
    }
    getOffers();
  }, [hydrateOffers]);

  return (
    <>
      <Hero />
      <ProductCardContainer />
      <ShoppingList />
    </>
  );
}
