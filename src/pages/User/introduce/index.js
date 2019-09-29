import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import router from 'umi/router';
import {getMenuPath} from '@/utils/utils';
import styles from './index.less';

const menuArr = [
  { key: 'menu.erp.business.product', value: '/erp/business/product', text: '123123sdfsdf' },
  { key: 'menu.erp.business.quote', value: '/erp/business/quote', text: '123' },
  { key: 'menu.erp.business.proforminvoice', value: '/erp/business/proforminvoice', text: '123123sdfsdf' },
  { key: 'menu.erp.business.deliver', value: '/erp/business/deliver', text: '123123sdfsdf' },
  { key: 'menu.erp.business.receiving', value: '/erp/business/receiving', text: '123123sdfsdf' },
];

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
class Introduct extends Component {
  state = {
    contentText: '',
    showText: true,
  };

  onMouseEnter = (contentText) => {
    this.setState({
      // showText: true,
      contentText,
    });
  };

  onMouseLeave = () => {
    // this.setState({
    //   showText: false
    // })
  };


  render() {
    const { onMouseEnter, onMouseLeave } = this;
    const { login, submitting } = this.props;
    const { showText, contentText } = this.state;

    // console.log(" logi response  ",login)

    return (
      <div className={styles.main}>
        <p className={styles.title}>业务部流程</p>
        <div className={styles.cotent}>
          <ul className={styles.menu}>
            {menuArr.map(({ key, value, text }) =>
              <li
                key={value}
                onClick={()=>{
                  console.log(value)
                  router.push(value);
                }}
                onMouseEnter={() => {
                  onMouseEnter(text);
                }}
                onMouseLeave={() => {
                  onMouseLeave();
                }}
              >
                <FormattedMessage id={key} />
              </li>,
            )}
          </ul>
          {showText && <section className={styles.contentText}>
            {contentText}
          </section>}
        </div>
      </div>
    );
  }
}

export default Introduct;
