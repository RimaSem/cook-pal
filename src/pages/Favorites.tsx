import {
  CardContainer,
  MainContainer,
  StyledPageHeading,
} from "../styles/sharedStyles";
import { useSelector } from "react-redux";
import { favoriteRecipesSelector } from "../state/favorites/favoritesSelectors";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../state/hooks";
import ErrorMessage from "../components/shared/ErrorMessage";
import { errorMessageSelector } from "../state/error/errorSelectors";
import { setErrorMessage } from "../state/error/errorSlice";
import styled from "styled-components";
import { db, auth } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { FirebaseCollections } from "../types/General";
import { useQueries } from "@tanstack/react-query";
import { fetchRecipeById } from "../hooks/useRecipeData";
import RecipeCard from "../components/home/RecipeCard";
import Spinner from "../components/shared/Spinner";
import { FetchErrorMessages } from "../types/AuthMessages";

const Favorites: React.FC = () => {
  const [dataFromDB, setDataFromDB] = useState<any[]>([]);
  const { favRecipes } = useSelector(favoriteRecipesSelector);
  const { errorMessage } = useSelector(errorMessageSelector);
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
          setDataFromDB(docData?.favorites);
        }
      } catch (err) {
        dispatch(setErrorMessage((err as Error).message));
      }
    };
    getData();
  }, [favRecipes]);

  const queries = useQueries({
    queries: (dataFromDB ?? []).map((item) => {
      return {
        queryKey: ["recipes", item],
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
