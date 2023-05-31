import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        min-width: 100%;
        min-height: 100vh;
        font-family: ${({ theme }) => theme.fontFamilies.primary};

        #root {
            min-width: 100%;
            min-height: inherit;
        }
    }
 `;

export default GlobalStyle;
