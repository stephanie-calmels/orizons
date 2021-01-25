import {
  RANDOM_SEARCH, GET_MORE_RESULTS, GET_TRIPS, GET_TRIPS_SUCCESS
} from './types';

export const randomSearch = () => ({
  type: RANDOM_SEARCH,
});

export const getMoreResults = () => ({
  type: GET_MORE_RESULTS,
});

export const getTrips = () => ({
  type: GET_TRIPS,
});

export const getTripsSuccess = (trips) => ({
  type: GET_TRIPS_SUCCESS,
  trips
});
