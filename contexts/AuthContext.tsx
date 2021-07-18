import { createContext, useState, useCallback, useEffect } from "react";
import { getUserProfile } from "../slices/auth";
import { useRouter } from "next/router";
import useAppSelector from "../hooks/useAppSelector";

export const AuthContext = createContext(false);

export const AuthProvider: React.FC = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState<any>();
  const Router = useRouter();

  const { process, isLogin, loading } = useAppSelector((state) => state.auth);
  console.log(isLogin);
  useEffect(() => {
    const getToken = async () => {
      const token = await localStorage.getItem("_token");
      if (token === null) {
        return null;
      } else {
        return token;
      }
    };
    getToken().then((res) => {
      setToken(res);
    });
  }, []);

  const login = useCallback(async () => {
    try {
      if (!isLogin) {
        Router.push("/auth/signin");
      } else {
        setAuthenticated(true);
      }
    } catch (err) {
      console.log(err);
    }
  }, [Router, isLogin]);

  useEffect(() => {
    if (!loading && !isLogin) {
      console.log("Redirect to login via OAuth");
      login();
    } else {
      console.log("Logged in via OAuth Active Recruitment KMUTT");
    }
  }, [loading, login, isLogin]);

  return (
    <AuthContext.Provider value={authenticated}>
      {children}
    </AuthContext.Provider>
  );
};
