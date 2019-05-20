import { querylistBrands, saveTheBrand,deleteTheBrand, updateTheBrand,freezeTheBrand} from '@/services/api';

export default {
  namespace: 'basic',

  state: {
    province: [],
    city: [],
    head: [],
    isLoading: false,
  },

  effects: {
    * fetchListBrands(_, { call, put }) {
      const response = yield call(querylistBrands);
      yield put({
        type: 'listBrand',
        payload: response,
      });
    },

    * addBrand({ payload, callback }, { call, put }) {
      console.log('model addBrand')
      const response = yield call(saveTheBrand,payload);
      yield put({
        type: 'saveBrand',
        payload: response,
      });
      if (callback) callback();
    },

    * updateBrand({ payload, callback }, { call, put }) {
      console.log('model updateBrand')
      const response = yield call(updateTheBrand,payload);
      yield put({
        type: 'saveBrand',
        payload: response,
      });
      if (callback) callback();
    },

    * deleteBrand({ payload, callback }, { call, put }) {
      console.log('model deleteBrand')
      const response = yield call(deleteTheBrand,payload);
      yield put({
        type: 'saveBrand',
        payload: response,
      });
      if (callback) callback();
    },

    * freeBrand({ payload, callback }, { call, put }) {
      console.log('model freeBrand')
      const response = yield call(freezeTheBrand,payload);
      yield put({
        type: 'saveBrand',
        payload: response,
      });
      if (callback) callback();
    },



    // *fetchCity({ payload }, { call, put }) {
    //   yield put({
    //     type: 'changeLoading',
    //     payload: true,
    //   });
    //   const response = yield call(queryCity, payload);
    //   yield put({
    //     type: 'setCity',
    //     payload: response,
    //   });
    //   yield put({
    //     type: 'changeLoading',
    //     payload: false,
    //   });
    // },
  },

  reducers: {
    setProvince(state, action) {
      return {
        ...state,
        province: action.payload,
      };
    },
    setCity(state, action) {
      return {
        ...state,
        city: action.payload,
      };
    },
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
        body:{
          ...state.body,
          data: action.payload.body.records,
          rtnCode:action.payload.head.rtnCode
        }
      };
    },

    saveBrand(state,action) {
      return {
        ...state,
        result:action.payload,
      };


    },


  },
};
