import { GET_COUNTRIES, GET_COUNTRIES_SUCCESS, CHANGE_COUNTRY_FIELD } from './types';

export const getCountries = () => ({
  type: GET_COUNTRIES,
});

export const getCountriesSuccess = (countries) => ({
  type: GET_COUNTRIES_SUCCESS,
  countries,
});

export const changeCountryField = (value) => ({
  type: CHANGE_COUNTRY_FIELD,
  value
})
