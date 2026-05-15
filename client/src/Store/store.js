import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../Features/UserSlice"; 
import taskReducer from "../Features/TaskSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    tasks: taskReducer, // إضافة المهام هنا
  },
});