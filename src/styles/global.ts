import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root {
        /**** FONTS ****/
        --font-primary: "Poppins", sans-serif;
        --font-secondary: "Inter", sans-serif;

        /**** SHADOWS ****/
        --shadow-card: 0px 0px 1px rgba(12, 26, 75, 0.24),
    0px 3px 8px -1px rgba(50, 50, 71, 0.05);

        /**** WIDTH / HEIGHT ****/
        --width-max: 79em;
    }

    * {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        min-width: 100%;
        min-height: 100vh;
        font-family: var(--font-primary);

        #root {
            min-width: 100%;
            min-height: inherit;
        }
    }
 `;

export default GlobalStyle;
