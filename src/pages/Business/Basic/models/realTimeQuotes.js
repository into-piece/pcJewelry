import {
  realTimeMarket,
} from '@/services/api';
import moment from 'moment'

export default {
  namespace: 'realTimeQuotes',

  state: {
    isLoading: false,
    body: {},
    realTimeQuotesddlist: [],
  },

  effects: {
    * fetchListrealTimeQuotes({ payload }, { call, put }) {
      const response = yield call(realTimeMarket, payload);
      yield put({
        type: 'list',
        payload: response,
      });
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
          data:action.payload.body.records&& action.payload.body.records[0].items,
          rtnCode: action.payload.head.rtnCode,
          rtnMsg: action.payload.head.rtnMsg,
        },
      };
    },

  },
};
