import axios from "axios";
import { apiEndpoints, apiHost } from "../config";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Credential } from "../interfaces/Credential";
import { DetaultState } from "../interfaces/DefaultState";

interface AuthState extends DetaultState {
  token: string;
  isLogin: boolean;
}

const initialState: AuthState = {
  loading: false,
  hasError: false,
  token: "",
  isLogin: false,
};

export const Login = createAsyncThunk(
  "Login/OAuth",
  async (credential: Credential) => {
    const response = await axios.post(
      `${apiHost.default}${apiEndpoints.section.auth.login}`,
      credential
    );

    return response.data;
  }
);

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
      .addCase(Login.fulfilled, (state, action: PayloadAction<string>) => {
        if (state.loading === true) {
          state.token = action.payload;
          if (state.token !== "") {
            state.isLogin = true;
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
