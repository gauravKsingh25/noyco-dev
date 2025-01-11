import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import themeReducer from './slices/themeSlice';
import hoverReducer from "./slices/hoverSidebarSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    hover:hoverReducer
  },
});

export default store;
