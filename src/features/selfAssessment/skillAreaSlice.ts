import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Client } from "../../apiClient";
import { RootState } from "../../app/store";
import { SkillAreaSummaryMap } from "../../types";
import { submitSkillAreaToApi } from "../skillArea/submitSkillAreaSlice";

export type SkillAreaState = {
  loading: boolean;
  skillAreas: SkillAreaSummaryMap;
  error?: string;
};

const initialState: SkillAreaState = {
  loading: false,
  skillAreas: {},
};

export const fetchSkillAreas = createAsyncThunk<
  SkillAreaSummaryMap,
  void,
  { state: RootState }
>("skills/fetchSkillAreas", async () => {
  const client = new Client(new URL("http://localhost:3000"));
  const areas = await client.getAllSkillAreas();
  const mapping: SkillAreaSummaryMap = areas.reduce<SkillAreaSummaryMap>(
    (acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    },
    {}
  );
  return mapping;
});

const skillAreasSlice = createSlice({
  name: "skillAreas",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSkillAreas.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchSkillAreas.fulfilled,
      (state, action: PayloadAction<SkillAreaSummaryMap>) => {
        state.loading = false;
        state.skillAreas = action.payload;
        delete state.error;
      }
    );
    builder.addCase(fetchSkillAreas.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Something went wrong";
    });
    builder.addCase(submitSkillAreaToApi.fulfilled, (state, { payload }) => {
      state.skillAreas = {
        ...state.skillAreas,
        [payload.id]: payload,
      };
    });
  },
});

export default skillAreasSlice.reducer;
