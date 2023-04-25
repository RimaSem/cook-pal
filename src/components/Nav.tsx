import styled from "styled-components";
import { Link } from "react-router-dom";

interface NavProps {
  btnColor?: string;
}

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1.25em;
  max-width: var(--width-max);
  width: 95%;

  @media (max-width: 865px) {
    display: none;
  }
`;

const StyledLink = styled.div<NavProps>`
  flex: 1;
  transition: opacity 0.3s;
  border-radius: 10px;
  padding: 1.95em 0.3em;
  background-color: ${({ btnColor }) =>
    btnColor ? btnColor : "var(--color-nav-btn-1)"};
  cursor: pointer;
  font-weight: 500;
  color: var(--color-white);
  text-decoration: none;
  text-align: center;

  &:hover {
    opacity: 0.85;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  @media (max-width: 675px) {
    padding: 0.95em 0.3em;
  }
`;

const Nav: React.FC<NavProps> = ({}) => {
  return (
    <NavContainer>
      <StyledLink>
        <Link to="#">Browse Recipes</Link>
      </StyledLink>
      <StyledLink btnColor="var(--color-nav-btn-2)">
        <Link to="#">Daily Suggestions</Link>
      </StyledLink>
      <StyledLink btnColor="var(--color-nav-btn-3)">
        <Link to="#">Your Favorites</Link>
      </StyledLink>
      <StyledLink btnColor="var(--color-nav-btn-4)">
        <Link to="#">Custom Meal Plan</Link>
      </StyledLink>
      <StyledLink btnColor="var(--color-nav-btn-5)">
        <Link to="#">Create Grocery List</Link>
      </StyledLink>
    </NavContainer>
  );
};

export default Nav;
