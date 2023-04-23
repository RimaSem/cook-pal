import styled from "styled-components";
import { useState } from "react";
import Icon from "@mdi/react";
import { mdiMenu, mdiWindowClose } from "@mdi/js";

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  gap: 1.5em;
  width: 17em;

  @media (max-width: 865px) {
    gap: 0;
    width: fit-content;
  }
`;

const StyledLink = styled.a`
  transition: color 0.2s;
  cursor: pointer;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    color: var(--color-accent-green);
  }

  @media (max-width: 865px) {
    display: none;
  }
`;

const LogIn = styled(StyledLink)`
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

const HeaderNav = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <StyledNav>
      <StyledLink>Home</StyledLink>
      <StyledLink>Explore</StyledLink>
      <LogIn>Log In</LogIn>
      <HamburgerMenu onClick={() => setToggleMenu((prev) => !prev)}>
        {toggleMenu ? <Icon path={mdiWindowClose} /> : <Icon path={mdiMenu} />}
      </HamburgerMenu>
    </StyledNav>
  );
};

export default HeaderNav;
