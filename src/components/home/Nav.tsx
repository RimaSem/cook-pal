import { Link } from "react-router-dom";
import { devices } from "../../styles/theme";
import { RouteNames } from "../../types/RouteNames";
import styled, { useTheme } from "styled-components";

interface NavProps {
  btncolor?: string;
}

const Nav: React.FC<NavProps> = () => {
  const { colors } = useTheme();

  return (
    <NavContainer>
      <StyledLink to="./">Home</StyledLink>
      <StyledLink to={RouteNames.RECIPES} btncolor={colors.navBtn2}>
        Browse Recipes
      </StyledLink>
      <StyledLink to={RouteNames.DAILY} btncolor={colors.navBtn3}>
        Daily Suggestion
      </StyledLink>
      <StyledLink to={RouteNames.FAVORITES} btncolor={colors.navBtn4}>
        Your Favorites
      </StyledLink>
      <StyledLink to={RouteNames.GROCERIES} btncolor={colors.navBtn5}>
        Create Grocery List
      </StyledLink>
    </NavContainer>
  );
};

export default Nav;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1.25em;
  margin: 0 auto;
  max-width: var(--width-max);
  width: 95%;

  @media ${devices.tabletM} {
    display: none;
  }
`;

const StyledLink = styled(Link)<NavProps>`
  flex: 1;
  transition: opacity 0.3s;
  border-radius: 0.625em;
  padding: 1.95em 0.3em;
  background-color: ${({ btncolor }) =>
    btncolor ? btncolor : ({ theme }) => theme.colors.navBtn1};
  cursor: pointer;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.white};
  text-decoration: none;
  text-align: center;

  &:hover {
    opacity: 0.85;
  }

  @media ${devices.tabletS} {
    padding: 0.95em 0.3em;
  }
`;
