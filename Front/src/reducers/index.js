import { combineReducers } from 'redux';

import auth from './auth';
import member from './member';
import trips from './trips';

export default combineReducers({
  auth,
  member,
  trips,
});
