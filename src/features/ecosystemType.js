// ecosystemSlice.js
import { createSlice } from '@reduxjs/toolkit';

const ecosystemTypeSlice = createSlice({
    name: 'ecosystemType',
    initialState: { type: null },
    reducers: {
        setEcosystemType(state, action) {
            state.type = action.payload;
        },
        clearEcosystemType(state) {
            state.type = null;
        },
    },
});

export const { setEcosystemType, clearEcosystemType } = ecosystemTypeSlice.actions;
export default ecosystemTypeSlice.reducer;
