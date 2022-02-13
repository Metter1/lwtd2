import { AppAction, AppActionTypes, AppState } from '../../types-reducers/app';

const initialState: AppState = {
  AppIsInitialization: true
};

export const appReducer = (
  state = initialState,
  action: AppAction
): AppState => {
  switch (action.type) {
    case AppActionTypes.LOADING_APP:
      return { AppIsInitialization: false };
    default:
      return state;
  }
};
