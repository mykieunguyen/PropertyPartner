import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { propertyPartnerApi } from "./apiSlice";

export const store = configureStore({
  reducer: {
    [propertyPartnerApi.reducerPath]: propertyPartnerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(propertyPartnerApi.middleware),
});

setupListeners(store.dispatch);
