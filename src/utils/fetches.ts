import axios from "axios";
import { FetchURL } from "../types/RouteNames";

export const fetchRecipeById = async (recipeId: string | undefined) => {
  const response = await axios.get(FetchURL.SEARCH_BY_ID_ENDPOINT + recipeId);
  return response.data.meals[0];
};

export const fetchRecipesByLetter = async (letter: string) => {
  const response = await axios.get(
    FetchURL.SEARCH_BY_FIRST_LETTER_ENDPOINT + letter
  );
  return response.data.meals;
};

export const fetchRandomRecipe = async () => {
  const response = await axios.get(FetchURL.RANDOM_RECIPE_ENDPOINT);
  return response.data.meals[0];
};
