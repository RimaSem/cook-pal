import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { useRef, useState } from "react";
import styled from "styled-components";
import { auth, db } from "../../firebase/firebaseConfig";
import { setUserLogin } from "../../state/auth/authSlice";
import { useAppDispatch } from "../../state/hooks";
import { AuthErrorCodes, AuthMessages } from "../../types/AuthMessages";
import { emailRegx } from "../../utils/basicUtils";
import { collection, doc, setDoc } from "firebase/firestore";
import { FirebaseCollections } from "../../types/General";

interface FormProps {
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  notRegistered: boolean;
  setNotRegistered: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegistrationForm: React.FC<FormProps> = ({
  errorMessage,
  setErrorMessage,
  notRegistered,
  setNotRegistered,
}) => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerPasswordConfirm, setRegisterPasswordConfirm] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();
  const collectionRef = collection(db, FirebaseCollections.USER_COLLECTION);

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!registerEmail.match(emailRegx) || !registerEmail) {
        setErrorMessage(AuthMessages.INCORRECT_EMAIL_FORMAT_FOR_USER);
        throw Error(AuthMessages.INCORRECT_EMAIL_FORMAT);
      }
      if (registerPassword !== registerPasswordConfirm) {
        setErrorMessage(AuthMessages.PASSWORDS_NOT_MATCH);
        throw Error(AuthMessages.PASSWORDS_NOT_MATCH);
      }
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      await setDoc(doc(collectionRef, auth.currentUser?.uid), {
        userID: auth.currentUser?.uid,
        favorites: [],
        groceryList: [],
      });
      setNotRegistered(false);
      setErrorMessage("");
      formRef.current?.reset();
      signOut(auth);
      dispatch(setUserLogin(false));
    } catch (err) {
      if (err instanceof FirebaseError) {
        if (err.code === AuthErrorCodes.EMAIL_ALREADY_EXISTS) {
          setErrorMessage(AuthMessages.EMAIL_EXISTS);
        } else if (
          err.code === AuthErrorCodes.MISSING_PASSWORD ||
          err.code === AuthErrorCodes.WEAK_PASSWORD
        ) {
          setErrorMessage(AuthMessages.PASSWORD_TOO_SHORT);
        }
      }
    }
  };

  return (
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
      <StyledError>{errorMessage}</StyledError>
      <StyledButton>
        {notRegistered ? "Create account" : "Sign in"}
      </StyledButton>
    </StyledForm>
  );
};

export default RegistrationForm;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  width: 24em;
  max-width: 95%;
`;

export const StyledInput = styled.input`
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

export const StyledError = styled.p`
  margin: 0 0 0.3em 0;
  padding: 0;
  min-height: 1.3125em;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.red};
  text-align: center;
`;

export const StyledButton = styled.button`
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
