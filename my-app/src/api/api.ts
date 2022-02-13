import axios from 'axios';
import { ItemsFetch } from '../types-reducers/search';
import { ItemsVideoFetch } from './../types-reducers/search';

const API_KEY = 'AIzaSyDyZF-O30j33gkGvarcM5zpOji9tGzjUsM';

const instance = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    key: API_KEY
  },
  headers: {}
});
export const YoutubeAPI = {
  async searchVideos(
    pageSize: number,
    search: string,
    sort?: [string, string]
  ) {
    let videoDuration = 'short';
    if (sort) {
      videoDuration = sort[1];
    }
    const response = await instance.get<ItemsFetch>('/search', {
      params: {
        type: 'video',
        part: 'snippet',
        videoDuration: videoDuration,
        q: search,
        maxResults: pageSize
      }
    });
    return response.data;
  },

  async moveInfoVideo(id: string) {
    const response = await instance.get<ItemsVideoFetch>('/videos', {
      params: {
        id: id,
        part: 'snippet,statistics'
      }
    });
    return response.data;
  }
};
