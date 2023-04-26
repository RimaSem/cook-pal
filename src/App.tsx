import styled from "styled-components";
import GlobalStyle from "./global";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import RecipeDetail from "./pages/RecipeDetail";

const StyledApp = styled.div`
  min-width: 100%;
  min-height: inherit;
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <StyledApp>
        <BrowserRouter>
          <Routes>
            <Route path="/cook-pal/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="recipes/:id" element={<RecipeDetail />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </StyledApp>
    </>
  );
};

export default App;
