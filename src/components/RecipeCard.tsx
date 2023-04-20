import styled from "styled-components";
import { useState } from "react";
import Icon from "@mdi/react";
import { mdiBookmarkOutline, mdiBookmark } from "@mdi/js";
import CardSampleImg from "../img/card_sample_img.jpg";

const CardContainer = styled.div`
  position: relative;
  margin: 2em 0;
  box-shadow: 0px 0px 1px rgba(12, 26, 75, 0.24),
    0px 3px 8px -1px rgba(50, 50, 71, 0.05);
  border-radius: 16px;
  width: 19em;
  height: 19.68em;
  background-color: var(--color-white);
  font-family: "Inter", sans-serif;

  .CardSaveIcon {
    position: absolute;
    right: 0.8em;
    bottom: 1.2em;
    width: 1.6em;
    cursor: pointer;
    color: var(--color-text-dark);
  }
`;

const CardImg = styled.div`
  margin: 0.5em auto 0 auto;
  border-radius: 16px;
  width: 18em;
  height: 12.5em;
  background-image: url(${CardSampleImg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
`;

const DishArea = styled.p`
  margin: 1em 0 0 1.6em;
  font-size: 0.625em;
  color: var(--color-text-grey);
`;

const DishName = styled.p`
  margin: 0 0 0 0.7em;
  padding: 0;
  font-size: 1.4em;
  font-weight: 700;
  color: var(--color-text-dark);
`;

const DishCategory = styled.p`
  margin: 1em 0 0 1em;
  font-size: 1em;
  font-weight: 500;
  color: var(--color-accent-orange);
`;

const RecipeCard = () => {
  const [saveCard, setSaveCard] = useState(false);

  return (
    <CardContainer>
      <CardImg />
      <DishArea>Japan</DishArea>
      <DishName>Noodle Soup</DishName>
      <DishCategory>Vegetarian</DishCategory>
      <div onClick={() => setSaveCard((prev) => !prev)}>
        <Icon
          className="CardSaveIcon"
          path={saveCard ? mdiBookmark : mdiBookmarkOutline}
        />
      </div>
    </CardContainer>
  );
};

export default RecipeCard;
