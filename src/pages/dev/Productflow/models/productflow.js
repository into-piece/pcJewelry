/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-16 23:48:54
 * @LastEditTime: 2019-08-17 15:15:50
 * @LastEditors: Please set LastEditors
 */
import servicesConfig from '@/services/dev';

const initData = { records: [] };

const {
  listMstWordbook,listDeptDropDown,getTypeByWordbookCode
} = servicesConfig;



export default {
  namespace: 'productflow',

  state: {

    choosenRowData: { quoteNumber: '' }, // select to show table 1
    choosenRowDataSecond: { id: '' }, // select to show table 2

    pagination: {
      current: 1,
      size: 10,
    },
    paginationSecond: {
      current: 1,
      size: 10,
    },
    selectedRowKeys: [], // table1 select
    selectedRowKeysSecond: [], // table2 select
    list: initData,
    listSecond: initData,

    searchParams: {},
    searchParamsSecond: {},


    listDeptDrop: [{ key: '', value: '' }],
    listH017: [{ key: '', value: '' }],
    listH016009: [{ key: '', value: '' }],

  },

  effects: {
    * getList({ payload }, { call, put }) {
      const { type, params } = payload;
      const response = yield call(servicesConfig[`list${type}`], params);
      const list =
        response.head && response.head.rtnCode === '000000'
          ? response.body
          : initData;

      yield put({
        type: 'changeState',
        payload: { data: list, typeName: 'list' },
      });
    },

    * getListSecond({ payload }, { call, put }) {
      const { type, params } = payload;
      const response = yield call(servicesConfig[`list${type}`], params);
      const listSecond =
        response.head && response.head.rtnCode === '000000'
          ? response.body
          : initData;
      yield put({
        type: 'changeState',
        payload: { data: listSecond, typeName: 'listSecond' },
      });
    },

    * clearListScond(data, { put }) {
      yield put({
        type: 'changeState',
        payload: { data: initData, typeName: 'listSecond' },
      });
    },

    * changeSearchParams({ payload }, { put }) {
      yield put({
        type: 'changeSearchParams2',
        payload,
      });
    },

    * changeSearchParamsSecond({ payload }, { put }) {
      yield put({
        type: 'changeSearchParamsSecond2',
        payload,
      });
    },

    * setChoosenRowData({ payload }, { put }) {
      yield put({
        type: 'getChoosenRowData2',
        payload,
      });
    },
    * setChoosenRowDataSecond({ payload }, { put }) {
      yield put({
        type: 'getchoosenRowDataSecond2',
        payload,
      });
    },

    * changeSelectedRowKeys({ payload }, { put }) {
      yield put({
        type: 'changeSelectedRowKeys2',
        payload,
      });
    },
    * changeselectedRowKeysSecond({ payload }, { put }) {
      yield put({
        type: 'changeselectedRowKeysSecond2',
        payload,
      });
    },

    * getwordbookdropdown({ payload }, { call, put }) {
      const response = yield call(listMstWordbook,payload.params);
      const wordbookData = response.body.records;
      const wordbookdropdown = wordbookData.map(({ wordbookContentZh, wordbookCode }) => {
        return { value: wordbookCode, key: wordbookContentZh };
      });
      yield put({
        type: 'changeState',
        payload: { data: wordbookdropdown, typeName: payload.listName },
      });

    },

    * getTypeByWordbookCode({ payload }, { call, put }) {
      const response = yield call(getTypeByWordbookCode,payload.params);
      const wordbookData = response.body.records;
      const wordbookdropdown = wordbookData.map(({ id, zhName }) => {
        return { value: id, key: zhName };
      });
      yield put({
        type: 'changeState',
        payload: { data: wordbookdropdown, typeName: payload.listName },
      });

    },

    * listDeptDropDown(_, { call, put }) {
      const response = yield call(listDeptDropDown);
      const wordbookData = response.body.records;
      const wordbookdropdown = wordbookData.map(({ id, zhName }) => {
        return { value: id, key: zhName };
      });
      yield put({
        type: 'changeState',
        payload: { data: wordbookdropdown, typeName: "listDeptDrop" },
      });

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


    changeSelectedRowKeys2(state, action) {
      return {
        ...state,
        selectedRowKeys: [
          ...action.payload,
        ],
      };
    },
    changeselectedRowKeysSecond2(state, action) {
      return {
        ...state,
        selectedRowKeysSecond: [
          ...action.payload,
        ],
      };
    },

    getchoosenRowDataSecond2(state, action) {
      return {
        ...state,
        choosenRowDataSecond: action.payload,
      };
    },
    getChoosenRowData2(state, action) {
      return {
        ...state,
        choosenRowData: action.payload,
      };
    },

    changeSearchParams2(state, action) {
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          ...action.payload,
        },
      };
    },
    changeSearchParamsSecond2(state, action) {
      return {
        ...state,
        searchParamsSecond: {
          ...state.searchParamsSecond,
          ...action.payload,
        },
      };
    },
  },
};
