import {
  CardContainer,
  MainContainer,
  StyledPageHeading,
} from "../styles/sharedStyles";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import ErrorMessage from "../components/shared/ErrorMessage";
import { errorMessageSelector } from "../state/error/errorSelectors";
import { setErrorMessage } from "../state/error/errorSlice";
import RecipeCard from "../components/home/RecipeCard";
import styled from "styled-components";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getCurrentDate } from "../utils/basicUtils";
import { FirebaseCollections, FirebaseDocs } from "../types/General";
import Spinner from "../components/shared/Spinner";
import { fetchRandomRecipe, fetchRecipeById } from "../utils/fetches";
import { FetchErrorMessages } from "../types/AuthMessages";
import { useQuery } from "@tanstack/react-query";

const DailySuggestion: React.FC = () => {
  const [recipeID, setRecipeID] = useState<string>("");
  const { errorMessage } = useAppSelector(errorMessageSelector);
  const dispatch = useAppDispatch();
  const docRef = doc(
    db,
    FirebaseCollections.DAILY_RECIPES_COLLECTION,
    FirebaseDocs.DEFAULT_DOC
  );

  useEffect(() => {
    const getDailyRecipeFromDB = async () => {
      try {
        const docData = (await getDoc(docRef)).data();
        if (docData?.currentDate !== getCurrentDate()) {
          const data = await fetchRandomRecipe();
          setRecipeID(data?.idMeal);
          updateDatabase(data?.idMeal);
        } else {
          setRecipeID(docData?.dailyRecipe);
        }
      } catch (err) {
        dispatch(setErrorMessage((err as Error).message));
      }
    };
    getDailyRecipeFromDB();
  }, []);

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

  const recipeData = useQuery({
    queryKey: ["dailyRecipe"],
    queryFn: () => fetchRecipeById(recipeID),
    enabled: !!recipeID,
  });

  if (recipeData.isLoading) return <Spinner />;

  if (recipeData.isError)
    return <ErrorMessage>{FetchErrorMessages.FETCH_ERROR}</ErrorMessage>;

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
        <CardContainer>
          <RecipeCard
            daily
            key={recipeData.data?.idMeal}
            cardData={{
              id: recipeData.data?.idMeal,
              name: recipeData.data?.strMeal,
              category: recipeData.data?.strCategory,
              area: recipeData.data?.strArea,
              img: recipeData.data?.strMealThumb,
            }}
          />
        </CardContainer>
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
