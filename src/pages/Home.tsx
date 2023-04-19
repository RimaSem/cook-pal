import styled from "styled-components";
import Header from "../components/Header";

const HomeWrapper = styled.div`
  width: 100%;
  font-family: var(--font-primary);
`;

const Home = () => {
  return (
    <HomeWrapper>
      <Header />
    </HomeWrapper>
  );
};

export default Home;
