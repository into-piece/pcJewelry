import {
  queryListWordbook
} from '@/services/api';

export default {
  namespace: 'dict',

  state: {

  },

  effects: {


    * fetchWorkBook({payload, callback}, { call, put }) {
      const response = yield call(queryListWordbook,payload);
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
