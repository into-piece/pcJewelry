import {
  querylistTerminal,
  saveTheTerminal,
  deleteTheTerminal,
  updateTheTerminal,
  freezeTheTerminal,
  unfreezeTheTerminal,
} from '@/services/api';

export default {
  namespace: 'terminal',

  state: {
    province: [],
    city: [],
    head: [],
    isLoading: false,
  },

  effects: {
    *fetchListTerminal({ payload, callback }, { call, put }) {
      const response = yield call(querylistTerminal, payload);
      yield put({
        type: 'list',
        payload: response,
      });
      if (callback) callback();
    },

    *addTerminal({ payload, callback }, { call, put }) {
      const response = yield call(saveTheTerminal, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback&&response.head.rtnCode=="000000") callback();
    },

    *updateTerminal({ payload, callback }, { call, put }) {
      const response = yield call(updateTheTerminal, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback&&response.head.rtnCode=="000000") callback();
    },

    *deleteTerminal({ payload, callback }, { call, put }) {
      const response = yield call(deleteTheTerminal, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    *freezeTerminal({ payload, callback }, { call, put }) {
      const response = yield call(freezeTheTerminal, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    *unfreezeTerminal({ payload, callback }, { call, put }) {
      const response = yield call(unfreezeTheTerminal, payload);
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
