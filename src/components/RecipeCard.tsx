import { useState } from "react";
import Icon from "@mdi/react";
import { mdiBookmarkOutline, mdiBookmark } from "@mdi/js";
import { RouteNames } from "../types/RouteNames";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface CardProps {
  id?: string;
  name?: string;
  category?: string;
  area?: string;
  img?: string;
}

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

const CardImg = styled.div<CardProps>`
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

const RecipeCard: React.FC<CardProps> = ({ id, name, category, area, img }) => {
  const [saveCard, setSaveCard] = useState(false);

  return (
    <CardContainer>
      <Link to={`./${RouteNames.RECIPES}/${id}`}>
        <CardImg img={img} />
      </Link>
      <DishArea>{area}</DishArea>
      <DishName>{name}</DishName>
      <DishCategory>{category}</DishCategory>
      <CardSaveIcon onClick={() => setSaveCard((prev) => !prev)}>
        <Icon
          className="cardSaveIcon"
          path={saveCard ? mdiBookmark : mdiBookmarkOutline}
        />
      </CardSaveIcon>
    </CardContainer>
  );
};

export default RecipeCard;
