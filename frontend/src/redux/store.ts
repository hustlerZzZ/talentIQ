import { configureStore } from "@reduxjs/toolkit";
import interviewerReducer from "./slice/interviewerSlice.ts";
import intervieweeReducer from "./slice/intervieweeSlice.ts";

export const store = configureStore({
  reducer: {
    interviewer: interviewerReducer,
    interviewee: intervieweeReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
