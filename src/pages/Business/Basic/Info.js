import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';

import { Menu, Card, Row, Col, Icon, PageHeader, Breadcrumb } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from './Basic.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import SvgUtil from './../../../utils/SvgUtil';
import Brand from './Brand';
import RingNum from './RingNum';
import Requested from './Requested';
import SendWay from './SendWay';
import Royalty from './Royalty';
import Currency from './Currency';

const { Item } = Menu;

class Info extends Component {
  constructor(props) {
    super(props);
    const { match, location } = props;
    const menuMap = {
      brand: <FormattedMessage id="app.basic.menuMap.brand" defaultMessage="Brand" />,
      requested: (
        <FormattedMessage id="app.basic.menuMap.requested" defaultMessage="Requirements" />
      ),
      sendWay: <FormattedMessage id="app.basic.menuMap.way" defaultMessage="Shipping Method" />,
      royalty: (
        <FormattedMessage id="app.basic.menuMap.royalty" defaultMessage="Commission Setting" />
      ),
      ring: <FormattedMessage id="app.basic.menuMap.num" defaultMessage="Ring Around" />,
      currency: <FormattedMessage id="app.basic.menuMap.currency" defaultMessage="Currency" />,
    };
    const key = location.pathname.replace(`${match.path}/`, '');
    this.state = {
      mode: 'inline',
      menuMap,
      selectKey: menuMap[key] ? key : 'brand',
      Component: <Brand />,
    };
  }

  // static getDerivedStateFromProps(props, state) {
  //   const { match, location } = props;
  //   let selectKey = location.pathname.replace(`${match.path}/`, '');
  //   selectKey = state.menuMap[selectKey] ? selectKey : 'brand';
  //   if (selectKey !== state.selectKey) {
  //     return { selectKey };
  //   }
  //   return null;
  // }

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
        <span style={{ display: 'flex', alignItems: 'center' }}>
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
    const { ring, euro, delivery, award, percentage, diamond } = SvgUtil;
    if (key === 'ring') return ring;
    else if (key === 'brand') return diamond;
    else if (key === 'requested') return award;
    else if (key === 'sendWay') return delivery;
    else if (key === 'royalty') return percentage;
    else if (key === 'currency') return euro;
  };

  selectKey = ({ key }) => {
    // router.push(`/business/basic/${key}`);
    let Component;
    if (key === 'ring') Component = <RingNum />;
    else if (key === 'brand') Component = <Brand />;
    else if (key === 'requested') Component = <Requested />;
    else if (key === 'sendWay') Component = <SendWay />;
    else if (key === 'royalty') Component = <Royalty />;
    else if (key === 'currency') {
      Component = <Currency />;
    }
    this.setState({
      selectKey: key,
      Component,
    });
    this.state.selectKey = key;
    // console.log('selectKey', key);
  };

  resize = () => {
    if (!this.main) {
      return;
    }

    const { mode: currentMode } = this.state;

    let mode = 'inline';
    const { offsetWidth } = this.main;

    if (mode !== currentMode) {
      requestAnimationFrame(() => this.setState({ mode }));
    }
  };

  render() {
    const { children } = this.props;
    const { mode, selectKey, Component } = this.state;

    console.log('select key ', selectKey);
    return (
      <div className={styles.page}>
        <div className={styles.nav}>
          <Breadcrumb style={{ display: 'none' }}>
            <Breadcrumb.Item>主页</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">业务</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="/business/basic/base#/business/basic/base">基础数据</a>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className={styles.center_content}>
          {/*lg={17} md={24}*/}
          <div className={styles.main}>
            <div
              className={styles.leftmenu}
              ref={ref => {
                this.main = ref;
              }}
            >
              <Menu mode={mode} selectedKeys={[selectKey]} onClick={this.selectKey}>
                {this.getmenu()}
              </Menu>
            </div>
            <div className={styles.right}>{Component}</div>
          </div>
        </div>
      </div>
    );
  }

  /* <Card bordered={false} style={{ minHeight: window.innerHeight, marginBottom: 24,padding:0 }} loading={false}>*/
}

export default Info;
