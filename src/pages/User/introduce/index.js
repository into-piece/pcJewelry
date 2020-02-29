import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import router from 'umi/router';
import {getMenuPath} from '@/utils/utils';
import styles from './index.less';


const testArr1 = [{key:'1',value:"1",text:'one'},{key:'2',value:"2",text:'two'},{key:'3',value:"3",text:'three'}];
const testArr2 = [{key:'1',value:"1",text:'one'}];
const testArr3 = [{key:'1',value:"1",text:'one'},{key:'2',value:"2",text:'two'}];
const testArr4 = [{key:'1',value:"1",text:'one'},{key:'2',value:"2",text:'two'},{key:'3',value:"3",text:'three'},{key:'4',value:"4",text:'four'}];
const testArr5 = [{key:'1',value:"1",text:'one'}];

const menuArr = [
  { key: 'menu.erp.business.product', value: ['/erp/business/product','/erp/business/product','/erp/business/product'], text: '123123sdfsdf',arr:testArr1 },
  { key: 'menu.erp.business.quote', value: ['/erp/business/quote'], text: '123' ,arr:testArr2},
  { key: 'menu.erp.business.proforminvoice', value: ['/erp/business/proforminvoice','/erp/business/proforminvoice'], text: '123123sdfsdf' ,arr:testArr3},
  { key: 'menu.erp.business.deliver', value: ['/erp/business/deliver','/erp/business/deliver'], text: '123123sdfsdf',arr:testArr4 },
  { key: 'menu.erp.business.receiving', value: ['/erp/business/receiving'], text: '123123sdfsdf',arr:testArr5 },
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
            {menuArr.map(({ key, value, text,arr }) =>
              <div className={styles.menu_title}>
              <li
                key={value}
                onMouseEnter={() => {
                  onMouseEnter(text);
                }}
                onMouseLeave={() => {
                  onMouseLeave();
                }}
              >
                <div className={styles.menu_li_content}>
                <FormattedMessage id={key} />
                </div>
              </li>
                <div className={styles.menu_line}></div>
                <div className={styles.menu2_group}>

                  <ul className={styles.menu2}>
                    {arr.map(({ key, value, text }) =>
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

}


export default Introduct;
