import { SyntheticEvent, useEffect, useState } from "react";
import { StyledPageHeading, MainContainer } from "../styles/sharedStyles";
import styled from "styled-components";
import { db, auth } from "../firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { setErrorMessage } from "../state/error/errorSlice";
import ErrorMessage from "../components/shared/ErrorMessage";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { FirebaseCollections } from "../types/General";
import { errorMessageSelector } from "../state/error/errorSelectors";

const GroceryList: React.FC = () => {
  const [groceryArray, setGroceryArray] = useState<string[]>([""]);
  const [groceryElements, setGroceryElements] = useState<JSX.Element[]>([]);
  const { errorMessage } = useAppSelector(errorMessageSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getGroceriesFromDatabase = async () => {
      try {
        if (auth.currentUser) {
          const docToUpdate = doc(
            db,
            FirebaseCollections.USER_COLLECTION,
            auth.currentUser.uid
          );
          const docData = (await getDoc(docToUpdate)).data();
          setGroceryArray(docData?.groceryList);
        }
      } catch (err) {
        dispatch(setErrorMessage((err as Error).message));
      }
    };

    getGroceriesFromDatabase();
  }, []);

  const removeItem = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const removedItem = (e.target as HTMLElement).parentNode?.textContent;

    setGroceryArray((prev) =>
      prev?.filter((item) => item !== removedItem?.slice(0, -6))
    );

    try {
      if (auth.currentUser) {
        const docToUpdate = doc(
          db,
          FirebaseCollections.USER_COLLECTION,
          auth.currentUser.uid
        );
        await updateDoc(docToUpdate, {
          groceryList: groceryArray.filter(
            (item) => item !== removedItem?.slice(0, -6)
          ),
        });
      }
    } catch (err) {
      dispatch(setErrorMessage((err as Error).message));
    }
  };

  useEffect(() => {
    setGroceryElements(
      groceryArray.map((item, index) => (
        <GroceryItem key={index}>
          {item}
          <DeleteItemBtn onClick={removeItem}>Remove</DeleteItemBtn>
        </GroceryItem>
      ))
    );
  }, [groceryArray]);

  return (
    <GroceryContainer>
      <StyledPageHeading>Grocery List</StyledPageHeading>
      {errorMessage ? (
        <ErrorMessage />
      ) : (
        <GroceryWrapper>{groceryElements}</GroceryWrapper>
      )}
    </GroceryContainer>
  );
};

export default GroceryList;

const GroceryContainer = styled(MainContainer)`
  flex-direction: column;
  align-items: center;
`;

const GroceryWrapper = styled.div``;

const GroceryItem = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1em;
  margin-bottom: 1.5em;
`;

const DeleteItemBtn = styled.button`
  border: none;
  border-radius: 4px;
  padding: 0 1em;
  height: 1.5rem;
  background-color: ${({ theme }) => theme.colors.navBtn4};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.white};
  font-family: inherit;
  font-weight: 300;

  &:hover {
    background-color: ${({ theme }) => theme.colors.red};
  }
`;
