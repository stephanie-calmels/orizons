import { GET_TRIP, GET_TRIP_SUCCESS, UPDATE_TRIP,
  UPDATE_STEP, UPDATE_STEP_SUCCESS, DELETE_TRIP, DELETE_STEP, 
  UPDATE_TRIP_SUCCESS,
} from './types';

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
});

export const deleteTrip = () => ({
  type: DELETE_TRIP,
});

export const updateStep = (data, id) => ({
  type: UPDATE_STEP,
  data,
  id,
});

export const updateStepSuccess = (step) => ({
  type: UPDATE_STEP_SUCCESS,
  step,
});

export const deleteStep = (id) => ({
  type: DELETE_STEP,
  id,
});
