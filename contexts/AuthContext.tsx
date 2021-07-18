import { createContext, useState, useCallback, useEffect } from "react";
import { authCheck, getUserProfile } from "../slices/auth";
import { useRouter } from "next/router";
import { setAuthState } from "../slices/auth";
import useAppDispatch from "../hooks/useAppDispatch";
import { UserProfile } from "../interfaces/UserProfile";
export const AuthContext = createContext(false);
interface setAuth {
  userData: UserProfile;
  token: string;
}

export const AuthProvider: React.FC = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState<string>();
  const Router = useRouter();
  const dispatch = useAppDispatch();

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
          const userData: UserProfile = await getUserProfile(token);
          const authState: setAuth = {
            userData: userData,
            token: token,
          };
          dispatch(setAuthState(authState));
          setAuthenticated(true);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }, [Router, token, dispatch]);

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
