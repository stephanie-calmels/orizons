import {
  CHANGE_ADDTRIP_FIELD, POST_NEW_TRIP_SUCCESS
} from '../actions/types';

const initialState = {
  title: '',
  summary: '',
  localisation: '',
  categories: [],
  departure: '',
  returndate: '',
  coverpicture: null,
  country_code: '',
};

const reducer = (oldState = initialState, action) => {
  switch (action.type) {
    case CHANGE_ADDTRIP_FIELD:
      return {
        ...oldState,
        [action.name]: action.value,
      };
    case POST_NEW_TRIP_SUCCESS:
      return {
        ...oldState,
        title: action.trip.title,
        summary: action.trip.summary,
        localisation: action.trip.country,
        coverpicture: action.trip.cover_picture,
        categories: action.trip.categories,
        departure_date: action.trip.departure,
        arrival_date: action.trip.returndate,
        member_id: action.trip.member_id
      };
    default:
      return oldState;
  }
};

export default reducer;
