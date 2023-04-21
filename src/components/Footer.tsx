import styled from "styled-components";
import FooterNav from "./footer/FooterNav";
import Info from "./footer/Info";
import Subscription from "./footer/Subscription";

const StyledFooter = styled.footer`
  display: flex;
  margin: auto 0 0 0;
  width: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: clamp(50px, 8vw, 80px);
  margin: 3.625em auto;
  max-width: 1300px;
  width: 95%;
  color: var(--color-text-dark);
`;

const Footer = () => {
  return (
    <StyledFooter>
      <ContentWrapper>
        <Info />
        <FooterNav />
        <Subscription />
      </ContentWrapper>
    </StyledFooter>
  );
};

export default Footer;
