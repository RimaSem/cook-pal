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

const Explore: React.FC = () => {
  const [filteredRecipes, setFilteredRecipes] = useState<
    string[] | undefined
  >();
  const [showRecipes, setShowRecipes] = useState<JSX.Element[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Category");
  const [selectedArea, setSelectedArea] = useState<string>("Area");
  const [categoryArray, setCategoryArray] = useState<string[] | undefined>();
  const [areaArray, setAreaArray] = useState<string[] | undefined>();
  const { errorMessage } = useAppSelector(errorMessageSelector);
  const { searchWord } = useAppSelector(searchWordSelector);
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

  // Filter by category
  useEffect(() => {
    setShowRecipes([]);
    if (selectedCategory !== "Category") {
      fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
      )
        .then((res) => res.json())
        .then((data) => {
          const newArray: string[] | null = [];
          data.meals.forEach((obj: { idMeal: string }) =>
            newArray.push(obj.idMeal)
          );
          setCategoryArray(newArray);
          if (selectedArea !== "Area") {
            setFilteredRecipes(
              newArray.filter((item) => areaArray?.includes(item))
            );
          } else {
            setFilteredRecipes(newArray);
          }
        })
        .catch((err) => dispatch(setErrorMessage(err.message)));
    } else {
      setCategoryArray([]);
      setFilteredRecipes(areaArray);
    }
  }, [selectedCategory]);

  // Filter by area
  useEffect(() => {
    setShowRecipes([]);
    if (selectedArea !== "Area") {
      fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`
      )
        .then((res) => res.json())
        .then((data) => {
          const newArray: string[] = [];
          data.meals.forEach((obj: { idMeal: string }) =>
            newArray.push(obj.idMeal)
          );
          setAreaArray(newArray);
          if (selectedCategory !== "Category") {
            setFilteredRecipes(
              newArray.filter((item) => categoryArray?.includes(item))
            );
          } else {
            setFilteredRecipes(newArray);
          }
        })
        .catch((err) => dispatch(setErrorMessage(err.message)));
    } else {
      setAreaArray([]);
      setFilteredRecipes(categoryArray);
    }
  }, [selectedArea]);

  // Display filtered recipes
  useEffect(() => {
    if (filteredRecipes) {
      filteredRecipes?.forEach((recipeID) => {
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
    }
  }, [filteredRecipes]);

  useEffect(() => {
    if (searchWord === "") {
      setFilteredRecipes(defaultRecipes);
    }
    window.scrollTo({
      top: 450,
    });
  }, []);

  return (
    <ExploreContainer>
      <StyledPageHeading>Browse Recipes</StyledPageHeading>
      <Filters>
        <StyledSelect
          ref={categoryInputRef}
          name="category"
          defaultValue="Category"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <StyledOption value="Category">Category</StyledOption>
          {categories}
        </StyledSelect>
        <StyledSelect
          ref={areaInputRef}
          name="area"
          onChange={(e) => setSelectedArea(e.target.value)}
        >
          <StyledOption value="Area">Area</StyledOption>
          {areas}
        </StyledSelect>
        <Search
          categoryInputRef={categoryInputRef}
          areaInputRef={areaInputRef}
          setShowRecipes={setShowRecipes}
          setSelectedCategory={setSelectedCategory}
          setSelectedArea={setSelectedArea}
          setCategoryArray={setCategoryArray}
          setAreaArray={setAreaArray}
          setFilteredRecipes={setFilteredRecipes}
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
