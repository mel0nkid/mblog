import * as at from './actionTypes';
import { getPostInfo } from 'posts';

export const fetchPostInfo = () => async dispatch => {
  const postInfo = await getPostInfo();
  dispatch({
    type: at.GET_POST_INFO,
    data: postInfo,
  });
};

