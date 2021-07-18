import axios from "axios";
import { apiEndpoints, apiHost } from "../config";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Credential } from "../interfaces/Credential";
import { DetaultState } from "../interfaces/DefaultState";
import { UserProfile } from "../interfaces/UserProfile";
interface AuthState extends DetaultState {
  token: string;
  isLogin: boolean;
  process: boolean;
}

const initialState: AuthState = {
  loading: false,
  hasError: false,
  token: "",
  isLogin: false,
  process: false,
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
  reducers: {
    setProcess: (state, action: PayloadAction<boolean>) => {
      state.process = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(Login.pending, (state) => {
        if (state.loading === false) {
          state.loading = true;
        }
      })
      .addCase(Login.fulfilled, (state, action: PayloadAction<string>) => {
        if (state.loading === true) {
          state.token = action.payload;
          // if (state.token !== "") {
          //   state.isLogin = true;
          //   state.process = false;
          // }
          console.log("ok");
          state.isLogin = true;
          state.process = false;
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

export const { setProcess: setProcess } = authSlice.actions;
export default authSlice.reducer;
