import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { IsLogged } from "../service/auth";
type responseType = {
  data: {
    auth: boolean;
  };
};
const AuthGuard = () => {
  const [isAuthUser, setIsAuthUser] = useState<boolean | null>(null);
  useEffect(() => {
    const isAuth = async () => {
      try {
        const response = (await IsLogged()) as responseType;
        if (!response.data.auth) return setIsAuthUser(false);
        setIsAuthUser(true);
      } catch (error) {
        setIsAuthUser(false);
        throw new Error(`Error ${error as Error}`);
      }
    };
    isAuth();
  }, []);
  if (isAuthUser === null) return null;
  return <>{isAuthUser ? <Outlet /> : <Navigate to={"/"} replace />}</>;
};

export default AuthGuard;
