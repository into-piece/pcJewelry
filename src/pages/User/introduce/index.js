import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import Link from 'umi/link';
import { Checkbox, Alert, Modal, Icon } from 'antd';
import Login from '@/components/Login';
import styles from './index.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;


const menuArr = [
  { key: '产品编号', value: 1, text: '123123sdfsdf' },
  { key: '报价单', value: 2, text: '123123sdfsdf' },
  { key: '订单', value: 3, text: '123123sdfsdf' },
  { key: '发票确认', value: 4, text: '123123sdfsdf' },
  { key: '发票审批', value: 5, text: '123123sdfsdf' },
]
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
      contentText
    })
  }

  onMouseLeave = () => {
    // this.setState({
    //   showText: false
    // })
  }



  render() {
    const { onMouseEnter, onMouseLeave } = this
    const { login, submitting } = this.props;
    const { showText, contentText } = this.state;

    // console.log(" logi response  ",login)

    return (
      <div className={styles.main}>
        <p className={styles.title}>业务部流程</p>
        <div className={styles.cotent}>
          <ul className={styles.menu}>
            {menuArr.map(({ key, value, text }) =>
              <li key={value} onMouseEnter={() => { onMouseEnter(text) }} onMouseLeave={() => { onMouseLeave() }}>{key}</li>
            )}
          </ul>
          {showText && <section className={styles.contentText}>
            {contentText}
            asdfasdfasdfasdf
          </section>}
        </div>
      </div>
    );
  }
}

export default Introduct;
