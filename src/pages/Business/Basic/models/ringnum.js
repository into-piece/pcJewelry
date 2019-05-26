import {
  querylistRingNum,
  saveTheRingNum,
  deleteTheRingNum,
  updateTheRingNum,
  freezeTheRingNum,
  querylistSonRingNum,
  saveTheSonRingNum,
  deleteTheSonRingNum,
  updateTheSonRingNum,
  freezeTheSonRingNum
} from '@/services/api';

export default {
  namespace: 'ringnum',

  state: {
    province: [],
    city: [],
    head: [],
    isLoading: false,
  },

  effects: {

    * fetchListRingNum(_, { call, put }) {
      const response = yield call(querylistRingNum);
      yield put({
        type: 'list',
        payload: response,
      });
    },

    * addRingNum({ payload, callback }, { call, put }) {
      const response = yield call(saveTheRingNum,payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    * updateRingNum({ payload, callback }, { call, put }) {
      const response = yield call(updateTheRingNum,payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    * deleteRingNum({ payload, callback }, { call, put }) {
      const response = yield call(deleteTheRingNum,payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    * freezeRingNum({ payload, callback }, { call, put }) {
      const response = yield call(freezeTheRingNum,payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    * fetchListSonRingNum({payload,callback}, { call, put }) {
      const response = yield call(querylistSonRingNum,payload);
      yield put({
        type: 'sublist',
        payload: response,
      });
      if (callback) callback();
    },

    * addSonRingNum({ payload, callback }, { call, put }) {
      const response = yield call(saveTheSonRingNum,payload);
      yield put({
        type: 'saveitem',
        payload: response,
      });
      if (callback) callback();
    },

    * updateSonRingNum({ payload, callback }, { call, put }) {
      const response = yield call(updateTheSonRingNum,payload);
      yield put({
        type: 'saveitem',
        payload: response,
      });
      if (callback) callback();
    },



    * freezeSonRingNum({ payload, callback }, { call, put }) {
      const response = yield call(freezeTheSonRingNum,payload);
      yield put({
        type: 'saveitem',
        payload: response,
      });
      if (callback) callback();
    },


    * deleteSonRingNumber ({ payload, callback }, { call, put }) {
      console.log('inv deleteSonRingNum');
      const response = yield call(deleteTheSonRingNum,payload);
      yield put({
        type: 'saveitem',
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

    sublist(state, action) {
      return {
        ...state,
        head2: action.payload,
        // rtnCode:action.payload.head.rtnCode,
        body2:{
          ...state.body,
          sonData: action.payload.body.records,
          rtnCode2:action.payload.head.rtnCode,
          rtnMsg2:action.payload.head.rtnMsg
        }
      };
    },

    saveitem(state,action) {
      return {
        ...state,
        result2:action.payload,
        body2:{
          ...state.body,
          sonData: action.payload.body.records,
          rtnCode:action.payload.head.rtnCode,
          rtnMsg:action.payload.head.rtnMsg
        }
      };


    },

  },
};
