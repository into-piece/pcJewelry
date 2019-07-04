import {
  querylistRoyalty,
  saveTheRoyalty,
  deleteTheRoyalty,
  updateTheRoyalty,
  freezeTheRoyalty,
} from '@/services/api';

export default {
  namespace: 'royalty',

  state: {
    province: [],
    city: [],
    head: [],
    isLoading: false,
  },

  effects: {
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
