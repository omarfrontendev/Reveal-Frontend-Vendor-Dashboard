import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { loginUser } from "./authThunk";

interface User {
  id: string;
  name: string;
  role: string;
  vendorId: number
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  vendorId: number
}

const storedUser = localStorage.getItem("user");
const parsedUser = storedUser ? JSON.parse(storedUser) : null;

const initialState: AuthState = {
  user: parsedUser,
  token: localStorage.getItem("authToken"),
  loading: false,
  error: null,
  vendorId: parsedUser?.vendorId ?? null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ============= LOGIN ===========
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<{
        data: any; user: User; token: string
      }>) => {
        state.loading = false;
        state.user = action.payload?.data?.user;
        state.vendorId = action.payload?.data?.user?.vendorId;
        state.token = action.payload?.data?.access_token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

  }
});

export default authSlice.reducer;
