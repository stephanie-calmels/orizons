import { GET_TRIP_SUCCESS, UPDATE_TRIP_SUCCESS, UPDATE_STEP_SUCCESS,
  POST_NEW_STEP_SUCCESS,
} from '../actions/types';


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
      case UPDATE_STEP_SUCCESS:
        return {
          ...oldState,
        tripItem: action.step
      }  
      case POST_NEW_STEP_SUCCESS:
      return {
        ...oldState,
        tripItem: action.step,
      };
    default:
      return oldState;
  }
};

export default reducer;
