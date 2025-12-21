import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { IsLogged } from "../service/auth";
import { PAGES } from "../config/pages.config";

const AuthGuard = () => {
  const [isAuthUser, setIsAuthUser] = useState<boolean | null>(null);
  useEffect(() => {
    const isAuth = async () => {
      try {
        await IsLogged();
        setIsAuthUser(true);
      } catch (error) {
        setIsAuthUser(false);
        throw new Error(`Error ${error as Error}`);
      }
    };
    isAuth();
  }, []);
  if (isAuthUser === null) return null;
  return (
    <>{isAuthUser ? <Outlet /> : <Navigate to={PAGES.AUTH_PAGE} replace />}</>
  );
};

export default AuthGuard;
