import styled from "styled-components";
import { Icon } from "@mdi/react";
import { mdiMagnify } from "@mdi/js";

const StyledSearchBar = styled.div`
  display: flex;
  max-width: 31em;
  width: 100%;
  height: 2.625em;
`;

const StyledInput = styled.input`
  flex: 1;
  border: none;
  border-radius: 2px 0px 0px 2px;
  padding-left: 0.75em;
  background-color: #f3f3f3;
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
  background-color: var(--color-accent-green);
  cursor: pointer;

  .search-bar-icon {
    height: 2em;
    color: white;
  }
`;

const SearchBar = () => {
  return (
    <StyledSearchBar>
      <StyledInput name="search-bar" placeholder="Search for recipes..." />
      <StyledIcon>
        <Icon className="search-bar-icon" path={mdiMagnify} />
      </StyledIcon>
    </StyledSearchBar>
  );
};

export default SearchBar;
