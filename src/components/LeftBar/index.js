import React, { Component } from 'react';
import { Tag, Divider } from 'antd';
import PropTypes from 'prop-types';
import './style.css';
import { randomId } from 'utils';
import { Link } from "react-router-dom";
import * as LeftBarActions from './actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const { CheckableTag } = Tag;

const mapStateToProps = ({ leftBar }) => ({ leftBar });

const mapDispatchToProps = dispatch => ({
  leftBarActions: bindActionCreators(LeftBarActions, dispatch),
});

export class LeftBar extends Component {
  static propTypes = {
    leftBar: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.leftBarActions.fetchPostInfo();
  }


  render() {
    const {
      postInfo: { tagInfo },
    } = this.props.leftBar.toJS();


    const {
      avatar
    } = this.props.data.siteConfig;

    const {
      tagName
    } = this.props.data.tagSelected;

    const mtags = tagInfo.map(t =>
      <CheckableTag
        className={t.tag === tagName? 'tag-style-checked' : 'tag-style'}
        key={t.tag}
        >
        <Link
          to={t.linkTo || `/tag/${t.tag}`}
          className={`ant-dropdown-link ${this.props.activeTag === t.tag
            ? 'active'
            : ''}`}
          key={`nav_top_${randomId()}`}>
          {t.tag}({t.count})
        </Link>
      </CheckableTag>
    );

    
    return (
      <div className='side-wrapper'>
        <Divider orientation="left">Info</Divider>
        <div>
          <div
            className="blog-avatar"
            style={{ backgroundImage: `url(${avatar})` }}
          />
        </div>
        <Divider orientation="left">Tags</Divider>
        <div>
          {mtags}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftBar);
