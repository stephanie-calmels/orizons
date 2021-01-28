import {
  CHANGE_ADDSTEP_FIELD, POST_NEW_STEP,
} from './types';

export const changeAddStepField = (name, value) => ({
  type: CHANGE_ADDSTEP_FIELD,
  name,
  value,
});

export const postNewStep = (data)=>({
  type: POST_NEW_STEP,
  data
})
