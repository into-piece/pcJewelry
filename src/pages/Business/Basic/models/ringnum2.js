import {
  querylistRingNum,
  saveTheRingNum,
  deleteTheRingNum,
  updateTheRingNum,
  freezeTheRingNum,
  querylistSonRingNum,
  saveTheSonRingNum,
  deleteTheSonRingNum,
  updateTheSonRingNum,
  freezeTheSonRingNum,
  unfreezeTheSonRingNum,
} from '@/services/api';

export default {
  namespace: 'ringnum2',

  state: {
    province: [],
    city: [],
    head: [],
    isLoading: false,
  },

  effects: {

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
      if (callback&&response.head.rtnCode==='000000') callback();
    },

    *updateSonRingNum({ payload, callback }, { call, put }) {
      const response = yield call(updateTheSonRingNum, payload);
      yield put({
        type: 'saveitem',
        payload: response,
      });
      if (callback&&response.head.rtnCode==='000000') callback();
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

    sublist(state, action) {

      return {
        ...state,
        head2: action.payload,
        // rtnCode:action.payload.head.rtnCode,
        body2: {
          ...state.body,
          total: action.payload.body.total,
          current: action.payload.body.current,
          size: action.payload.body.pageSize,
          sonData: action.payload.body.records,
          rtnCode2: action.payload.head.rtnCode,
          rtnMsg2: action.payload.head.rtnMsg,
        },
      };
    },


    saveitem(state, action2) {
      return {
        ...state,
        head2: action2.payload,
        body2: {
          ...state.body,
          rtnCode2: action2.payload.head.rtnCode,
          rtnMsg2: action2.payload.head.rtnMsg,
        },
      };
    },
  },
};
