import {
  CHANGE_ADDTRIP_FIELD,
} from './types';

export const changeAddTripField = (name, value) => ({
  type: CHANGE_ADDTRIP_FIELD,
  name,
  value,
});
