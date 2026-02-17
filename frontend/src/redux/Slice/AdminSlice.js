import { createSlice } from "@reduxjs/toolkit";

export const AdminSlice = createSlice({
  name: "admin",
  initialState: {
    token: localStorage.getItem("admin"),
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = null;
      localStorage.clear();
    },
  },
})

export const { logout, login } = AdminSlice.actions;
export default AdminSlice.reducer;
