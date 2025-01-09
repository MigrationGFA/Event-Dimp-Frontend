import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/creatorApis";

// Define an initial state
const initialState = {
  creatorId: null,
  ecosystemName: "",
  ecosystemDomain: "",
  targetAudienceSector: "",
  mainObjective: "",
  ecosystemDescription: "",
  contact: "",
  address: "",
  state: "",
  country: "",
  localGovernment: "",
};

export const creatorCreateEcosystem = createAsyncThunk(
  "auth/creatorCreateEcosystem",
  async (
    {
      creatorId,
      ecosystemName,
      ecosystemDomain,
      targetAudienceSector,
      mainObjective,
      contact,
      address,
      ecosystemDescription,
      country,
      state,
      localGovernment,
      type,
      accessToken,
      refreshToken,
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.creatorBusInfo({
        creatorId,
        ecosystemName,
        ecosystemDomain,
        targetAudienceSector,
        mainObjective,
        contact,
        address,
        ecosystemDescription,
        country,
        state,
        localGovernment,
        type,
        accessToken,
        refreshToken,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const ecosystemSlice = createSlice({
  name: "ecosystem",
  initialState: {
    ...initialState,
    loading: false,
    error: null,
  },
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    setCreatorId: (state, action) => {
      state.creatorId = action.payload;
    },
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(creatorCreateEcosystem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(creatorCreateEcosystem.fulfilled, (state, action) => {
        state.loading = false;
        Object.assign(state, action.payload);
      })
      .addCase(creatorCreateEcosystem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateField, setCreatorId, resetState } = ecosystemSlice.actions;

export default ecosystemSlice.reducer;
