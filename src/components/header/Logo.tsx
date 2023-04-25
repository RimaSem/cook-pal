import styled from "styled-components";
import LogoImg from "../../img/homecooked_logo.png";
import { Link } from "react-router-dom";

const StyledLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;

  a {
    text-decoration: none;
    cursor: default;
  }

  img {
    width: 4.2em;
  }

  p {
    white-space: nowrap;
    font-size: 1.5rem;
    font-weight: 900;
    color: var(--color-accent-green);
  }

  @media (max-width: 865px) {
    img {
      width: 3.2em;
    }

    p {
      font-size: 1.2rem;
    }
  }
`;

const Logo = () => {
  return (
    <StyledLogo>
      <Link to=".">
        <img src={LogoImg} alt="logo" />
      </Link>
      <Link to=".">
        <p>Cook-Pal</p>
      </Link>
    </StyledLogo>
  );
};

export default Logo;
