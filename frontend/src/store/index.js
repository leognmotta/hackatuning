import { createStore, compose, applyMiddleware } from 'redux';

import reducers from './ducks';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = store => next => action => {
  const result = next(action);
  return result;
};

const store = createStore(reducers, composeEnhancers(applyMiddleware(logger)));

export default store;