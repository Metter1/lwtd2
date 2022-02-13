import {
  SearchAction,
  SearchActionTypes,
  SearchState
} from '../../types-reducers/search';

const initialState: SearchState = {
  items: [],
  isLoading: false,
  error: false,
  loaded: false,
  searchData: undefined
};
export const SearchReducer = (
  state = initialState,
  action: SearchAction
): SearchState => {
  switch (action.type) {
    case SearchActionTypes.LOADING_SEARCH:
      return { ...state, isLoading: true };
    case SearchActionTypes.SEARCH_FETCH_VIDEO_DATA:
      return {
        ...state,
        isLoading: false,
        items: action.payload,
        loaded: true
      };
    case SearchActionTypes.SEARCH_FETCH_DATA:
      return {
        ...state,
        searchData: action.payload
      };
    case SearchActionTypes.SEARCH_FETCH_ERROR:
      return { ...state, isLoading: false, error: true, loaded: true };
    case SearchActionTypes.CLEAR_STORE:
      return { ...initialState };
    default:
      return state;
  }
};
