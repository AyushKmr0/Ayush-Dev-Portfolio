import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { UIState } from "./ui.types";

const initialState: UIState = {
  isMobileNavigationOpen: false,
  theme: "light",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openMobileNavigation(state) {
      state.isMobileNavigationOpen = true;
    },

    closeMobileNavigation(state) {
      state.isMobileNavigationOpen = false;
    },

    toggleMobileNavigation(state) {
      state.isMobileNavigationOpen = !state.isMobileNavigationOpen;
    },

    setMobileNavigation(
      state,
      action: PayloadAction<boolean>,
    ) {
      state.isMobileNavigationOpen = action.payload;
    },
  },
});

export const {
  openMobileNavigation,
  closeMobileNavigation,
  toggleMobileNavigation,
  setMobileNavigation,
} = uiSlice.actions;

export default uiSlice.reducer;