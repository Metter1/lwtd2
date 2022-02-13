import {
  UserAction,
  UserActionTypes,
  UserState
} from '../../types-reducers/user';

const initialState: UserState = {
  currentUser: '',
  isAuth: false,
  error: null
};

export const userReducer = (
  state = initialState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case UserActionTypes.FETCH_USER:
      return { ...state, isAuth: false, error: null };
    case UserActionTypes.FETCH_USER_SUCCESS:
      return {
        isAuth: true,
        error: null,
        currentUser: action.payload
      };
    case UserActionTypes.FETCH_USER_ERROR:
      return { ...state, isAuth: false, error: true };

    case UserActionTypes.CHECK_USER_AUTH:
      return {
        isAuth: true,
        error: null,
        currentUser: action.payload
      };
    case UserActionTypes.LOGOUT_USER:
      return {
        ...state,
        isAuth: false,
        error: null
      };
    default:
      return state;
  }
};
