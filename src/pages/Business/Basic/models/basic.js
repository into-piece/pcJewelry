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

const initData = { records: [] };
export default {
  namespace: 'basic',

  state: {
    province: [],
    city: [],
    head: [],
    isLoading: false,
    body: {},
  },

  effects: {
    *fetchListBrands({ payload }, { call, put }) {
      const response = yield call(querylistBrands, payload);
      const list = response.head && response.head.rtnCode === '000000' ? response.body : initData;
      yield put({
        type: 'listBrand',
        payload: list,
      });
    },

    *addBrand({ payload, callback }, { call, put }) {
      const response = yield call(saveTheBrand, payload);
      yield put({
        type: 'saveBrand',
        payload: response,
      });
      if (callback && response.head.rtnCode === '000000') callback();
    },

    *updateBrand({ payload, callback }, { call, put }) {
      console.log('models updateBrand');
      const response = yield call(updateTheBrand, payload);
      yield put({
        type: 'saveBrand',
        payload: response,
      });
      if (callback && response.head.rtnCode === '000000') callback();
    },

    *deleteBrand({ payload, callback }, { call, put }) {
      // console.log('models deleteBrand');
      const response = yield call(deleteTheBrand, payload);
      yield put({
        type: 'saveBrand',
        payload: response,
      });
      if (callback) callback();
    },

    *freeBrand({ payload, callback }, { call, put }) {
      // console.log('models freeBrand');
      const response = yield call(freezeTheBrand, payload);
      yield put({
        type: 'saveBrand',
        payload: response,
      });
      if (callback) callback();
    },

    *unfreeBrand({ payload, callback }, { call, put }) {
      // console.log('models freeBrand');
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
        body: action.payload,
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
