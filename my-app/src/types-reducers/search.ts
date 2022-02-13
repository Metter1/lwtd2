export interface SearchState {
  isLoading: boolean;
  items: ItemsVideoFetch[];
  searchData?: Items;
  error: boolean;
  loaded: boolean;
}

export enum SearchActionTypes {
  LOADING_SEARCH = 'LOADING_SEARCH',
  SEARCH_FETCH_VIDEO_DATA = 'SEARCH_FETCH_VIDEO_DATA',
  SEARCH_FETCH_DATA = 'SEARCH_FETCH_DATA',
  SEARCH_FETCH_ERROR = 'SEARCH_FETCH_ERROR',
  CLEAR_STORE = 'CLEAR_STORE'
}

interface FetchErrorSeacrhAction {
  type: SearchActionTypes.SEARCH_FETCH_ERROR;
}

interface LoadingSearchAction {
  type: SearchActionTypes.LOADING_SEARCH;
}

interface FetchDataSearchAction {
  type: SearchActionTypes.SEARCH_FETCH_DATA;
  payload: any;
}

interface FetchVideoDataAction {
  type: SearchActionTypes.SEARCH_FETCH_VIDEO_DATA;
  payload: ItemsVideoFetch[];
}

interface ClearStore {
  type: SearchActionTypes.CLEAR_STORE;
}

export type SearchAction =
  | LoadingSearchAction
  | FetchDataSearchAction
  | FetchErrorSeacrhAction
  | FetchVideoDataAction
  | ClearStore;

export interface Items {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
    playlistId: string;
  };
  pageInfo: {
    resultPerPage: string;
    totalResults: number;
  };
  snippet: SnippetVideo;
}

export interface ItemsVideo {
  kind: string;
  etag: string;
  id: string;
  snippet: SnippetVideo;
  statistics: StatisticsVideo;
}

export interface SnippetVideo {
  categoryId: string;
  channelId: string;
  channelTitle: string;
  title: string;
  description: string;
  publishedAt: string;
  liveBroadcastContent: string;
  thumbnails: {
    default: { url: string; width: string; height: string };
    medium: { url: string; width: string; height: string };
    high: { url: string; width: string; height: string };
  };
}

export interface StatisticsVideo {
  commentCount: string;
  favoriteCount: string;
  likeCount: string;
  viewCount: string;
}

export interface ItemsFetch {
  items: Items[];
}
export interface ItemsVideoFetch {
  items: ItemsVideo[];
}
