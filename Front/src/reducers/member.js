import {
  CHANGE_REGISTER_FIELD, REGISTER_SUCCESS, REGISTER_FAIL,
  SET_LOADER_REGISTER, GET_MEMBER_SUCCESS,
} from '../actions/types';

const initialState = {
  nickname: '',
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  passwordRepeat: '',
  errorMessage: '',
  isSuccessful: false,
  isLoading: false,
  registration_date: '',
};

const reducer = (oldState = initialState, action) => {
  switch (action.type) {
    case CHANGE_REGISTER_FIELD:
      return {
        ...oldState,
        [action.name]: action.value,
      };
    case REGISTER_SUCCESS:
      return {
        ...oldState,
        nickname: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        passwordRepeat: '',
        isSuccessful: true,
        isLoading: false,
      };
    case REGISTER_FAIL:
      return {
        ...oldState,
        errorMessage: action.message,
        isLoading: false,
      };
    case SET_LOADER_REGISTER:
      return {
        ...oldState,
        isLoading: true,
      };
    case GET_MEMBER_SUCCESS:
      return {
        ...oldState,
        nickname: action.member.nickname,
        firstname: action.member.first_name,
        lastname: action.member.last_name,
        email: action.member.email,
        photoId: action.member.photo_id,
        localisationId: action.member.localisation_id,
        registrationDate: action.member.registration_date,
      };
    default:
      return oldState;
  }
};

export default reducer;
