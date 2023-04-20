import styled from "styled-components";
import HeroImg from "../img/hero_sample_img.jpg";

const StyledHero = styled.div`
  max-width: 1264px;
  width: 100%;
  height: 22.2em;
  margin: 3.125em auto;
  border-radius: 30px;
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

const Hero = () => {
  return <StyledHero></StyledHero>;
};

export default Hero;
