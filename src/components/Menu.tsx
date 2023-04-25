import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { toggleMenu } from "../features/menu/menuSlice";

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
  width: 420px;
  height: 100vh;
  background-color: var(--color-white);

  @media (max-width: 520px) {
    width: 100%;
  }
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 6em auto;
  width: 95%;

  a {
    margin-bottom: 1.4em;
    font-size: 1.2rem;
    color: var(--color-text-dark);
    text-decoration: none;
  }
`;

const Menu = () => {
  const menuState = useAppSelector((state) => state.menu.isOpened);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(toggleMenu());
  };

  return (
    <StyledMenu menuState={menuState}>
      {menuState && (
        <MenuContainer>
          <Link to="#" onClick={handleClick}>
            Home
          </Link>
          <Link to="#" onClick={handleClick}>
            All Recipes
          </Link>
          <Link to="#" onClick={handleClick}>
            Daily Suggestions
          </Link>
          <Link to="#" onClick={handleClick}>
            Your Favorites
          </Link>
          <Link to="#" onClick={handleClick}>
            Custom Meal Plan
          </Link>
          <Link to="#" onClick={handleClick}>
            Create Grocery List
          </Link>
          <Link to="#" onClick={handleClick}>
            Log In
          </Link>
        </MenuContainer>
      )}
    </StyledMenu>
  );
};

export default Menu;
