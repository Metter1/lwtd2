import * as userActionCreators from './user';
import * as appActionCreators from './app';
import * as searchActionCreators from './search';

export default {
  ...userActionCreators,
  ...appActionCreators,
  ...searchActionCreators
};
