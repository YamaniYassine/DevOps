import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import winnerReducer from "../features/auth/winnerSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    winners: winnerReducer,
  },
});