import React, { Component, Fragment } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { connect } from 'dva';
import Link from 'umi/link';
import { Icon } from 'antd';
import DocumentTitle from 'react-document-title';
import GlobalFooter from '@/components/GlobalFooter';
import SelectLang from '@/components/SelectLang';
import styles from './index.less';
import logo from '../../assets/rowLogo.png';
import getPageTitle from '@/utils/getPageTitle';

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
    Copyright <Icon type="copyright" /> 2019  广州格尚珠宝有限公司
  </Fragment>
);

class UserLayout extends Component {
  componentDidMount() {
    const {
      dispatch,
      route: { routes, authority },
    } = this.props;
    dispatch({
      type: 'menu/getMenuData',
      payload: { routes, authority },
    });
  }

  render() {
    const {
      children,
      location: { pathname },
      breadcrumbNameMap,
    } = this.props;
    return (
      <DocumentTitle title={getPageTitle(pathname, breadcrumbNameMap)}>
        <div className={styles.container}>
          <Header />
          <div>
            <div className={styles.lang}>
              <SelectLang />
            </div>
          </div>

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

const navData = [
  { key: '基础资料', value: '' },
  { key: '操作输入', value: '' },
  { key: '数据分析', value: '' },
]

const Header = () => (
  <div className={styles.header}>
    <img alt="logo" className={styles.big_logo} src={logo} />
    <ul className={styles.nav}>
      {
        navData.map(({ key, value }) => (
          <li key={key}><Link to={value}>{key}</Link></li>
        ))
      }
    </ul>
  </div>
)

export default connect(({ menu: menuModel }) => ({
  menuData: menuModel.menuData,
  breadcrumbNameMap: menuModel.breadcrumbNameMap,
}))(UserLayout);
