import React from "react";
import styled from "styled-components";

export default function SiteNavigation() {
  return <StyledSiteMap>Home / Products</StyledSiteMap>;
}

const StyledSiteMap = styled.div`
  padding: var(--med-padding);
`;
