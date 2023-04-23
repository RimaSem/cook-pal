import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root {
        /**** FONTS ****/
        --font-primary: "Poppins", sans-serif;
        --font-secondary: "Inter", sans-serif;

        /**** COLORS ****/
        --color-white: #FFFFFF;
        --color-input-light: #f3f3f3;
        --color-accent-green: #509E2F;
        --color-accent-orange: #DC582A;
        --color-text-dark: #253D4E;
        --color-text-light: #e2e2e2;
        --color-text-grey: #A1A1A1;
        --color-nav-btn-1: #f6784c;
        --color-nav-btn-2: #C4D600;
        --color-nav-btn-3: #EAAA00;
        --color-nav-btn-4: #ED8B00;
        --color-nav-btn-5: #84BD00;
        --color-footer-link: rgba(0, 0, 0, 0.6);

        /**** SHADOWS ****/
        --shadow-card: 0px 0px 1px rgba(12, 26, 75, 0.24),
    0px 3px 8px -1px rgba(50, 50, 71, 0.05);

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
            min-height: inherit;
        }
    }
 `;

export default GlobalStyle;
