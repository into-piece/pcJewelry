import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';

import { Menu, Card, Row, Col, Icon } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from './Basic.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import SvgUtil from './../../../utils/SvgUtil';

const { Item } = Menu;

class Info extends Component {
  constructor(props) {
    super(props);
    const { match, location } = props;
    const menuMap = {
      brand: <FormattedMessage id="app.basic.menuMap.brand" defaultMessage="Brand"/>,
      requested: (
        <FormattedMessage id="app.basic.menuMap.requested" defaultMessage="Requirements"/>
      ),
      sendWay: <FormattedMessage id="app.basic.menuMap.way" defaultMessage="Shipping Method"/>,
      royalty: (
        <FormattedMessage
          id="app.basic.menuMap.royalty"
          defaultMessage="Commission Setting"
        />
      ),
      ring: (
        <FormattedMessage id="app.basic.menuMap.num" defaultMessage="Ring Around"/>
      ),
      currency: (
        <FormattedMessage
          id="app.basic.menuMap.currency"
          defaultMessage="Currency"
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
        <span style={{ display: 'flex', alignItems: 'center' }}><Icon style={{ width: 25, height: 25 }}
                                                                      component={this.getMenuIcon(item)}/>
          {menuMap[item]}</span>
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


    if (mode !== currentMode) {
      requestAnimationFrame(() => this.setState({ mode }));
    }
  };

  render() {

    const { children } = this.props;
    const { mode, selectKey } = this.state;
    return (
      <PageHeaderWrapper title="基础数据">
        {/*lg={17} md={24}*/}
        <div className={styles.main}>
          <div
            className={styles.leftmenu}
            ref={ref => {
              this.main = ref;
            }}
          >
            <Menu
              mode={mode}
              selectedKeys={[selectKey]}
              size={'small'}
              onClick={this.selectKey}
            >
              {this.getmenu()}
            </Menu>
          </div>
          <div className={styles.right}>
            {children}
          </div>
        </div>

      </PageHeaderWrapper>
    );
  }


  /* <Card bordered={false} style={{ minHeight: window.innerHeight, marginBottom: 24,padding:0 }} loading={false}>*/
}

export default Info;
