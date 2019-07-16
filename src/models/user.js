import { query as queryUsers, queryCurrent } from '@/services/user';
import { queryAllCity} from '@/services/api';
import { testCurrentUser } from '../utils/utils';
export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
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



    },
  },

  reducers: {
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
