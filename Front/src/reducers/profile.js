import members from 'src/data/members';
import { GET_PROFILE_SUCCESS} from '../actions/types';


const initialState = {
  profileInfos: members[0],
};

const reducer = (oldState = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_SUCCESS:
      return {
        ...oldState,
        profileInfos: action.trip,
      };
    default:
      return oldState;
  }
};

export default reducer;
