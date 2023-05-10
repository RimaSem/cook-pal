import {
  CardContainer,
  MainContainer,
  StyledPageHeading,
} from "../styles/sharedStyles";
import { useSelector } from "react-redux";
import { getFavoriteRecipes } from "../state/favorites/favoritesSelectors";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../state/hooks";
import ErrorMessage, {
  handleFetchError,
} from "../components/shared/ErrorMessage";
import { getErrorMessage } from "../state/error/errorSelectors";
import { setErrorMessage } from "../state/error/errorSlice";
import RecipeCard from "../components/home/RecipeCard";
import styled from "styled-components";
import { db, auth } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const Favorites: React.FC = () => {
  const { favRecipes } = useSelector(getFavoriteRecipes);
  const [elementsArray, setElementsArray] = useState<JSX.Element[]>([]);
  const { errorMessage } = useSelector(getErrorMessage);
  const dispatch = useAppDispatch();

  const displayRecipes = async () => {
    if (auth.currentUser) {
      setElementsArray([]);
      const docRef = doc(db, "users", auth.currentUser.uid);
      const docData = (await getDoc(docRef)).data();
      docData?.favorites.forEach((recipeID: string) => {
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
          .then((data) =>
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
            ])
          )
          .catch((err) => dispatch(setErrorMessage(err.message)));
      });
    }
  };

  useEffect(() => {
    displayRecipes();
  }, [favRecipes]);

  return (
    <FavoritesContainer>
      <StyledHeading>Favorites</StyledHeading>
      {errorMessage ? <ErrorMessage /> : <AllCards>{elementsArray}</AllCards>}
    </FavoritesContainer>
  );
};

export default Favorites;

const FavoritesContainer = styled(MainContainer)`
  flex-direction: column;
`;

const StyledHeading = styled(StyledPageHeading)``;

const AllCards = styled(CardContainer)``;
