import styled from "styled-components";
import Icon from "@mdi/react";
import { mdiMenu } from "@mdi/js";

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
  cursor: pointer;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s;

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
  display: flex;
  align-items: center;
  width: 1.8em;
  cursor: pointer;
`;

const HeaderNav = () => {
  return (
    <StyledNav>
      <StyledLink>Home</StyledLink>
      <StyledLink>Explore</StyledLink>
      <LogIn>Log In</LogIn>
      <HamburgerMenu>
        <Icon path={mdiMenu} />
      </HamburgerMenu>
    </StyledNav>
  );
};

export default HeaderNav;
