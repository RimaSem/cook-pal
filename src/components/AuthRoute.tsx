import { useNavigate } from "react-router";
import { auth } from "../firebase/firebaseConfig";
import { ReactNode, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { RouteNames } from "../types/RouteNames";
import Spinner from "./shared/Spinner";

export interface AuthRouteProps {
  children?: ReactNode;
}

const AuthRoute: React.FC<AuthRouteProps> = (props) => {
  const { children } = props;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AuthCheck();
    return () => AuthCheck();
  }, [auth]);

  const AuthCheck = onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoading(false);
    } else {
      navigate(`${RouteNames.HOME + RouteNames.LOGIN}`);
    }
  });

  if (loading) return <Spinner />;

  return <>{children}</>;
};

export default AuthRoute;
