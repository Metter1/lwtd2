import { Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import { UserAction, UserActionTypes } from '../../types-reducers/user';
import { CreateUserJwt } from '../../interfaces/AuthJwt';
import { SearchAction, SearchActionTypes } from '../../types-reducers/search';

export const login = (username: string, password: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionTypes.FETCH_USER });
      const response = await axios.post<CreateUserJwt>(
        `http://localhost:3001/login`,
        {
          username,
          password
        }
      );
      dispatch({
        type: UserActionTypes.FETCH_USER_SUCCESS,
        payload: response.data.username
      });
      localStorage.setItem('token', response.data.token);
    } catch (e) {
      dispatch({ type: UserActionTypes.FETCH_USER_ERROR });
    }
  };
};

export const logout = () => {
  return async (dispatch: Dispatch<UserAction | SearchAction>) => {
    try {
      localStorage.removeItem('token');
      dispatch({ type: UserActionTypes.LOGOUT_USER });
      dispatch({ type: SearchActionTypes.CLEAR_STORE });
    } catch (e) {}
  };
};
