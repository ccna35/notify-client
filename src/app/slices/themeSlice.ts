import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

type ThemeType = {
  darkMode: boolean;
};

const initialState: ThemeType = {
  darkMode: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    switchTheme: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { switchTheme } = themeSlice.actions;
export const themeSelector = (state: RootState) => state.themeReducer;
export default themeSlice.reducer;
