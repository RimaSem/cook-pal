import styled from "styled-components";
import RecipeCard from "../RecipeCard";

const StyledMain = styled.main`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.9em;
  margin: 3.125em 0;
  max-width: var(--width-max);
  width: 95%;
`;

const AllCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.9em;
  width: 100%;
`;

const LoadMoreBtn = styled.button`
  transition: opacity 0.3s;
  margin-top: 2em;
  border: none;
  border-radius: 10px;
  max-width: 95%;
  width: 25em;
  height: 3.25em;
  background-color: var(--color-accent-green);
  cursor: pointer;
  font-size: 1.125em;
  font-family: var(--font-primary);
  font-weight: 500;
  color: var(--color-white);

  &:hover {
    opacity: 0.85;
  }

  @media (max-width: 865px) {
    margin-top: 0.3em;
  }
`;

const Main = () => {
  return (
    <StyledMain>
      <AllCards>
        {/* the array below is a temporary placeholder */}
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <RecipeCard key={item} />
        ))}
      </AllCards>
      <LoadMoreBtn>Load More</LoadMoreBtn>
    </StyledMain>
  );
};

export default Main;
