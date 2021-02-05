import {
  CHANGE_ADDSTEP_FIELD, POST_NEW_STEP_SUCCESS,
} from '../actions/types';

const initialState = {
  title: '',
  localisation: [],
  date: '',
  summary: '',
  pictures: [],
  showInput: false,
  localisationInput: '',
  country: '',
  country_code: ''
};

const reducer = (oldState = initialState, action) => {
  switch (action.type) {
    case CHANGE_ADDSTEP_FIELD:
      return {
        ...oldState,
        [action.name]: action.value,
      };
    case POST_NEW_STEP_SUCCESS:
      return {
        ...oldState,
        title: action.step.title,
        localisation: [action.step.latitude, action.step.longitude],
        date: action.step.step_date,
        summary: action.step.content,
        pictures: action.step.pictures,
        country: action.step.country,
        country_code: action.step.country_code
      };
    default:
      return oldState;
  }
};

export default reducer;
