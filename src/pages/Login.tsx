import { auth } from "../firebase/firebaseConfig";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router";
import { StyledPageHeading, MainContainer } from "../styles/sharedStyles";
import { SyntheticEvent, useRef, useState } from "react";
import { AuthMessages } from "../types/AuthMessages";
import GoogleIcon from "../assets/img/btn_google.svg";
import styled from "styled-components";
import { FirebaseError } from "firebase/app";
import { setUserLogin } from "../state/auth/authSlice";
import { useAppDispatch } from "../state/hooks";
import { RouteNames } from "../types/RouteNames";

const Login: React.FC = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerPasswordConfirm, setRegisterPasswordConfirm] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [notRegistered, setNotRegistered] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const emailRegx = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/;

  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();

  window.scrollTo({
    top: 450,
  });

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!registerEmail.match(emailRegx) || !registerEmail) {
        setErrorMessage(AuthMessages.INCORRECT_EMAIL_FORMAT);
        throw Error("Incorrect email format");
      }
      if (registerPassword !== registerPasswordConfirm) {
        setErrorMessage(AuthMessages.PASSWORDS_NOT_MATCH);
        throw Error("Passwords do not match");
      }
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      setNotRegistered(false);
      setErrorMessage("");
      formRef.current?.reset();
      signOut(auth);
      dispatch(setUserLogin(false));
    } catch (err) {
      if (err instanceof FirebaseError) {
        if (err.code === "auth/email-already-in-use") {
          setErrorMessage(AuthMessages.EMAIL_EXISTS);
        } else if (
          err.code === "auth/missing-password" ||
          err.code === "auth/weak-password"
        ) {
          setErrorMessage(AuthMessages.PASSWORD_TOO_SHORT);
        }
      }
    }
  };

  const login = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      navigate(`${RouteNames.HOME}`);
    } catch (err) {
      if (err instanceof FirebaseError) {
        if (err.code === "auth/invalid-email") {
          setErrorMessage(AuthMessages.INCORRECT_EMAIL);
        } else if (
          err.code === "auth/missing-password" ||
          err.code === "auth/wrong-password"
        ) {
          setErrorMessage(AuthMessages.INCORRECT_PASSWORD);
        }
      }
    }
  };

  const handleGoogle = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const response = await new GoogleAuthProvider();
      await signInWithPopup(auth, response);
      navigate(`${RouteNames.HOME}`);
    } catch (err) {
      setErrorMessage("Could not sign in with Google.");
    }
  };

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
              formRef.current?.reset();
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
                formRef.current?.reset();
              }
            }}
          >
            Register here
          </StyledSpan>
        </TextWrapper>
      )}
      {!notRegistered ? (
        <StyledForm ref={formRef}>
          <StyledInput
            type="email"
            placeholder="Email"
            aria-label="Email"
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <StyledInput
            type="password"
            placeholder="Password"
            aria-label="Password"
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <StyledErrorMessage>{errorMessage}</StyledErrorMessage>
          <StyledButton onClick={login}>Sign in</StyledButton>
          <StyledGoogleButton onClick={handleGoogle}>
            <GoogleImg src={GoogleIcon} />
            Sign in with Google
          </StyledGoogleButton>
        </StyledForm>
      ) : (
        <StyledForm noValidate onSubmit={register} ref={formRef}>
          <StyledInput
            type="email"
            placeholder="Email"
            aria-label="Email"
            onChange={(e) => setRegisterEmail(e.target.value)}
          />
          <StyledInput
            type="password"
            placeholder="Password"
            aria-label="Password"
            onChange={(e) => setRegisterPassword(e.target.value)}
          />
          <StyledInput
            type="password"
            placeholder="Confirm password"
            aria-label="Confirm password"
            onChange={(e) => setRegisterPasswordConfirm(e.target.value)}
          />
          <StyledErrorMessage>{errorMessage}</StyledErrorMessage>
          <StyledButton>
            {notRegistered ? "Create account" : "Sign in"}
          </StyledButton>
        </StyledForm>
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
  color: green;

  &:hover {
    text-decoration: underline;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  width: 24em;
  max-width: 95%;
`;

const StyledInput = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.grey};
  border-radius: 0.25em;
  outline: none;
  padding: 0em 1em;
  height: 2.75em;
  font-size: inherit;
  font-family: inherit;
  font-weight: 300;
  letter-spacing: 0.02em;

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.darker};
  }
`;

const StyledErrorMessage = styled.p`
  margin: 0 0 0.3em 0;
  padding: 0;
  min-height: 1.3125em;
  font-size: 0.85rem;
  color: red;
  text-align: center;
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 0.25em;
  padding: 0.9em;
  height: 2.75em;
  background-color: ${({ theme }) => theme.colors.accentGreen};
  cursor: pointer;
  font-size: inherit;
  font-family: inherit;
  color: ${({ theme }) => theme.colors.lighter};

  &:hover {
    opacity: 0.85;
  }
`;

const StyledGoogleButton = styled(StyledButton)`
  position: relative;
  background-color: ${({ theme }) => theme.colors.googleBtn};
`;

const GoogleImg = styled.img`
  position: absolute;
  left: 0;
`;
