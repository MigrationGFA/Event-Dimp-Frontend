// ecosystemSlice.js
import { createSlice } from '@reduxjs/toolkit';

const ecosystemPlanSlice = createSlice({
  name: 'ecosystemPlan',
  initialState: { plan: null },
  reducers: {
    setEcosystemPlan(state, action) {
      state.plan = action.payload;
    },
  },
});

export const { setEcosystemPlan } = ecosystemPlanSlice.actions;
export default ecosystemPlanSlice.reducer;
