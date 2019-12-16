import {
  querylistCurrency,
  saveTheCurrency,
  deleteTheCurrency,
  updateTheCurrency,
  freezeTheCurrency,
  listCurrencydd
} from '@/services/api';
import moment from 'moment'

export default {
  namespace: 'currency',

  state: {
    isLoading: false,
    body: {},
    currencyddlist: [],
  },

  effects: {
    * fetchListCurrency({ payload }, { call, put }) {

      if(payload.create_time){
        payload.create_time = moment(payload.create_time).valueOf()
      }


      const response = yield call(querylistCurrency, payload);
      yield put({
        type: 'list',
        payload: response,
      });
    },

    *listCurrencydd({  callback }, { call, put }) {
      const response = yield call(listCurrencydd);
      yield put({
        type: 'currencyddlist',
        payload: response,
      });
      if (callback) callback();
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

    currencyddlist(state, action) {
      let list =
        action.payload && action.payload.head && action.payload.head.rtnCode === '000000'
          ? action.payload.body.records
          : [];
      if (list.length > 0) {
        list = list.map((item) => {
          return { ...item,key: item.currency, value: item.currency };
        });
      }
      return {
        ...state,
        currencyddlist: list,
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
