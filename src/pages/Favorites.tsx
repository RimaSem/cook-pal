import {
  CardContainer,
  MainContainer,
  StyledPageHeading,
} from "../styles/sharedStyles";
import { favoriteRecipesSelector } from "../state/favorites/favoritesSelectors";
import { useEffect } from "react";
import { useAppDispatch } from "../state/hooks";
import { useAppSelector } from "../state/hooks";
import ErrorMessage from "../components/shared/ErrorMessage";
import { errorMessageSelector } from "../state/error/errorSelectors";
import { setErrorMessage } from "../state/error/errorSlice";
import styled from "styled-components";
import { db, auth } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { FirebaseCollections } from "../types/General";
import { useQueries } from "@tanstack/react-query";
import { fetchRecipeById } from "../utils/fetches";
import RecipeCard from "../components/home/RecipeCard";
import Spinner from "../components/shared/Spinner";
import { FetchErrorMessages } from "../types/AuthMessages";
import { updateFavorites } from "../state/favorites/favoritesSlice";

const Favorites: React.FC = () => {
  const { favRecipes } = useAppSelector(favoriteRecipesSelector);
  const { errorMessage } = useAppSelector(errorMessageSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getData = async () => {
      try {
        if (auth.currentUser) {
          const docRef = doc(
            db,
            FirebaseCollections.USER_COLLECTION,
            auth.currentUser.uid
          );
          const docData = (await getDoc(docRef)).data();
          dispatch(updateFavorites(docData?.favorites));
        }
      } catch (err) {
        dispatch(setErrorMessage((err as Error).message));
      }
    };
    getData();
  }, []);

  const queries = useQueries({
    queries: favRecipes.map((item) => {
      return {
        queryKey: ["recipe", item],
        queryFn: () => fetchRecipeById(item),
      };
    }),
  });

  if (queries.some((query) => query.isLoading)) return <Spinner />;

  if (queries.some((query) => query.isError))
    return <ErrorMessage>{FetchErrorMessages.FETCH_ERROR}</ErrorMessage>;

  return (
    <FavoritesContainer>
      <StyledPageHeading>Favorites</StyledPageHeading>
      {errorMessage ? (
        <ErrorMessage />
      ) : (
        <CardContainer>
          {queries?.map((query) => (
            <RecipeCard
              key={query.data?.meals[0].idMeal}
              cardData={{
                id: query.data?.meals[0].idMeal,
                name: query.data?.meals[0].strMeal,
                category: query.data?.meals[0].strCategory,
                area: query.data?.meals[0].strArea,
                img: query.data?.meals[0].strMealThumb,
              }}
            />
          ))}
        </CardContainer>
      )}
    </FavoritesContainer>
  );
};

export default Favorites;

const FavoritesContainer = styled(MainContainer)`
  flex-direction: column;
`;
