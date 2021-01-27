import { combineReducers } from 'redux';

import auth from './auth';
import member from './member';
import trips from './trips';
import trip from './trip';
import profile from './profile';

export default combineReducers({
  auth,
  trips,
  trip,
  member,
  profile,
});
