import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import RecipeDetail from "./pages/RecipeDetail";
import Favorites from "./pages/Favorites";
import { theme } from "./styles/theme";
import { ThemeProvider } from "styled-components";
import { RouteNames } from "./types/RouteNames";
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
            <Route
              path={`${RouteNames.RECIPES}/:id`}
              element={<RecipeDetail />}
            />
            <Route path={RouteNames.FAVORITES} element={<Favorites />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StyledApp>
  </ThemeProvider>
);

export default App;
