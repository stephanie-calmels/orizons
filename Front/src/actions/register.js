import {
  CHANGE_REGISTER_FIELD, REGISTER_SUCCESS, REGISTER,
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
  message
});
