import {
  querylistCustomer,
  saveTheCustomer,
  deleteTheCustomer,
  updateTheCustomer,
  freezeTheCustomer,
  unfreezeTheCustomer,
} from '@/services/api';

export default {
  namespace: 'customer',

  state: {
    province: [],
    city: [],
    head: [],
    isLoading: false,
  },

  effects: {
    *fetchListCustomer({ payload, callback }, { call, put }) {
      const response = yield call(querylistCustomer, payload);
      yield put({
        type: 'list',
        payload: response,
      });
      if (callback) callback();
    },

    *addCustomer({ payload, callback }, { call, put }) {
      const response = yield call(saveTheCustomer, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback&&response.head.rtnCode ==='000000') callback();
    },

    *updateCustomer({ payload, callback }, { call, put }) {
      const response = yield call(updateTheCustomer, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback && response.head.rtnCode ==='000000'){
        callback();
      }
    },

    *deleteCustomer({ payload, callback }, { call, put }) {
      const response = yield call(deleteTheCustomer, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();

    },

    *freezeCustomer({ payload, callback }, { call, put }) {
      const response = yield call(freezeTheCustomer, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    *unfreezeCustomer({ payload, callback }, { call, put }) {
      const response = yield call(unfreezeTheCustomer, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    list(state, action) {
      // console.log("payload ,",action)
      return {
        ...state,
        head: action.payload,
        isSuccess: action.payload !== undefined ? '0' : '1',
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
      console.log('customer request list action is ', action);
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
