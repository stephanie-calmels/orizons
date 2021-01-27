// import trips from 'src/data/trips';
import { GET_TRIPS_SUCCESS, GET_CATEGORIES_SUCCESS, GET_RANDOM_TRIPS_SUCCESS } from '../actions/types';

const initialState = {
  trips: [],
  categories: [],
  randomTrips: []
};

const reducer = (oldState = initialState, action) => {
  switch (action.type) {

    case GET_TRIPS_SUCCESS:
      return {
        ...oldState,
        trips: action.trips,
      };
    case GET_CATEGORIES_SUCCESS:
      return {
        ...oldState,
        categories: action.categories,
      };
    case GET_RANDOM_TRIPS_SUCCESS: 
      return {
        ...oldState,
        randomTrips: action.randomItems,
      };
    default:
      return oldState;
  }
};

export default reducer;
