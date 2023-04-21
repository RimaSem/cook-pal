import styled from "styled-components";

const StyledFooterNav = styled.div`
  display: flex;
  gap: clamp(50px, 8vw, 80px);
`;

const FooterNavWrapper = styled.div`
  p {
    margin: 0;
    font-size: 1.25em;
    font-weight: 600;
  }
`;

const FooterLink = styled.a`
  display: block;
  margin-top: 1.5em;
  color: var(--color-footer-link);
  text-decoration: none;
`;

const FooterNav = () => {
  return (
    <StyledFooterNav>
      <FooterNavWrapper>
        <p>Company</p>
        <FooterLink>Home</FooterLink>
        <FooterLink>Explore</FooterLink>
        <FooterLink>Team</FooterLink>
        <FooterLink>About Us</FooterLink>
        <FooterLink>Activity</FooterLink>
      </FooterNavWrapper>
      <FooterNavWrapper>
        <p>Resources</p>
        <FooterLink>Blog</FooterLink>
        <FooterLink>Use Cases</FooterLink>
        <FooterLink>Testimonials</FooterLink>
        <FooterLink>Insights</FooterLink>
      </FooterNavWrapper>
    </StyledFooterNav>
  );
};

export default FooterNav;
