import {
  queryAllCity,
  queryProvince,
  queryAreas,
  queryCity,
} from '@/services/city';

export default {
  namespace: 'city',

  state: {
    province: [],
    city: [],
    areas: [],
    isLoading: false,
  },

  effects: {


    * fetchAllCity({payload, callback}, { call, put }) {
      const response = yield call(queryAllCity,payload);
      yield put({
        type: 'list',
        payload: response,
      });
      if (callback) callback();
    },
    * fetchProvinces({payload, callback}, { call, put }) {
      const response = yield call(queryProvince,payload);
      yield put({
        type: 'province',
        payload: response,
      });
      if (callback) callback();
    },

    * fetchAreas({payload, callback}, { call, put }) {
      const response = yield call(queryAreas,payload);
      yield put({
        type: 'areas',
        payload: response,
      });
      if (callback) callback();
    },

    * fetchCity({payload, callback}, { call, put }) {
      const response = yield call(queryCity,payload);
      yield put({
        type: 'citys',
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

    province(state, action) {
      return {
        ...state,
        head: action.payload,
        // rtnCode:action.payload.head.rtnCode,
        province:{
          ...state.body,
          data: action.payload.body.records,
          rtnCode:action.payload.head.rtnCode,
          rtnMsg:action.payload.head.rtnMsg,
          size:action.payload.body.size,
          total:action.payload.body.total,
        }
      };
    },


    areas(state, action) {
      return {
        ...state,
        head: action.payload,
        // rtnCode:action.payload.head.rtnCode,
        areas:{
          ...state.body,
          data: action.payload.body.records,
          rtnCode:action.payload.head.rtnCode,
          rtnMsg:action.payload.head.rtnMsg,
          size:action.payload.body.size,
          total:action.payload.body.total,
        }
      };
    },

    citys(state, action) {
      return {
        ...state,
        head: action.payload,
        // rtnCode:action.payload.head.rtnCode,
        city:{
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
