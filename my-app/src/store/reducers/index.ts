import { combineReducers } from '@reduxjs/toolkit';
import { userReducer } from './userReducer';
import { appReducer } from './appReducer';
import { SearchReducer } from './searchReducer';

export const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  youtube: SearchReducer
});

export type RootState = ReturnType<typeof rootReducer>;
