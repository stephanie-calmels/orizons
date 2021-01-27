import {
  CHANGE_ADDTRIP_FIELD,
} from '../actions/types';

const initialState = {
  title: '',
  summary: '',
  localisation: '',
  categories: [],
  departure: '',
  returndate: '',
  coverpicture: null,
};

const reducer = (oldState = initialState, action) => {
  switch (action.type) {
    case CHANGE_ADDTRIP_FIELD:
      return {
        ...oldState,
        [action.name]: action.value,
      };
    default:
      return oldState;
  }
};

export default reducer;
