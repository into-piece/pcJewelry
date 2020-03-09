import {
  querylistPerson,
  saveThePerson,
  deleteThePerson,
  updateThePerson,
  approvalThePerson,
  unApprovalThePerson,
} from '@/services/api';

import servicesConfig from '@/services/dev';

const { listMstWordbook, listDeptDropDown } = servicesConfig;

export default {
  namespace: 'person',

  state: {
    province: [],
    city: [],
    head: [],
    isLoading: false,
  },

  effects: {
    *fetchListPerson({ payload, callback }, { call, put }) {
      const response = yield call(querylistPerson, payload);
      yield put({
        type: 'list',
        payload: response,
      });
      if (callback) callback();
    },

    *addPerson({ payload, callback }, { call, put }) {
      const response = yield call(saveThePerson, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback&&response.head.rtnCode==='000000') callback();
    },

    *updatePerson({ payload, callback }, { call, put }) {
      const response = yield call(updateThePerson, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback&&response.head.rtnCode==='000000') callback();
    },

    *deletePerson({ payload, callback }, { call, put }) {
      const response = yield call(deleteThePerson, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    *approvalPerson({ payload, callback }, { call, put }) {
      const response = yield call(approvalThePerson, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    *unApprovalPerson({ payload, callback }, { call, put }) {
      const response = yield call(unApprovalThePerson, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    *listDataRang({payload, callback}, {put, call}) {
      const key = 'wordbookContentZh';
      const value = 'wordbookCode';
      const response = yield call(listMstWordbook,{wordbookTypeCode:'H020'})
      let list = response.head.rtnCode === '000000' ? response.body.records : [];
      list = list.map(item => ({
        key : item[key],
        value: item[value]
      }))
      
      yield put({
        type: 'changeState',
        payload: {
          typeName: 'listDataRangDropDown',
          data: list
        }
      })
    },

    *listDept({payload, callback}, {put, call}) {
      const key = 'zhName';
      const value = 'id';
      const response = yield call(listDeptDropDown)
      let list = response.head.rtnCode === '000000' ? response.body.records : [];
      list = list.map(item => ({
        key : item[key],
        value: item[value]
      }))
      
      yield put({
        type: 'changeState',
        payload: {
          typeName: 'listDeptDropDown',
          data: list
        }
      })
    }
  },

  reducers: {

    changeState(state, action ){
      const { data, typeName } = action.payload;
      return {
        ...state,
        [typeName]: data
      }
    },

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
