import { useSelector } from "react-redux";
import { setErrorMessage } from "../../state/error/errorSlice";
import { useAppDispatch } from "../../state/hooks";
import RecipeCard from "../RecipeCard";
import ErrorMessage from "../shared/ErrorMessage";
import { useEffect, useState } from "react";
import { getErrorMessage } from "../../state/error/errorSelectors";
import { MainContainer, CardContainer } from "../../styles/sharedStyles";
import styled from "styled-components";

export interface Recipe {
  idMeal?: string;
  strMeal?: string;
  strCategory?: string;
  strArea?: string;
  strMealThumb?: string;
}

const StyledMain = styled(MainContainer)``;

const AllCards = styled(CardContainer)``;

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

const Main: React.FC = () => {
  const [homepageRecipes, setHomepageRecipes] = useState<Recipe[]>([]);
  const [loadMore, setLoadMore] = useState(false);
  const { errorMessage } = useSelector(getErrorMessage);
  const dispatch = useAppDispatch();

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
        dispatch(setErrorMessage(null));
      })
      .catch((err) => dispatch(setErrorMessage(err.message)));
  }, []);

  const allRecipes = homepageRecipes.map((recipe) => (
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
    <StyledMain>
      <AllCards>
        {errorMessage ? (
          <ErrorMessage />
        ) : loadMore ? (
          allRecipes
        ) : (
          allRecipes.slice(0, 8)
        )}
      </AllCards>
      {!errorMessage && !loadMore && (
        <LoadMoreBtn onClick={() => setLoadMore(true)}>Load More</LoadMoreBtn>
      )}
    </StyledMain>
  );
};

export default Main;
