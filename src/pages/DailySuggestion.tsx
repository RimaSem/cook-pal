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
import RecipeCard from "../components/home/RecipeCard";
import styled from "styled-components";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getCurrentDate } from "../utils/basicUtils";

const DailySuggestion: React.FC = () => {
  const [suggestion, setSuggestion] = useState<JSX.Element>();
  const { errorMessage } = useSelector(getErrorMessage);
  const dispatch = useAppDispatch();
  const docRef = doc(db, "dailySuggestions", "42");

  const displayRecipe = (recipeID: string) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeID}`, {
      method: "GET",
      mode: "cors",
    })
      .then((res) => {
        handleFetchError(res);
        return res.json();
      })
      .then((data) => {
        setSuggestion(
          <RecipeCard
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
      await setDoc(doc(db, "dailySuggestions", "42"), {
        currentDate: getCurrentDate(),
        dailyRecipe: recipe,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRandomRecipe = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`, {
      method: "GET",
      mode: "cors",
    })
      .then((res) => {
        handleFetchError(res);
        return res.json();
      })
      .then((data) => {
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
        console.log(err);
      }
    };

    getDailyRecipeFromDB();
  }, []);

  return (
    <SuggestionsContainer>
      <StyledHeading>Daily Suggestion</StyledHeading>
      <StyledParagraph>
        Not sure what recipe to try out next? Take a look at our daily
        suggestion!
        <br />
        The daily recipe suggestion is updated every day.
      </StyledParagraph>
      {errorMessage ? <ErrorMessage /> : <AllCards>{suggestion}</AllCards>}
    </SuggestionsContainer>
  );
};

export default DailySuggestion;

const SuggestionsContainer = styled(MainContainer)`
  flex-direction: column;
`;
const StyledHeading = styled(StyledPageHeading)``;

const StyledParagraph = styled.p`
  text-align: center;
`;

const AllCards = styled(CardContainer)``;

const DailyRecipeCard = styled(RecipeCard)``;
