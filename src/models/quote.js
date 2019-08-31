/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-16 23:48:54
 * @LastEditTime: 2019-08-17 15:15:50
 * @LastEditors: Please set LastEditors
 */
import servicesConfig from '@/services/quote';

const initData = { records: [] }

const { queryProductQuoteHeadersNotDone, queryProductQuoteHeadersAlreadyDone } = servicesConfig
export default {
  namespace: 'quote',

  state: {
    quotelist: initData,
    selectedRowKeys: [], // table1 select
    selectedRowKeys2: [], // table2 select
    timeline: 'currentQuote',
    selectKey: '',
    pagination: {
      current: 1,
      size: 10,
    },
    pagination2: {
      current: 1,
      size: 10,
    },
    choosenRowData: { quoteNumber: '' }, // select to show
    choosenRowData2: { id: '' }, // select to show
  },

  effects: {
    * getList({ payload }, { call, put }) {
      const { type, params, sendReq } = payload
      const sendType = sendReq === 'currentQuote' ? queryProductQuoteHeadersNotDone : queryProductQuoteHeadersAlreadyDone
      const response = yield call(sendType, params);
      yield put({
        type: 'getData',
        payload: { response, type },
      });
    },
    * getTimeline({ payload }, { put }) {
      yield put({
        type: 'getTimeline2',
        payload,
      });
    },
    * getChoosenRowData({ payload }, { put }) {
      debugger
      yield put({
        type: 'getChoosenRowData2',
        payload,
      });
    },
    * changeSelectedRowKeys({ payload }, { put }) {
      yield put({
        type: 'changeSelectedRowKeys2',
        payload,
      });
    },
    * changeSelectedRowKeys2({ payload }, { put }) {
      yield put({
        type: 'changeSelectedRowKeys3',
        payload,
      });
    },
  },

  reducers: {
    getData(state, action) {
      const quotelist =
        action.payload && action.payload.response.head && action.payload.response.head.rtnCode === '000000'
          ? action.payload.response.body
          : initData;

      return {
        ...state,
        quotelist,
      };
    },
    getTimeline2(state, action) {
      return {
        ...state,
        timeline: action.payload,
      };
    },
    getChoosenRowData2(state, action) {
      console.log(state, '=========')
      return {
        ...state,
        choosenRowData: action.payload,
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
    changeSelectedRowKeys3(state, action) {
      return {
        ...state,
        selectedRowKeys: [
          ...action.payload,
        ],
      };
    },

  },

};
