import styled from "styled-components";

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  gap: 1.5em;
  width: 17em;
`;

const StyledLink = styled.a`
  cursor: pointer;
  font-weight: 500;
  text-decoration: none;
`;

const LogIn = styled(StyledLink)`
  margin: 0 1em 0 2em;
  white-space: nowrap;
`;

const Nav = () => {
  return (
    <StyledNav>
      <StyledLink>Home</StyledLink>
      <StyledLink>Explore</StyledLink>
      <LogIn>Log In</LogIn>
    </StyledNav>
  );
};

export default Nav;
