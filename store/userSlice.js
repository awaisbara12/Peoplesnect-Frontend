import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { USER_DETAILS_API_KEY } from "../pages/config";

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
  return function fetchUserThunk(dispatch) {
    const authKey = localStorage.getItem("keyStore");
    axios(USER_DETAILS_API_KEY, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json; charset=utf-8",
        Authorization: authKey,
      },
    })
      .then((response) => response.data)
      .then((data) => {
        dispatch(setUser(data));
      });
  };
}
