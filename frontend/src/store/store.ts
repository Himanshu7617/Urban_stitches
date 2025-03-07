import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../slices/apiSlice";



// Create the store with the reducer
export const store = configureStore({
  reducer: {
   [apiSlice.reducerPath]  : apiSlice.reducer
  },
  middleware : getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware)
});

// Infer the types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
