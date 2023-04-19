import Home from "./pages/Home";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
:root {

  /**** FONTS ****/
  --font-primary: "Poppins", sans-serif;
  --font-secondary: "Inter", sans-serif;

  /**** COLORS ****/
  --color-white: #FFFFFF;
  --color-accent-green: #509E2F;

  /**** BORDERS ****/

  /**** SHADOWS ****/

}
`;

const App = () => {
  return (
    <div className="App">
      <GlobalStyle />
      <Home />
    </div>
  );
};

export default App;
