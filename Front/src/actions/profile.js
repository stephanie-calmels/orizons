import { GET_PROFILE, GET_PROFILE_SUCCESS, UPDATE_PROFILE, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL } from './types';

export const getProfile = (id)=>({
  type: GET_PROFILE,
  id
});

export const getProfileSuccess = (profile)=>({
  type: GET_PROFILE_SUCCESS,
  profile
});

export const updateProfile = (data)=>({
  type: UPDATE_PROFILE,
  data
});

export const updateProfileSuccess = (profile)=>({
  type: UPDATE_PROFILE_SUCCESS,
  profile
});

export const updateProfileFail = (message) => ({
  type: UPDATE_PROFILE_FAIL,
  message,
});
