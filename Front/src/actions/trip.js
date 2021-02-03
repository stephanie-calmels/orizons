import { GET_TRIP, GET_TRIP_SUCCESS, UPDATE_TRIP } from './types';

export const getTrip = (id) => ({
  type: GET_TRIP,
  id,
});

export const getTripSuccess = (trip) => ({
  type: GET_TRIP_SUCCESS,
  trip,
});

export const updateTrip = (data) => ({
  type: UPDATE_TRIP,
  data,
});

export const updateTripSuccess = (trip) => ({
  type: UPDATE_TRIP_SUCCESS,
  trip,
})
