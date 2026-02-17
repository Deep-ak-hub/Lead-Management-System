import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { UserApi } from "../redux/Api/UserApi";
import { AdminApi } from "../redux/Api/Admin";
import { ServiceApi } from "../redux/Api/Service";
import AdminSlice from "../redux/Slice/AdminSlice";
import { authMiddleware } from "../redux/middleware/authMiddleware";
import { ProjectApi } from "../redux/Api/Project";

export const store = configureStore({
  reducer: {
    admin: AdminSlice,
    [UserApi.reducerPath]: UserApi.reducer,
    [AdminApi.reducerPath]: AdminApi.reducer,
    [ServiceApi.reducerPath]: ServiceApi.reducer,
    [ProjectApi.reducerPath]: ProjectApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      UserApi.middleware,
      AdminApi.middleware,
      ServiceApi.middleware,
      ProjectApi.middleware,
      authMiddleware
    ),
});

setupListeners(store.dispatch);
