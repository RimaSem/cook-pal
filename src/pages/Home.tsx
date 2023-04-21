import styled from "styled-components";
import Header from "../components/Header";
import Hero from "../components/home/Hero";
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

const Home = () => {
  return (
    <HomeWrapper>
      <Header />
      <Hero />
      <Nav />
      <Main />
      <Footer />
    </HomeWrapper>
  );
};

export default Home;
