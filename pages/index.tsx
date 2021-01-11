import {
  AllRecipeTitlesDocument,
  RecipeListItemFragment,
  useAllRecipeTitlesQuery,
} from "../queries/Recipe.graphql";
import { Layout } from "../components/Layout";
import { Hero } from "../components/Hero";
import styled from "styled-components";
import Link from "next/link";
import { Heading } from "../components/Heading";
import Head from "next/head";
import { initializeApollo } from "../lib/apollo";

const StyledContainer = styled.div`
  grid-area: main;
`;

const StyledOrderedList = styled.ol`
  list-style: none;
  padding-left: 0;
`;

//background-color: rgba(224, 175, 160, 0.8);
const StyledCharItem = styled.li`
  em { display: block; position: sticky; font-size: 1.906rem; color: rgba(224, 175, 160, 1); top: 0; background-color: rgba(70, 63, 58, 0.8); padding: 0.25rem 0.75rem; }
  a {
    text-decoration: none;
  }
`;

const StyledRecipeItem = styled.li`
  padding: 0.25rem 0.25rem 0.25rem 2.25rem;
  a {
    color: #463F3A;
    font-size: 1.526rem;
  }
  a:hover {
    text-decoration: underline;
  }

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
    <>
    <Head>
      <title>Monikas Rezepte</title>
      <meta name="Description" content="Landingpage mit Übersicht der Rezepte" />
    </Head>
    <Layout>
      <Hero />
      <StyledContainer>
        <Heading semantic={2} visual={2}>Register der Rezepte</Heading>
        <StyledOrderedList>
          {Object.keys(characterGroups).map((char) => <StyledCharItem id={char} key={char}><a href={`#${char}`}><em>{char}</em></a>
            <StyledOrderedList>
              {Array.from(characterGroups[char]).map((recipe) => <StyledRecipeItem key={recipe.slug}><Link href={`/rezepte/${recipe.slug}`}><a>{recipe.title}</a></Link></StyledRecipeItem>)}
            </StyledOrderedList>
          </StyledCharItem>)}
        </StyledOrderedList>
      </StyledContainer>
    </Layout>
    </>
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
