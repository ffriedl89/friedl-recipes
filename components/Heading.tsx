import { ReactNode } from "react";
import styled, { css } from "styled-components";

interface HeadingProps {
  semantic: 1 | 2 | 3 | 4 | 5;
  visual: 1 | 2 | 3 | 4 | 5;
  children?: ReactNode;
  align?: "left" | "center" | "right";
}

//#region styled components
const StyledHeading = styled.h1<Pick<HeadingProps, "visual" | "align">>`
  font-family: "Dancing Script", cursive;
  font-size: ${({ visual }) => Math.pow(1.25, 6 - visual)}rem;
  text-align: ${({ align }) => align};
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-column-gap: 1rem;
  padding: 0;
  ${({ align }) =>
    align === "left"
      ? css`
          grid-template-columns: auto 1fr;
          grid-template-areas: "heading x";
        `
      : align === "center"
      ? css`
          grid-template-columns: 1fr auto 1fr;
          grid-template-areas: "x heading y";
        `
      : css`grid-template-columns: 1fr auto; auto
      grid-template-areas: "x x heading";`
    }
`;

const StyledHeadingAccent = styled.div`
  border-bottom: 1px dashed #cdcdcd;
`;

const StyledHeadingText = styled.div`
  grid-area: heading;
  grid-row: span 2;
`;
//#endregion

export const Heading = ({
  semantic,
  visual,
  children,
  align = "left",
}: HeadingProps) => {
  const HTag = `h${semantic}` as "h1";

  return (
    <StyledHeading as={HTag} visual={visual} align={align}>
      {align !== "left" ? <StyledHeadingAccent /> : null}
      <StyledHeadingText>{children}</StyledHeadingText>
      <StyledHeadingAccent />
    </StyledHeading>
  );
};
