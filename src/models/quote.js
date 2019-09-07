/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-16 23:48:54
 * @LastEditTime: 2019-08-17 15:15:50
 * @LastEditors: Please set LastEditors
 */
import servicesConfig from '@/services/quote';

const initData = { records: [] }

const { queryProductQuoteHeadersNotDone, queryProductQuoteHeadersAlreadyDone, listProductQuoteDetail, deleteProductQuoteHeader, listProductNotCreateQoute, listMstWordbook, listCustomerDropDown, listMarkingDropDown } = servicesConfig
export default {
  namespace: 'quote',

  state: {
    quotelist: initData,
    quoteDatialList: initData,
    selectedRowKeys: [], // table1 select
    selectedDetailRowKeys: [], // table2 select
    timeline: 'currentQuote',
    detailChoosenType: 1,
    selectKey: '',
    pagination: {
      current: 1,
      size: 10,
    },
    detailPagination: {
      current: 1,
      size: 10,
    },
    choosenRowData: { quoteNumber: '' }, // select to show
    choosenDetailRowData: { id: '' }, // select to show
    rightMenu: 1,
    productList: [],
    productPagination: {
      current: 1,
      size: 10,
    },
    showProductModal: false,
    wordbookdropdown: [{ key: '', value: '' }],
    customerDropDownList: [{ key: '', value: '' }],
    markinglist: [],
    markingEnName: '',
  },

  effects: {
    * getList({ payload }, { call, put }) {
      const { params, sendReq } = payload
      const sendType = sendReq === 'currentQuote' ? queryProductQuoteHeadersNotDone : queryProductQuoteHeadersAlreadyDone
      const response = yield call(sendType, params);
      const quotelist =
        response.head && response.head.rtnCode === '000000'
          ? response.body
          : initData;

      yield put({
        type: 'changeState',
        payload: { data: quotelist, typeName: 'quotelist' },
      });
    },

    * getDetailList({ payload }, { call, put }) {
      const { type, params } = payload
      const response = yield call(listProductQuoteDetail, params);
      const quoteDatialList =
        response.head && response.head.rtnCode === '000000'
          ? response.body
          : initData;
      yield put({
        type: 'changeState',
        payload: { data: quoteDatialList, typeName: 'quoteDatialList' },
      });
    },

    * clearDetailList(data, { put }) {
      yield put({
        type: 'changeState',
        payload: { data: initData, typeName: 'quoteDatialList' },
      });
    },

    * getTimeline({ payload }, { put }) {
      yield put({
        type: 'getTimeline2',
        payload,
      });
    },
    * getChoosenRowData({ payload }, { put }) {
      yield put({
        type: 'getChoosenRowData2',
        payload,
      });
    },
    * getChoosenDetailRowData({ payload }, { put }) {
      yield put({
        type: 'getChoosenDetailRowData2',
        payload,
      });
    },

    * changeSelectedRowKeys({ payload }, { put }) {
      yield put({
        type: 'changeSelectedRowKeys2',
        payload,
      });
    },
    * changeSelectedDetailRowKeys({ payload }, { put }) {
      yield put({
        type: 'changeSelectedDetailRowKeys2',
        payload,
      });
    },
    * changeRightMenu({ payload }, { put }) {
      yield put({
        type: 'changeRightMenu2',
        payload,
      });
    },
    * showProductModalFn({ payload }, { put }) {
      yield put({
        type: 'changeState',
        payload: { data: payload, typeName: 'showProductModal' },
      });
    },
    * getwordbookdropdown(data, { call, put }) {
      const response = yield call(listMstWordbook, { "wordbookTypeCode": "H007" });
      let wordbookdropdown = response.body.records
      wordbookdropdown = wordbookdropdown.map(({ wordbookContentZh, wordbookCode }) => {
        return { value: wordbookCode, key: wordbookContentZh }
      })
      yield put({
        type: 'changeState',
        payload: { data: wordbookdropdown, typeName: 'wordbookdropdown' },
      });
    },
    * getlistCustomerDropDown(data, { call, put }) {
      const response = yield call(listCustomerDropDown, {});
      console.log(response)
      let customerDropDownList = response.body.records
      customerDropDownList = customerDropDownList.map(({ customerNo }) => {
        return { value: customerNo, key: customerNo }
      })
      yield put({
        type: 'changeState',
        payload: { data: customerDropDownList, typeName: 'customerDropDownList' },
      });
    },
    * getMarkinglistDropDown(data, { call, put }) {
      const response = yield call(listMarkingDropDown, {});
      console.log(response)
      let markinglist = response.body.records
      markinglist = markinglist.map(({ markingNo, id }) => {
        return { value: id, key: markingNo }
      })
      yield put({
        type: 'changeState',
        payload: { data: markinglist, typeName: 'markinglist' },
      });
    },
    * getProductList(data, { call, put }) {
      const response = yield call(listMarkingDropDown, {});
      console.log(response)
      const productList = response.body.records
      yield put({
        type: 'changeState',
        payload: { data: productList, typeName: 'productList' },
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

    getTimeline2(state, action) {
      return {
        ...state,
        timeline: action.payload,
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
    changeSelectedDetailRowKeys2(state, action) {
      return {
        ...state,
        selectedDetailRowKeys: [
          ...action.payload,
        ],
      };
    },
    getChoosenDetailRowData2(state, action) {
      console.log(state, '=========')
      return {
        ...state,
        choosenDetailRowData: action.payload,
      };
    },
    getChoosenRowData2(state, action) {
      console.log(state, '=========')
      return {
        ...state,
        choosenRowData: action.payload,
      };
    },
    changeRightMenu2(state, action) {
      return {
        ...state,
        rightMenu: action.payload,
      };
    },
  },

};
