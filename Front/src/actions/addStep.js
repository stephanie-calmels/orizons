import {
  CHANGE_ADDSTEP_FIELD, POST_NEW_STEP, POST_NEW_STEP_SUCCESS
} from './types';

export const changeAddStepField = (name, value) => ({
  type: CHANGE_ADDSTEP_FIELD,
  name,
  value,
});

export const postNewStep = (data)=>({
  type: POST_NEW_STEP,
  data
});

export const postNewStepSuccess = (step)=>({
  type: POST_NEW_STEP_SUCCESS,
  step
});
