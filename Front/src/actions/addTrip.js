import {
  CHANGE_ADDTRIP_FIELD, POST_NEW_TRIP,
} from './types';

export const changeAddTripField = (name, value) => ({
  type: CHANGE_ADDTRIP_FIELD,
  name,
  value,
});

export const postNewTrip = (data)=>({
  type: POST_NEW_TRIP,
  data
})
