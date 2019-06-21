import {
  queryImageUrl,

} from '@/services/imageapi';

export default {
  namespace: 'image',

  state: {
    province: [],
    city: [],
    head: [],
    isLoading: false,
  },

  effects: {


    * fetchImageUrl({payload, callback}, { call, put }) {
      const response = yield call(queryImageUrl,payload);
      yield put({
        type: 'list',
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


  },
};
