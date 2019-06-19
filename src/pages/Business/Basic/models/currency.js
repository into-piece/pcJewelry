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
  },

  effects: {


    * fetchListCurrency(_, { call, put }) {
      const response = yield call(querylistCurrency);
      yield put({
        type: 'list',
        payload: response,
      });
    },

    * addCurrency({ payload, callback }, { call, put }) {
      const response = yield call(saveTheCurrency,payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    * updateCurrency({ payload, callback }, { call, put }) {
      const response = yield call(updateTheCurrency,payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    * deleteCurrency({ payload, callback }, { call, put }) {
      const response = yield call(deleteTheCurrency,payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    * freezeCurrency({ payload, callback }, { call, put }) {
      const response = yield call(freezeTheCurrency,payload);
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
        body:{
          ...state.body,
          data: action.payload.body.records,
          rtnCode:action.payload.head.rtnCode,
          rtnMsg:action.payload.head.rtnMsg
        }
      };
    },

    save(state,action) {
      return {
        ...state,
        result:action.payload,
        body:{
          ...state.body,
          rtnCode:action.payload.head.rtnCode,
          rtnMsg:action.payload.head.rtnMsg
        }
      };


    },

  },
};