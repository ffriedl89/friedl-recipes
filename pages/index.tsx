import {
  AllRecipeTitlesDocument,
  RecipeListItemFragment,
  useAllRecipeTitlesQuery,
} from "../queries/Recipe.graphql";
import { initializeApollo } from "../lib/apollo";
import Link from "next/link";
import { Layout } from "../components/Layout";
import React from "react";
import { Hero } from "../components/Hero";
import styled from "styled-components";

const StyledContainer = styled.div`
  grid-area: main;
`;

const Index = () => {
  const { recipes } = useAllRecipeTitlesQuery().data!;

  const characterGroups = recipes.reduce<{ [key: string]: Set<RecipeListItemFragment> }>((characterGroups, recipe) => {
    const char = recipe.title.charAt(0);
    if (!characterGroups[char]) {
      characterGroups[char] = new Set();
    }
    characterGroups[char].add(recipe);
    return characterGroups;
  }, {});

  return (
    <Layout>
      <Hero />
      <StyledContainer>
        <p>This is a list of all recipes so far.</p>
        <ul>
          {Object.keys(characterGroups).map((char) => <li><em>{char}</em>
            <ul>
              {Array.from(characterGroups[char]).map((recipe) => <li><Link href={`/rezepte/${recipe.slug}`}><a>{recipe.title}</a></Link></li>)}
            </ul>
          </li>)}
        </ul>
      </StyledContainer>
    </Layout>
  );
};

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: AllRecipeTitlesDocument,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

export default Index;
