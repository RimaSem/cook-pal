import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

const recipeData = {
  name: "",
  area: "",
  category: "",
  image: "",
  instructions: "",
};

const RecipeContainer = styled.div`
  margin: 3em auto;
  max-width: 62.5em;
  padding: 0.5em 3em;
  color: ${({ theme }) => theme.colors.darker};

  @media ${({ theme }) => theme.mQueries.secondaryQ} {
    margin: 0;
    padding: 0;
  }
`;

const DishName = styled.h1`
  margin: 1.5em 0;
  font-size: 2.2rem;
  text-align: center;

  @media ${({ theme }) => theme.mQueries.secondaryQ} {
    font-size: 1.8rem;
  }
`;

const SectionName = styled.h2`
  align-self: flex-start;
`;

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2em;
  margin-bottom: 3em;
  line-height: 2rem;

  @media ${({ theme }) => theme.mQueries.secondaryQ} {
    margin: 0;
    min-width: 100%;
    flex-direction: column;
    align-items: center;
  }
`;

const Image = styled.img`
  border-radius: 1em;
  max-width: 31.25em;
  width: 50%;
  object-fit: cover;
  object-position: center;

  @media ${({ theme }) => theme.mQueries.secondaryQ} {
    border-radius: 0;
    width: 100%;
    max-height: 21.875em;
  }
`;

const BackBtn = styled.button`
  margin: 2em 0 1em 1em;
  border: none;
  width: fit-content;
  background-color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  font-size: 1.2rem;
  font-family: inherit;
  text-align: left;

  &:hover {
    color: ${({ theme }) => theme.colors.accentGreen};
  }
`;

const AreaLabel = styled.div`
  display: inline-block;
  margin: 0.5em 0.3em 1em 0;
  border-radius: 0.5em;
  padding: 0.5em 1em;
  background-color: ${({ theme }) => theme.colors.navBtn2};
  font-weight: 500;

  @media ${({ theme }) => theme.mQueries.secondaryQ} {
    margin: 0 0.2em 0.2em 2em;
  }
`;

const CategoryLabel = styled(AreaLabel)`
  background-color: ${({ theme }) => theme.colors.navBtn3};

  @media ${({ theme }) => theme.mQueries.secondaryQ} {
    margin: 0 0 0.2em 0;
  }
`;

const Instructions = styled.div`
  line-height: 2em;

  @media ${({ theme }) => theme.mQueries.secondaryQ} {
    margin: 0 1em;
    font-size: 0.9rem;
  }
`;

const InstructionsText = styled.p``;

const Ingredients = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IngredientList = styled.div`
  margin-left: auto;
`;

const UnorderedList = styled.ul`
  margin-top: 0;
  padding-left: 1em;
`;

const ListItem = styled.li``;

const StyledSpan = styled.span`
  font-weight: 600;
`;

const RecipeDetail: React.FC = () => {
  const [recipe, setRecipe] = useState(recipeData);
  const [amounts, setAmounts] = useState<string[]>([""]);
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const { id } = useParams();
  const navigate = useNavigate();

  window.scrollTo({
    top: 450,
  });

  const getIngredients = (obj: any) => {
    const amountArr = [];
    const ingredientArr = [];
    for (const key in obj) {
      if (key.startsWith("strMeasure") && obj[key].trim()) {
        amountArr.push(obj[key]);
      }
      if (key.startsWith("strIngredient") && obj[key].trim()) {
        ingredientArr.push(obj[key]);
      }
    }
    setAmounts(amountArr);
    setIngredients(ingredientArr);
  };

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`, {
      method: "GET",
      mode: "cors",
    })
      .then((res) => {
        if (!res.ok) {
          throw Error(
            res.status + ": Could not fetch the data for that resource"
          );
        }
        return res.json();
      })
      .then((data) => {
        setRecipe({
          name: data.meals[0].strMeal,
          area: data.meals[0].strArea,
          category: data.meals[0].strCategory,
          image: data.meals[0].strMealThumb,
          instructions: data.meals[0].strInstructions,
        });
        getIngredients(data.meals[0]);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const listItemsArr = () => {
    const arr = [];
    for (let i = 0; i < amounts.length; i++) {
      arr.push(
        <ListItem key={i}>
          <StyledSpan>{amounts[i] + " "}</StyledSpan>
          {ingredients[i]}
        </ListItem>
      );
    }
    return arr;
  };

  return (
    <RecipeContainer>
      <DishName>{recipe.name}</DishName>
      <AreaLabel>{recipe.area}</AreaLabel>
      <CategoryLabel>{recipe.category}</CategoryLabel>
      <TopWrapper>
        <Image src={recipe.image} />
        <Ingredients>
          <SectionName>Ingredients</SectionName>
          <IngredientList>
            <UnorderedList>{listItemsArr()}</UnorderedList>
          </IngredientList>
        </Ingredients>
      </TopWrapper>
      <Instructions>
        <SectionName>Instructions</SectionName>
        <InstructionsText>{recipe.instructions}</InstructionsText>
      </Instructions>
      <BackBtn type="button" onClick={() => navigate(-1)}>
        &larr; Go Back
      </BackBtn>
    </RecipeContainer>
  );
};

export default RecipeDetail;
