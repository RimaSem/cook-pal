import styled from "styled-components";
import LogoImg from "../../img/homecooked_logo.png";

const StyledLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;

  img {
    width: 4.2em;
  }

  p {
    white-space: nowrap;
    font-size: 1.5rem;
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
