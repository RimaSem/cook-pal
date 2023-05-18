import { useEffect, useState } from "react";
import { devices } from "../../styles/theme";
import styled from "styled-components";
import { useAppSelector } from "../../state/hooks";
import { searchWordSelector } from "../../state/search/searchSelectors";

import useFilter from "../../hooks/useFilter";

interface SearchProps {
  setDisplayRecipes: React.Dispatch<React.SetStateAction<JSX.Element[]>>;
}

const Search: React.FC<SearchProps> = ({ setDisplayRecipes }) => {
  const [searchInput, setSearchInput] = useState<string>("");
  const { searchWord } = useAppSelector(searchWordSelector);
  const { searchByName } = useFilter();

  const handleSearch = (input: string) => {
    if (input.length > 0) {
      setDisplayRecipes([]);
      searchByName(input);
    }
  };

  // Search for recipes via header search bar
  useEffect(() => {
    if (searchWord.length > 0) {
      handleSearch(searchWord);
    }
  }, [searchWord]);

  return (
    <StyledSearch>
      <SearchInput onChange={(e) => setSearchInput(e.target.value)} />
      <StyledButton onClick={() => handleSearch(searchInput)}>
        Search
      </StyledButton>
    </StyledSearch>
  );
};

export default Search;

const StyledSearch = styled.div`
  display: flex;
  width: 40%;

  @media ${devices.tabletM} {
    margin: 1em auto 0 auto;
    width: 80%;
  }

  @media ${devices.mobileXL} {
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

  @media ${devices.mobileXL} {
    height: 3em;
    font-size: 0.7rem;
  }
`;
