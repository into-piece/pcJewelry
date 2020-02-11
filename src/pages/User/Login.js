import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import Link from 'umi/link';
import { Checkbox, Alert, Modal, Icon } from 'antd';
import Login from '@/components/Login';
import styles from './Login.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
  };

  onTabChange = type => {
    this.setState({ type });
  };

  onGetCaptcha = () =>
    new Promise((resolve, reject) => {
      this.loginForm.validateFields(['mobile'], {}, (err, values) => {
        if (err) {
          reject(err);
        } else {
          const { dispatch } = this.props;
          dispatch({
            type: 'login/getCaptcha',
            payload: values.mobile,
          })
            .then(resolve)
            .catch(reject);

          Modal.info({
            title: formatMessage({ id: 'app.login.verification-code-warning' }),
          });
        }
      });
    });

  handleSubmit = (err, values) => {
    const { type } = this.state;
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'login/login',
        payload: {
          ...values,
          type,
        },
      });
      this.setState({
        isFrist: false,
      })
    }
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {
    const { login, submitting } = this.props;
    const { type, autoLogin, isFrist = true } = this.state;

    // console.log(" logi response  ",login)

    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          // onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >
 
          {login &&
            login.rtnCode !== '000000' &&
            !isFrist &&
            !submitting &&
            // this.renderMessage(formatMessage({ id: 'app.login.message-invalid-credentials' }))}
            this.renderMessage(login.rtnMsg)}
          <UserName
            name="userName"
            placeholder={`${formatMessage({ id: 'app.login.userName' })}`}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'validation.userName.required' }),
              },
            ]}
          />
          <Password
            name="password"
            placeholder={`${formatMessage({ id: 'app.login.password' })}`}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'validation.password.required' }),
              },
            ]}
            onPressEnter={e => {
              e.preventDefault();
              this.loginForm.validateFields(this.handleSubmit);
            }}
          />
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin} style={{ color: '#fff' }}>
              <FormattedMessage id="app.login.remember-me" />
            </Checkbox>
            {/* <a style={{ float: 'right', color: '#fff' }} href="">
              <FormattedMessage id="app.login.forgot-password" />
            </a> */}
          </div>
          <Submit loading={submitting}>
            <FormattedMessage id="app.login.login" />
          </Submit>
        </Login>
      </div>
    );
  }
}

export default LoginPage;
