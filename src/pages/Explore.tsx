import {
  StyledPageHeading,
  MainContainer,
  CardContainer,
} from "../styles/sharedStyles";
import styled from "styled-components";
import Search from "../components/explore/Search";
import {
  categoryOptions,
  areaOptions,
  defaultRecipes,
  mergeArrays,
} from "../utils/basicUtils";
import { useEffect, useRef, useState } from "react";
import ErrorMessage, {
  handleFetchError,
} from "../components/shared/ErrorMessage";
import RecipeCard from "../components/home/RecipeCard";
import { setErrorMessage } from "../state/error/errorSlice";
import { errorMessageSelector } from "../state/error/errorSelectors";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { searchWordSelector } from "../state/search/searchSelectors";
import { devices } from "../styles/theme";
import { FetchURL } from "../types/RouteNames";
import { FetchErrorMessages } from "../types/AuthMessages";
import useFilter from "../hooks/useFilter";

const Explore: React.FC = () => {
  const { filterByCategory, filterByArea, categoryData, areaData, searchData } =
    useFilter();
  const [showRecipes, setShowRecipes] = useState<JSX.Element[]>([]);
  const { errorMessage } = useAppSelector(errorMessageSelector);
  const { searchWord, searchResults } = useAppSelector(searchWordSelector);
  const dispatch = useAppDispatch();

  const categoryInputRef = useRef<HTMLSelectElement>(null);
  const areaInputRef = useRef<HTMLSelectElement>(null);

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

  // Display filtered recipes
  useEffect(() => {
    setShowRecipes([]);
    // const displayedArray =
    //   searchWord.length > 0
    //     ? searchResults
    //     : mergeArrays(categoryData, areaData);
    if (searchResults) {
      console.log(searchResults);
      searchResults?.forEach((recipeID) => {
        fetch(`${FetchURL.SEARCH_BY_ID_ENDPOINT + recipeID}`, {
          method: "GET",
          mode: "cors",
        })
          .then((res) => {
            handleFetchError(res);
            return res.json();
          })
          .then((data) => {
            if (!data.meals[0]) {
              throw Error(FetchErrorMessages.FETCH_ERROR);
            }
            setShowRecipes((prev) => [
              ...prev,
              <RecipeCard
                key={data.meals[0].idMeal}
                cardData={{
                  id: data.meals[0].idMeal,
                  name: data.meals[0].strMeal,
                  category: data.meals[0].strCategory,
                  area: data.meals[0].strArea,
                  img: data.meals[0].strMealThumb,
                }}
              />,
            ]);
          })
          .catch((err) => dispatch(setErrorMessage(err.message)));
      });
    }
  }, [searchResults]);

  // useEffect(() => {
  //   if (searchWord.length === 0) {
  //     setFilteredRecipes(defaultRecipes);
  //   }
  //   window.scrollTo({
  //     top: 450,
  //   });
  // }, []);

  return (
    <ExploreContainer>
      <StyledPageHeading>Browse Recipes</StyledPageHeading>
      <Filters>
        <StyledSelect
          ref={categoryInputRef}
          name="category"
          defaultValue="Category"
          onChange={(e) => filterByCategory(e.target.value)}
        >
          <StyledOption value="Category">Category</StyledOption>
          {categories}
        </StyledSelect>
        <StyledSelect
          ref={areaInputRef}
          name="area"
          onChange={(e) => filterByArea(e.target.value)}
        >
          <StyledOption value="Area">Area</StyledOption>
          {areas}
        </StyledSelect>
        <Search
          categoryInputRef={categoryInputRef}
          areaInputRef={areaInputRef}
          setShowRecipes={setShowRecipes}
        />
      </Filters>
      <CardContainer>
        {errorMessage ? <ErrorMessage /> : showRecipes}
      </CardContainer>
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
  padding: 0.75em;
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

  @media ${devices.tabletM} {
    margin: 0;
  }
`;

const StyledOption = styled.option`
  font-weight: 300;
`;
