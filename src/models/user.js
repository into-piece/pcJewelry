import { query as queryUsers, queryCurrent,queryUser,saveUserInfo,getFlowMenu } from '@/services/user';
import { queryAllCity} from '@/services/api';
import { testCurrentUser } from '../utils/utils';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
    loginUser:{}
  },

  effects: {

    *queryUser({ payload }, { call, put }) {

      let u={}
      const response = yield call(queryUser);
      const body = response.body;
      const records = body?body.records:[];
      if(records&&records.length>0)
        u = records[0];

      yield put({
        type: 'changeState',
        payload: { data: u,typeName: "loginUser"},
      });
    },

    *saveUserInfo({ payload }, { call, put }) {

      return yield call(saveUserInfo,payload);
    },

    *fetch(_, { call, put }) {

      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      // const response = yield call(queryCurrent);
      const response = yield call(queryAllCity);
      yield put({
        type: 'saveCurrentUserTest',
        payload: response,
      });
    }
  },

  reducers: {
    changeState(state, action) {
      const { typeName, data } = action.payload;
      return {
        ...state,
        [typeName]: data,
      };
    },

    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    saveCurrentUserTest(state) {
      return {
        ...state,
        currentUser: testCurrentUser(),
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
