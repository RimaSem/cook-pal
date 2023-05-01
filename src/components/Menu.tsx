import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../state/hooks";
import { getMenuStatus } from "../state/menu/menuSelectors";
import { toggleMenu } from "../state/menu/menuSlice";
import { RouteNames } from "../types/RouteNames";
import styled from "styled-components";

interface MenuProps {
  menuState?: boolean;
}

const StyledMenu = styled.div<MenuProps>`
  z-index: 3;
  position: fixed;
  right: ${({ menuState }) => (menuState ? "0" : "-600px")};
  display: flex;
  flex-direction: column;
  transition: right 0.5s;
  width: 26.25em;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.white};

  @media ${({ theme }) => theme.mQueries.menuQ} {
    width: 100%;
  }
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 6em auto;
  width: 95%;
`;

const StyledLink = styled(Link)`
  margin-bottom: 1.4em;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.darker};
  text-decoration: none;
`;

const Menu: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isOpened } = useSelector(getMenuStatus);

  const handleClick = () => dispatch(toggleMenu());

  return (
    <StyledMenu menuState={isOpened}>
      {isOpened && (
        <MenuContainer>
          <StyledLink to="./" onClick={handleClick}>
            Home
          </StyledLink>
          <StyledLink to={RouteNames.RECIPES} onClick={handleClick}>
            All Recipes
          </StyledLink>
          <StyledLink to={RouteNames.DAILY} onClick={handleClick}>
            Daily Suggestions
          </StyledLink>
          <StyledLink to={RouteNames.FAVORITES} onClick={handleClick}>
            Your Favorites
          </StyledLink>
          <StyledLink to={RouteNames.GROCERIES} onClick={handleClick}>
            Create Grocery List
          </StyledLink>
          <StyledLink to={RouteNames.LOGIN} onClick={handleClick}>
            Log In
          </StyledLink>
        </MenuContainer>
      )}
    </StyledMenu>
  );
};

export default Menu;
