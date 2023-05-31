import { Icon } from "@mdi/react";
import { mdiMenu, mdiWindowClose } from "@mdi/js";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { menuStatusSelector } from "../../state/menu/menuSelectors";
import { toggleMenu } from "../../state/menu/menuSlice";
import { RouteNames } from "../../types/RouteNames";
import { auth } from "../../firebase/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { userLoginStatusSelector } from "../../state/auth/authSelectors";
import { setUserLogin } from "../../state/auth/authSlice";
import styled from "styled-components";
import { devices } from "../../styles/theme";

const HeaderNav: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isOpened } = useAppSelector(menuStatusSelector);
  const { isLoggedIn } = useAppSelector(userLoginStatusSelector);

  const handleMenu = () => dispatch(toggleMenu());

  const handleAuthLink = () => {
    if (isLoggedIn) {
      signOut(auth);
      dispatch(setUserLogin(false));
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(setUserLogin(true));
      } else {
        dispatch(setUserLogin(false));
      }
    });
  }, []);

  return (
    <StyledNav>
      <StyledLink to=".">Home</StyledLink>
      <StyledLink to={`./${RouteNames.RECIPES}`}>Explore</StyledLink>
      <StyledLoginLink to={`./${RouteNames.LOGIN}`} onClick={handleAuthLink}>
        {isLoggedIn ? "Sign Out" : "Sign In"}
      </StyledLoginLink>
      <HamburgerMenu onClick={handleMenu}>
        {isOpened ? <Icon path={mdiWindowClose} /> : <Icon path={mdiMenu} />}
      </HamburgerMenu>
    </StyledNav>
  );
};

export default HeaderNav;

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  gap: 1.5em;
  width: 17em;

  @media ${devices.tabletM} {
    gap: 0;
    width: fit-content;
  }
`;

const StyledLink = styled(Link)`
  transition: color 0.2s;
  cursor: pointer;
  color: inherit;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.accentGreen};
  }

  @media ${devices.tabletM} {
    display: none;
  }
`;

const StyledLoginLink = styled(StyledLink)`
  margin: 0 1em 0 2em;
  white-space: nowrap;
`;

const HamburgerMenu = styled.div`
  z-index: 3;
  display: flex;
  align-items: center;
  width: 1.8em;
  cursor: pointer;

  .menu-icon {
    z-index: 1009;
  }
`;
