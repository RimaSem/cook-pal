import styled from "styled-components";
import { devices } from "../../styles/theme";

interface HeroProps {
  title?: string;
  author?: string;
  img?: string;
}

const Hero: React.FC<HeroProps> = ({ title, author, img }) => (
  <StyledHero img={img}>
    <Label>Trending Now</Label>
    <Title>{title}</Title>
    <Author>{author}</Author>
  </StyledHero>
);

export default Hero;

const StyledHero = styled.div<HeroProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 3.125em 0 2.5em 0;
  border-radius: 1.875em;
  max-width: ${({ theme }) => theme.sizes.widthMax};
  width: 95%;
  height: 22.2em;
  padding-left: 5em;
  background-image: linear-gradient(
      90deg,
      #252525 -16.65%,
      rgba(0, 0, 0, 0) 100%
    ),
    url(${({ img }) => img});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  @media ${devices.tabletM} {
    margin: 0 auto;
    border-radius: 0;
    width: 100%;
  }

  @media ${devices.tabletXXS} {
    align-items: center;
    padding-left: 0;
    text-align: center;
  }
`;

const Label = styled.p`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.accentOrange};

  @media ${devices.mobileXL} {
    font-size: 1.4rem;
  }
`;

const Title = styled.h1`
  margin: 0;
  max-width: 12em;
  font-size: 2.5rem;
  line-height: 127%;
  color: ${({ theme }) => theme.colors.lighter};

  @media ${devices.mobileXL} {
    font-size: 1.8rem;
  }
`;

const Author = styled.p`
  margin: 0.625em 0 0 0;
  font-size: 1.25rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.lighter};

  @media ${devices.mobileXL} {
    font-size: 1.1rem;
  }
`;
