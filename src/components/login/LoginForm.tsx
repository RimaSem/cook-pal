import { FirebaseError } from "firebase/app";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useState, useRef, SyntheticEvent } from "react";
import { useNavigate } from "react-router";
import GoogleIcon from "../../assets/img/btn_google.svg";
import styled from "styled-components";
import { auth, db } from "../../firebase/firebaseConfig";
import { AuthMessages } from "../../types/AuthMessages";
import { RouteNames } from "../../types/RouteNames";
import {
  StyledButton,
  StyledForm,
  StyledInput,
  StyledError,
} from "./RegistrationForm";
import { getDoc, doc, setDoc } from "firebase/firestore";

interface FormProps {
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

const LoginForm: React.FC<FormProps> = ({ errorMessage, setErrorMessage }) => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);

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
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log(result.user.uid);
      const docData = (await getDoc(doc(db, "users", result.user.uid))).data();
      if (!docData) {
        await setDoc(doc(db, "users", result.user.uid), {
          userID: result.user.uid,
          favorites: ["52903", "53030", "52815"],
        });
      }
      navigate(`${RouteNames.HOME}`);
    } catch (err) {
      setErrorMessage("Could not sign in with Google.");
    }
  };

  return (
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
      <StyledError>{errorMessage}</StyledError>
      <StyledButton onClick={login}>Sign in</StyledButton>
      <StyledGoogleButton onClick={handleGoogle}>
        <GoogleImg src={GoogleIcon} />
        Sign in with Google
      </StyledGoogleButton>
    </StyledForm>
  );
};

export default LoginForm;

const StyledGoogleButton = styled(StyledButton)`
  position: relative;
  background-color: ${({ theme }) => theme.colors.googleBtn};
`;

const GoogleImg = styled.img`
  position: absolute;
  left: 0;
`;
