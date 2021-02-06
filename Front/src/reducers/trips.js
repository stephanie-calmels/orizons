import { GET_TRIPS_SUCCESS, GET_CATEGORIES_SUCCESS, GET_RANDOM_TRIPS_SUCCESS, GET_TRIPS_BY_CATEGORIES_SUCCESS, CHANGE_CATEGORY_FIELD, GET_TRIPS_BY_COUNTRY_SUCCESS, CHANGE_SEARCH_FIELD
} from '../actions/types';

const initialState = {
  trips: [],
  categories: [],
  randomTrips: [],
  filteredTrips: [],
  category_search: 12,
  search: ''
};

const reducer = (oldState = initialState, action) => {
  switch (action.type) {

    case GET_TRIPS_SUCCESS:
      return {
        ...oldState,
        trips: action.trips,
        filteredTrips: action.trips,
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
    case GET_TRIPS_BY_CATEGORIES_SUCCESS:
      return {
        ...oldState,
        filteredTrips: action.trips,
      };
    case CHANGE_CATEGORY_FIELD:
      return {
        ...oldState,
        category_search: parseInt(action.id, 10),
      };
    case GET_TRIPS_BY_COUNTRY_SUCCESS:
      return {
        ...oldState,
        filteredTrips: action.trips,
        search: '',
      };
    case CHANGE_SEARCH_FIELD:
      return {
        ...oldState,
        search: action.value,
      };
    default:
      return oldState;
  }
};

export default reducer;
