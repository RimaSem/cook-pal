import axios from "axios";
import { useEffect, useState } from "react";
import { SelectElementOptions } from "../types/General";
import { FetchURL } from "../types/RouteNames";
import { useAppDispatch } from "../state/hooks";
import { setErrorMessage } from "../state/error/errorSlice";
import { mergeArrays } from "../utils/basicUtils";
import { setSearchResults, setSearchWord } from "../state/search/searchSlice";
import { handleFetchError } from "../components/shared/ErrorMessage";

interface FilterProps {
  byCategory: string[];
  byArea: string[];
}

const useFilter = () => {
  const [filteredData, setFilteredData] = useState<FilterProps>({
    byCategory: [],
    byArea: [],
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (filteredData.byCategory.length > 0 || filteredData.byArea.length > 0) {
      dispatch(
        setSearchResults(
          mergeArrays(filteredData.byCategory, filteredData.byArea)
        )
      );
    }
  }, [filteredData]);

  const filterByCategory = (selectedOption: string) => {
    dispatch(setSearchWord(""));
    if (selectedOption !== SelectElementOptions.DEFAULT_CATEGORY_OPTION) {
      axios
        .get(FetchURL.FILTER_BY_CATEGORY_ENDPOINT + selectedOption)
        .then((response) => {
          handleFetchError(response);
          if (response.data.meals) {
            setFilteredData({
              ...filteredData,
              byCategory: response.data.meals.map(
                (meal: { idMeal: string }) => meal.idMeal
              ),
            });
          }
        })
        .catch((err) => dispatch(setErrorMessage(err.message)));
    } else {
      setFilteredData({ ...filteredData, byCategory: [] });
    }
  };

  const filterByArea = (selectedOption: string) => {
    dispatch(setSearchWord(""));
    if (selectedOption !== SelectElementOptions.DEFAULT_AREA_OPTION) {
      axios
        .get(FetchURL.FILTER_BY_AREA_ENDPOINT + selectedOption)
        .then((response) => {
          handleFetchError(response);
          if (response.data.meals) {
            setFilteredData({
              ...filteredData,
              byArea: response.data.meals.map(
                (meal: { idMeal: string }) => meal.idMeal
              ),
            });
          }
        })
        .catch((err) => dispatch(setErrorMessage(err.message)));
    } else {
      setFilteredData({ ...filteredData, byArea: [] });
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
