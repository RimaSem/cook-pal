import { Icon } from "@mdi/react";
import { mdiMagnify } from "@mdi/js";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import {
  setSearchResults,
  setSearchWord,
} from "../../state/search/searchSlice";
import { useState } from "react";
import { useNavigate } from "react-router";
import { RouteNames } from "../../types/RouteNames";
import { devices } from "../../styles/theme";
import { searchWordSelector } from "../../state/search/searchSelectors";

const SearchBar: React.FC = () => {
  const [typedWord, setTypedWord] = useState("");
  const { searchWord } = useAppSelector(searchWordSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    if (typedWord !== "" && searchWord !== typedWord) {
      dispatch(setSearchResults([]));
      dispatch(setSearchWord(typedWord));
      navigate(`${RouteNames.HOME + RouteNames.RECIPES}`);
      window.scrollTo({
        top: 450,
      });
    }
  };

  return (
    <StyledSearchBar>
      <StyledInput
        name="search-bar"
        placeholder="Search for recipes..."
        onChange={(e) => setTypedWord(e.target.value)}
      />
      <StyledIcon onClick={handleClick}>
        <Icon className="search-bar-icon" path={mdiMagnify} />
      </StyledIcon>
    </StyledSearchBar>
  );
};

export default SearchBar;

const StyledSearchBar = styled.div`
  display: flex;
  margin: 0 2em;
  max-width: 31em;
  width: 100%;
  height: 2.625em;

  @media ${devices.tabletM} {
    display: none;
  }
`;

const StyledInput = styled.input`
  flex: 1;
  border: none;
  border-radius: 2px 0px 0px 2px;
  padding-left: 0.75em;
  background-color: ${({ theme }) => theme.colors.inputLight};
  font-size: 0.875em;
  font-weight: 400;
  font-family: inherit;

  &:focus {
    outline: none;
  }
`;

const StyledIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0px 2px 2px 0px;
  width: 3.45em;
  height: 2.625em;
  background-color: ${({ theme }) => theme.colors.accentGreen};
  cursor: pointer;

  .search-bar-icon {
    height: 2em;
    color: ${({ theme }) => theme.colors.white};
  }
`;
