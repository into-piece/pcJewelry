import {
  querylistPackage,
  saveThePackage,
  deleteThePackage,
  updateThePackage,
  freezeThePackage,
} from '@/services/api';

export default {
  namespace: 'packageinfo',

  state: {
    province: [],
    city: [],
    head: [],
    isLoading: false,
  },

  effects: {


    * fetchListPackage({payload, callback}, { call, put }) {
      const response = yield call(querylistPackage,payload);
      yield put({
        type: 'list',
        payload: response,
      });
      if (callback) callback();
    },

    * addPackage({ payload, callback }, { call, put }) {
      const response = yield call(saveThePackage,payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    * updatePackage({ payload, callback }, { call, put }) {
      const response = yield call(updateThePackage,payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    * deletePackage({ payload, callback }, { call, put }) {
      const response = yield call(deleteThePackage,payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    * freezePackage({ payload, callback }, { call, put }) {
      const response = yield call(freezeThePackage,payload);
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
          rtnMsg:action.payload.head.rtnMsg,
          size:action.payload.body.size,
          total:action.payload.body.total,
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
          rtnMsg:action.payload.head.rtnMsg,

        }
      };


    },

  },
};
