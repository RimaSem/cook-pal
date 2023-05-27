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
import { errorMessageSelector } from "../state/error/errorSelectors";
import { setErrorMessage } from "../state/error/errorSlice";
import RecipeCard from "../components/home/RecipeCard";
import styled from "styled-components";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getCurrentDate } from "../utils/basicUtils";
import { FetchURL } from "../types/RouteNames";
import { FirebaseCollections, FirebaseDocs } from "../types/General";
import { FetchErrorMessages } from "../types/AuthMessages";
import axios from "axios";

const DailySuggestion: React.FC = () => {
  const [dailyRecipe, setDailyRecipe] = useState<JSX.Element>();
  const { errorMessage } = useSelector(errorMessageSelector);
  const dispatch = useAppDispatch();
  const docRef = doc(
    db,
    FirebaseCollections.DAILY_RECIPES_COLLECTION,
    FirebaseDocs.DEFAULT_DOC
  );

  const displayRecipe = (recipeID: string) => {
    axios
      .get(FetchURL.SEARCH_BY_ID_ENDPOINT + recipeID)
      .then((response) => {
        handleFetchError(response);
        if (!response.data.meals[0]) {
          throw Error(FetchErrorMessages.FETCH_ERROR);
        }
        setDailyRecipe(
          <RecipeCard
            daily
            key={response.data.meals[0].idMeal}
            cardData={{
              id: response.data.meals[0].idMeal,
              name: response.data.meals[0].strMeal,
              category: response.data.meals[0].strCategory,
              area: response.data.meals[0].strArea,
              img: response.data.meals[0].strMealThumb,
            }}
          />
        );
      })
      .catch((err) => dispatch(setErrorMessage(err.message)));
  };

  const updateDatabase = async (recipe: string) => {
    try {
      await setDoc(
        doc(
          db,
          FirebaseCollections.DAILY_RECIPES_COLLECTION,
          FirebaseDocs.DEFAULT_DOC
        ),
        {
          currentDate: getCurrentDate(),
          dailyRecipe: recipe,
        }
      );
    } catch (err) {
      dispatch(setErrorMessage((err as Error).message));
    }
  };

  const fetchRandomRecipe = () => {
    axios
      .get(FetchURL.RANDOM_RECIPE_ENDPOINT)
      .then((response) => {
        handleFetchError(response);
        if (!response.data.meals[0]) {
          throw Error(FetchErrorMessages.FETCH_ERROR);
        }
        displayRecipe(response.data.meals[0].idMeal);
        updateDatabase(response.data.meals[0].idMeal);
      })
      .catch((err) => dispatch(setErrorMessage(err.message)));
  };

  useEffect(() => {
    const getDailyRecipeFromDB = async () => {
      try {
        const docData = (await getDoc(docRef)).data();
        if (docData?.currentDate !== getCurrentDate()) {
          fetchRandomRecipe();
        } else {
          displayRecipe(docData?.dailyRecipe);
        }
      } catch (err) {
        dispatch(setErrorMessage((err as Error).message));
      }
    };

    getDailyRecipeFromDB();
  }, []);

  return (
    <SuggestionContainer>
      <StyledPageHeading>Daily Suggestion</StyledPageHeading>
      <StyledParagraph>
        Not sure what recipe to try out next? Take a look at our daily
        suggestion!
        <br />
        The daily recipe suggestion is updated every day.
      </StyledParagraph>
      {errorMessage ? (
        <ErrorMessage />
      ) : (
        <CardContainer>{dailyRecipe}</CardContainer>
      )}
    </SuggestionContainer>
  );
};

export default DailySuggestion;

const SuggestionContainer = styled(MainContainer)`
  flex-direction: column;
`;

const StyledParagraph = styled.p`
  text-align: center;
`;
