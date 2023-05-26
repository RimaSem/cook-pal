import { SyntheticEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { auth, db } from "../../firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { setErrorMessage } from "../../state/error/errorSlice";
import { FirebaseCollections } from "../../types/General";
import { useAppDispatch } from "../../state/hooks";

interface IngredientProps {
  recipeData: {};
}

const Ingredients: React.FC<IngredientProps> = ({ recipeData }) => {
  const [amounts, setAmounts] = useState<string[]>([""]);
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const dispatch = useAppDispatch();

  const getIngredients = (obj: any) => {
    const amountArray = [];
    const ingredientArray = [];
    for (const key in obj) {
      if (key.startsWith("strMeasure") && obj[key] && obj[key] !== " ")
        amountArray.push(obj[key]);
      if (key.startsWith("strIngredient") && obj[key] && obj[key] !== " ")
        ingredientArray.push(obj[key]);
    }
    setAmounts(amountArray);
    setIngredients(ingredientArray);
  };

  const addToGroceryList = async (e: SyntheticEvent) => {
    const addedItem = (e.target as HTMLElement).textContent;
    try {
      if (auth.currentUser) {
        const docToUpdate = doc(
          db,
          FirebaseCollections.USER_COLLECTION,
          auth.currentUser.uid
        );
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
      dispatch(setErrorMessage((err as Error).message));
    }
  };

  useEffect(() => {
    getIngredients(recipeData);
  }, []);

  const displayIngredients = () => {
    return amounts.map((item, index) => (
      <ListItem key={index}>
        <AddedSpan>&#10003;</AddedSpan>
        <LinkWrapper onClick={addToGroceryList}>
          {item + " " + ingredients[index]}
        </LinkWrapper>
      </ListItem>
    ));
  };

  return (
    <StyledIngredients>
      <SectionName>Ingredients</SectionName>
      <IngredientList>
        <UnorderedList>{displayIngredients()}</UnorderedList>
      </IngredientList>
    </StyledIngredients>
  );
};

export default Ingredients;

const StyledIngredients = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionName = styled.h2`
  align-self: flex-start;
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

const AddedSpan = styled.span`
  display: none;
  position: absolute;
  left: -20px;
  cursor: default;
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.green};
`;
