import styled from "styled-components";

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

const RecipeDetail: React.FC = () => (
  <RecipeContainer>
    <DishName>Spicy Arrabiata Penne</DishName>
    <AreaLabel>Italian</AreaLabel> <CategoryLabel>Vegetarian</CategoryLabel>
    <TopWrapper>
      <Image src="https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg" />
      <Ingredients>
        <SectionName>Ingredients</SectionName>
        <IngredientList>
          <UnorderedList>
            <ListItem>
              <StyledSpan>1 pound</StyledSpan> penne rigate
            </ListItem>
            <ListItem>
              <StyledSpan>1/4 cup</StyledSpan> olive oil
            </ListItem>
            <ListItem>
              <StyledSpan>3 cloves</StyledSpan> garlic
            </ListItem>
            <ListItem>
              <StyledSpan>1 tin</StyledSpan> chopped tomatoes
            </ListItem>
            <ListItem>
              <StyledSpan>1/2 teaspoon</StyledSpan> red chile flakes
            </ListItem>
            <ListItem>
              <StyledSpan>1/2 teaspoon</StyledSpan> italian seasoning
            </ListItem>
            <ListItem>
              <StyledSpan>6 leaves</StyledSpan> basil
            </ListItem>
            <ListItem>
              <StyledSpan>sprinkling</StyledSpan> Parmigiano-Reggiano
            </ListItem>
          </UnorderedList>
        </IngredientList>
      </Ingredients>
    </TopWrapper>
    <Instructions>
      <SectionName>Instructions</SectionName>
      <InstructionsText>
        Bring a large pot of water to a boil. Add kosher salt to the boiling
        water, then add the pasta. Cook according to the package instructions,
        about 9 minutes.
        <br />
        In a large skillet over medium-high heat, add the olive oil and heat
        until the oil starts to shimmer. Add the garlic and cook, stirring,
        until fragrant, 1 to 2 minutes. Add the chopped tomatoes, red chile
        flakes, Italian seasoning and salt and pepper to taste. Bring to a boil
        and cook for 5 minutes. Remove from the heat and add the chopped basil.
        <br />
        Drain the pasta and add it to the sauce. Garnish with
        Parmigiano-Reggiano flakes and more basil and serve warm.
      </InstructionsText>
    </Instructions>
  </RecipeContainer>
);

export default RecipeDetail;
