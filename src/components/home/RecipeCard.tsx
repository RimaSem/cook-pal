import { useEffect, useState } from "react";
import { Icon } from "@mdi/react";
import { mdiBookmarkOutline, mdiBookmark } from "@mdi/js";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../state/hooks";
import {
  addFavorite,
  removeFavorite,
} from "../../state/favorites/favoritesSlice";
import styled from "styled-components";
import { db, auth } from "../../firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

interface CardProps {
  daily?: boolean;
  cardData?: {
    id?: string;
    name?: string;
    category?: string;
    area?: string;
    img?: string;
  };
}

interface CardImgProp {
  img?: string;
  daily?: boolean;
}

interface DailyCardProp {
  daily?: boolean;
}

const RecipeCard: React.FC<CardProps> = ({ cardData, daily }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (auth.currentUser) {
      const docRef = doc(db, "users", auth.currentUser.uid);
      const getFavorites = async () => {
        try {
          const docData = (await getDoc(docRef)).data();
          if (docData?.favorites.includes(cardData?.id)) {
            setIsFavorite(true);
          }
        } catch (err) {
          console.log(err);
        }
      };

      getFavorites();
    }
  }, []);

  const handleClick = async (id = "42") => {
    if (auth.currentUser) {
      try {
        const docToUpdate = doc(db, "users", auth.currentUser.uid);
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
        console.log(err);
      }
    }
  };

  return (
    <CardContainer daily={daily}>
      <Link to={`./${cardData?.id}`} aria-label="Link to recipe details">
        <CardImg daily={daily} img={cardData?.img} />
      </Link>
      <DishArea>{cardData?.area}</DishArea>
      <DishName>{cardData?.name}</DishName>
      <DishCategory>{cardData?.category}</DishCategory>
      <CardSaveIcon onClick={() => handleClick(cardData?.id)}>
        <Icon
          className="cardSaveIcon"
          path={isFavorite ? mdiBookmark : mdiBookmarkOutline}
        />
      </CardSaveIcon>
    </CardContainer>
  );
};

export default RecipeCard;

const CardContainer = styled.div<DailyCardProp>`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0.7em 0;
  box-shadow: var(--shadow-card);
  border-radius: 1em;
  width: ${({ daily }) => (daily ? "38em" : "19em")};
  max-width: 95%;
  height: ${({ daily }) => (daily ? "34em" : "21em")};
  background-color: ${({ theme }) => theme.colors.white};
  font-family: var(--font-secondary);

  @media ${({ theme }) => theme.mQueries.primaryQ} {
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
