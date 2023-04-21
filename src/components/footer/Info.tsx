import styled from "styled-components";

export const FooterLogo = styled.div`
  margin-bottom: 1em;
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-accent-green);
  white-space: nowrap;
`;

const StyledInfo = styled.div`
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

const Info = () => {
  return (
    <StyledInfo>
      <FooterLogo>Cook-Pal</FooterLogo>
      <p>
        Cook-Pal is a recipe website with a wide variety of delicious recipes,
        easy-to-use search function. Join our community and let's cook together!
      </p>
    </StyledInfo>
  );
};

export default Info;
