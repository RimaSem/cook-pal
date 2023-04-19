import styled from "styled-components";
import { Icon } from "@mdi/react";
import { mdiMagnify } from "@mdi/js";

const StyledSearchBar = styled.div`
  display: flex;
  margin-left: 1.5em;
  max-width: 31em;
  height: 2.625em;

  div {
    border: none;
    width: 3.45em;
    background-image: url(${mdiMagnify});
    background-size: cover;
    color: var(--color-accent-green);
  }
`;

const StyledInput = styled.input`
  font-family: inherit;
`;

const SearchBar = () => {
  return (
    <StyledSearchBar>
      <StyledInput name="search-bar" placeholder="Search for recipes..." />
      <div className="">
        <Icon path={mdiMagnify} size={1} />
      </div>
    </StyledSearchBar>
  );
};

export default SearchBar;
