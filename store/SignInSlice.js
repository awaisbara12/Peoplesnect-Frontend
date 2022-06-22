import { createSlice } from "@reduxjs/toolkit";
import { SIGN_IN_API_KEY } from "../pages/config";

const SignInSlice = createSlice({
  name: "signIn",
  initialState: {
    data: [],
  },

  reducers: {
    setSignIn(state, action) {
      state.data = action.payload;
    },
  },
});

export const { setSignIn } = SignInSlice.actions;
export default SignInSlice.reducer;

export function fetchSignIn() {
  return async function fetchSignInThunk(dispatch, getSate) {
    const signin = async () => {
      const res = await fetch(SIGN_IN_API_KEY, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      dispatch(setSignIn(result));

      try {
        if (result && result.error) {
          setErr(result.error);
        } else {
          router.push("/news-feed");
        }
      } catch (error) {
        console.log(error);
      }
    };
    signin();
  };
}
