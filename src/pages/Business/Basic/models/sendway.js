import {
  querylistsendWay,
  saveTheSendWay,
  deleteTheSendWay,
  updateTheSendWay,
  freezeTheSendWay,
} from '@/services/api';

export default {
  namespace: 'sendway',

  state: {
    province: [],
    city: [],
    head: [],
    isLoading: false,
  },

  effects: {


    * fetchListSendWay(_, { call, put }) {
      const response = yield call(querylistsendWay);
      yield put({
        type: 'list',
        payload: response,
      });
    },

    * addSendWay({ payload, callback }, { call, put }) {
      const response = yield call(saveTheSendWay,payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    * updateSendWay({ payload, callback }, { call, put }) {
      const response = yield call(updateTheSendWay,payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    * deleteSendWay({ payload, callback }, { call, put }) {
      const response = yield call(deleteTheSendWay,payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    * freezeSendWay({ payload, callback }, { call, put }) {
      const response = yield call(freezeTheSendWay,payload);
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
        body:{
          ...state.body,
          data: action.payload.body.records,
          rtnCode:action.payload.head.rtnCode,
          rtnMsg:action.payload.head.rtnMsg
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
          rtnMsg:action.payload.head.rtnMsg
        }
      };


    },

  },
};
