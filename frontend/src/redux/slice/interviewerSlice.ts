import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store.ts";

interface interviewerState {
  fullName: string;
  email: string;
}

const initialState: interviewerState = {
  fullName: "",
  email: "",
};

export const interviewerSlice = createSlice({
  name: "interviewer",
  initialState,
  reducers: {
    setInterviewer: (
      state: interviewerState,
      action: PayloadAction<interviewerState>,
    ) => {
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
    },
  },
});

export const { setInterviewer } = interviewerSlice.actions;
export const selectInterviewer = (state: RootState) => state.interviewer;
export default interviewerSlice.reducer;
