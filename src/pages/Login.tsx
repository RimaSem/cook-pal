import { StyledPageHeading, MainContainer } from "../styles/sharedStyles";
import { useState } from "react";
import styled from "styled-components";
import RegistrationForm from "../components/login/RegistrationForm";
import LoginForm from "../components/login/LoginForm";

const Login: React.FC = () => {
  const [notRegistered, setNotRegistered] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  window.scrollTo({
    top: 450,
  });

  return (
    <LoginContainer>
      <PageHeading>{notRegistered ? "Register" : "Log In"}</PageHeading>
      {notRegistered ? (
        <TextWrapper>
          Already have an account?{" "}
          <StyledSpan
            onClick={() => {
              setNotRegistered(false);
              setErrorMessage("");
            }}
          >
            Sign in here
          </StyledSpan>
        </TextWrapper>
      ) : (
        <TextWrapper>
          Don't have an account?{" "}
          <StyledSpan
            onClick={() => {
              {
                setNotRegistered(true);
                setErrorMessage("");
              }
            }}
          >
            Register here
          </StyledSpan>
        </TextWrapper>
      )}
      {!notRegistered ? (
        <LoginForm
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      ) : (
        <RegistrationForm
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          notRegistered={notRegistered}
          setNotRegistered={setNotRegistered}
        />
      )}
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled(MainContainer)`
  flex-direction: column;
  align-items: center;
`;

const PageHeading = styled(StyledPageHeading)``;

const TextWrapper = styled.div`
  margin-bottom: 1em;
  font-size: 0.85rem;
`;

const StyledSpan = styled.span`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.green};

  &:hover {
    text-decoration: underline;
  }
`;
