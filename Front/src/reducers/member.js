import {
  CHANGE_REGISTER_FIELD, REGISTER_SUCCESS, REGISTER_FAIL,
  SET_LOADER_REGISTER, GET_MEMBER_SUCCESS, GET_MEMBER_FAIL, UPDATE_MEMBER_SUCCESS,
  UPDATE_MEMBER_FAIL, UPDATE_PROFILE_PHOTO_SUCCESS, DELETE_MEMBER_SUCCESS,

} from '../actions/types';

const initialState = {
  nickname: '',
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  passwordRepeat: '',
  errorMessage: '',
  isLoading: false,
  registrationDate: '',
  profilePhoto: '',
  biography: '',
  id: -1,
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
        localisationId: action.member.localisation_id,
        registrationDate: action.member.registration_date,
        profilePhoto: action.member.profile_photo,
        id: action.member.id,
        biography: action.member.biography,
        localisation: action.member.localisation,
        isLoading: false,
        errorMessage: '',
      };
    case GET_MEMBER_FAIL:
      return {
        ...oldState,
        isLoading: false,
        errorMessage: action.member.errorMessage,
      };
    case UPDATE_MEMBER_SUCCESS:
      return {
        ...oldState,
        nickname: action.member.nickname,
        firstname: action.member.first_name,
        lastname: action.member.last_name,
        email: action.member.email,
        isLoading: false,
        errorMessage: '',
      };
    case UPDATE_MEMBER_FAIL:
      return {
        ...oldState,
        isLoading: false,
        errorMessage: action.message,
      };
    case UPDATE_PROFILE_PHOTO_SUCCESS:
      return {
        ...oldState,
        profilePhoto: action.profile_photo,
      };
    case DELETE_MEMBER_SUCCESS:
      return {
        initialState,
      };
    default:
      return oldState;
  }
};

export default reducer;
