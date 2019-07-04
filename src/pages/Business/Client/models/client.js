import {
  querylistClient,
  saveTheClient,
  deleteTheClient,
  updateTheClient,
  freezeTheClient,
} from '@/services/api';

export default {
  namespace: 'client',

  state: {
    province: [],
    city: [],
    head: [],
    isLoading: false,
  },

  effects: {
    *fetchListClient({ payload, callback }, { call, put }) {
      const response = yield call(querylistClient, payload);
      yield put({
        type: 'list',
        payload: response,
      });
      if (callback) callback();
    },

    *addClient({ payload, callback }, { call, put }) {
      const response = yield call(saveTheClient, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    *updateClient({ payload, callback }, { call, put }) {
      const response = yield call(updateTheClient, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    *deleteClient({ payload, callback }, { call, put }) {
      const response = yield call(deleteTheClient, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    *freezeClient({ payload, callback }, { call, put }) {
      const response = yield call(freezeTheClient, payload);
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
          data: action.payload.body.records,
          rtnCode: action.payload.head.rtnCode,
          rtnMsg: action.payload.head.rtnMsg,
          size: action.payload.body.size,
          total: action.payload.body.total,
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
