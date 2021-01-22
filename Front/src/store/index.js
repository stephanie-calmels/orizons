import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import apiMiddleware from 'src/middlewares/api';
// rootReducer = résultat de combineReducers
import rootReducer from 'src/reducers';

// on crée le store
const store = createStore(
  rootReducer,
  composeWithDevTools( // devtools
    // branchement de middleware
    applyMiddleware(apiMiddleware),
  ),
);

// on l'exporte par défaut
export default store;
