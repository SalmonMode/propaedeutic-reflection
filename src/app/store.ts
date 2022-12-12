import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";
import selfAssessmentSlice from "../features/selfAssessment/selfAssessmentSlice";
import skillAreasSlice from "../features/selfAssessment/skillAreaSlice";
import submitSkillAreasSlice from "../features/skillArea/submitSkillAreaSlice";

const rootReducer = combineReducers({
  submitSkillAreas: submitSkillAreasSlice,
  skillAreas: skillAreasSlice,
  assessments: selfAssessmentSlice,
});

export function makeStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}
// export function makeStore(preloadedState?: PreloadedState<RootState>) {
//   return configureStore({
//     reducer: rootReducer,
//     preloadedState,
//   });
// }

const store = makeStore();

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export type AppState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
