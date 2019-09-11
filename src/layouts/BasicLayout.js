import React, { Suspense } from 'react';
import { Layout, Menu, Tabs, Dropdown, Icon } from 'antd';
import router from 'umi/router';
import DocumentTitle from 'react-document-title';
import { Route } from 'react-router-dom';
import { connect } from 'dva';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import pathToRegexp from 'path-to-regexp';
import isEqual from 'lodash/isEqual';
import memoizeOne from 'memoize-one';
import Media from 'react-media';
import { formatMessage } from 'umi/locale';
import logo from '../assets/logo_img.png';
// import Footer from './Footer';
// import Authorized from '@/utils/Authorized';
import Header from './Header';
import Context from './MenuContext';
import SiderMenu from '@/components/SiderMenu';
import getPageTitle from '@/utils/getPageTitle';
import styles from './BasicLayout.less';

// lazy load SettingDrawer
const SettingDrawer = React.lazy(() => import('@/components/SettingDrawer'));

const { TabPane } = Tabs;
const { Content } = Layout;

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
};

class BasicLayout extends React.Component {
  constructor(props) {
    super(props);
    const { routes } = props.route;
    // const routeKey = props.location.pathname === '/business/basic'? props.location.pathname :'/business/client';
    const routeKey = props.location.pathname==='/'?'/business/client':props.location.pathname ;
    const tabNametem = props.location.pathname==='/'?'menu.business.client':`menu${props.location.pathname.replace(/\//g,'.')}` ; // routeKey 为设置首页设置 试试 '/dashboard/analysis' 或其他key值
    const tabName = formatMessage({id:tabNametem});
    // const tabName = props.location.pathname === '/business/basic'?'基础数据':'客户资料'; // routeKey 为设置首页设置 试试 '/dashboard/analysis' 或其他key值
    const tabLists = this.updateTree(routes);
    const tabList = [];
    const tabListArr = [];
    tabLists.forEach(v => {
      if (v.key === routeKey) {
        if (tabList.length === 0) {
          v.closable = false;
          v.tab = tabName;
          tabList.push(v);
        }
      }
      if (v.key) {
        tabListArr.push(v.key);
      }
    });
    // 获取所有已存在key值
    this.state = {
      tabList,
      tabListKey: [routeKey],
      activeKey: routeKey,
      tabListArr,
      routeKey,
    };

    this.getPageTitle = memoizeOne(this.getPageTitle);
    this.matchParamsPath = memoizeOne(this.matchParamsPath, isEqual);

    // console.log(props.location.pathname)
    // router.push(props.location.pathname);
  }

  componentDidMount() {
    const {
      dispatch,
      route: { routes, path, authority },
    } = this.props;
    dispatch({
      type: 'user/fetchCurrent',
    });
    dispatch({
      type: 'setting/getSetting',
    });
    dispatch({
      type: 'menu/getMenuData',
      payload: { routes, path, authority },
    });
  }

  componentDidUpdate(preProps) {
    // After changing to phone mode,
    // if collapsed is true, you need to click twice to display
    const { collapsed, isMobile } = this.props;
    if (isMobile && !preProps.isMobile && !collapsed) {
      this.handleMenuCollapse(false);
    }
  }

  getRouterAuthority = (pathname, routeData) => {
    let routeAuthority = ['noAuthority'];
    const getAuthority = (key, routes) => {
      routes.map(route => {
        if (route.path && pathToRegexp(route.path).test(key)) {
          routeAuthority = route.authority;
        } else if (route.routes) {
          routeAuthority = getAuthority(key, route.routes);
        }
        return route;
      });
      return routeAuthority;
    };
    return getAuthority(pathname, routeData);
  };

  getPageTitle = (pathname, breadcrumbNameMap) => {
    const currRouterData = this.matchParamsPath(pathname, breadcrumbNameMap);

    if (!currRouterData) {
      return 'Ant Tabs';
    }
    const pageName = formatMessage({
      id: currRouterData.locale || currRouterData.name,
      defaultMessage: currRouterData.name,
    });
    return `${pageName} - Ant Tabs`;
  };

  getContext() {
    const { location, breadcrumbNameMap } = this.props;
    return {
      location,
      breadcrumbNameMap,
    };
  }

  matchParamsPath = (pathname, breadcrumbNameMap) => {
    const pathKey = Object.keys(breadcrumbNameMap).find(key => pathToRegexp(key).test(pathname));
    return breadcrumbNameMap[pathKey];
  };

  getLayoutStyle = () => {
    const { fixSiderbar, isMobile, collapsed, layout } = this.props;
    if (fixSiderbar && layout !== 'topmenu' && !isMobile) {
      return {
        paddingLeft: collapsed ? '80px' : '256px',
      };
    }
    return null;
  };

  handleMenuCollapse = collapsed => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    });
  };

  renderSettingDrawer = () => {
    // unless it is deployed in preview.pro.ant.design as demo
    // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
    if (
      process.env.NODE_ENV === 'production' &&
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION !== 'site'
    ) {
      return null;
    }
    return <SettingDrawer />;
  };

  onHandlePage = e => {
    // 点击左侧菜单
    const { menuData } = this.props;
    console.log(e)
    let { key } = e;
    const tabLists = this.updateTreeList(menuData);
    const { tabListKey, tabList, tabListArr } = this.state;
    if (tabListArr.includes(key)) {
      router.push(key);
    } else {
      key = '/exception/404';
      router.push('/exception/404');
    }

    this.setState({
      activeKey: key,
    });
    tabLists.map(v => {
      if (v.key === key) {
        if (tabList.length === 0) {
          v.closable = false;
          this.setState({
            tabList: [...tabList, v],
          });
        } else if (!tabListKey.includes(v.key)) {
          this.setState({
            tabList: [...tabList, v],
            tabListKey: [...tabListKey, v.key],
          });
        }
      }
    });
    // this.setState({
    //   tabListKey:this.state.tabList.map((va)=>va.key)
    // })
  };

  // 切换 tab页 router.push(key);
  onChange = key => {
    this.setState({ activeKey: key });
    router.push(key);
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  remove = targetKey => {
    const { activeKey } = this.state;
    let lastIndex;

    this.state.tabList.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const tabList = [];
    const tabListKey = [];
    this.state.tabList.map(pane => {
      if (pane.key !== targetKey) {
        tabList.push(pane);
        tabListKey.push(pane.key);
      }
    });
    const newActiveKey = lastIndex >= 0 && activeKey === targetKey ? tabList[lastIndex].key : activeKey
    router.push(newActiveKey);
    this.setState({ tabList, activeKey: newActiveKey, tabListKey });
  };

  updateTreeList = data => {
    const treeData = data;
    const treeList = [];
    // 递归获取树列表
    const getTreeList = data => {
      data.forEach(node => {
        if (!node.level) {
          treeList.push({
            tab: node.name,
            key: node.path,
            icon: node.icon,
            locale: node.locale,
            closable: true,
            content: node.component,
          });
        }
        if (node.children && node.children.length > 0) {
          //! node.hideChildrenInMenu &&
          getTreeList(node.children);
        }
      });
    };
    getTreeList(treeData);
    return treeList;
  };

  updateTree = data => {
    const treeData = data;
    const treeList = [];
    // 递归获取树列表
    const getTreeList = data => {
      data.forEach(node => {
        if (!node.level) {
          treeList.push({
            icon: node.icon,
            tab: node.name,
            key: node.path,
            locale: node.locale,
            closable: true,
            content: node.component,
          });
        }
        if (node.routes && node.routes.length > 0) {
          //! node.hideChildrenInMenu &&
          getTreeList(node.routes);
        }
      });
    };
    getTreeList(treeData);
    return treeList;
  };

  onClickHover = e => {
    // message.info(`Click on item ${key}`);
    const { key } = e;
    let { activeKey, tabList, tabListKey, routeKey } = this.state;

    if (key === '1') {
      tabList = tabList.filter(v => v.key !== activeKey || v.key === routeKey);
      tabListKey = tabListKey.filter(v => v !== activeKey || v === routeKey);
      this.setState({
        activeKey: routeKey,
        tabList,
        tabListKey,
      });
    } else if (key === '2') {
      tabList = tabList.filter(v => v.key === activeKey || v.key === routeKey);
      tabListKey = tabListKey.filter(v => v === activeKey || v === routeKey);
      this.setState({
        activeKey,
        tabList,
        tabListKey,
      });
    } else if (key === '3') {
      tabList = tabList.filter(v => v.key === routeKey);
      tabListKey = tabListKey.filter(v => v === routeKey);
      this.setState({
        activeKey: routeKey,
        tabList,
        tabListKey,
      });
    }
  };

  render() {
    const {
      navTheme,
      layout: PropsLayout,
      children,
      location: { pathname },
      isMobile,
      menuData,
      route: { routes },
      breadcrumbNameMap,
      hidenAntTabs,
      fixedHeader,
    } = this.props;
    console.log(breadcrumbNameMap)

    const isTop = PropsLayout === 'topmenu';
    const { activeKey, routeKey, tabList } = this.state;
    const newActiveKey = pathname === '/' ? routeKey : activeKey
    const menu = (
      <Menu onClick={this.onClickHover}>
        <Menu.Item key="1">关闭当前标签页</Menu.Item>
        <Menu.Item key="2">关闭其他标签页</Menu.Item>
        <Menu.Item key="3">关闭全部标签页</Menu.Item>
      </Menu>
    );
    const operations = (
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" href="#">
          页签
          <Icon type="down" />
        </a>
      </Dropdown>
    );
    const routerConfig = this.getRouterAuthority(pathname, routes);
    const contentStyle = !fixedHeader ? { paddingTop: 0 } : {};
    const layout = (
      <Layout>
        {isTop && !isMobile ? null : (
          <SiderMenu
            logo={logo}
            theme={navTheme}
            onCollapse={this.handleMenuCollapse}
            menuData={menuData}
            isMobile={isMobile}
            onHandlePage={this.onHandlePage}
            size="small"
            {...this.props}
          />
        )}
        <Layout
          style={{
            ...this.getLayoutStyle(),
            minHeight: '100vh',
          }}
        >
          <Header
            menuData={menuData}
            handleMenuCollapse={this.handleMenuCollapse}
            logo={logo}
            size="small"
            className={styles.header_view}
            isMobile={isMobile}
          />
          <Content className={styles.content} style={contentStyle}>
            {hidenAntTabs
              ? children
              : tabList &&
              tabList.length && (
                <Tabs
                  // className={styles.tabs}
                  activeKey={newActiveKey}
                  onChange={this.onChange}
                  hideAdd
                  type="editable-card"
                  onEdit={this.onEdit}
                >
                  {tabList.map(item => (
                    <TabPane
                      tab={
                        <span>
                          <Icon type={item.icon} />
                          {item.tab}
                        </span>
                      }
                      key={item.key}
                      closable={item.closable}
                    >
                      {/* {item.content} */}
                      <Route
                        key={item.key}
                        path={item.path}
                        component={item.content}
                        exact={item.exact}
                      />
                    </TabPane>
                  ))}
                </Tabs>
              )}
          </Content>
        </Layout>
      </Layout>
    );
    return (
      <React.Fragment>
        <DocumentTitle title={getPageTitle(pathname, breadcrumbNameMap)}>
          <ContainerQuery query={query}>
            {params => (
              <Context.Provider value={this.getContext()}>
                <div className={classNames(params)}>{layout}</div>
              </Context.Provider>
            )}
          </ContainerQuery>
        </DocumentTitle>
        <Suspense fallback={null}>{this.renderSettingDrawer()}</Suspense>
      </React.Fragment>
    );
  }
}

export default connect(({ global, setting, menu: menuModel }) => ({
  collapsed: global.collapsed,
  layout: setting.layout,
  menuData: menuModel.menuData,
  breadcrumbNameMap: menuModel.breadcrumbNameMap,
  ...setting,
}))(props => (
  <Media query="(max-width: 599px)">
    {isMobile => <BasicLayout {...props} isMobile={isMobile} />}
  </Media>
));
