import styled from "styled-components";

export const FooterLogo = styled.div`
  margin-bottom: 1em;
  font-size: 1.4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accentGreen};
  white-space: nowrap;
`;

const InfoWrapper = styled.div`
  max-width: 18.125em;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5rem;
  text-align: justify;
`;

const InfoText = styled.p`
  display: flex;
  flex-direction: column;
`;

const Info: React.FC = () => (
  <InfoWrapper>
    <FooterLogo>Cook-Pal</FooterLogo>
    <InfoText>
      Cook-Pal is a recipe website with a wide variety of delicious recipes,
      easy-to-use search function. Join our community and let's cook together!
    </InfoText>
  </InfoWrapper>
);

export default Info;
