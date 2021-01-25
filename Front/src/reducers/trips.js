import trips from 'src/data/trips';
import categories from 'src/data/categories';
import { GET_TRIPS_SUCCESS, GET_CATEGORIES_SUCCESS } from '../actions/types';

const initialState = {
  trips: trips,
  categories: categories
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
    default:
      return oldState;
  }
};

export default reducer;
