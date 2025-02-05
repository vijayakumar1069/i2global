import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "", // Serializable value
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userSet: (state, action) => {
      state.username = action.payload; // Set username
    },
    userReset: (state) => {
      state.username = ""; // Reset username on logout or reset
    },
  },
});

// Export the actions for use with dispatch
export const { userSet, userReset } = userSlice.actions;

// Export the reducer for the store
export default userSlice.reducer;
