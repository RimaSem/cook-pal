import { FooterLogo } from "./Info";
import styled from "styled-components";

const SubscriptionWrapper = styled.div``;

const SubscriptionText = styled.p`
  margin: 1.5em 0;
  max-width: 25em;
  font-size: 0.875rem;
  font-weight: 300;
  line-height: 143%;
  letter-spacing: 0.02rem;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const FooterInput = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.darker};
  border-radius: 0.25em;
  outline: none;
  width: 18.125em;
  height: 2.75em;
  padding: 0 1em;
  font-size: 1rem;
  font-family: inherit;
  letter-spacing: 0.02em;

  @media ${({ theme }) => theme.mQueries.footerQ} {
    width: 70%;
  }
`;

const FooterButton = styled.button`
  margin-left: 0.5em;
  border: none;
  border-radius: 0.25em;
  padding: 0.9em;
  height: 3.3em;
  background-color: ${({ theme }) => theme.colors.accentGreen};
  font-family: inherit;
  color: ${({ theme }) => theme.colors.lighter};
`;

const Subscription: React.FC = () => (
  <SubscriptionWrapper>
    <FooterLogo>Cook-Pal</FooterLogo>
    <SubscriptionText>
      Ut risus mattis interdum faucibus facilisi. Facilisi purus accumsan
      aliquam.
    </SubscriptionText>
    <InputWrapper>
      <FooterInput placeholder="Your Email" />
      <FooterButton type="button">Subscribe</FooterButton>
    </InputWrapper>
  </SubscriptionWrapper>
);

export default Subscription;
