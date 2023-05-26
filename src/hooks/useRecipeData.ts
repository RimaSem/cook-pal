import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FetchURL } from "../types/RouteNames";
import { setErrorMessage } from "../state/error/errorSlice";
import { useAppDispatch } from "../state/hooks";

export const fetchRecipeById = async (recipeId: string | undefined) => {
  const response = await axios.get(FetchURL.SEARCH_BY_ID_ENDPOINT + recipeId);
  return response.data;
};

export const useRecipeData = (recipeId: string | undefined) => {
  const dispatch = useAppDispatch();
  dispatch(setErrorMessage(null));
  return useQuery({
    queryKey: ["recipe"],
    queryFn: () => fetchRecipeById(recipeId),
  });
};
