import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import apiMiddleware from 'src/middlewares/api';
import utilsMiddleware from 'src/middlewares/utils';

// rootReducer = résultat de combineReducers
import rootReducer from 'src/reducers';

// on crée le store
const store = createStore(
  rootReducer,
  composeWithDevTools( // devtools
    // branchement de middleware
    applyMiddleware(apiMiddleware, utilsMiddleware),
  ),
);

export default store;
