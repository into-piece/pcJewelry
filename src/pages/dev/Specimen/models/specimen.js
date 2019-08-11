import {
  querylistSpecimen,
  saveTheSpecimen,
  deleteTheSpecimen,
  updateTheSpecimen,
  freezeTheSpecimen,
  unFreezeTheSpecimen,
  queryTheSpecimenLock,
  updateTheSpecimenUnLock,
} from '@/services/api';

export default {
  namespace: 'specimen',

  state: {
    province: [],
    city: [],
    head: [],
    isLoading: false,
  },

  effects: {
    *fetchListSpecimen({ payload, callback }, { call, put }) {
      const response = yield call(querylistSpecimen, payload);
      yield put({
        type: 'list',
        payload: response,
      });
      if (callback) callback();
    },

    *addSpecimen({ payload, callback }, { call, put }) {
      const response = yield call(saveTheSpecimen, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    *updateSpecimen({ payload, callback }, { call, put }) {
      const response = yield call(updateTheSpecimen, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    *deleteSpecimen({ payload, callback }, { call, put }) {
      const response = yield call(deleteTheSpecimen, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    *freezeSpecimen({ payload, callback }, { call, put }) {
      const response = yield call(freezeTheSpecimen, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    *unfreezeSpecimen({ payload, callback }, { call, put }) {
      const response = yield call(unFreezeTheSpecimen, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    *querySpecimenLock({ payload, callback }, { call, put }) {
      const response = yield call(queryTheSpecimenLock, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    *updateSpecimenUnLock({ payload, callback }, { call, put }) {
      const response = yield call(updateTheSpecimenUnLock, payload);
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
