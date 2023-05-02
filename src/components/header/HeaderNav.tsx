import Icon from "@mdi/react";
import { mdiMenu, mdiWindowClose } from "@mdi/js";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../state/hooks";
import { getMenuStatus } from "../../state/menu/menuSelectors";
import { toggleMenu } from "../../state/menu/menuSlice";
import { RouteNames } from "../../types/RouteNames";
import { auth } from "../../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import styled from "styled-components";

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  gap: 1.5em;
  width: 17em;

  @media ${({ theme }) => theme.mQueries.primaryQ} {
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

  @media ${({ theme }) => theme.mQueries.primaryQ} {
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

const HeaderNav: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isOpened } = useSelector(getMenuStatus);
  const handleClick = () => dispatch(toggleMenu());

  return (
    <StyledNav>
      <StyledLink to=".">Home</StyledLink>
      <StyledLink to={`./${RouteNames.RECIPES}`}>Explore</StyledLink>
      <StyledLoginLink to={`./${RouteNames.LOGIN}`}>Log In</StyledLoginLink>
      {/* <button onClick={() => signOut(auth)}>Sign out</button> */}
      <HamburgerMenu onClick={handleClick}>
        {isOpened ? <Icon path={mdiWindowClose} /> : <Icon path={mdiMenu} />}
      </HamburgerMenu>
    </StyledNav>
  );
};

export default HeaderNav;
