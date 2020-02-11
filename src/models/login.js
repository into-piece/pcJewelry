import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { fakeAccountLogin, getFakeCaptcha, queryAllCity, logout } from '@/services/api';
import { login, checkLogin } from '@/services/user';
import { setAuthority } from '@/utils/authority';
import { getPageQuery, testCurrentUser } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import { setCurrentUser } from '../utils/authority';

export default {
  namespace: 'login',

  state: {
    status: undefined,
    loginstatus: false,
    loginUser: {},
  },

  effects: {

    * loginOk(_, { call, put }) {
      const response = yield call(checkLogin, {});
      yield put({
        type: 'changeLoginOkStatus',
        payload: response,
      });

      // 没登录跳转登录页
      if (response && response.head && response.head.rtnCode === '000000' && response.body.records.length === 0) {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          }),
        );
      }


    },


    * login({ payload }, { call, put }) {
      const response = yield call(login, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // console.log("login ",response)
      // Login successfully

      if (response.head && response.head.rtnCode === '000000') {
        reloadAuthorized();

        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            redirect = null;
          }
        }
        yield put(routerRedux.replace('/opration'));
      }
    },

    * getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    * logout(_, { put, call }) {
      yield call(logout, {});
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      const { redirect } = getPageQuery();

      // redirect
      if (window.location.pathname !== '/user/login' && !redirect) {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          }),
        );
      }
    },
  },

  reducers: {
    changeLoginOkStatus(state, { payload }) {
      let loginstatus = false;
      let loginUser = {};
      if (payload.head && payload.head.rtnCode === '000000' && payload.body.records.length > 0) {
        loginstatus = true;
        loginUser = payload.body.records[0];
      }
      return {
        ...state,
        loginstatus,
        loginUser,
      };
    },
    changeLoginStatus(state, { payload }) {
      // setAuthority(payload.currentAuthority);
      if (payload.head && payload.head.rtnCode === '000000')
        setAuthority(payload.body.records[0].userName);
      // console.log(" save user ",payload.body[0])
      setCurrentUser(payload.body.records[0]);
      return { 
        ...state,
        rtnCode: payload.head.rtnCode,
        rtnMsg: payload.head.rtnMsg,
      };
    },
  },
};
