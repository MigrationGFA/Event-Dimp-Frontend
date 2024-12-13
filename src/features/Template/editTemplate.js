import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  editcurrentTemplate: null,
};

const editTemplateSlice = createSlice({
  name: 'editTemplate',
  initialState,
  reducers: {
    setTemplate(state, action) {
      state.editcurrentTemplate = action.payload;
    },
    updateContent(state, action) {
      const { section, field, value, index } = action.payload;
      if (typeof index === 'number') {
        state.editcurrentTemplate[section][index][field] = value;
      } else {
        state.editcurrentTemplate[section][field] = value;
      }
    },
    updateStyles(state, action) {
      const { section, styles } = action.payload;
      state.editcurrentTemplate[section].styles = { ...state.editcurrentTemplate[section].styles, ...styles };
    },
    clearTemplate(state) {
      // Clear the current template when done editing
      state.editcurrentTemplate = null;
    },
   
  },
});

export const { setTemplate, updateContent, updateStyles, clearTemplate } = editTemplateSlice.actions;
export default editTemplateSlice.reducer;

