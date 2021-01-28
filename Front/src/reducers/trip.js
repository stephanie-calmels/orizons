import trips from 'src/data/trips';
import { GET_TRIP_SUCCESS} from '../actions/types';


const initialState = {
  tripItem: trips[0],
};

const reducer = (oldState = initialState, action) => {
  switch (action.type) {
    case GET_TRIP_SUCCESS:
      return {
        ...oldState,
        tripItem: action.trip,
      };
    default:
      return oldState;
  }
};

export default reducer;
