import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import home from 'containers/Home/reducer';
import tagPost from 'containers/TagPost/reducer';
import article from 'containers/Article/reducer';
import leftBar from 'components/LeftBar/reducer';

export default asyncReducers =>
  combineReducers({
    home,
    tagPost,
    article,
    leftBar,
    routing: routerReducer,
    ...asyncReducers,
  });
