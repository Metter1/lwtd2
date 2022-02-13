export interface UserState {
  currentUser: string;
  isAuth: boolean;
  error: boolean | null;
}

export enum UserActionTypes {
  FETCH_USER = 'FETCH_USER',
  FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS',
  FETCH_USER_ERROR = 'FETCH_USER_ERROR',
  CHECK_USER_AUTH = 'CHECK_USER_AUTH',
  LOGOUT_USER = 'LOGOUT_USER'
}

interface LogoutUser {
  type: UserActionTypes.LOGOUT_USER;
}

interface FetchUserAction {
  type: UserActionTypes.FETCH_USER;
}
interface FetchUserSuccessAction {
  type: UserActionTypes.FETCH_USER_SUCCESS;
  payload: any;
}
interface FetchUserErrorAction {
  type: UserActionTypes.FETCH_USER_ERROR;
}

interface CheckUserAuthAction {
  type: UserActionTypes.CHECK_USER_AUTH;
  payload: string;
}

export type UserAction =
  | FetchUserAction
  | FetchUserSuccessAction
  | FetchUserErrorAction
  | CheckUserAuthAction
  | LogoutUser;
