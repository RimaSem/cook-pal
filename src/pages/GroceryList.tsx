import { StyledPageHeading, MainContainer } from "../styles/sharedStyles";
import styled from "styled-components";

const GroceryContainer = styled(MainContainer)`
  flex-direction: column;
  align-items: center;
`;

const PageHeading = styled(StyledPageHeading)``;

const Text = styled.p``;

const GroceryList: React.FC = () => (
  <GroceryContainer>
    <PageHeading>Grocery List</PageHeading>
    <Text>Work in progress...</Text>
  </GroceryContainer>
);

export default GroceryList;
