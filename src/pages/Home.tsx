import styled from "styled-components";
import Header from "../components/Header";

const HomeWrapper = styled.div`
  position: relative;
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
    </HomeWrapper>
  );
};

export default Home;
