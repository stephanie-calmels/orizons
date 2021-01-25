import {
  RANDOM_SEARCH, GET_MORE_RESULTS
} from './types';

export const randomSearch = () => ({
  type: RANDOM_SEARCH,
});

export const getMoreResults = () => ({
  type: GET_MORE_RESULTS,
});
