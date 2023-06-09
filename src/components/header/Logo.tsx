import LogoImg from "../../assets/img/homecooked_logo.png";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { devices } from "../../styles/theme";

const Logo: React.FC = () => (
  <LogoContainer>
    <StyledLink to="./">
      <StyledImg src={LogoImg} alt="logo" />
    </StyledLink>
    <StyledLink to="./">
      <LogoName>Cook-Pal</LogoName>
    </StyledLink>
  </LogoContainer>
);

export default Logo;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  cursor: default;
`;

const StyledImg = styled.img`
  width: 4.2em;

  @media ${devices.tabletM} {
    width: 3.2em;
  }
`;

const LogoName = styled.p`
  white-space: nowrap;
  font-size: 1.5rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.accentGreen};

  @media ${devices.tabletM} {
    font-size: 1.2rem;
  }
`;
