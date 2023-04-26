import styled from "styled-components";
import Main from "../components/home/Main";

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
      <Main />
    </HomeWrapper>
  );
};

export default Home;
