import axios from "axios";
import { apiEndpoints, apiHost } from "../config";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Credential } from "../interfaces/Credential";
import { DetaultState } from "../interfaces/DefaultState";
import { UserProfile } from "../interfaces/UserProfile";
interface AuthState extends DetaultState {
  token: string;
  isLogin: boolean;
  userData: {};
}

interface AuthCheck {
  status: boolean;
}

interface authData {
  status: number;
  token: string;
  data: UserProfile;
}

const initialState: AuthState = {
  loading: false,
  hasError: false,
  token: "",
  isLogin: false,
  userData: {},
};

export const Login = createAsyncThunk(
  "Login/OAuth",
  async (credential: Credential) => {
    try {
      const response = await axios.post(
        `${apiHost.default}${apiEndpoints.section.auth.login}`,
        credential
      );
      localStorage.setItem("_token", response.data);
      return response.data;
    } catch (err) {
      localStorage.setItem("_token", "");
      return "";
    }
  }
);

export const authCheck = async (token: string): Promise<AuthCheck> => {
  try {
    const res = await axios.get<AuthCheck>(
      `${apiHost.default}${apiEndpoints.section.auth.check}`,
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    if (res.status === 200) {
      return { status: res.data.status };
    }
  } catch {
    console.log("Cannot Check Auth");
    return { status: false };
  }
  return Promise.reject(new Error("Auth Check"));
};

export const getUserProfile = async (
  token: string
): Promise<UserProfile | null> => {
  try {
    const res = await axios.get<UserProfile>(
      `${apiHost.default}${apiEndpoints.section.user.profile}`,
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    if (res.status === 200) {
      return res.data;
    }
  } catch (err) {
    console.log("Cannot Get Profile");
    return null;
  }

  return Promise.reject(new Error("getUserInfo"));
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Login.pending, (state) => {
        if (state.loading === false) {
          state.loading = true;
        }
      })
      .addCase(Login.fulfilled, (state, action: PayloadAction<authData>) => {
        if (state.loading === true) {
          if (action.payload.status === 200) {
            state.token = action.payload.token;
            state.isLogin = true;
            state.userData = action.payload.data;
          } else {
          }
          state.loading = false;
          state.hasError = false;
        }
      })
      .addCase(Login.rejected, (state) => {
        state.loading = false;
        state.hasError = true;
      });
  },
});

export default authSlice.reducer;
