import { createContext, useState, useCallback, useEffect } from "react";
import { authCheck } from "../slices/auth";
import { useRouter } from "next/router";

export const AuthContext = createContext(false);

export const AuthProvider: React.FC = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState<any>();
  const Router = useRouter();

  useEffect(() => {
    const getToken = async () => {
      const token = await localStorage.getItem("_token");
      if (token === null || token === undefined) {
        return "NoToken";
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
      if (token) {
        const res = await authCheck(token);
        if (res.status === false) {
          console.log("Redirect to login via OAuth");
          Router.push("/auth/signin");
        } else {
          setAuthenticated(true);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }, [Router, token]);

  useEffect(() => {
    if (!authenticated) {
      login();
    } else {
      console.log("Logged in via OAuth Active Recruitment KMUTT");
    }
  }, [authenticated, login]);

  return (
    <AuthContext.Provider value={authenticated}>
      {children}
    </AuthContext.Provider>
  );
};
