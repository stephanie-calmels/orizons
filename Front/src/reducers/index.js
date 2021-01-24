/* eslint-disable object-shorthand */

import { combineReducers } from 'redux';

import auth from './auth';
import trips from './trips';

// combineReducers : on lui donne un objet
// en clé : le nom de la "tranche" de state
// en valeur : le reducer
// on peut utiliser la shorthand property
// shorthand : si clé = valeur, on écrit juste une fois
export default combineReducers({
  auth,
  trips
});
