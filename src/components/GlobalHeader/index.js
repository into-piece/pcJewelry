import React, { PureComponent } from 'react';
import { Icon, Menu } from 'antd';
import Link from 'umi/link';
import Debounce from 'lodash-decorators/debounce';
import styles from './index.less';
import RightContent from './RightContent';

export default class GlobalHeader extends PureComponent {
  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }
  /* eslint-disable*/
  @Debounce(600)
  triggerResizeEvent() {
    // eslint-disable-line
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }
  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
    this.triggerResizeEvent();
  };
  render() {
    const { collapsed, isMobile, logo } = this.props;
    return (
      <div className={styles.header}>
        {isMobile && (
          <Link to="/" className={styles.logo} key="logo">
            <img src={logo} alt="logo" width="32" />
          </Link>
        )}
        {/*<Menu*/}
        {/*theme="light"*/}
        {/*mode="horizontal"*/}
        {/*defaultSelectedKeys={['2']}*/}
        {/*>*/}
        {/*<Menu.Item key="1">nav 1</Menu.Item>*/}
        {/*<Menu.Item key="2">nav 2</Menu.Item>*/}
        {/*<Menu.Item key="3">nav 3</Menu.Item>*/}
        {/*</Menu>*/}
        <span className={styles.trigger} onClick={this.toggle}>
          <Icon
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            style={{ color: '#fff' }}
            color={'#fff'}
          />
        </span>
        <RightContent {...this.props} />
      </div>
    );
  }
}
