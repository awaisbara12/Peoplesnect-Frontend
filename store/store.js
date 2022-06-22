import { configureStore } from "@reduxjs/toolkit";
import { signInReducer } from "./SignInSlice";

export const store = configureStore({
  reducer: {
    signIn: signInReducer,
  },
});
