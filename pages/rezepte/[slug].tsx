import { GetStaticProps, GetStaticPaths } from "next";
import { initializeApollo } from "../../lib/apollo";
import {
  AllRecipeSlugsDocument,
  AllRecipeSlugsQuery,
  RecipeBySlugDocument,
  useRecipeBySlugQuery,
} from "../../queries/Recipe.graphql";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import { Heading } from "../../components/Heading";
import { Ingredient } from '../../components/Ingredient';
import React from "react";
import { BackNav } from "../../components/BackNav";
import { Layout } from "../../components/Layout";
import { HeaderBar } from "../../components/HeaderBar";

//#region styled components
const StyledInstructions = styled.div`
  & > * {
    font-family: 'EB Garamond', serif;
    margin-top: 0;
    margin-bottom: 0;
  }

  & > * + * {
    margin-top: 1.25rem;
  }

  p {
    columns: 60ch 2;
    line-height: 1.25;
  }

  ol {
    padding-left: 1.25rem;
  }
`;

const StyledRecipe = styled.article`
  grid-area: main;
  margin: 0 auto;
  max-width: 80ch;

  & > * {
    margin-top: 0;
    margin-bottom: 0;
  }

  & > * + * {
    margin-top: 2.5rem;
  }
`; 

//#endregion

const Recipe = ({ slug }: { slug: string }) => {
  const { recipe } = useRecipeBySlugQuery({ variables: { slug } }).data!;
  return (
    <Layout>
      <HeaderBar />
      <BackNav />
      <StyledRecipe>
        <Heading visual={1} semantic={1} align="center">{recipe?.title}</Heading>
        <Heading visual={2} semantic={2} align="center">Zutaten</Heading>
        <ul>
          {recipe?.ingredients.map((ingredient, index) => (
            <Ingredient key={index} {...ingredient}/>
          ))}
        </ul>
        { recipe?.subTasks?.length ? recipe?.subTasks!.map((subtask) => <div>
          <Heading visual={3} semantic={3} align="center">{subtask.name}</Heading>
          <ul>
            {subtask?.ingredients.map((ingredient, index) => (
              <Ingredient key={index} {...ingredient}/>
            ))}
          </ul>
        </div>) : null}
        <Heading visual={2} semantic={2} align="center">Anleitung</Heading>
        <StyledInstructions>
          <ReactMarkdown>{recipe?.instructions!}</ReactMarkdown>
        </StyledInstructions>
      </StyledRecipe>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo();

  const result = await apolloClient.query<AllRecipeSlugsQuery>({
    query: AllRecipeSlugsDocument,
  });

  return {
    paths: result.data.recipes.map((recipe) => `/rezepte/${recipe.slug}`),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const apolloClient = initializeApollo();
  const slug = ctx.params!["slug"];
  await apolloClient.query({
    query: RecipeBySlugDocument,
    variables: {
      slug,
    },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      slug,
    },
  };
};

export default Recipe;
