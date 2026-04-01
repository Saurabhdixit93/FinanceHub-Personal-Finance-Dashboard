import { createSlice } from "@reduxjs/toolkit";
import type { UIState } from "../../types";

const loadDarkMode = (): boolean => {
  try {
    const val = localStorage.getItem("finance_darkMode");
    return val ? JSON.parse(val) : true;
  } catch {
    return true;
  }
};

const initialState: UIState = {
  role: "admin",
  darkMode: loadDarkMode(),
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setRole(state, action) {
      state.role = action.payload;
    },
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { setRole, toggleDarkMode } = uiSlice.actions;
export default uiSlice.reducer;
