import styled from "styled-components";
import Header from "../components/Header";
import { EmblaOptionsType } from "embla-carousel-react";
import CarouselSlider from "../components/slider/CarouselSlider";
import Nav from "../components/Nav";
import Main from "../components/home/Main";
import Footer from "../components/Footer";

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  max-width: 1700px;
  min-height: inherit;
  font-family: var(--font-primary);
  color: var(--color-text-dark);
`;

const OPTIONS: EmblaOptionsType = {};
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const Home: React.FC = () => {
  return (
    <HomeWrapper>
      <Header />
      {/* <Hero /> */}
      <CarouselSlider slides={SLIDES} options={OPTIONS} />
      <Nav />
      <Main />
      <Footer />
    </HomeWrapper>
  );
};

export default Home;
