import {
  querylistProduct,
  saveTheProduct,
  deleteTheProduct,
  updateTheProduct,
  freezeTheProduct,
  querylistProductSeries,
  saveTheProductSeries,
  deleteTheProductSeries,
  updateTheProductSeries,
  freezeTheProductSeries,
} from '@/services/api';

export default {
  namespace: 'product',



  effects: {
    *fetchListProduct({ payload, callback }, { call, put }) {
      const response = yield call(querylistProduct, payload);
      yield put({
        type: 'list',
        payload: response,
      });
      if (callback) callback();
    },

    *addProduct({ payload, callback }, { call, put }) {
      const response = yield call(saveTheProduct, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    *updateProduct({ payload, callback }, { call, put }) {
      const response = yield call(updateTheProduct, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    *deleteProduct({ payload, callback }, { call, put }) {
      const response = yield call(deleteTheProduct, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    *freezeProduct({ payload, callback }, { call, put }) {
      const response = yield call(freezeTheProduct, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    *fetchListProductSeries({ payload, callback }, { call, put }) {
      const response = yield call(querylistProductSeries, payload);
      yield put({
        type: 'list',
        payload: response,
      });
      if (callback) callback();
    },

    *addProductSeries({ payload, callback }, { call, put }) {
      const response = yield call(saveTheProductSeries, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    *updateProductSeries({ payload, callback }, { call, put }) {
      const response = yield call(updateTheProductSeries, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    *deleteProductSeries({ payload, callback }, { call, put }) {
      const response = yield call(deleteTheProductSeries, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    *freezeProductSeries({ payload, callback }, { call, put }) {
      const response = yield call(freezeTheProductSeries, payload);
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
