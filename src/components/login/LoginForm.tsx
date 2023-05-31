import { FirebaseError } from "firebase/app";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useState, useRef, SyntheticEvent } from "react";
import { useNavigate } from "react-router";
import GoogleIcon from "../../assets/img/btn_google.svg";
import { AuthErrorCodes } from "../../types/AuthMessages";
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
import { FirebaseCollections } from "../../types/General";

interface FormProps {
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

const LoginForm: React.FC<FormProps> = ({ errorMessage, setErrorMessage }) => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);

  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      navigate(`${RouteNames.HOME}`);
    } catch (err) {
      if (err instanceof FirebaseError) {
        if (
          err.code === AuthErrorCodes.INVALID_EMAIL ||
          err.code === AuthErrorCodes.USER_NOT_FOUND
        ) {
          setErrorMessage(AuthMessages.INCORRECT_EMAIL);
        } else if (
          err.code === AuthErrorCodes.MISSING_PASSWORD ||
          err.code === AuthErrorCodes.WRONG_PASSWORD
        ) {
          setErrorMessage(AuthMessages.INCORRECT_PASSWORD);
        }
      }
    }
  };

  const handleGoogleLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const docData = (
        await getDoc(
          doc(db, FirebaseCollections.USER_COLLECTION, result.user.uid)
        )
      ).data();
      if (!docData) {
        await setDoc(
          doc(db, FirebaseCollections.USER_COLLECTION, result.user.uid),
          {
            userID: result.user.uid,
            favorites: [],
          }
        );
      }
      navigate(`${RouteNames.HOME}`);
    } catch (err) {
      console.log(err);
      setErrorMessage(AuthMessages.GOOGLE_ERROR);
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
      <StyledButton onClick={handleLogin}>Sign in</StyledButton>
      <StyledGoogleButton onClick={handleGoogleLogin}>
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
