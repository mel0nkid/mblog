import { fromJS } from 'immutable';
import * as at from './actionTypes';

const INITIAL_STATE = fromJS({
  postInfo: {
    postCount: 0,
    tagInfo: [],
  },
});


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case at.GET_POST_INFO:
      return state
        .updateIn(['postInfo', 'postCount'], () => action.data.postCount)
        .updateIn(['postInfo', 'tagInfo'], () =>
          fromJS(action.data.tagInfo.map(t => fromJS(t)))
        );
    default:
      return state;
  }
};
