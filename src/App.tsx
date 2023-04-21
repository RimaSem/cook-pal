import styled from "styled-components";
import Home from "./pages/Home";
import GlobalStyle from "./global";

const StyledApp = styled.div`
  min-width: 100%;
`;

const App = () => {
  return (
    <StyledApp>
      <GlobalStyle />
      <Home />
    </StyledApp>
  );
};

export default App;
