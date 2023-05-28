import {
  StyledPageHeading,
  MainContainer,
  CardContainer,
} from "../styles/sharedStyles";
import styled from "styled-components";
import ErrorMessage from "../components/shared/ErrorMessage";
import RecipeCard from "../components/home/RecipeCard";
import { errorMessageSelector } from "../state/error/errorSelectors";
import { useAppSelector } from "../state/hooks";
import { searchWordSelector } from "../state/search/searchSelectors";
import { FetchErrorMessages } from "../types/AuthMessages";
import { useQueries } from "@tanstack/react-query";
import { fetchRecipeById } from "../utils/fetches";
import Spinner from "../components/shared/Spinner";
import Filters from "../components/explore/Filters";

const Explore: React.FC = () => {
  const { errorMessage } = useAppSelector(errorMessageSelector);
  const { searchResults, searchWord } = useAppSelector(searchWordSelector);

  const queries = useQueries({
    queries: searchResults?.map((item) => {
      return {
        queryKey: ["recipe", item],
        queryFn: () => fetchRecipeById(item),
        enabled: !!searchResults || !!searchWord,
      };
    }),
  });

  if (queries.some((query) => query.isError))
    return <ErrorMessage>{FetchErrorMessages.FETCH_ERROR}</ErrorMessage>;

  return (
    <ExploreContainer>
      <StyledPageHeading>Browse Recipes</StyledPageHeading>
      <Filters />
      {queries.some((query) => query.isLoading) ? (
        <Spinner />
      ) : (
        <CardContainer>
          {errorMessage ? (
            <ErrorMessage />
          ) : (
            queries?.map((query) => (
              <RecipeCard
                key={query.data?.meals[0]?.idMeal}
                cardData={{
                  id: query.data?.meals[0]?.idMeal,
                  name: query.data?.meals[0]?.strMeal,
                  category: query.data?.meals[0]?.strCategory,
                  area: query.data?.meals[0]?.strArea,
                  img: query.data?.meals[0]?.strMealThumb,
                }}
              />
            ))
          )}
        </CardContainer>
      )}
    </ExploreContainer>
  );
};

export default Explore;

const ExploreContainer = styled(MainContainer)`
  flex-direction: column;
  align-items: center;
`;
