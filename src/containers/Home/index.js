import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PostList from 'components/PostList';
import Header from 'components/Header';
import * as HomeActions from './actions';
import Footer from '../Footer';
import './style.css';
import siteConfig from 'siteConfig';
import LeftBar from '../../components/LeftBar';

const mapStateToProps = ({ home }) => ({ home });

const mapDispatchToProps = dispatch => ({
  homeActions: bindActionCreators(HomeActions, dispatch),
});

export class Home extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    homeActions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.perPage = 6;
  }

  componentDidMount() {
    this.props.homeActions.fetchPostInfo();
    this.props.homeActions.resetPostList();
    this._loadPage(1);
  }

  _loadPage(pageNum) {
    this.props.homeActions.fetchPostList(this.perPage, pageNum);
    this.pageNum = pageNum;
  }

  render() {
    const {
      postInfo: { postCount, tagInfo },
      postList,
    } = this.props.home.toJS();

    const navList = [
      {
        linkTo: '/',
        tag: `全部文章（${postCount}）`,
      },
      ...tagInfo,
    ];

    const sideLeftInfo = {siteConfig};
    sideLeftInfo.tagSelected = 'All';
    console.log(sideLeftInfo);

    return (
      <div className="page-container">
        <Header data={navList} activeTag={`全部文章（${postCount}）`} />
        <div className="wrapper">
          <div className="post-list">
            <PostList data={postList} />
            <span className='loadMore' onClick={() => this._loadPage(this.pageNum + 1)}>
              加载更多... </span>
          </div>
          <LeftBar data={sideLeftInfo} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
