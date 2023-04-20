import styled from "styled-components";
import HeroImg from "../img/hero_sample_img.jpg";

const StyledHero = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 3.125em 0;
  padding-left: 5em;
  max-width: 1264px;
  border-radius: 30px;
  width: 95%;
  height: 22.2em;
  background-image: linear-gradient(
      90deg,
      #252525 -16.65%,
      rgba(0, 0, 0, 0) 100%
    ),
    url(${HeroImg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const Label = styled.p`
  margin: 0;
  font-size: 1.5em;
  font-weight: 500;
  color: var(--color-accent-orange);
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2.5em;
  line-height: 127%;
  color: var(--color-white);
`;

const Author = styled.p`
  margin: 0.625em 0 0 0;
  font-size: 1.25em;
  font-weight: 500;
  color: var(--color-white);
`;

const Hero = () => {
  return (
    <StyledHero>
      <Label>Trending Now</Label>
      <Title>
        Mike’s famous salad
        <br /> with cheese
      </Title>
      <Author>By John Mike</Author>
    </StyledHero>
  );
};

export default Hero;
