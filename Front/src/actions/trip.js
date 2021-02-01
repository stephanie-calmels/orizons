import { GET_TRIP, GET_TRIP_SUCCESS } from './types';

export const getTrip = (id) => ({
  type: GET_TRIP,
  id,
});

export const getTripSuccess = (trip) => ({
  type: GET_TRIP_SUCCESS,
  trip,
});
