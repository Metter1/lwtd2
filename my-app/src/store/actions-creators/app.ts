import { Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import { PayloadUserJwt } from '../../interfaces/AuthJwt';
import { AppAction, AppActionTypes } from '../../types-reducers/app';
import { UserAction, UserActionTypes } from '../../types-reducers/user';

export const initializeApp = () => {
  return async (dispatch: Dispatch<AppAction | UserAction>) => {
    try {
      const response = await axios.post<PayloadUserJwt>(
        `http://localhost:3001/auth/check`,
        {
          token: localStorage.getItem('token')
        }
      );
      const { username } = response.data;
      dispatch({ type: UserActionTypes.CHECK_USER_AUTH, payload: username });
      dispatch({ type: AppActionTypes.LOADING_APP });
    } catch (error) {
      dispatch({ type: AppActionTypes.LOADING_APP });
    }
  };
};
