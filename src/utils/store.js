"use client";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";

import userReducer from "./slice"; // Adjust the path to the slice
import storage from "./storage";

// Redux Persist Configuration
const persistConfig = {
  key: "user", // Key under which the data will be stored in localStorage
  storage, // Storage engine for persistence
  whitelist: ["username"], // Only persist whitelist keys from the state
};

// Wrap the userReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, userReducer);

// Create the Store with the persisted reducer
export const makeStore = configureStore({
  reducer: {
    user: persistedReducer, // Persisted reducer for user slice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
          "persist/FLUSH",
          "persist/PAUSE",
          "persist/PURGE",
        ], // Ignore Redux Persist-specific actions
      },
    }),
});

// Export the persistor
export const persistor = persistStore(makeStore);
