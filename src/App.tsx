import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import RecipeDetail from "./pages/RecipeDetail";
import DailySuggestions from "./pages/DailySuggestions";
import Favorites from "./pages/Favorites";
import { theme } from "./styles/theme";
import { ThemeProvider } from "styled-components";
import { RouteNames } from "./types/RouteNames";
import Explore from "./pages/Explore";
import GroceryList from "./pages/GroceryList";
import Login from "./pages/Login";
import AuthRoute from "./components/AuthRoute";
import GlobalStyle from "./styles/global";
import styled from "styled-components";

const StyledApp = styled.div`
  min-width: 100%;
  min-height: inherit;
`;

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <StyledApp>
      <BrowserRouter>
        <Routes>
          <Route path="/cook-pal/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path={`:id`} element={<RecipeDetail />} />
            <Route path={RouteNames.RECIPES} element={<Explore />} />
            <Route
              path={`${RouteNames.RECIPES}/:id`}
              element={<RecipeDetail />}
            />
            <Route path={RouteNames.DAILY} element={<DailySuggestions />} />
            <Route
              path={`${RouteNames.DAILY}/:id`}
              element={<RecipeDetail />}
            />
            <Route
              path={RouteNames.FAVORITES}
              element={
                <AuthRoute>
                  <Favorites />
                </AuthRoute>
              }
            />
            <Route
              path={`${RouteNames.FAVORITES}/:id`}
              element={<RecipeDetail />}
            />
            <Route
              path={RouteNames.GROCERIES}
              element={
                <AuthRoute>
                  <GroceryList />
                </AuthRoute>
              }
            />
            <Route path={`${RouteNames.LOGIN}`} element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StyledApp>
  </ThemeProvider>
);

export default App;
