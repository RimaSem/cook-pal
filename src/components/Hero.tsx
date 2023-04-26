import styled from "styled-components";

interface HeroProps {
  title?: string;
  author?: string;
  img?: string;
}

const StyledHero = styled.div<HeroProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 3.125em 0 2.5em 0;
  border-radius: 30px;
  max-width: var(--width-max);
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

  @media (max-width: 865px) {
    margin: 0 auto;
    border-radius: 0;
    width: 100%;
  }

  @media (max-width: 580px) {
    align-items: center;
    padding-left: 0;
    text-align: center;
  }
`;

const Label = styled.p`
  margin: 0;
  font-size: 1.5em;
  font-weight: 500;
  color: var(--color-accent-orange);

  @media (max-width: 500px) {
    font-size: 6vw;
  }
`;

const Title = styled.h1`
  margin: 0;
  max-width: 500px;
  font-size: 2.5em;
  line-height: 127%;
  color: var(--color-text-light);

  @media (max-width: 500px) {
    font-size: 8vw;
  }
`;

const Author = styled.p`
  margin: 0.625em 0 0 0;
  font-size: 1.25em;
  font-weight: 500;
  color: var(--color-text-light);

  @media (max-width: 500px) {
    font-size: 5vw;
  }
`;

const Hero: React.FC<HeroProps> = ({ title, author, img }) => {
  return (
    <StyledHero img={img}>
      <Label>Trending Now</Label>
      <Title>{title}</Title>
      <Author>{author}</Author>
    </StyledHero>
  );
};

export default Hero;