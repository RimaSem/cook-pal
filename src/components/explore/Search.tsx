import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../../state/hooks";
import { getSearchWord } from "../../state/search/searchSelectors";
import { setSearchWord } from "../../state/search/searchSlice";
import { setErrorMessage } from "../../state/error/errorSlice";

interface SearchProps {
  setShowRecipes: React.Dispatch<React.SetStateAction<JSX.Element[]>>;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  setSelectedArea: React.Dispatch<React.SetStateAction<string>>;
  setCategoryArray: React.Dispatch<React.SetStateAction<string[] | undefined>>;
  setAreaArray: React.Dispatch<React.SetStateAction<string[] | undefined>>;
  setFilteredRecipes: React.Dispatch<
    React.SetStateAction<string[] | undefined>
  >;
}

const Search: React.FC<SearchProps> = ({
  setShowRecipes,
  setSelectedCategory,
  setSelectedArea,
  setCategoryArray,
  setAreaArray,
  setFilteredRecipes,
}) => {
  const [searchInput, setSearchInput] = useState<string | undefined>(undefined);
  const { searchWord } = useAppSelector(getSearchWord);
  const dispatch = useAppDispatch();
  const categorySelect = document.querySelector(
    ".category-select"
  ) as HTMLSelectElement;
  const areaSelect = document.querySelector(
    ".area-select"
  ) as HTMLSelectElement;

  // Search for recipes by recipe name
  const handleSearch = (input: string = "") => {
    if ((searchInput && searchInput !== "") || searchWord !== "") {
      if (categorySelect?.value && areaSelect?.value) {
        categorySelect.value = "Category";
        areaSelect.value = "Area";
      }
      setShowRecipes([]);
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
        .then((res) => res.json())
        .then((data) => {
          setSelectedCategory("Category");
          setSelectedArea("Area");
          setCategoryArray([]);
          setAreaArray([]);
          const newArr: string[] | null = [];
          data.meals.forEach((obj: { idMeal: string }) =>
            newArr.push(obj.idMeal)
          );
          setFilteredRecipes(newArr);
          dispatch(setSearchWord(""));
        })
        .catch((err) => dispatch(setErrorMessage(err.message)));
    }
  };

  // Search for recipes via header search bar
  useEffect(() => {
    if (searchWord !== "") {
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
