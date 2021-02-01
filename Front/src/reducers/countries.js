import { GET_COUNTRIES_SUCCESS, CHANGE_COUNTRY_FIELD } from '../actions/types';

const initialState = {
  countries: [],
  country_search: ''
};

const reducer = (oldState = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRIES_SUCCESS:
      return {
        ...oldState,
        countries: action.countries,
      };
      case CHANGE_COUNTRY_FIELD:
      return {
        ...oldState,
        country_search: action.value,
      };
    default:
      return oldState;
  }
};

export default reducer;
