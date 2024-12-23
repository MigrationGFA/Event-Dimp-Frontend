import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  tickets: [],
};

const ticketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    saveTicket: (state, action) => {
      const newTicket = { ...action.payload, id: uuidv4() };
      state.tickets.push(newTicket);
    },
    removeTicket: (state, action) => {
      state.tickets = state.tickets.filter(
        (ticket) => ticket.id !== action.payload
      );
    },
    updateTicket: (state, action) => {
      const index = state.tickets.findIndex(
        (ticket) => ticket.id === action.payload.id
      );
      if (index !== -1) {
        state.tickets[index] = action.payload;
      }
    },
    resetTickets: (state) => {
      state.tickets = [];
    },
  },
});

export const { saveTicket, removeTicket, updateTicket, resetTickets } =
  ticketSlice.actions;

export default ticketSlice.reducer;
