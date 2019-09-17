import { createStore, compose, applyMiddleware } from 'redux';

import reducers from './ducks';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = store => next => action => {
  console.log('[Middleware] Dispatching', action);
  const result = next(action);
  console.log('[Middleware] next state', store.getState());
  return result;
};

const store = createStore(reducers, composeEnhancers(applyMiddleware(logger)));

export default store;