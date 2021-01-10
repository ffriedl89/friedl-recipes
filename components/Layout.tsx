import React, { ReactNode } from "react"
import styled from "styled-components";
import { Footer } from "./Footer";

interface LayoutProps {
  children?: ReactNode;
}

const StyledMain = styled.main`
  @media(min-width: 768px) {
    grid-template-columns: 0.2fr 3fr 0.2fr;
  }

  display: grid;
  grid-row-gap: 1rem;
  grid-template-areas:
    "header header header"
    "lspace nav rspace"
    "lspace main rspace";
  grid-template-columns: 0.1fr 3fr 0.1fr;
  grid-template-rows: auto auto 1fr;
`;

const StyledContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 60px;
  grid-row-gap: 1rem;
  height: 100vh;
`;

export const Layout = ({ children }: LayoutProps) => {
  return <StyledContainer>
  <StyledMain>
    {children}
    
  </StyledMain>
  <Footer />
  </StyledContainer>
}
