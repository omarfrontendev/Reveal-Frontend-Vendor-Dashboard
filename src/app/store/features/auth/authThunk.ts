import { createAsyncThunk } from "@reduxjs/toolkit";
import { endpoints } from "@/api/endpoints";
import { api } from "@/api";

interface LoginData {
  email: string;
  password: string;
}

export const checkEmailState = createAsyncThunk(
  "auth/checkEmailState",
  async ({ email }: any, { rejectWithValue }) => {
    try {
      const response = await api.post(endpoints.auth.checkEmailState, { email });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const requestOTP = createAsyncThunk(
  "auth/requestOTP",
  async (email : string, { rejectWithValue }) => {
    try {
      const response = await api.post(endpoints.auth.requestOTp, { email });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const verfiyOTP = createAsyncThunk(
  "auth/verfiyOTP",
  async ({ otpCode, newPassword, email }: any, { rejectWithValue }) => {
    try {
      const response = await api.post(endpoints.auth.verfiyOTp, { otpCode, newPassword, email });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }: LoginData, { rejectWithValue }) => {
    try {
      const response = await api.post(endpoints.auth.login, { email, password });
      localStorage.setItem("authToken", response.data.data.access_token);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);