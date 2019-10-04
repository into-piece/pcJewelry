import {
  querylistsendWay,
  saveTheSendWay,
  deleteTheSendWay,
  updateTheSendWay,
  freezeTheSendWay,
  unfreezeTheSendWay
} from '@/services/api';

export default {
  namespace: 'sendway',

  state: {
    province: [],
    city: [],
    head: [],
    isLoading: false,
  },

  effects: {
    *fetchListSendWay({ payload}, { call, put }) {
      const response = yield call(querylistsendWay,payload);
      yield put({
        type: 'list',
        payload: response,
      });
    },

    *addSendWay({ payload, callback }, { call, put }) {
      const response = yield call(saveTheSendWay, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback&&response.head.rtnCode==='000000') callback();
    },

    *updateSendWay({ payload, callback }, { call, put }) {
      const response = yield call(updateTheSendWay, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback&&response.head.rtnCode==='000000') callback();
    },

    *deleteSendWay({ payload, callback }, { call, put }) {
      const response = yield call(deleteTheSendWay, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    *freezeSendWay({ payload, callback }, { call, put }) {
      const response = yield call(freezeTheSendWay, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    *unfreezeSendWay({ payload, callback }, { call, put }) {
      const response = yield call(unfreezeTheSendWay, payload);
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
          current: action.payload.body.current,
          size: action.payload.body.pageSize,
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
