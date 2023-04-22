import styled from "styled-components";

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

const StyledLink = styled.a<NavProps>`
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

  @media (max-width: 675px) {
    padding: 0.95em 0.3em;
  }
`;

const Nav: React.FC<NavProps> = ({}) => {
  return (
    <NavContainer>
      <StyledLink>Browse Recipes</StyledLink>
      <StyledLink btnColor="var(--color-nav-btn-2)">
        Daily Suggestions
      </StyledLink>
      <StyledLink btnColor="var(--color-nav-btn-3)">Your Favorites</StyledLink>
      <StyledLink btnColor="var(--color-nav-btn-4)">
        Custom Meal Plan
      </StyledLink>
      <StyledLink btnColor="var(--color-nav-btn-5)">
        Create Grocery List
      </StyledLink>
    </NavContainer>
  );
};

export default Nav;
