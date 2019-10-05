import {
  querylistCurrency,
  saveTheCurrency,
  deleteTheCurrency,
  updateTheCurrency,
  freezeTheCurrency,
} from '@/services/api';

export default {
  namespace: 'currency',

  state: {
    isLoading: false,
    body: {},
  },

  effects: {
    * fetchListCurrency({ payload }, { call, put }) {
      const response = yield call(querylistCurrency, payload);
      yield put({
        type: 'list',
        payload: response,
      });
    },

    * addCurrency({ payload, callback }, { call, put }) {
      const response = yield call(saveTheCurrency, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback && response.head.rtnCode === '000000') callback();
    },

    * updateCurrency({ payload, callback }, { call, put }) {
      const response = yield call(updateTheCurrency, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback && response.head.rtnCode === '000000') callback();
    },

    * deleteCurrency({ payload, callback }, { call, put }) {
      const response = yield call(deleteTheCurrency, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    * freezeCurrency({ payload, callback }, { call, put }) {
      const response = yield call(freezeTheCurrency, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    list(state, action) {
      return {
        ...state,
        head: action.payload,
        // rtnCode:action.payload.head.rtnCode,
        body: {
          ...state.body,
          total: action.payload.body.total,
          data: action.payload.body.records,
          rtnCode: action.payload.head.rtnCode,
          rtnMsg: action.payload.head.rtnMsg,
        },
      };
    },

    save(state, action) {
      return {
        ...state,
        result: action.payload,
        body: {
          ...state.body,
          rtnCode: action.payload.head.rtnCode,
          rtnMsg: action.payload.head.rtnMsg,
        },
      };
    },
  },
};
