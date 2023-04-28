import RecipeCard from "../RecipeCard";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface Recipe {
  idMeal?: string;
  strMeal?: string;
  strCategory?: string;
  strArea?: string;
  strMealThumb?: string;
}

const StyledMain = styled.main`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.9em;
  margin: 3.125em 0;
  max-width: var(--width-max);
  width: 95%;
`;

const AllCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.9em;
  width: 100%;
`;

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

  @media ${({ theme }) => theme.mQueries.primaryQ} {
    margin-top: 0.3em;
  }
`;

const ErrorMessage = styled.div`
  margin: 3em 0;
`;

const Main: React.FC = () => {
  const [homepageRecipes, setHomepageRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=f", {
      method: "GET",
      mode: "cors",
    })
      .then((res) => {
        if (!res.ok) {
          setLoadMore(false);
          throw Error(
            res.status + ": Could not fetch the data for that resource"
          );
        }
        return res.json();
      })
      .then((data) => {
        setHomepageRecipes(data.meals);
        setError(null);
      })
      .catch((err) => setError(err.message));
  }, []);

  const allRecipes = homepageRecipes.map((recipe) => (
    <RecipeCard
      key={recipe.idMeal}
      name={recipe.strMeal}
      category={recipe.strCategory}
      area={recipe.strArea}
      img={recipe.strMealThumb}
    />
  ));

  return (
    <StyledMain>
      <AllCards>
        {error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : loadMore ? (
          allRecipes
        ) : (
          allRecipes.slice(0, 8)
        )}
      </AllCards>
      {!error && !loadMore && (
        <LoadMoreBtn onClick={() => setLoadMore(true)}>Load More</LoadMoreBtn>
      )}
    </StyledMain>
  );
};

export default Main;
