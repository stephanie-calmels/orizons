import {
  CHANGE_ADDTRIP_FIELD, POST_NEW_TRIP, POST_NEW_TRIP_SUCCESS
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


export const postNewTripSuccess = (trip)=>({
  type: POST_NEW_TRIP_SUCCESS,
  trip
});
