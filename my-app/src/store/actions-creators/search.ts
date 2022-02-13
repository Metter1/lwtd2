import { Dispatch } from '@reduxjs/toolkit';
import { YoutubeAPI } from '../../api/api';
import {
  Items,
  SearchAction,
  SearchActionTypes
} from '../../types-reducers/search';

export const SearchFetch = (
  pageSize: number,
  query: string,
  sort?: [string, string]
) => {
  return async (dispatch: Dispatch<SearchAction>) => {
    try {
      dispatch({ type: SearchActionTypes.LOADING_SEARCH });
      const responseSearch = await YoutubeAPI.searchVideos(
        pageSize,
        query,
        sort
      );
      dispatch({
        type: SearchActionTypes.SEARCH_FETCH_DATA,
        payload: responseSearch
      });
      const responseVideoById = await Promise.all(
        responseSearch.items.map(async (e: Items) => {
          return await YoutubeAPI.moveInfoVideo(e.id.videoId);
        })
      );
      dispatch({
        type: SearchActionTypes.SEARCH_FETCH_VIDEO_DATA,
        payload: responseVideoById
      });
    } catch (error) {
      dispatch({ type: SearchActionTypes.SEARCH_FETCH_ERROR });
    }
  };
};
