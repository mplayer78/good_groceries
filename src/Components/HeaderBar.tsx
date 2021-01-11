import React from "react";
import BasketSummary from "./BasketSummary";
import Logo from "./Logo";
import SiteNavigation from "./SiteNavigation";

export default function HeaderBar() {
  return (
    <div>
      <Logo />
      <BasketSummary />
      <SiteNavigation />
    </div>
  );
}
