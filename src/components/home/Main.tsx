import RecipeCard from "./RecipeCard";
import ErrorMessage from "../shared/ErrorMessage";
import { useState } from "react";
import { MainContainer, CardContainer } from "../../styles/sharedStyles";
import styled from "styled-components";
import { devices } from "../../styles/theme";
import { FetchURL } from "../../types/RouteNames";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../shared/Spinner";

export interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strMealThumb: string;
}

const Main: React.FC = () => {
  const [loadMore, setLoadMore] = useState(false);

  const fetchRecipesByLetter = async (letter: string) => {
    const response = await axios.get(
      FetchURL.SEARCH_BY_FIRST_LETTER_ENDPOINT + letter
    );
    return response.data;
  };

  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: ["homepageRecipes"],
    queryFn: () => fetchRecipesByLetter("f"),
  });

  if (isLoading) return <Spinner />;

  const allRecipes = data?.meals.map((recipe: Recipe) => (
    <RecipeCard
      key={recipe.idMeal}
      cardData={{
        id: recipe.idMeal,
        name: recipe.strMeal,
        category: recipe.strCategory,
        area: recipe.strArea,
        img: recipe.strMealThumb,
      }}
    />
  ));

  return (
    <MainContainer>
      <CardContainer>
        {isError ? (
          <ErrorMessage>{(error as Error).message}</ErrorMessage>
        ) : loadMore ? (
          allRecipes
        ) : (
          allRecipes.slice(0, 8)
        )}
      </CardContainer>
      {isSuccess && !loadMore && (
        <LoadMoreBtn onClick={() => setLoadMore(true)}>Load More</LoadMoreBtn>
      )}
    </MainContainer>
  );
};

export default Main;

const LoadMoreBtn = styled.button`
  transition: opacity 0.3s;
  margin-top: 2em;
  border: none;
  border-radius: 0.625em;
  max-width: 95%;
  width: 25em;
  height: 3.25em;
  background-color: ${({ theme }) => theme.colors.accentGreen};
  cursor: pointer;
  font-size: 1.125em;
  font-family: var(--font-primary);
  font-weight: 500;
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    opacity: 0.85;
  }

  @media ${devices.tabletM} {
    margin-top: 0.3em;
  }
`;
