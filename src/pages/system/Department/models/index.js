import {
  querylistDept,
  saveOrUpdatedept,
  deleteTheDept,
  approvalDept,
  cancelDept
} from '@/services/api';

export default {
  namespace: 'dept',

  state: {
    province: [],
    city: [],
    head: [],
    isLoading: false,
  },

  effects: {
    *fetchListDept({ payload, callback }, { call, put }) {
      const response = yield call(querylistDept, payload);
      yield put({
        type: 'list',
        payload: response,
      });
      if (callback) callback();
    },

    *addDept({ payload, callback }, { call, put }) {
      const response = yield call(saveOrUpdatedept, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    *updateDept({ payload, callback }, { call, put }) {
      const response = yield call(saveOrUpdatedept, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    *deleteDept({ payload, callback }, { call, put }) {
      const response = yield call(deleteTheDept, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    *approvalDept({ payload, callback }, { call, put }) {
      const response = yield call(approvalDept, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    *cancelDept({ payload, callback }, { call, put }) {
      const response = yield call(cancelDept, payload);
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
          records: action.payload.body.records,
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
