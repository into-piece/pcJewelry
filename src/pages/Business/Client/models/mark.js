import {
  querylistMark,
  saveTheMark,
  deleteTheMark,
  updateTheMark,
  freezeTheMark,
  unfreezeTheMark,
  listEndCustomerDropDown
} from '@/services/api';

export default {
  namespace: 'mark',

  state: {
    province: [],
    city: [],
    head: [],
    listEndCustomerDropDown: [],
    isLoading: false,
  },

  effects: {
    * fetchListMark({ payload, callback }, { call, put }) {
      const response = yield call(querylistMark, payload);
      yield put({
        type: 'list',
        payload: response,
      });
      if (callback) callback();
    },

    * addMark({ payload, callback }, { call, put }) {
      const response = yield call(saveTheMark, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback&&response.head.rtnCode=="000000") callback();
    },

    * updateMark({ payload, callback }, { call, put }) {
      const response = yield call(updateTheMark, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback && response.head.rtnCode === '000000') callback();
    },

    * deleteMark({ payload, callback }, { call, put }) {
      const response = yield call(deleteTheMark, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    * freezeMark({ payload, callback }, { call, put }) {
      const response = yield call(freezeTheMark, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    * unfreezeMark({ payload, callback }, { call, put }) {
      const response = yield call(unfreezeTheMark, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    * querylistEndCustomerDropDown({ payload, callback }, { call, put }) {
      const response = yield call(listEndCustomerDropDown, payload);
      const list = response.body.records;
      const listdrop = list.map((item) => {
        return { value: item.id, key: item.endNo,...item };
      });
      yield put({
        type: 'changeState',
        payload: { data: listdrop, typeName: "listEndCustomerDropDown" },
      });
      if (callback) callback();
    },
  },

  reducers: {
    changeState(state, action) {
      const { typeName, data } = action.payload;
      return {
        ...state,
        [typeName]: data,
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
