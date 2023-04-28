import React from "react";
import Main from "../components/home/Main";
import styled from "styled-components";

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  max-width: 106.25em;
  min-height: inherit;
  font-family: var(--font-primary);
  color: ${({ theme }) => theme.colors.darker};
`;

const Home: React.FC = () => (
  <HomeWrapper>
    <Main />
  </HomeWrapper>
);

export default Home;
