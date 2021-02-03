import { GET_TRIP_SUCCESS, UPDATE_TRIP_SUCCESS} from '../actions/types';


const initialState = {
  tripItem: null,
};

const reducer = (oldState = initialState, action) => {
  switch (action.type) {
    case GET_TRIP_SUCCESS:
      return {
        ...oldState,
        tripItem: action.trip,
      };
    case UPDATE_TRIP_SUCCESS:
      return{
        ...oldState,
        tripItem: action.trip
      }
    
    default:
      return oldState;
  }
};

export default reducer;
