import {
  CardContainer,
  MainContainer,
  StyledPageHeading,
} from "../styles/sharedStyles";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../state/hooks";
import ErrorMessage, {
  handleFetchError,
} from "../components/shared/ErrorMessage";
import { getErrorMessage } from "../state/error/errorSelectors";
import { setErrorMessage } from "../state/error/errorSlice";
import { getSuggestions } from "../state/suggestions/suggestionsSelectors";
import {
  clearRecipes,
  saveCurrentDate,
  saveRecipe,
} from "../state/suggestions/suggestionsSlice";
import RecipeCard from "../components/home/RecipeCard";
import styled from "styled-components";

const DailySuggestions: React.FC = () => {
  const [suggestions, setSuggestions] = useState<JSX.Element[]>([]);
  const { errorMessage } = useSelector(getErrorMessage);
  const { savedDate, dailyRecipes } = useSelector(getSuggestions);
  const dispatch = useAppDispatch();

  const displayRecipes = () => {
    dailyRecipes.map((recipeID) => {
      fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeID}`,
        {
          method: "GET",
          mode: "cors",
        }
      )
        .then((res) => {
          handleFetchError(res);
          return res.json();
        })
        .then((data) => {
          setSuggestions((prev) => [
            ...prev,
            <RecipeCard
              key={data.meals[0].idMeal}
              cardData={{
                id: data.meals[0].idMeal,
                name: data.meals[0].strMeal,
                category: data.meals[0].strCategory,
                area: data.meals[0].strArea,
                img: data.meals[0].strMealThumb,
              }}
            />,
          ]);
        })
        .catch((err) => dispatch(setErrorMessage(err.message)));
    });
  };

  const fetchRecipes = () => {
    dispatch(clearRecipes());
    for (let i = 0; i < 3; i++) {
      fetch(`https://www.themealdb.com/api/json/v1/1/random.php`, {
        method: "GET",
        mode: "cors",
      })
        .then((res) => {
          handleFetchError(res);
          return res.json();
        })
        .then((data) => {
          dispatch(saveCurrentDate());
          dispatch(saveRecipe(data.meals[0].idMeal));
        })
        .catch((err) => dispatch(setErrorMessage(err.message)));
    }
  };

  useEffect(() => {
    if (savedDate !== new Date().toDateString()) {
      fetchRecipes();
    }
    displayRecipes();
  }, []);

  return (
    <SuggestionsContainer>
      <StyledHeading>Daily Suggestions</StyledHeading>
      <StyledParagraph>
        Not sure what recipe to choose today? Check out these three daily
        suggestions!
      </StyledParagraph>
      {errorMessage ? <ErrorMessage /> : <AllCards>{suggestions}</AllCards>}
    </SuggestionsContainer>
  );
};

export default DailySuggestions;

const SuggestionsContainer = styled(MainContainer)`
  flex-direction: column;
`;
const StyledHeading = styled(StyledPageHeading)``;

const StyledParagraph = styled.p`
  text-align: center;
`;

const AllCards = styled(CardContainer)``;
