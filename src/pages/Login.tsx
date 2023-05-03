import { auth } from "../firebase/firebaseConfig";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router";
import { StyledPageHeading, MainContainer } from "../styles/sharedStyles";
import { SyntheticEvent, useEffect, useState } from "react";
import GoogleIcon from "../img/btn_google.svg";
import styled from "styled-components";

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

const Login: React.FC = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [notRegistered, setNotRegistered] = useState(false);
  const [user, setUser] = useState({ email: "" });

  const navigate = useNavigate();

  window.scrollTo({
    top: 450,
  });

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser);
    });
  }, []);

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      setNotRegistered(false);
    } catch (err) {
      console.error(err);
    }
  };

  const login = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      navigate(-1);
    } catch (err) {
      console.error(err);
    }
  };

  const handleGoogle = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const response = await new GoogleAuthProvider();
      await signInWithPopup(auth, response);
      navigate(-1);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <LoginContainer>
      <PageHeading>{notRegistered ? "Register" : "Log In"}</PageHeading>
      {notRegistered ? (
        <TextWrapper>
          Already have an account?{" "}
          <StyledSpan onClick={() => setNotRegistered(false)}>
            Sign in here
          </StyledSpan>
        </TextWrapper>
      ) : (
        <TextWrapper>
          Don't have an account?{" "}
          <StyledSpan onClick={() => setNotRegistered(true)}>
            Register here
          </StyledSpan>
        </TextWrapper>
      )}
      {!notRegistered ? (
        <StyledForm>
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
          <StyledButton onClick={login}>Sign in</StyledButton>
          <StyledGoogleButton onClick={handleGoogle}>
            <GoogleImg src={GoogleIcon} />
            Sign in with Google
          </StyledGoogleButton>
        </StyledForm>
      ) : (
        <StyledForm>
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
          <StyledButton onClick={register}>
            {notRegistered ? "Create account" : "Sign in"}
          </StyledButton>
        </StyledForm>
      )}
    </LoginContainer>
  );
};

export default Login;
