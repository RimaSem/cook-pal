import styled from "styled-components";

const FooterNav: React.FC = () => (
  <StyledFooterNav>
    <FooterNavWrapper>
      <SectionName>Company</SectionName>
      <FooterLink>Home</FooterLink>
      <FooterLink>Explore</FooterLink>
      <FooterLink>Team</FooterLink>
      <FooterLink>About Us</FooterLink>
      <FooterLink>Activity</FooterLink>
    </FooterNavWrapper>
    <FooterNavWrapper>
      <SectionName>Resources</SectionName>
      <FooterLink>Blog</FooterLink>
      <FooterLink>Use Cases</FooterLink>
      <FooterLink>Testimonials</FooterLink>
      <FooterLink>Insights</FooterLink>
    </FooterNavWrapper>
  </StyledFooterNav>
);

export default FooterNav;

const StyledFooterNav = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 5em;
`;

const FooterNavWrapper = styled.div``;

const SectionName = styled.p`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
`;

const FooterLink = styled.a`
  display: block;
  margin-top: 1.5em;
  color: ${({ theme }) => theme.colors.footerLink};
  text-decoration: none;
`;
