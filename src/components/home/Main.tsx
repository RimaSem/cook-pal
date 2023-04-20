import styled from "styled-components";
import RecipeCard from "../RecipeCard";

const StyledMain = styled.main`
  display: flex;
  max-width: var(--width-max);
  width: 95%;
`;

const Main = () => {
  return (
    <StyledMain>
      <RecipeCard />
    </StyledMain>
  );
};

export default Main;
