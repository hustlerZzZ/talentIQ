import { configureStore } from "@reduxjs/toolkit";
import interviewerReducer from "./slice/interviewerSlice.ts";
import intervieweeReducer from "./slice/intervieweeSlice.ts";

export const store = configureStore({
  reducer: {
    interviewer: interviewerReducer,
    interviewee: intervieweeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
