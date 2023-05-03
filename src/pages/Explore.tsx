import { StyledPageHeading, MainContainer } from "../styles/sharedStyles";
import styled from "styled-components";

const Explore: React.FC = () => (
  <ExploreContainer>
    <PageHeading>Browse Recipes</PageHeading>
    <Text>Work in progress...</Text>
  </ExploreContainer>
);

export default Explore;

const ExploreContainer = styled(MainContainer)`
  flex-direction: column;
  align-items: center;
`;

const PageHeading = styled(StyledPageHeading)``;

const Text = styled.p``;
