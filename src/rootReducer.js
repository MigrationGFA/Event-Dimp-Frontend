import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './features/authentication';
import ecosystemDomainReducer from './features/ecosystemDomain';
import activeSectionReducer from './features/Template/activeTemplate';
import mainTemplateReducer from './features/Template/mainTemplate';
import editTemplateReducer from "./features/Template/editTemplate"
import ecosystemPlanReducer from "./features/ecosystemPlan"


const rootReducer = combineReducers({
  auth: authReducer,
  ecosystemDomain: ecosystemDomainReducer, 
  activeSection: activeSectionReducer,
  mainTemplate: mainTemplateReducer,
  editTemplate: editTemplateReducer,
  ecosystemPlan: ecosystemPlanReducer,
 
});

export default rootReducer;
