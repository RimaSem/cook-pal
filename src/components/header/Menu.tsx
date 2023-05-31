import { devices } from "../../styles/theme";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { menuStatusSelector } from "../../state/menu/menuSelectors";
import { toggleMenu } from "../../state/menu/menuSlice";
import { RouteNames } from "../../types/RouteNames";
import { userLoginStatusSelector } from "../../state/auth/authSelectors";
import { setUserLogin } from "../../state/auth/authSlice";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import styled from "styled-components";

const Menu: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isOpened } = useAppSelector(menuStatusSelector);
  const { isLoggedIn } = useAppSelector(userLoginStatusSelector);

  const handleClick = () => dispatch(toggleMenu());

  const handleAuthLink = () => {
    if (isLoggedIn) {
      signOut(auth);
      dispatch(setUserLogin(false));
    }
    dispatch(toggleMenu());
  };

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
            Daily Suggestion
          </StyledLink>
          <StyledLink to={RouteNames.FAVORITES} onClick={handleClick}>
            Your Favorites
          </StyledLink>
          <StyledLink to={RouteNames.GROCERIES} onClick={handleClick}>
            Create Grocery List
          </StyledLink>
          <LinkWrapper isLoggedIn={isLoggedIn}>
            <StyledAuthLink to={RouteNames.LOGIN} onClick={handleAuthLink}>
              {isLoggedIn ? "Sign Out" : "Sign In"}
            </StyledAuthLink>
          </LinkWrapper>
        </MenuContainer>
      )}
    </StyledMenu>
  );
};

export default Menu;

interface MenuProps {
  menuState?: boolean;
}

interface AuthProps {
  isLoggedIn?: boolean;
}

const StyledMenu = styled.div<MenuProps>`
  z-index: 3;
  position: fixed;
  right: ${({ menuState }) => (menuState ? "0" : "-600px")};
  transition: right 0.5s;
  width: 26.25em;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.white};

  @media ${devices.mobileXXL} {
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

const LinkWrapper = styled.div<AuthProps>`
  margin-top: 2em;
  color: ${({ isLoggedIn, theme }) =>
    isLoggedIn ? theme.colors.red : theme.colors.green};
`;

const StyledAuthLink = styled(StyledLink)<AuthProps>`
  font-weight: 500;
  color: inherit;
`;
