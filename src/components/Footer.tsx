import styled from "styled-components";

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

  .nav-wrapper {
    display: flex;
    gap: clamp(50px, 8vw, 80px);
  }
`;

const FooterLogo = styled.div`
  margin-bottom: 1em;
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-accent-green);
  white-space: nowrap;
`;

const Info = styled.div`
  max-width: 18.125em;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5em;
  text-align: justify;

  p {
    display: flex;
    flex-direction: column;
  }
`;

const FooterNav = styled.div`
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

const SubscriptionWrapper = styled.div`
  p {
    margin: 1.5em 0;
    max-width: 25em;
    font-size: 0.875em;
    font-weight: 300;
    line-height: 143%;
    letter-spacing: 0.02em;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const FooterInput = styled.input`
  border: 1px solid var(--color-text-dark);
  border-radius: 0.25em;
  outline: none;
  width: 18.125em;
  height: 2.75em;
  padding: 0 1em;
  font-size: 1rem;
  font-family: inherit;
  letter-spacing: 0.02em;

  @media (max-width: 425px) {
    width: 70%;
  }
`;

const FooterButton = styled.button`
  margin-left: 0.5em;
  border: none;
  border-radius: 0.25em;
  padding: 0.75em;
  height: 44px;
  background-color: var(--color-accent-green);
  font-family: inherit;
  color: var(--color-text-light);
`;

const Footer = () => {
  return (
    <StyledFooter>
      <ContentWrapper>
        <Info>
          <FooterLogo>Cook-Pal</FooterLogo>
          <p>
            Cook-Pal is a recipe website with a wide variety of delicious
            recipes, easy-to-use search function. Join our community and let's
            cook together!
          </p>
        </Info>
        <div className="nav-wrapper">
          <FooterNav>
            <p>Company</p>
            <FooterLink>Home</FooterLink>
            <FooterLink>Explore</FooterLink>
            <FooterLink>Team</FooterLink>
            <FooterLink>About Us</FooterLink>
            <FooterLink>Activity</FooterLink>
          </FooterNav>
          <FooterNav>
            <p>Resources</p>
            <FooterLink>Blog</FooterLink>
            <FooterLink>Use Cases</FooterLink>
            <FooterLink>Testimonials</FooterLink>
            <FooterLink>Insights</FooterLink>
          </FooterNav>
        </div>
        <SubscriptionWrapper>
          <FooterLogo>Cook-Pal</FooterLogo>
          <p>
            Ut risus mattis interdum faucibus facilisi. Facilisi purus accumsan
            aliquam.
          </p>
          <InputWrapper>
            <FooterInput placeholder="Your Email" />
            <FooterButton type="button">Subscribe</FooterButton>
          </InputWrapper>
        </SubscriptionWrapper>
      </ContentWrapper>
    </StyledFooter>
  );
};

export default Footer;
