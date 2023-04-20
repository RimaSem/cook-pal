import styled from "styled-components";
import Header from "../components/Header";
import Hero from "../components/Hero";

const HomeWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  max-width: 1700px;
  width: 100%;
  font-family: var(--font-primary);
  color: var(--color-text-dark);
`;

const Home = () => {
  return (
    <HomeWrapper>
      <Header />
      <Hero />
    </HomeWrapper>
  );
};

export default Home;
