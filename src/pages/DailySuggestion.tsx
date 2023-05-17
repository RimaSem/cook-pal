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

const DailySuggestion: React.FC = () => {
  const [suggestion, setSuggestion] = useState<JSX.Element>();
  const { errorMessage } = useSelector(errorMessageSelector);
  const dispatch = useAppDispatch();
  const docRef = doc(
    db,
    FirebaseCollections.DAILY_RECIPES_COLLECTION,
    FirebaseDocs.DEFAULT_DOC
  );

  const displayRecipe = (recipeID: string) => {
    fetch(`${FetchURL.SEARCH_BY_ID_ENDPOINT + recipeID}`, {
      method: "GET",
      mode: "cors",
    })
      .then((res) => {
        handleFetchError(res);
        return res.json();
      })
      .then((data) => {
        if (!data.meals[0]) {
          throw Error(FetchErrorMessages.FETCH_ERROR);
        }
        setSuggestion(
          <RecipeCard
            daily
            key={data.meals[0].idMeal}
            cardData={{
              id: data.meals[0].idMeal,
              name: data.meals[0].strMeal,
              category: data.meals[0].strCategory,
              area: data.meals[0].strArea,
              img: data.meals[0].strMealThumb,
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
    fetch(FetchURL.RANDOM_RECIPE_ENDPOINT, {
      method: "GET",
      mode: "cors",
    })
      .then((res) => {
        handleFetchError(res);
        return res.json();
      })
      .then((data) => {
        if (!data.meals[0]) {
          throw Error(FetchErrorMessages.FETCH_ERROR);
        }
        displayRecipe(data.meals[0].idMeal);
        updateDatabase(data.meals[0].idMeal);
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
        <CardContainer>{suggestion}</CardContainer>
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
