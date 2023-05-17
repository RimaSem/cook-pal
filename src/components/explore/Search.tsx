import { useEffect, useState } from "react";
import { devices } from "../../styles/theme";
import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../../state/hooks";
import { searchWordSelector } from "../../state/search/searchSelectors";
import { setSearchWord } from "../../state/search/searchSlice";
import { setErrorMessage } from "../../state/error/errorSlice";
import { FetchURL } from "../../types/RouteNames";
import { LocalStorageItems, SelectElementOptions } from "../../types/General";

interface SearchProps {
  categoryInputRef: React.RefObject<HTMLSelectElement>;
  areaInputRef: React.RefObject<HTMLSelectElement>;
  setShowRecipes: React.Dispatch<React.SetStateAction<JSX.Element[]>>;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  setSelectedArea: React.Dispatch<React.SetStateAction<string>>;
  setCategoryArray: React.Dispatch<React.SetStateAction<string[]>>;
  setAreaArray: React.Dispatch<React.SetStateAction<string[]>>;
  setFilteredRecipes: React.Dispatch<React.SetStateAction<string[]>>;
}

const Search: React.FC<SearchProps> = ({
  categoryInputRef,
  areaInputRef,
  setShowRecipes,
  setSelectedCategory,
  setSelectedArea,
  setCategoryArray,
  setAreaArray,
  setFilteredRecipes,
}) => {
  const [searchInput, setSearchInput] = useState<string | undefined>();
  const { searchWord } = useAppSelector(searchWordSelector);
  const dispatch = useAppDispatch();

  // Search for recipes by recipe name
  const handleSearch = (input: string = "") => {
    if ((searchInput && searchInput.length > 0) || searchWord.length > 0) {
      if (categoryInputRef.current && areaInputRef.current) {
        categoryInputRef.current.value =
          SelectElementOptions.DEFAULT_CATEGORY_OPTION;
        areaInputRef.current.value = SelectElementOptions.DEFAULT_AREA_OPTION;
      }
      setShowRecipes([]);
      fetch(`${FetchURL.SEARCH_BY_NAME_ENDPOINT + input}`)
        .then((res) => res.json())
        .then((data) => {
          setSelectedCategory(SelectElementOptions.DEFAULT_CATEGORY_OPTION);
          setSelectedArea(SelectElementOptions.DEFAULT_AREA_OPTION);
          setCategoryArray([]);
          setAreaArray([]);
          const newArray: string[] | null = [];
          data.meals.forEach((obj: { idMeal: string }) =>
            newArray.push(obj.idMeal)
          );
          setFilteredRecipes(newArray);
          dispatch(setSearchWord(""));
          localStorage.setItem(
            LocalStorageItems.RECIPES,
            JSON.stringify(newArray)
          );
        })
        .catch((err) => dispatch(setErrorMessage(err.message)));
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
