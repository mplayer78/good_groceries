import styled from "styled-components";

export default function Hero() {
  return (
    <StyledHero>
      <StyledHeroText>
        <h1>good groceries</h1>
        <p>Fresh produce, locally supplied, direct to your door</p>
      </StyledHeroText>
    </StyledHero>
  );
}

const StyledHero = styled.div`
  grid-column: 1 / -1;
  max-height: 400px;
  overflow: hidden;
  position: relative;
  background-image: linear-gradient(#333333cc, #33333333),
    url("/images/supermarket.jpeg");
  padding: min(150px, 15vw); min(100px, 10vw);
`;

const StyledHeroText = styled.div`
  z-index: 10;
  /* position: absolute; */
  /* top: 100;
  left: 100; */
  color: white;
  & > h1 {
    font-family: var(--brand-font);
  }
`;
