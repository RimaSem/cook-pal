import { useSelector } from "react-redux";
import { useAppDispatch } from "../state/hooks";
import { getErrorMessage } from "../state/error/errorSelectors";
import { setErrorMessage } from "../state/error/errorSlice";
import ErrorMessage, {
  handleFetchError,
} from "../components/shared/ErrorMessage";
import { SyntheticEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/shared/BackButton";
import { StyledPageHeading } from "../styles/sharedStyles";
import styled from "styled-components";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const recipeData = {
  name: "",
  area: "",
  category: "",
  image: "",
  instructions: "",
};

const RecipeDetail: React.FC = () => {
  const [recipe, setRecipe] = useState(recipeData);
  const [amounts, setAmounts] = useState<string[]>([""]);
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const { id } = useParams();
  const { errorMessage } = useSelector(getErrorMessage);
  const dispatch = useAppDispatch();

  window.scrollTo({
    top: 450,
  });

  const getIngredients = (obj: any) => {
    const amountArr = [];
    const ingredientArr = [];
    for (const key in obj) {
      if (key.startsWith("strMeasure") && obj[key] && obj[key] !== " ") {
        amountArr.push(obj[key]);
      }
      if (key.startsWith("strIngredient") && obj[key] && obj[key] !== " ") {
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
        handleFetchError(res);
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
        dispatch(setErrorMessage(null));
      })
      .catch((err) => dispatch(setErrorMessage(err.message)));
  }, []);

  const addToGroceryList = async (e: SyntheticEvent) => {
    const addedItem = (e.target as HTMLElement).textContent;
    try {
      if (auth.currentUser) {
        const docToUpdate = doc(db, "users", auth.currentUser.uid);
        const docData = (await getDoc(docToUpdate)).data();
        if (!docData?.groceryList.includes(addedItem)) {
          const markAsAdded = (e.target as HTMLElement).parentNode?.firstChild;
          (markAsAdded as HTMLSpanElement).style.display = "block";
          await updateDoc(docToUpdate, {
            groceryList: [...docData?.groceryList, addedItem],
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const listItemsArr = () => {
    const arr = [];
    for (let i = 0; i < amounts.length; i++) {
      arr.push(
        <ListItem key={i}>
          <AddedSpan>&#10003;</AddedSpan>
          <LinkWrapper onClick={addToGroceryList}>
            <StyledSpan>{amounts[i] + " "}</StyledSpan>
            {ingredients[i]}
          </LinkWrapper>
        </ListItem>
      );
    }
    return arr;
  };

  return (
    <RecipeContainer>
      {errorMessage ? (
        <ErrorMessage />
      ) : (
        <>
          <DishName>{recipe.name}</DishName>
          <Text>
            Click on an ingredient to add it to your grocery list (for
            registered users only).
          </Text>
          <AreaLabel>{recipe.area}</AreaLabel>
          <CategoryLabel>{recipe.category}</CategoryLabel>
          <TopWrapper>
            <Image src={recipe.image} alt="Recipe image" />
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
          <BackButton />
        </>
      )}
    </RecipeContainer>
  );
};

export default RecipeDetail;

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

const DishName = styled(StyledPageHeading)`
  @media ${({ theme }) => theme.mQueries.secondaryQ} {
    font-size: 1.8rem;
  }
`;

const Text = styled.p`
  margin: 0 0 3em 0;
  text-align: center;
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
  padding: 0;
`;

const ListItem = styled.li`
  position: relative;
  list-style: none;
  width: fit-content;

  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.navBtn3};
    text-decoration: underline;
  }
`;

const LinkWrapper = styled.div``;

const StyledSpan = styled.span`
  font-weight: 600;
`;

const AddedSpan = styled.span`
  display: none;
  position: absolute;
  left: -20px;
  cursor: default;
  font-size: 1rem;
  font-weight: 700;
  color: green;
`;
