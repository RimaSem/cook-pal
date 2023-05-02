import { useNavigate } from "react-router";
import { auth } from "../firebase/firebaseConfig";
import { ReactNode, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { RouteNames } from "../types/RouteNames";

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
      navigate(`/cook-pal/${RouteNames.LOGIN}`);
    }
  });

  if (loading) return <div>Loading...</div>;

  return <>{children}</>;
};

export default AuthRoute;
