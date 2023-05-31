export enum RouteNames {
  HOME = "/cook-pal/",
  RECIPES = "recipes",
  LOGIN = "login",
  FAVORITES = "favorites",
  DAILY = "daily-suggestion",
  GROCERIES = "grocery-list",
}

export enum FetchURL {
  SEARCH_BY_NAME_ENDPOINT = "https://www.themealdb.com/api/json/v1/1/search.php?s=",
  SEARCH_BY_FIRST_LETTER_ENDPOINT = "https://www.themealdb.com/api/json/v1/1/search.php?f=",
  SEARCH_BY_ID_ENDPOINT = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=",
  RANDOM_RECIPE_ENDPOINT = "https://www.themealdb.com/api/json/v1/1/random.php",
  FILTER_BY_CATEGORY_ENDPOINT = "https://www.themealdb.com/api/json/v1/1/filter.php?c=",
  FILTER_BY_AREA_ENDPOINT = "https://www.themealdb.com/api/json/v1/1/filter.php?a=",
}
