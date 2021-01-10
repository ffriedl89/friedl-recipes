import styled from 'styled-components';
import { Ingredient as IngredientType } from '../queries/Recipe.graphql';

const StyledIngredientLineItem = styled.li`
  display: grid;
  grid-column-gap: 0.25rem;
  grid-template-columns: 200px 50px 1fr;
  font-variant-numeric: tabular-nums;
  font-size: 1.25rem;
`;

const StyledNumber = styled.span`
  text-align: right;
`;

type IngredientProps = Partial<IngredientType>;

export const Ingredient = ({ measurement, unit, ingredientItem }: IngredientProps) => {
  return <StyledIngredientLineItem>
    <StyledNumber>{measurement}</StyledNumber>
    <span>{unit}</span>
    <span>{ingredientItem?.name}</span>
  </StyledIngredientLineItem>
  
}
