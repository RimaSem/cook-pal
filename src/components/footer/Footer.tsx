import FooterNav from "./FooterNav";
import Info from "./Info";
import Subscription from "./Subscription";
import SocialLinks from "./SocialLinks";
import styled from "styled-components";

const Footer: React.FC = () => (
  <StyledFooter>
    <ContentWrapper>
      <Info />
      <FooterNav />
      <Subscription />
    </ContentWrapper>
    <SocialLinks />
  </StyledFooter>
);

export default Footer;

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  margin: auto 0 0 0;
  width: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 6em;
  margin: 3.625em auto;
  max-width: 81.25em;
  width: 95%;
  color: ${({ theme }) => theme.colors.darker};
`;
