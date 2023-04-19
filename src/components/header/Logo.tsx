import styled from "styled-components";
import LogoImg from "../../img/homecooked_logo.png";

const StyledLogo = styled.div`
  display: flex;
  align-items: center;

  img {
    margin: 0 0.5em;
    width: 4.2em;
  }

  p {
    font-size: 1.2rem;
    font-weight: 900;
    color: var(--color-accent-green);
  }
`;

const Logo = () => {
  return (
    <StyledLogo>
      <img src={LogoImg} alt="logo" />
      <p>Cook-Pal</p>
    </StyledLogo>
  );
};

export default Logo;
