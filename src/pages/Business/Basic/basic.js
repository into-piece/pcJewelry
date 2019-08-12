import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';

import { Menu, Card, Row, Col, Icon } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import styles from './Info.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { ring, brand, requested, sendWay, royalty, currency } from '@/utils/SvgUtil';

const { Item } = Menu;
@connect(({ user }) => ({
  currentUser: user.currentUser,
}))
class Info extends Component {
  constructor(props) {
    super(props);
    const { match, location } = props;
    const menuMap = {
      brand: <FormattedMessage id="app.client.menuMap.brand" defaultMessage="Basic Settings" />,
      requested: (
        <FormattedMessage id="app.client.menuMap.requested" defaultMessage="Security Settings" />
      ),
      sendWay: <FormattedMessage id="app.client.menuMap.way" defaultMessage="Account Binding" />,
      royalty: (
        <FormattedMessage
          id="app.client.menuMap.royalty"
          defaultMessage="app.client.menuMap.royalty"
        />
      ),
      ring: (
        <FormattedMessage id="app.client.menuMap.num" defaultMessage="app.client.menuMap.num" />
      ),
      currency: (
        <FormattedMessage
          id="app.client.menuMap.currency"
          defaultMessage="app.client.menuMap.currency"
        />
      ),
    };
    const key = location.pathname.replace(`${match.path}/`, '');
    this.state = {
      mode: 'inline',
      menuMap,
      selectKey: menuMap[key] ? key : 'brand',
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { match, location } = props;
    let selectKey = location.pathname.replace(`${match.path}/`, '');
    selectKey = state.menuMap[selectKey] ? selectKey : 'brand';
    if (selectKey !== state.selectKey) {
      return { selectKey };
    }
    return null;
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  getmenu = () => {
    const { menuMap } = this.state;
    return Object.keys(menuMap).map(item => (
      <Item key={item} style={{ textAlign: 'vertical-center' }}>
        <span style={{ alignSelf: 'center' }}>
          <Icon style={{ width: 25, height: 25 }} component={this.getMenuIcon(item)} />
          {menuMap[item]}
        </span>
      </Item>
    ));
  };

  getRightTitle = () => {
    const { selectKey, menuMap } = this.state;
    return menuMap[selectKey];
  };


  getMenuIcon = key => {
    const menuObj = {
      ring,
      brand,
      requested,
      sendWay,
      royalty,
      currency
    }
    console.log(menuObj[key], '================')
    return menuObj[key]
  };

  selectKey = ({ key }) => {
    router.push(`/business/basic/${key}`);
    this.setState({
      selectKey: key,
    });
  };

  resize = () => {
    if (!this.main) {
      return;
    }

    const { mode: currentMode } = this.state;

    let mode = 'inline';
    const { offsetWidth } = this.main;

    if (offsetWidth > 400 && offsetWidth < 641) {
      mode = 'horizontal';
    }

    if (window.innerWidth < 768 && offsetWidth > 400) {
      mode = 'horizontal';
    }

    if (mode !== currentMode) {
      requestAnimationFrame(() => this.setState({ mode }));
    }
  };

  _getSubChildRen = () => {
    const { children } = this.props;
    if (children) {
      console.log('is true children');
      if (children.props) {
        console.log('is true children props');
        if (children.props.children) {
          console.log(`is true children props children${children.props.children}`);
          return children.props.children;
        }
      }
    }

    return children;
  };

  render() {
    const { children, currentUser } = this.props;
    if (!currentUser.userid) {
      return '';
    }

    const { mode, selectKey } = this.state;
    return (
      <PageHeaderWrapper title="基础数据">
        {/* lg={17} md={24} */}
        <div className={styles.main}>
          <div
            className={styles.leftmenu}
            ref={ref => {
              this.main = ref;
            }}
          >
            <Menu mode={mode} selectedKeys={[selectKey]} size="small" onClick={this.selectKey}>
              {this.getmenu()}
            </Menu>
          </div>
          <div className={styles.right}>{children}</div>
        </div>
      </PageHeaderWrapper>
    );
  }
  /* <Card bordered={false} style={{ minHeight: window.innerHeight, marginBottom: 24,padding:0 }} loading={false}> */
}

export default Info;
