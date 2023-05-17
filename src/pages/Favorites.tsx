import {
  CardContainer,
  MainContainer,
  StyledPageHeading,
} from "../styles/sharedStyles";
import { useSelector } from "react-redux";
import { favoriteRecipesSelector } from "../state/favorites/favoritesSelectors";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../state/hooks";
import ErrorMessage, {
  handleFetchError,
} from "../components/shared/ErrorMessage";
import { errorMessageSelector } from "../state/error/errorSelectors";
import { setErrorMessage } from "../state/error/errorSlice";
import RecipeCard from "../components/home/RecipeCard";
import styled from "styled-components";
import { db, auth } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { FetchURL } from "../types/RouteNames";
import { FirebaseCollections } from "../types/General";
import { FetchErrorMessages } from "../types/AuthMessages";

const Favorites: React.FC = () => {
  const { favRecipes } = useSelector(favoriteRecipesSelector);
  const [elementsArray, setElementsArray] = useState<JSX.Element[]>([]);
  const { errorMessage } = useSelector(errorMessageSelector);
  const dispatch = useAppDispatch();

  const displayRecipes = async () => {
    if (auth.currentUser) {
      setElementsArray([]);
      const docRef = doc(
        db,
        FirebaseCollections.USER_COLLECTION,
        auth.currentUser.uid
      );
      const docData = (await getDoc(docRef)).data();
      docData?.favorites.forEach((recipeID: string) => {
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
            setElementsArray((prev) => [
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
    }
  };

  useEffect(() => {
    displayRecipes();
  }, [favRecipes]);

  return (
    <FavoritesContainer>
      <StyledPageHeading>Favorites</StyledPageHeading>
      {errorMessage ? (
        <ErrorMessage />
      ) : (
        <CardContainer>{elementsArray}</CardContainer>
      )}
    </FavoritesContainer>
  );
};

export default Favorites;

const FavoritesContainer = styled(MainContainer)`
  flex-direction: column;
`;
