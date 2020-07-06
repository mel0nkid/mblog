import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { randomId } from 'utils';
import defaultThumbs from './images';
import './style.css';

export class PostList extends Component {
  static propTypes = {
    data: PropTypes.array,
    goHome: PropTypes.bool,
  };

  static defaultProps = {
    data: [
      {
        title: '示例文章',
        date: new Date()
          .toLocaleString('chinese', { hour12: false })
          .replace(/\//gi, '-'),
        url: '/',
      },
    ],
    goHome: false,
  };

  _loadThumb = (thumb, i) => {
    if (!thumb.length) {
      return defaultThumbs[i % defaultThumbs.length];
    }
    return thumb;
  };

  render() {
    let postItems = this.props.data.map((p, i) =>
      <article className="post-item" key={`post-${p.time}-${p.title}`}>
        <div className="tag-bar">
          {p.tag.map(t =>
            <Link to={`/tag/${t}`} key={`post_tag_${randomId()}`}>
              <p>
                {t}
              </p>
            </Link>
          )}
        </div>
        <Link to={p.url}>
          <h3 className="post-title" title={p.title}>
            {p.title}
          </h3>
        </Link>
        <p className="time">
          {p.time}
        </p>
      </article>
    );

    return (
      <section id="posts">
        <div className="row">
          {postItems.length ? postItems : <h2>正在获取文章列表...</h2>}
        </div>
      </section>
    );
  }
}

export default PostList;
