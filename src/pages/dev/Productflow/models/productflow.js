/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-16 23:48:54
 * @LastEditTime: 2019-08-17 15:15:50
 * @LastEditors: Please set LastEditors
 */
import servicesConfig from '@/services/quote';

const initData = { records: [] }

const { queryProductQuoteHeadersNotDone,
  queryProductQuoteHeadersAlreadyDone,
  listProductQuoteDetail,
  deleteProductQuoteHeader,
  listProductNotCreateQoute,
  listMstWordbook,
  listCustomerDropDown,
  listMarkingDropDown,
  listEndCustomerDropDown,
  listBrands,
  listBasicColourSettingsDropDown } = servicesConfig


const getTableList = listProductQuoteDetail;
const getListTableSecond = {
  productProcess: listProductQuoteDetail
};


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


    wordbookdropdown: [{ key: '', value: '' }],

  },

  effects: {
    * getList({ payload }, { call, put }) {
      const response = yield call(getTableList, payload);
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
      const {  params,type } = payload
      const response = yield call(getListTableSecond[type], params);
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

    * getwordbookdropdown(data, { call, put }) {
      const response = yield call(listMstWordbook, { "wordbookTypeCode": "H007" });
      const wordbookData = response.body.records
      const wordbookdropdown = wordbookData.map(({ wordbookContentZh, wordbookCode }) => {
        return { value: wordbookCode, key: wordbookContentZh }
      })
      yield put({
        type: 'changeState',
        payload: { data: wordbookdropdown, typeName: 'wordbookdropdown' },
      });

    },

  },

  reducers: {
    changeState(state, action) {
      const { typeName, data } = action.payload
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
        }
      };
    },
    changeSearchParamsSecond2(state, action) {
      return {
        ...state,
        searchParamsSecond: {
          ...state.searchParamsSecond,
          ...action.payload,
        }
      };
    },
  },
};
