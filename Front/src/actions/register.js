import {
  CHANGE_REGISTER_FIELD, REGISTER, REGISTER_SUCCESS, REGISTER_FAIL,
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
