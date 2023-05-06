import {
  StyledPageHeading,
  MainContainer,
  CardContainer,
} from "../styles/sharedStyles";
import styled from "styled-components";
import {
  categoryOptions,
  areaOptions,
  defaultRecipes,
} from "../utils/basicUtils";
import { useEffect, useState } from "react";
import { Recipe } from "../components/home/Main";
import ErrorMessage, {
  handleFetchError,
} from "../components/shared/ErrorMessage";
import RecipeCard from "../components/home/RecipeCard";
import { setErrorMessage } from "../state/error/errorSlice";
import { getErrorMessage } from "../state/error/errorSelectors";
import { useSelector } from "react-redux";

const Explore: React.FC = () => {
  const [showRecipes, setShowRecipes] = useState<JSX.Element[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(
    "-- Select Category --"
  );
  const [selectedArea, setSelectedArea] = useState("-- Select Area --");
  const { errorMessage } = useSelector(getErrorMessage);

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

  const sampleRecipes = () => {
    setShowRecipes([]);
    defaultRecipes.forEach((recipeID) => {
      fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeID}`,
        {
          method: "GET",
          mode: "cors",
        }
      )
        .then((res) => {
          handleFetchError(res);
          return res.json();
        })
        .then((data) =>
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
          ])
        )
        .catch((err) => dispatch(setErrorMessage(err.message)));
    });
  };

  const getRecipesByCategory = (category: string) => {
    if (!selectedCategory.includes("Select")) {
    }
  };

  useEffect(() => {
    sampleRecipes();
  }, []);

  return (
    <ExploreContainer>
      <Filters>
        <StyledSelect
          name="category"
          defaultValue="-- Select Category --"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <StyledOption value="none">-- Select Category --</StyledOption>
          {categories}
        </StyledSelect>
        <StyledSelect
          name="area"
          defaultValue="-- Select Area --"
          onChange={(e) => setSelectedArea(e.target.value)}
        >
          <StyledOption value="none">-- Select Area --</StyledOption>
          {areas}
        </StyledSelect>
        <Search>
          <SearchInput />
          <StyledButton>Search</StyledButton>
        </Search>
      </Filters>
      <FilteredCards>
        {errorMessage ? <ErrorMessage /> : showRecipes}
      </FilteredCards>
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

const FilteredCards = styled(CardContainer)``;
function dispatch(arg0: any): any {
  throw new Error("Function not implemented.");
}
