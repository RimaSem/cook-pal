import Icon from "@mdi/react";
import { mdiEmail, mdiGithub, mdiLinkedin, mdiFacebook } from "@mdi/js";
import styled from "styled-components";

const StyledSocialLinks = styled.div`
  display: flex;
  gap: 1.56em;
  margin: 1.875em auto;
`;

const IconWrapper = styled.a`
  cursor: pointer;
  text-decoration: none;

  .social-links-icon {
    transition: color 0.3s;
    width: 1.875em;
    color: ${({ theme }) => theme.colors.darker};

    &:hover {
      color: ${({ theme }) => theme.colors.accentGreen};
    }
  }
`;

const SocialLinks: React.FC = () => (
  <StyledSocialLinks>
    <IconWrapper href="mailto:rima.semetaite@gmail.com" aria-label="Email">
      <Icon className="social-links-icon" path={mdiEmail} />
    </IconWrapper>
    <IconWrapper
      href="https://github.com/RimaSem"
      target="_blank"
      aria-label="GitHub"
    >
      <Icon className="social-links-icon" path={mdiGithub} />
    </IconWrapper>
    <IconWrapper
      href="https://www.linkedin.com/in/rima-semetaite/"
      target="_blank"
      aria-label="Linkedin"
    >
      <Icon className="social-links-icon" path={mdiLinkedin} />
    </IconWrapper>
    <IconWrapper
      href="https://facebook.com/rimasemetaite"
      target="_blank"
      aria-label="Facebook"
    >
      <Icon className="social-links-icon" path={mdiFacebook} />
    </IconWrapper>
  </StyledSocialLinks>
);

export default SocialLinks;
