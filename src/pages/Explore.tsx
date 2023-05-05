import { StyledPageHeading, MainContainer } from "../styles/sharedStyles";
import styled from "styled-components";
import { categoryOptions, areaOptions } from "../utils/basicUtils";

const Explore: React.FC = () => {
  const categories = categoryOptions.map((category) => (
    <StyledOption key={category} value={category}>
      {category}
    </StyledOption>
  ));

  const areas = areaOptions.map((area) => (
    <StyledOption key={area} value={area}>
      {area}
    </StyledOption>
  ));

  return (
    <ExploreContainer>
      <Filters>
        <StyledSelect name="category" defaultValue="-- Select Category --">
          <StyledOption value="none">-- Select Category --</StyledOption>
          {categories}
        </StyledSelect>
        <StyledSelect name="area" defaultValue="-- Select Area --">
          <StyledOption value="none">-- Select Area --</StyledOption>
          {areas}
        </StyledSelect>
        <Search>
          <SearchInput />
          <StyledButton>Search</StyledButton>
        </Search>
      </Filters>
    </ExploreContainer>
  );
};

export default Explore;

const ExploreContainer = styled(MainContainer)`
  flex-direction: column;
  align-items: center;
`;

const Filters = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5em;
  padding: 0.75rem;
  min-width: 100%;
`;

const StyledSelect = styled.select`
  margin: 0 1.3em 0 0;
  border-radius: 6px;
  padding: 0.2em 0.1em;
  min-width: 13em;
  font-size: 1rem;
  font-family: inherit;
  font-weight: 300;
  text-align: center;

  &:focus {
    outline: none;
  }

  @media ${({ theme }) => theme.mQueries.primaryQ} {
    margin: 0;
  }
`;

const StyledOption = styled.option`
  font-weight: 300;
`;

const Search = styled.div`
  display: flex;
  width: 40%;

  @media ${({ theme }) => theme.mQueries.primaryQ} {
    margin: 1em auto 0 auto;
    width: 80%;
  }

  @media ${({ theme }) => theme.mQueries.heroSmallerQ} {
    width: 100%;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  border: 1px solid ${({ theme }) => theme.colors.accentGreen};
  border-radius: 6px 0px 0px 6px;
  padding-left: 0.75em;
  font-size: 0.875em;
  font-weight: 400;
  font-family: inherit;

  &:focus {
    outline: 1px solid ${({ theme }) => theme.colors.accentGreen};
  }
`;

const StyledButton = styled.button`
  border: none;
  border-radius: 0px 6px 6px 0px;
  padding: 0 1em;
  width: fit-content;
  height: 2.625em;
  background-color: ${({ theme }) => theme.colors.accentGreen};
  cursor: pointer;
  font-size: 1rem;
  font-family: inherit;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    opacity: 0.9;
  }

  @media ${({ theme }) => theme.mQueries.heroSmallerQ} {
    height: 3em;
    font-size: 0.7rem;
  }
`;
