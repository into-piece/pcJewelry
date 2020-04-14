import {
  querylistProduct,
  saveTheProduct,
  deleteTheProduct,
  updateTheProduct,
  freezeTheProduct,
  unFreezeTheProduct,
  querylistProductSeries,
  saveTheProductSeries,
  deleteTheProductSeries,
  updateTheProductSeries,
  freezeTheProductSeries,
  queryTheProductLock,
  updateTheProductUnLock,
} from '@/services/api';

export default {
  namespace: 'product',

  state: {
    province: [],
    city: [],
    head: [],
    isLoading: false,
    gemColorKeys: [],
    platingColorKeys: [],
    customerIdKeys: [],

    brand: [],
    productType: [], // 类别
    productColor: [],
    gemColor: [],
    platingColor: [],
    customerId: [],
    sourceOfProduct: [],
    unitOfMeasurement: [],
    unitOfWeight: [],
    finishedWeight: [],
    mouldNo: [],
    searchParams:{}
  },

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
      if (callback && response.head.rtnCode === '000000') callback();
    },

    *updateProduct({ payload, callback }, { call, put }) {
      const response = yield call(updateTheProduct, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback && response.head.rtnCode === '000000') callback();
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

    *unfreezeProduct({ payload, callback }, { call, put }) {
      const response = yield call(unFreezeTheProduct, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    *queryProductLock({ payload, callback }, { call, put }) {
      const response = yield call(queryTheProductLock, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    *updateProductUnLock({ payload, callback }, { call, put }) {
      const response = yield call(updateTheProductUnLock, payload);
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

    *changeState({ payload }, { put }) {
      yield put({
        type: 'changeStateAction',
        payload,
      });
    },

    *changeList({ payload }, { put }) {
      const { key, value, key1, value1, zhName, enName } = payload;
      let listKey = 'zhName';
      let listValue = 'id';
      key1 && (listKey = key1);
      value1 && (listValue = value1);
      const arrList = value.map(item => ({
        // ...item,
        id: item.id,
        zhName: zhName ? item[zhName] : item.zhName,
        enName: enName ? item[enName] : item.enName,
        key: item[listKey],
        value: item[listValue],
      }));
      yield put({
        type: 'changeStateAction',
        payload: { key, value: arrList },
      });
    },
  },

  // brand: [],
  // productType: [], // 类别
  // productColor: [],
  // gemColor: [],
  // platingColor: [],
  // customerId: [],
  // sourceOfProduct: [],
  // unitOfMeasurement: [],
  // unitOfWeight: [],
  // finishedWeight: [],

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

    changeStateAction(state, action) {
      const { key, value } = action.payload;
      return {
        ...state,
        [key]: value,
      };
    },
  },
};
