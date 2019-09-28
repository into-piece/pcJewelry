import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import Link from 'umi/link';
import {getMenuPath} from '@/utils/utils';
import styles from './index.less';
import opration from '../../../assets/opration.png'
import basicInfo from '../../../assets/basicInfo.png'
import analysis from '../../../assets/analysis.png'


@connect(({ login, loading,menu:menuModel }) => ({
  basicMenu: menuModel.basicMenu,
  dataAnalysis: menuModel.dataAnalysis,
  operationMenu: menuModel.operationMenu,
  login,
  submitting: loading.effects['login/login'],
}))
class Introduct extends Component {
  state = {
  };


  render() {
    const {
      basicMenu,
      dataAnalysis,
    } = this.props;


    const btnGroup = [
      { key: '基础资料', value: basicInfo, path:  getMenuPath(basicMenu) },
      { key: '操作输入', value: opration, path: '/introduce' },
      { key: '数据分析', value: analysis, path:  getMenuPath(dataAnalysis)  },
    ]
    // const { } = this.state;
    return (
      <div className={styles.main}>
        <div className={styles.cotent}>
          <ul className={styles.btnGroup}>
            {btnGroup.map(({ key, value, path }) =>
              <li key={value} className={styles.oprationBtn}>
                <Link to={path}>
                  <p><img src={value} /></p>
                  <p>{key}</p>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default Introduct;
