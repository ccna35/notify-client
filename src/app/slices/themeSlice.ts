import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

type ThemeType = {
  darkMode: boolean;
  theme: "light" | "dark";
};

const initialState: ThemeType = {
  theme: "light",
  darkMode: localStorage.getItem("theme")
    ? JSON.parse(localStorage.getItem("theme") || "") === "dark"
    : false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      localStorage.setItem("theme", JSON.stringify(action.payload));
      state.darkMode = action.payload === "dark";
    },
  },
});

export const { setTheme } = themeSlice.actions;
export const themeSelector = (state: RootState) => state.themeReducer;
export default themeSlice.reducer;
