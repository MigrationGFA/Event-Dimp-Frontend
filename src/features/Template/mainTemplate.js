import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentTemplate: null,
};

const mainTemplateSlice = createSlice({
  name: 'mainTemplate',
  initialState,
  reducers: {
    setTemplate(state, action) {
      state.currentTemplate = action.payload;
    },
    updateContent(state, action) {
      const { section, field, value, index } = action.payload;
      if (typeof index === 'number') {
        state.currentTemplate[section][index][field] = value;
      } else {
        state.currentTemplate[section][field] = value;
      }
    },
    updateStyles(state, action) {
      const { section, styles } = action.payload;
      state.currentTemplate[section].styles = { ...state.currentTemplate[section].styles, ...styles };
    },
    clearTemplate(state) {
      // Clear the current template when done editing
      state.currentTemplate = null;
    },
    updateNavbarFromEcosystem(state) {
      state.currentTemplate.navbar.brand = state.ecosystem.ecosystemName;
    },
  },
});

export const { setTemplate, updateContent, updateStyles, clearTemplate, updateNavbarFromEcosystem } = mainTemplateSlice.actions;
export default mainTemplateSlice.reducer;

