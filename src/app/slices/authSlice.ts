import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

type User = {
  createdAt: string;
  email: string;
  firstName: string;
  lastName: string;
  id: number;
  user_password: null;
  username: string;
};

interface UserState {
  isLoggedIn: boolean;
  userInfo: User | {};
}

const initialState: UserState = {
  isLoggedIn: Boolean(localStorage.getItem("user")),
  userInfo: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") || "")
    : {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload;
    },
    clearUser: (state) => {
      state.isLoggedIn = false;
      state.userInfo = {};
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export const userSelector = (state: RootState) => state.authReducer;
export default authSlice.reducer;
