import { SkillArea } from "@prisma/client";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Client } from "../../apiClient";
import { RootState } from "../../app/store";
import {
  SelfAssessmentErrorMap,
  SelfAssessmentLoadingMap,
  SelfAssessmentSummary,
  SelfAssessmentSummaryMap,
} from "../../types";

export type SelfAssessmentState = {
  loading: SelfAssessmentLoadingMap;
  assessments: SelfAssessmentSummaryMap;
  error: SelfAssessmentErrorMap;
};

const initialState: SelfAssessmentState = {
  loading: {},
  assessments: {},
  error: {},
};

export const fetchSelfAssessment = createAsyncThunk<
  SelfAssessmentSummary,
  { skillAreaId: SkillArea["id"] },
  { state: RootState }
>(
  "assessments/fetchSelfAssessment",
  async ({ skillAreaId }: { skillAreaId: SkillArea["id"] }) => {
    const client = new Client(new URL("http://localhost:3000"));
    const assessment = await client.getSelfAssessment(skillAreaId);
    return assessment;
  }
);

export const submitAssessmentToApi = createAsyncThunk<
  SelfAssessmentSummary,
  { skillAreaId: SkillArea["id"]; score: number },
  { state: RootState }
>(
  "assessments/submitSelfAssessment",
  async ({
    skillAreaId,
    score,
  }: {
    skillAreaId: SkillArea["id"];
    score: number;
  }) => {
    const client = new Client(new URL("http://localhost:3000"));
    await client.submitAssessment(skillAreaId, score);
    const assessment = await client.getSelfAssessment(skillAreaId);
    return assessment;
  }
);

const selfAssessmentSlice = createSlice({
  name: "assessments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSelfAssessment.pending, (state, action) => {
      state.loading[action.meta.arg.skillAreaId] = true;
    });
    builder.addCase(
      fetchSelfAssessment.fulfilled,
      (state, action: PayloadAction<SelfAssessmentSummary>) => {
        state.loading[action.payload.skillAreaId] = false;
        state.assessments = {
          ...state.assessments,
          [action.payload.skillAreaId]: action.payload,
        };
        delete state.error[action.payload.skillAreaId];
      }
    );
    builder.addCase(fetchSelfAssessment.rejected, (state, action) => {
      state.loading[action.meta.arg.skillAreaId] = false;
      if (action.error.message === "No Self Assessment found") {
        delete state.assessments[action.meta.arg.skillAreaId];
        delete state.error[action.meta.arg.skillAreaId];
        return;
      }
      state.error[action.meta.arg.skillAreaId] =
        action.error.message || "Something went wrong";
    });
    builder.addCase(submitAssessmentToApi.pending, (state, action) => {
      state.loading[action.meta.arg.skillAreaId] = true;
    });
    builder.addCase(
      submitAssessmentToApi.fulfilled,
      (state, action: PayloadAction<SelfAssessmentSummary>) => {
        state.loading[action.payload.skillAreaId] = false;
        state.assessments = {
          ...state.assessments,
          [action.payload.skillAreaId]: action.payload,
        };
        delete state.error[action.payload.skillAreaId];
      }
    );
    builder.addCase(submitAssessmentToApi.rejected, (state, action) => {
      state.loading[action.meta.arg.skillAreaId] = false;
      state.error[action.meta.arg.skillAreaId] =
        action.error.message || "Something went wrong";
    });
  },
});

export default selfAssessmentSlice.reducer;
