import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import winnerReducer from "../features/auth/winnerSlice";
import userReducer from '../features/auth/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    winners: winnerReducer,
    users: userReducer,
  },
});