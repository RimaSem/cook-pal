import FooterNav from "./footer/FooterNav";
import Info from "./footer/Info";
import Subscription from "./footer/Subscription";
import SocialLinks from "./footer/SocialLinks";
import styled from "styled-components";

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
  gap: clamp(3.125em, 8vw, 5em);
  margin: 3.625em auto;
  max-width: 81.25em;
  width: 95%;
  color: ${({ theme }) => theme.colors.darker};
`;

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
