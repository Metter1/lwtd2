export interface AppState {
  AppIsInitialization: boolean;
}

export enum AppActionTypes {
  LOADING_APP = 'LOADING_APP'
}

interface LoadingAppAction {
  type: AppActionTypes.LOADING_APP;
}

export type AppAction = LoadingAppAction;
