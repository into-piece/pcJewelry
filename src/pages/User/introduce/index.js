import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import router from 'umi/router';
import {getMenuPath} from '@/utils/utils';
import styles from './index.less';

const menuArr = [
  { key: 'menu.erp.business.product', value: ['/erp/business/product','/erp/business/product','/erp/business/product'], text: '123123sdfsdf' },
  { key: 'menu.erp.business.quote', value: ['/erp/business/quote'], text: '123' },
  { key: 'menu.erp.business.proforminvoice', value: ['/erp/business/proforminvoice','/erp/business/proforminvoice'], text: '123123sdfsdf' },
  { key: 'menu.erp.business.deliver', value: ['/erp/business/deliver','/erp/business/deliver'], text: '123123sdfsdf' },
  { key: 'menu.erp.business.receiving', value: ['/erp/business/receiving'], text: '123123sdfsdf' },
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
    const testArr = [{key:'1',value:"1",text:'你好'},{key:'2',value:"2",text:'是吗'},{key:'3',value:"3",text:'你好'},{key:'5',value:"5",text:'你好'}];
    // console.log(" logi response  ",login)

    return (
      <div className={styles.main}>
        <p className={styles.title}>业务部流程</p>
        <div className={styles.cotent}>
          <ul className={styles.menu}>
            {menuArr.map(({ key, value, text }) =>
              <div className={styles.menu_title}>
                {/*<div className={styles.menu_li2}>*/}
              <li
                key={value}
                onMouseEnter={() => {
                  onMouseEnter(text);
                }}
                onMouseLeave={() => {
                  onMouseLeave();
                }}
              >

                <FormattedMessage id={key} />
              </li>
                {/*</div>*/}
                {this.showMenuLine(testArr)}
                <div className={styles.div_menu2}>

                  <ul className={styles.menu2}>
                    {testArr.map(({ key, value, text }) =>
                      <li
                        key={value}
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
                </div>
              </div>
            )}
          </ul>


          {showText && <section className={styles.contentText}>
            {contentText}
          </section>}
        </div>
      </div>
    );
  }

  showMenuLine = (arr) => {
    console.log(" arr  length ",arr.length,arr.length > 1)
    if (arr.length > 1)
      return <div className={styles.div_line}></div>;
    else
      return  <p>123</p>;
  };

}


export default Introduct;
