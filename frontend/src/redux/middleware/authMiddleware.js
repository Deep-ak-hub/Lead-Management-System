import { logout } from "../Slice/AdminSlice";

export const authMiddleware = (store) => (next) => (action) => {
  if (action.payload?.status === 401) {
    store.dispatch(logout());
  }
  return next(action);
};
