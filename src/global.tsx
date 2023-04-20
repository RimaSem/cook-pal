import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root {

        /**** FONTS ****/
        --font-primary: "Poppins", sans-serif;
        --font-secondary: "Inter", sans-serif;

        /**** COLORS ****/
        --color-white: #FFFFFF;
        --color-accent-green: #509E2F;
        --color-accent-orange: #DC582A;
        --color-text-dark: #253D4E;
        --color-nav-btn-1: #f6784c;
        --color-nav-btn-2: #C4D600;
        --color-nav-btn-3: #EAAA00;
        --color-nav-btn-4: #ED8B00;
        --color-nav-btn-5: #84BD00;

        /**** BORDERS ****/

        /**** SHADOWS ****/

        /**** WIDTH / HEIGHT ****/
        --width-max: 1264px;
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
            min-height: 100%;
        }
    }

 `;

export default GlobalStyle;
