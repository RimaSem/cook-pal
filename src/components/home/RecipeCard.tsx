import { useEffect, useState } from "react";
import { Icon } from "@mdi/react";
import { mdiBookmarkOutline, mdiBookmark } from "@mdi/js";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import {
  addFavorite,
  removeFavorite,
} from "../../state/favorites/favoritesSlice";
import styled from "styled-components";
import { db, auth } from "../../firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { devices } from "../../styles/theme";
import { setErrorMessage } from "../../state/error/errorSlice";
import { errorMessageSelector } from "../../state/error/errorSelectors";
import ErrorMessage from "../shared/ErrorMessage";
import { FirebaseCollections } from "../../types/General";

interface CardProps {
  daily?: boolean;
  cardData: {
    id: string;
    name: string;
    category: string;
    area: string;
    img: string;
  };
}

const RecipeCard: React.FC<CardProps> = ({ cardData, daily }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { errorMessage } = useAppSelector(errorMessageSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (auth.currentUser) {
      const docRef = doc(
        db,
        FirebaseCollections.USER_COLLECTION,
        auth.currentUser.uid
      );
      const getFavorites = async () => {
        try {
          const docData = (await getDoc(docRef)).data();
          if (docData?.favorites.includes(cardData?.id)) {
            setIsFavorite(true);
          }
        } catch (err) {
          dispatch(setErrorMessage((err as Error).message));
        }
      };
      getFavorites();
    }
  }, []);

  const handleClick = async (id: string) => {
    if (auth.currentUser) {
      try {
        const docToUpdate = doc(
          db,
          FirebaseCollections.USER_COLLECTION,
          auth.currentUser.uid
        );
        const docData = (await getDoc(docToUpdate)).data();
        if (!isFavorite) {
          setIsFavorite(true);
          await updateDoc(docToUpdate, {
            favorites: [...docData?.favorites, id],
          });
          dispatch(addFavorite(id));
        } else if (isFavorite) {
          setIsFavorite(false);
          await updateDoc(docToUpdate, {
            favorites: docData?.favorites.filter((item: string) => item !== id),
          });
          dispatch(removeFavorite(id));
        }
      } catch (err) {
        dispatch(setErrorMessage((err as Error).message));
      }
    }
  };

  return (
    <>
      {errorMessage ? (
        <ErrorMessage />
      ) : (
        <CardContainer daily={daily}>
          <Link to={`./${cardData?.id}`} aria-label="Link to recipe details">
            <CardImg daily={daily} img={cardData?.img} />
          </Link>
          <DishArea>{cardData?.area}</DishArea>
          <DishName>{cardData?.name}</DishName>
          <DishCategory>{cardData?.category}</DishCategory>
          <CardSaveIcon onClick={() => handleClick(cardData?.id)}>
            <Icon path={isFavorite ? mdiBookmark : mdiBookmarkOutline} />
          </CardSaveIcon>
        </CardContainer>
      )}
    </>
  );
};

export default RecipeCard;

interface CardImgProp {
  img?: string;
  daily?: boolean;
}

interface DailyCardProp {
  daily?: boolean;
}

const CardContainer = styled.div<DailyCardProp>`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0.7em 0;
  box-shadow: ${({ theme }) => theme.shadows.card};
  border-radius: 1em;
  width: ${({ daily }) => (daily ? "38em" : "19em")};
  max-width: 95%;
  height: ${({ daily }) => (daily ? "34em" : "21em")};
  background-color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fontFamilies.secondary};

  @media ${devices.tabletM} {
    margin: 0;
  }
`;

const CardSaveIcon = styled.div`
  position: absolute;
  right: 0.8em;
  bottom: 0.5em;
  width: 1.6em;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.darker};
`;

const CardImg = styled.div<CardImgProp>`
  margin: 0.5em auto 0 auto;
  border-radius: 1em;
  width: ${({ daily }) => (daily ? "36em" : "18em")};
  max-width: 95%;
  height: ${({ daily }) => (daily ? "24em" : "12.5em")};
  background-image: url(${({ img }) => img});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
`;

const DishArea = styled.p`
  margin: 1em 0 0.2em 1.6em;
  font-size: 0.625em;
  color: ${({ theme }) => theme.colors.grey};
`;

const DishName = styled.p`
  margin: 0 0 auto 0.7em;
  padding: 0;
  font-size: 1.4em;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.darker};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DishCategory = styled.p`
  margin: 1em 0 1em 1em;
  font-size: 1em;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.accentOrange};
`;
