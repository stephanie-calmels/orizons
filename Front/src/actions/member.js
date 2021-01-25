import {
  CHANGE_REGISTER_FIELD, REGISTER, REGISTER_SUCCESS, REGISTER_FAIL,
  SET_LOADER_REGISTER, GET_MEMBER, UPDATE_MEMBER, GET_MEMBER_SUCCESS, GET_MEMBER_FAIL,
} from './types';

export const changeRegisterField = (name, value) => ({
  type: CHANGE_REGISTER_FIELD,
  name,
  value,
});

export const register = () => ({
  type: REGISTER,
});

export const registerSuccess = (message) => ({
  type: REGISTER_SUCCESS,
  message,
});

export const registerFail = (message) => ({
  type: REGISTER_FAIL,
  message,
});

export const activateLoader = () => ({
  type: SET_LOADER_REGISTER,
});

export const updateMember = () => ({
  type: UPDATE_MEMBER,
});

export const getMember = () => ({
  type: GET_MEMBER,
});

export const getMemberSuccess = (member) => ({
  type: GET_MEMBER_SUCCESS,
  member,
});

export const getMemberFail = (message) => ({
  type: GET_MEMBER_FAIL,
  message
});
