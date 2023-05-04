import { useState } from "react";
import { Icon } from "@mdi/react";
import { mdiBookmarkOutline, mdiBookmark } from "@mdi/js";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getFavorites } from "../../state/favorites/favoritesSelectors";
import { useAppDispatch } from "../../state/hooks";
import {
  addFavorite,
  removeFavorite,
} from "../../state/favorites/favoritesSlice";
import styled from "styled-components";

interface CardProps {
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
}

const RecipeCard: React.FC<CardProps> = ({ cardData }) => {
  const [cardID, setCardID] = useState(cardData?.id || "42");
  const { favRecipes } = useSelector(getFavorites);
  const [saveCard, setSaveCard] = useState(favRecipes?.includes(cardID));
  const dispatch = useAppDispatch();

  const handleClick = (id = "42") => {
    setSaveCard((prev) => !prev);
    if (!saveCard) {
      dispatch(addFavorite(id));
    } else {
      dispatch(removeFavorite(id));
    }
  };

  return (
    <CardContainer>
      <Link to={`./${cardData?.id}`}>
        <CardImg img={cardData?.img} />
      </Link>
      <DishArea>{cardData?.area}</DishArea>
      <DishName>{cardData?.name}</DishName>
      <DishCategory>{cardData?.category}</DishCategory>
      <CardSaveIcon onClick={() => handleClick(cardData?.id)}>
        <Icon
          className="cardSaveIcon"
          path={saveCard ? mdiBookmark : mdiBookmarkOutline}
        />
      </CardSaveIcon>
    </CardContainer>
  );
};

export default RecipeCard;

const CardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0.7em 0;
  box-shadow: var(--shadow-card);
  border-radius: 1em;
  width: 19em;
  height: 21em;
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
  width: 18em;
  height: 12.5em;
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