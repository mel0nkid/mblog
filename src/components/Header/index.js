import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Dropdown, Menu, Icon } from 'antd';
import { randomId } from 'utils';
import './style.css';

export class Header extends Component {
  static propTypes = {
    data: PropTypes.array,
    activeTag: PropTypes.string,
  };

  static defaultProps = {
    data: [],
    activeTag: '',
  };

  constructor(props) {
    super(props);
    this.navTotal = 2;
  }

  renderMore() {
    if (this.props.data.length <= this.navTotal) {
      return false;
    }

    const subNavItems = this.props.data.slice(this.navTotal).map(t =>
      <Menu.Item key={`sub_nav_${randomId()}`}>
        <Link
          to={t.linkTo || `/tag/${t.tag}`}
          className={`ant-dropdown-link ${this.props.activeTag === t.tag
            ? 'active'
            : ''}`}
          key={`nav_top_${randomId()}`}>
          {t.tag}（{t.count}）
        </Link>
      </Menu.Item>
    );

    const SubNav = (
      <Menu>
        {subNavItems}
      </Menu>
    );

    const DropDownBtn = (
      <Dropdown overlay={SubNav} key={`nav_top_${randomId()}`}>
        <div className="header-nav-item">
          更多分类 <Icon type="down" />
        </div>
      </Dropdown>
    );

    return DropDownBtn;
  }

  renderTop5() {
    const navData = this.props.data.slice(0, this.navTotal - 1);
    const items = navData.map((t,idx) =>
      <Link
        className={`page-link`}
        to={t.linkTo || `/tag/${t.tag}`}
        key={`nav_top_${randomId()}`}>
        {!t.linkTo ? `${t.tag}(${t.count}）` : t.tag}
      </Link>
    );

    return (
      <header className="site-header" role="banner">
        <div className="nav-wrapper">
          <a className="site-title" href="/">MelonKid`Blog</a>
          <nav className="site-nav">
            <div>
              {items}
            </div>
          </nav>
          {/* {this.renderMore()} */}
        </div>
      </header>

    );
  }

  render = () => this.renderTop5();
}

export default Header;
