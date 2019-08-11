import { getDevDropDown, listBasicMeasureUnit } from '@/services/dev';

export default {
  namespace: 'dev',

  state: {
    list: [],
    dropDownList: [],
    pagination: {
      current: 1,
      size: 10,
    },
    selectKey: 'measureUnit',
    choosenRowData: { id: '', zhName: '', enName: '', unitCode: '' },
  },

  effects: {
    *getUnitDropDown({ payload }, { call, put }) {
      const response = yield call(getDevDropDown, payload);
      yield put({
        type: 'getData',
        payload: response,
      });
    },
    *getDevList({ payload }, { call, put }) {
      const response = yield call(listBasicMeasureUnit, payload);
      yield put({
        type: 'getDevList2',
        payload: response,
      });
    },
    *getPagination({ payload }, { put }) {
      yield put({
        type: 'getPagination2',
        payload,
      });
    },
    *getSelectKey({ payload }, { put }) {
      yield put({
        type: 'getSelectKey2',
        payload,
      });
    },
    *getChoosenRowData({ payload }, { put }) {
      yield put({
        type: 'getChoosenRowData2',
        payload,
      });
    },
  },

  reducers: {
    getData(state, action) {
      const list =
        action.payload && action.payload.head && action.payload.head.rtnCode === '000000'
          ? action.payload.body
          : [];
      return {
        ...state,
        list,
      };
    },
    getDevList2(state, action) {
      const list =
        action.payload && action.payload.head && action.payload.head.rtnCode === '000000'
          ? action.payload.body
          : [];
      console.log(list);
      return {
        ...state,
        list,
      };
    },
    getPagination2(state, action) {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          ...action.payload,
        },
      };
    },
    getSelectKey2(state, action) {
      return {
        ...state,
        selectKey: action.payload,
      };
    },
    getChoosenRowData2(state, action) {
      return {
        ...state,
        choosenRowData: action.payload,
      };
    },
  },
};
