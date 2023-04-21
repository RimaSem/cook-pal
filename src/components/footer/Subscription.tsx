import styled from "styled-components";
import { FooterLogo } from "./Info";

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

const Subscription = () => {
  return (
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
  );
};

export default Subscription;
