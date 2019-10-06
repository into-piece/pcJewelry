import {
  querylistRequested,
  saveTheRequested,
  deleteTheRequested,
  updateTheRequested,
  freezeTheRequested,
  unfreezeTheRequested,
} from '@/services/api';

export default {
  namespace: 'requested',

  state: {
    province: [],
    city: [],
    head: [],
    isLoading: false,
  },

  effects: {
    *fetchListRequested({payload}, { call, put }) {
      const response = yield call(querylistRequested,payload);
      yield put({
        type: 'list',
        payload: response,
      });
    },

    *addRequested({ payload, callback }, { call, put }) {
      const response = yield call(saveTheRequested, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback&&response.head.rtnCode==='000000') callback();
    },

    *updateRequested({ payload, callback }, { call, put }) {
      const response = yield call(updateTheRequested, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback&&response.head.rtnCode==='000000') callback();
    },

    *deleteRequested({ payload, callback }, { call, put }) {
      const response = yield call(deleteTheRequested, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    *freezeRequested({ payload, callback }, { call, put }) {
      const response = yield call(freezeTheRequested, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    *unfreezeRequested({ payload, callback }, { call, put }) {
      const response = yield call(unfreezeTheRequested, payload);
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
