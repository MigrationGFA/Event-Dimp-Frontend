// store/serviceSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  services: [],
};

const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    addService: (state, action) => {
      const newService = { ...action.payload, id: uuidv4() };
      state.services.push(newService);
    },
    removeService: (state, action) => {
      state.services = state.services.filter(
        (service) => service.id !== action.payload
      );
    },
    updateService: (state, action) => {
      const index = state.services.findIndex(
        (service) => service.id === action.payload.id
      );
      if (index !== -1) {
        state.services[index] = action.payload;
      }
    },
    resetService: (state) => {
      state.services = []; 
    },
  },
});

export const { addService, removeService, updateService, resetService } = serviceSlice.actions;
export default serviceSlice.reducer;
