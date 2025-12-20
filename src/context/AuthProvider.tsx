import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { IsLogged } from "../service/auth";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
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
  if (isAuthUser === null) return null; // или loader

  if (!isAuthUser) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AuthProvider;
