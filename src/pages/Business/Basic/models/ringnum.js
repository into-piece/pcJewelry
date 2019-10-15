import {
  querylistRingNum,
  saveTheRingNum,
  deleteTheRingNum,
  updateTheRingNum,
  freezeTheRingNum,
  unfreezeTheRingNum,
  querylistSonRingNum,
  saveTheSonRingNum,
  deleteTheSonRingNum,
  updateTheSonRingNum,
  freezeTheSonRingNum,
  unfreezeTheSonRingNum,
} from '@/services/api';

export default {
  namespace: 'ringnum',

  state: {
    province: [],
    city: [],
    head: [],
    isLoading: false,
  },

  effects: {
    *fetchListRingNum({payload}, { call, put }) {
      const response = yield call(querylistRingNum,payload);
      yield put({
        type: 'list',
        payload: response,
      });
    },

    *addRingNum({ payload, callback }, { call, put }) {
      const response = yield call(saveTheRingNum, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback&&response.head.rtnCode==='000000') callback();
    },

    *updateRingNum({ payload, callback }, { call, put }) {
      const response = yield call(updateTheRingNum, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback&&response.head.rtnCode==='000000') callback();
    },

    *deleteRingNum({ payload, callback }, { call, put }) {
      const response = yield call(deleteTheRingNum, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    *freezeRingNum({ payload, callback }, { call, put }) {
      const response = yield call(freezeTheRingNum, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    *unfreezeRingNum({ payload, callback }, { call, put }) {
      const response = yield call(unfreezeTheRingNum, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },




    *fetchListSonRingNum({ payload, callback }, { call, put }) {
      const response = yield call(querylistSonRingNum, payload);
      yield put({
        type: 'sublist',
        payload: response,
      });
      if (callback) callback();
    },

    *addSonRingNum({ payload, callback }, { call, put }) {
      const response = yield call(saveTheSonRingNum, payload);
      yield put({
        type: 'saveitem',
        payload: response,
      });
      if (callback) callback();
    },

    *updateSonRingNum({ payload, callback }, { call, put }) {
      const response = yield call(updateTheSonRingNum, payload);
      yield put({
        type: 'saveitem',
        payload: response,
      });
      if (callback) callback();
    },

    *freezeSonRingNum({ payload, callback }, { call, put }) {
      const response = yield call(freezeTheSonRingNum, payload);
      yield put({
        type: 'saveitem',
        payload: response,
      });
      if (callback) callback();
    },

    *unfreezeSonRingNum({ payload, callback }, { call, put }) {
      const response = yield call(unfreezeTheSonRingNum, payload);
      yield put({
        type: 'saveitem',
        payload: response,
      });
      if (callback) callback();
    },

    *deleteSonRingNumber({ payload, callback }, { call, put }) {
      const response = yield call(deleteTheSonRingNum, payload);
      yield put({
        type: 'saveitem',
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

      console.log(" save ",action)

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
