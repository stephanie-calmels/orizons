import { GET_PROFILE, GET_PROFILE_SUCCESS } from './types';

export const getProfile = (id)=>({
  type: GET_PROFILE,
  id
});

export const getProfileSuccess = (profile)=>({
  type: GET_Profile_SUCCESS,
  trip
});

