import Link from 'next/link';
import styled from 'styled-components';

const StyledNav = styled.nav`
grid-area: nav;
`

const StyledBackLink = styled.a`
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  font-size: 2.5rem;
  text-align:center;
  border: 1px dashed #cdcdcd;
  cursor: pointer;
  transition: transform ease-in-out 300ms;

  &:hover {
    transform: scale(1.2);
    
  }
`;

export const BackNav = () => {
  return <StyledNav>
    <Link href="/"><StyledBackLink>⤎</StyledBackLink></Link>
  </StyledNav>
}
