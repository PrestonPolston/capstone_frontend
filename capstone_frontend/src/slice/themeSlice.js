import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    darkTheme: false,
  },
  reducers: {
    toggleTheme: (state) => {
      state.darkTheme = !state.darkTheme;
    },
    setThemePreferences: (state, action) => {
      state.darkTheme = action.payload;
    },
  },
});

export const { toggleTheme, setThemePreferences } = themeSlice.actions;

export default themeSlice.reducer;
