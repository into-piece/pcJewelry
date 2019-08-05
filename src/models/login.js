import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { fakeAccountLogin, getFakeCaptcha,queryAllCity } from '@/services/api';
import { login } from '@/services/user';
import { setAuthority } from '@/utils/authority';
import { getPageQuery ,testCurrentUser} from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import { setCurrentUser } from '../utils/authority';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(login, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // console.log("login ",response)
      // Login successfully

      if (response.head&&response.head.rtnCode === '000000') {
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
        yield put(routerRedux.replace(redirect || '/'));
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *logout(_, { put }) {
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
          })
        );
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      // setAuthority(payload.currentAuthority);
      if( payload.head&& payload.head.rtnCode==='000000')
      setAuthority(payload.body[0].userName);
      console.log(" save user ",payload.body[0])
      setCurrentUser(payload.body[0])
      return {
        ...state,
        rtnCode: payload.head.rtnCode,
        rtnMsg: payload.head.rtnMsg,
      };
    },
  },
};
