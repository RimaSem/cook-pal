import axios from "axios";
import { useEffect, useState } from "react";
import { SelectElementOptions } from "../types/General";
import { FetchURL } from "../types/RouteNames";
import { useAppDispatch } from "../state/hooks";
import { setErrorMessage } from "../state/error/errorSlice";
import { mergeArrays } from "../utils/basicUtils";
import { setSearchResults, setSearchWord } from "../state/search/searchSlice";
import { handleFetchError } from "../components/shared/ErrorMessage";

const useFilter = () => {
  const [categoryData, setCategoryData] = useState<[]>([]);
  const [areaData, setAreaData] = useState<[]>([]);
  const [searchData, setSearchData] = useState<[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSearchResults(mergeArrays(categoryData, areaData)));
  }, [categoryData, areaData]);

  const filterByCategory = (selectedOption: string) => {
    setSearchData([]);
    if (selectedOption !== SelectElementOptions.DEFAULT_CATEGORY_OPTION) {
      axios
        .get(FetchURL.FILTER_BY_CATEGORY_ENDPOINT + selectedOption)
        .then((response) => {
          handleFetchError(response);
          if (response.data.meals) {
            setCategoryData(
              response.data.meals.map((meal: { idMeal: string }) => meal.idMeal)
            );
          }
        })
        .catch((err) => dispatch(setErrorMessage(err.message)));
    } else {
      setCategoryData([]);
    }
  };

  const filterByArea = (selectedOption: string) => {
    setSearchData([]);
    dispatch(setSearchWord(""));
    if (selectedOption !== SelectElementOptions.DEFAULT_AREA_OPTION) {
      axios
        .get(FetchURL.FILTER_BY_AREA_ENDPOINT + selectedOption)
        .then((response) => {
          handleFetchError(response);
          if (response.data.meals) {
            setAreaData(
              response.data.meals.map((meal: { idMeal: string }) => meal.idMeal)
            );
          }
        })
        .catch((err) => dispatch(setErrorMessage(err.message)));
    } else {
      setAreaData([]);
    }
  };

  const searchByName = (name: string) => {
    axios
      .get(FetchURL.SEARCH_BY_NAME_ENDPOINT + name)
      .then((response) => {
        handleFetchError(response);
        if (response.data.meals) {
          dispatch(
            setSearchResults(
              response.data.meals.map((meal: { idMeal: string }) => meal.idMeal)
            )
          );
          setSearchData(
            response.data.meals.map((meal: { idMeal: string }) => meal.idMeal)
          );
        }
      })
      .catch((err) => dispatch(setErrorMessage(err.message)));
  };

  return {
    filterByCategory,
    filterByArea,
    searchByName,
  };
};

export default useFilter;
