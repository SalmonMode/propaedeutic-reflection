import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Client } from "../../apiClient";
import { RootState } from "../../app/store";
import { CreateNewSkillArea, SkillAreaSummary } from "../../types";
import { fetchSkillAreas } from "../selfAssessment/skillAreaSlice";

export type SubmitSkillAreaState = {
  loading: boolean;
  error?: string;
};

const initialState: SubmitSkillAreaState = {
  loading: false,
};

export const submitSkillAreaToApi = createAsyncThunk<
  SkillAreaSummary,
  CreateNewSkillArea,
  { state: RootState }
>("submitSkillArea", async (skillAreaDetails: CreateNewSkillArea) => {
  const client = new Client(new URL("http://localhost:3000"));
  const summary = await client.submitNewSkillArea(skillAreaDetails);
  return summary;
});

const submitSkillAreaSlice = createSlice({
  name: "submitSkillArea",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(submitSkillAreaToApi.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(submitSkillAreaToApi.fulfilled, (state) => {
      state.loading = false;
      delete state.error;
    });
    builder.addCase(submitSkillAreaToApi.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export default submitSkillAreaSlice.reducer;
