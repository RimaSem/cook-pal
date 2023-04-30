import {
  CardContainer,
  MainContainer,
  StyledPageHeading,
} from "../styles/sharedStyles";
import { useSelector } from "react-redux";
import { getFavorites } from "../state/favorites/favoritesSelectors";
import styled from "styled-components";

const FavoritesContainer = styled(MainContainer)``;

const StyledHeading = styled(StyledPageHeading)``;

const AllCards = styled(CardContainer)``;

const Favorites = () => {
  return (
    <FavoritesContainer>
      <StyledHeading>Favorites</StyledHeading>
      <AllCards></AllCards>
    </FavoritesContainer>
  );
};

export default Favorites;
