import {
  RANDOM_SEARCH, GET_MORE_RESULTS, GET_TRIPS, GET_TRIPS_SUCCESS, GET_CATEGORIES, GET_CATEGORIES_SUCCESS, GET_TRIPS_BY_CATEGORY, GET_RANDOM_TRIPS, GET_RANDOM_TRIPS_SUCCESS, GET_TRIPS_BY_CATEGORIES_SUCCESS, 
} from './types';

// eslint-disable-next-line import/prefer-default-export
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

export const getCategories = () => ({
  type: GET_CATEGORIES,
});

export const getCategoriesSuccess = (categories) => ({
  type: GET_CATEGORIES_SUCCESS,
  categories
});

export const getTripsByCategory = (id) => ({
  type: GET_TRIPS_BY_CATEGORY,
  id
});

export const getRandomTrips = () => ({
  type: GET_RANDOM_TRIPS,
});

export const getRandomTripsSuccess = (randomItems) => ({
  type: GET_RANDOM_TRIPS_SUCCESS,
  randomItems
});
export const getTripsByCategoriesSuccess = (trips) => ({
  type: GET_TRIPS_BY_CATEGORIES_SUCCESS,
  trips
});
