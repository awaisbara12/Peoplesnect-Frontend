import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "cookies-next";
import { USER_DETAILS_API_KEY } from "../pages/config";

const authKey = getCookie("authKey");

export const STATUSES = Object.freeze({
  IDLE: "success",
  ERROR: "error",
  LOADING: "loading",
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: [],
  },

  reducers: {
    setUser(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { setUser, setStatus } = userSlice.actions;
export default userSlice.reducer;

// Api Thunks
export function fetchUser() {
  return async function fetchUserThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const res = await fetch(USER_DETAILS_API_KEY, {
        method: "GET",
        headers: {
          Authorization: `${authKey}`,
        },
      });
      const data = await res.json();
      dispatch(setUser(data));
      dispatch(setStatus(STATUSES.IDLE));
    } catch (err) {
      console.log(err);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}
