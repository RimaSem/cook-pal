import ErrorMessage from "../components/shared/ErrorMessage";
import { useParams } from "react-router-dom";
import BackButton from "../components/shared/BackButton";
import { StyledPageHeading } from "../styles/sharedStyles";
import styled from "styled-components";
import Spinner from "../components/shared/Spinner";
import Ingredients from "../components/recipeDetail/Ingredients";
import { devices } from "../styles/theme";
import { fetchRecipeById } from "../utils/fetches";
import { useQuery } from "@tanstack/react-query";
import { errorMessageSelector } from "../state/error/errorSelectors";
import { useAppSelector } from "../state/hooks";

const RecipeDetail: React.FC = () => {
  const { errorMessage } = useAppSelector(errorMessageSelector);
  const { id } = useParams();

  window.scrollTo({
    top: 450,
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["recipe", id],
    queryFn: () => fetchRecipeById(id),
  });

  if (isLoading) return <Spinner />;

  if (isError) return <ErrorMessage>{(error as Error).message}</ErrorMessage>;

  return (
    <RecipeContainer>
      {errorMessage ? (
        <ErrorMessage />
      ) : (
        <>
          <DishName>{data?.meals[0]?.strMeal}</DishName>
          <Text>
            Click on an ingredient to add it to your grocery list (for
            registered users only).
          </Text>
          <AreaLabel>{data?.meals[0]?.strArea}</AreaLabel>
          <CategoryLabel>{data?.meals[0]?.strCategory}</CategoryLabel>
          <TopWrapper>
            <Image src={data?.meals[0]?.strMealThumb} alt="Recipe image" />
            <Ingredients recipeData={data?.meals[0]} />
          </TopWrapper>
          <Instructions>
            <SectionName>Instructions</SectionName>
            <InstructionsText>
              {data?.meals[0]?.strInstructions}
            </InstructionsText>
          </Instructions>
        </>
      )}

      <BackButton />
    </RecipeContainer>
  );
};

export default RecipeDetail;

const RecipeContainer = styled.div`
  margin: 3em auto;
  max-width: 62.5em;
  padding: 0.5em 3em;
  color: ${({ theme }) => theme.colors.darker};

  @media ${devices.tabletXS} {
    margin: 0;
    padding: 0;
  }
`;

const DishName = styled(StyledPageHeading)`
  @media ${devices.tabletXS} {
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

  @media ${devices.tabletXS} {
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

  @media ${devices.tabletXS} {
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

  @media ${devices.tabletXS} {
    margin: 0 0.2em 0.2em 2em;
  }
`;

const CategoryLabel = styled(AreaLabel)`
  background-color: ${({ theme }) => theme.colors.navBtn3};

  @media ${devices.tabletXS} {
    margin: 0 0 0.2em 0;
  }
`;

const Instructions = styled.div`
  line-height: 2em;

  @media ${devices.tabletXS} {
    margin: 0 1em;
    font-size: 0.9rem;
  }
`;

const InstructionsText = styled.p``;
