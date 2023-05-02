import { auth } from "../firebase/firebaseConfig";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
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
  background-color: #3d78d1;
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
  const [user, setUser] = useState({ email: "" });

  const navigate = useNavigate();
  // const [authing, setAuthing] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser);
    });
  }, []);

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
    } catch (err) {
      console.error(err);
    }
  };

  const login = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      navigate(-1);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  const handleGoogle = async () => {
    try {
      const provider = await new GoogleAuthProvider();
      return signInWithPopup(auth, provider);
    } catch (err) {
      console.error(err);
    }

    // try {
    //   await signInWithPopup(auth, googleProvider);
    // } catch (err) {
    //   console.error(err);
    // }
    // setAuthing(true);

    // signInWithPopup(auth, new GoogleAuthProvider())
    //   .then((response) => {
    //     console.log(response.user.uid);
    //     navigate("/cook-pal/");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setAuthing(false);
    //   });
  };

  return (
    <LoginContainer>
      <PageHeading>Log in</PageHeading>
      {/* <button onClick={() => signInWithGoogle()} disabled={authing}>
        Sign in with Google
      </button> */}
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
        <StyledGoogleButton>
          <GoogleImg src={GoogleIcon} />
          Sign in with Google
        </StyledGoogleButton>
      </StyledForm>
      {/* <div className="register-user">
        <h3>Register User</h3>
        <input
          placeholder="Email..."
          onChange={(e) => setRegisterEmail(e.target.value)}
        ></input>
        <input
          placeholder="Password..."
          onChange={(e) => setRegisterPassword(e.target.value)}
        ></input>
        <button onClick={register}>Create User</button>
      </div> */}
      {/* <div className="login-user">
        <h3>Login</h3>
        <input
          placeholder="Email..."
          onChange={(e) => setLoginEmail(e.target.value)}
        ></input>
        <input
          placeholder="Password..."
          onChange={(e) => setLoginPassword(e.target.value)}
        ></input>
        <button onClick={login}>Login</button>
      </div> */}
      {/* <button onClick={handleGoogle}>Sign In With Google</button>
      <h4>User Logged In: {user?.email}</h4>
      <button onClick={logout}>Sign Out</button> */}
    </LoginContainer>
  );
};

export default Login;
