import {
  querylistBrands,
  saveTheBrand,
  deleteTheBrand,
  updateTheBrand,
  freezeTheBrand,
  unfreezeTheBrand,
  querylistRoyalty,
  saveTheRoyalty,
  deleteTheRoyalty,
  updateTheRoyalty,
  freezeTheRoyalty,
} from '@/services/api';

export default {
  namespace: 'basic',

  state: {
    province: [],
    city: [],
    head: [],
    isLoading: false,
  },

  effects: {
    *fetchListBrands(_, { call, put }) {
      const response = yield call(querylistBrands);
      yield put({
        type: 'listBrand',
        payload: response,
      });
    },

    *addBrand({ payload, callback }, { call, put }) {
      const response = yield call(saveTheBrand, payload);
      yield put({
        type: 'saveBrand',
        payload: response,
      });
      if (callback&&response.head.rtnCode==='000000') callback();
    },

    *updateBrand({ payload, callback }, { call, put }) {
      console.log('model updateBrand');
      const response = yield call(updateTheBrand, payload);
      yield put({
        type: 'saveBrand',
        payload: response,
      });
      if (callback&&response.head.rtnCode==='000000') callback();
    },

    *deleteBrand({ payload, callback }, { call, put }) {
      // console.log('model deleteBrand');
      const response = yield call(deleteTheBrand, payload);
      yield put({
        type: 'saveBrand',
        payload: response,
      });
      if (callback) callback();
    },

    *freeBrand({ payload, callback }, { call, put }) {
      // console.log('model freeBrand');
      const response = yield call(freezeTheBrand, payload);
      yield put({
        type: 'saveBrand',
        payload: response,
      });
      if (callback) callback();
    },

    *unfreeBrand({ payload, callback }, { call, put }) {
      // console.log('model freeBrand');
      const response = yield call(unfreezeTheBrand, payload);
      yield put({
        type: 'saveBrand',
        payload: response,
      });
      if (callback) callback();
    },

    *fetchListRoyalty(_, { call, put }) {
      const response = yield call(querylistRoyalty);
      yield put({
        type: 'list',
        payload: response,
      });
    },

    *addRoyalty({ payload, callback }, { call, put }) {
      const response = yield call(saveTheRoyalty, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    *updateRoyalty({ payload, callback }, { call, put }) {
      const response = yield call(updateTheRoyalty, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    *deleteRoyalty({ payload, callback }, { call, put }) {
      const response = yield call(deleteTheRoyalty, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    *freezeRoyalty({ payload, callback }, { call, put }) {
      const response = yield call(freezeTheRoyalty, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    changeLoading(state, action) {
      return {
        ...state,
        isLoading: action.payload,
      };
    },

    listBrand(state, action) {
      return {
        ...state,
        head: action.payload,
        // rtnCode:action.payload.head.rtnCode,
        body: {
          ...state.body,
          data: action.payload.body.records,
          rtnCode: action.payload.head.rtnCode,
          rtnMsg: action.payload.head.rtnMsg,
        },
      };
    },

    saveBrand(state, action) {
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
