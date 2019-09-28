import React, { Component, Fragment } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { connect } from 'dva';
import Link from 'umi/link';
import { Icon } from 'antd';
import DocumentTitle from 'react-document-title';
import GlobalFooter from '@/components/GlobalFooter';
import logo from '../../assets/rowLogo.png';
import getPageTitle from '@/utils/getPageTitle';
import {getMenuPath} from '@/utils/utils';
import styles from './index.less';

const links = [
  {
    key: 'help',
    title: formatMessage({ id: 'layout.user.link.help' }),
    href: '',
  },
  {
    key: 'privacy',
    title: formatMessage({ id: 'layout.user.link.privacy' }),
    href: '',
  },
  {
    key: 'terms',
    title: formatMessage({ id: 'layout.user.link.terms' }),
    href: '',
  },
];

const copyright = (
  <Fragment>
    Copyright <Icon type="copyright" /> 2019 广州格尚珠宝有限公司
  </Fragment>
);

class UserLayout extends Component {
  componentDidMount() {
    const {
      menu,
      location,
      dispatch,
      route: { routes, authority },
    } = this.props;
    console.log('location.pathname', location.pathname);

    dispatch({
      type: 'menu/getMenuData',
      payload: { routes, authority, pathname: (location.pathname === '/' ? '/opration' : location.pathname) },
    });
  }

  logout = () => {
    const {
      dispatch,
    } = this.props;
    dispatch({
      type: 'login/logout',
    });
  };


  render() {
    const {
      children,
      location: { pathname },
      breadcrumbNameMap,
      basicMenu,
      dataAnalysis,
    } = this.props;


    const navData = [
      { key: '基础资料', value: getMenuPath(basicMenu) },
      { key: '操作输入', value: '/introduce' },
      { key: '数据分析', value: getMenuPath(dataAnalysis) },
    ];


    return (
      <DocumentTitle title={getPageTitle(pathname, breadcrumbNameMap)}>
        <div className={styles.container}>
          <Header logout={this.logout} navData={navData} />
          <div className={styles.content}>
            <div className={styles.top} />
            {children}
          </div>
          <GlobalFooter links={links} copyright={copyright} />
        </div>
      </DocumentTitle>
    );
  }
}


const Header = (props) => {
  const { navData } = props;
  return <header className={styles.headerComponent}>
    <div className={styles.header}>
      <Link to="/opration"><img alt="logo" className={styles.big_logo} src={logo} /></Link>
      <ul className={styles.nav}>
        {
          navData.map(({ key, value }) => (
            <li key={key}><Link to={value}>{key}</Link></li>
          ))
        }
      </ul>
    </div>
    <div
      className={styles.logout}
      onClick={props.logout}
    >
      <Icon type="poweroff" />
      退出登录
    </div>
  </header>;
};

export default connect(({ menu: menuModel }) => ({
  menu: menuModel,
  basicMenu: menuModel.basicMenu,
  dataAnalysis: menuModel.dataAnalysis,
  operationMenu: menuModel.operationMenu,
  menuData: menuModel.menuData,
  breadcrumbNameMap: menuModel.breadcrumbNameMap,
}))(UserLayout);
