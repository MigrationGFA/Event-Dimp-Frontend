// ecosystemSlice.js
import { createSlice } from '@reduxjs/toolkit';

const ecosystemDomainSlice = createSlice({
  name: 'ecosystemDomain',
  initialState: { domain: null },
  reducers: {
    setEcosystemDomain(state, action) {
      state.domain = action.payload;
    },
    clearEcosystemDomain(state) {
      state.domain = null;
    },
  },
});

export const { setEcosystemDomain, clearEcosystemDomain } = ecosystemDomainSlice.actions;
export default ecosystemDomainSlice.reducer;
