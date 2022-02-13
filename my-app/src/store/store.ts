import { applyMiddleware, compose, createStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers/index';

export const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
