import styled from "styled-components";

export const StyledPageHeading = styled.h1`
  margin: 1.5em 0;
  font-size: ${({ theme }) => theme.fontSizes.large};
  color: ${({ theme }) => theme.colors.darker};
  text-align: center;
`;

export const MainContainer = styled.main`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.9em;
  margin: 3.125em auto;
  max-width: ${({ theme }) => theme.sizes.widthMax};
  width: 95%;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.9em;
  width: 100%;
`;
