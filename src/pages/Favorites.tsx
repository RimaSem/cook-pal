import {
  CardContainer,
  MainContainer,
  StyledPageHeading,
} from "../styles/sharedStyles";
import { useSelector } from "react-redux";
import { getFavorites } from "../state/favorites/favoritesSelectors";
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
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";

const Favorites: React.FC = () => {
  const [favoritesList, setFavoritesList] = useState<string[]>([]);
  const [allFavorites, setAllFavorites] = useState<JSX.Element[]>([]);
  // const { favRecipes } = useSelector(getFavorites);
  const { errorMessage } = useSelector(getErrorMessage);
  const dispatch = useAppDispatch();

  const collectionRef = collection(db, "users");

  useEffect(() => {
    const getFavorites = async () => {
      try {
        const data = await getDocs(collectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
        }));
        const userDoc = filteredData.filter(
          (item) => item.id === auth?.currentUser?.uid
        );
        setFavoritesList(userDoc[0].favorites);
      } catch (err) {
        console.log(err);
      }
    };

    getFavorites();
  }, []);

  // const createFavorite = async () => {
  //   try {
  //     await addDoc(favoritesCollectionRef, { fav3: "123456", id: auth?.currentUser?.uid });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const deleteFavorite = async (id: string) => {
  //   try {
  //     const favoriteDoc = doc(db, "favorites", id)
  //     await deleteDoc(favoriteDoc)
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const updateFavorite = async (id: string) => {
  //   try {
  //     const favoriteDoc = doc(db, "favorites", id)
  //     await updateDoc(favoriteDoc, {fav3: "update"})
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const displayRecipes = () => {
    setAllFavorites([]);
    favoritesList.forEach((recipeID) => {
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
          setAllFavorites((prev) => [
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
  };

  useEffect(() => {
    displayRecipes();
  }, [favoritesList]);

  return (
    <FavoritesContainer>
      <StyledHeading>Favorites</StyledHeading>
      {errorMessage ? <ErrorMessage /> : <AllCards>{allFavorites}</AllCards>}
    </FavoritesContainer>
  );
};

export default Favorites;

const FavoritesContainer = styled(MainContainer)`
  flex-direction: column;
`;

const StyledHeading = styled(StyledPageHeading)``;

const AllCards = styled(CardContainer)``;
