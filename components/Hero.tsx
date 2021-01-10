import React from "react";
import styled from "styled-components";
import { Heading } from "./Heading";

const StyledHero = styled.header`
  background-color: #E0AFA0;
  grid-area: header;
  display: grid;
  place-items: center;
`;

export const Hero = () => {
  return <StyledHero>
    
    <Heading visual={1} semantic={1} align="center">
      Monika's Rezepte
    </Heading>
    <img width="200" height="200" src="salad.svg" />
  </StyledHero>
}