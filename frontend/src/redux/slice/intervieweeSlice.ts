import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store.ts";

interface intervieweeState {
  fullName: string;
  email: string;
}

const initialState: intervieweeState = {
  fullName: "",
  email: "",
};

export const intervieweeSlice = createSlice({
  name: "interviewee",
  initialState,
  reducers: {
    setInterviewee: (
      state: intervieweeState,
      action: PayloadAction<intervieweeState>,
    ) => {
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
    },
  },
});

export const { setInterviewee } = intervieweeSlice.actions;
export const selectInterviewee = (state: RootState) => state.interviewer;
export default intervieweeSlice.reducer;
