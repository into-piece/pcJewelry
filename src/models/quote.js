/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-16 23:48:54
 * @LastEditTime: 2019-08-17 15:15:50
 * @LastEditors: Please set LastEditors
 */
import servicesConfig from '@/services/quote';

const initData = { records: [] };

const {
  queryProductQuoteHeadersNotDone,
  queryProductQuoteHeadersAlreadyDone,
  listProductQuoteDetail,
  deleteProductQuoteHeader,
  listProductNotCreateQoute,
  listMstWordbook,
  listCustomerDropDown,
  listMarkingDropDown,
  listEndCustomerDropDown,
  listBrands,
  listBasicColourSettingsDropDown,
} = servicesConfig;
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
    productselectedKeys: [],
    productChoosenRowData: [],
    productPagination: {
      current: 1,
      size: 10,
    },
    showProductModal: false,
    wordbookdropdown: [{ key: '', value: '' }],
    currencydropdown: [{ key: '', value: '' }],
    customerDropDownList: [{ key: '', value: '' }],
    endCustomerList: [{ key: '', value: '' }],
    markinglist: [],
    markingEnName: '',
    brandsList: [],
    materialPriceList: [],
    searchParams: {},
    searchDetailParams: {},
  },

  effects: {
    *getList({ payload }, { call, put }) {
      const { params, sendReq } = payload;
      const sendType =
        sendReq === 'currentQuote'
          ? queryProductQuoteHeadersNotDone
          : queryProductQuoteHeadersAlreadyDone;
      const response = yield call(sendType, params);
      const quotelist =
        response.head && response.head.rtnCode === '000000' ? response.body : initData;

      yield put({
        type: 'changeState',
        payload: { data: quotelist, typeName: 'quotelist' },
      });
    },

    *getDetailList({ payload }, { call, put }) {
      const { type, params } = payload;
      const response = yield call(listProductQuoteDetail, params);
      const quoteDatialList =
        response.head && response.head.rtnCode === '000000' ? response.body : initData;
      yield put({
        type: 'changeState',
        payload: { data: quoteDatialList, typeName: 'quoteDatialList' },
      });
    },

    *clearDetailList(data, { put }) {
      yield put({
        type: 'changeState',
        payload: { data: initData, typeName: 'quoteDatialList' },
      });
    },

    *changeSearchParams({ payload }, { put }) {
      yield put({
        type: 'changeSearchParams2',
        payload,
      });
    },

    *changeSearchDetailParams({ payload }, { put }) {
      yield put({
        type: 'changeSearchDetailParams2',
        payload,
      });
    },

    *getTimeline({ payload }, { put }) {
      yield put({
        type: 'getTimeline2',
        payload,
      });
    },
    *getChoosenRowData({ payload }, { put }) {
      yield put({
        type: 'getChoosenRowData2',
        payload,
      });
    },
    *getChoosenDetailRowData({ payload }, { put }) {
      yield put({
        type: 'getChoosenDetailRowData2',
        payload,
      });
    },
    *getProductChoosenRowData({ payload }, { put }) {
      yield put({
        type: 'changeState',
        payload: { data: payload, typeName: 'productChoosenRowData' },
      });
    },
    *changeSelectedRowKeys({ payload }, { put }) {
      yield put({
        type: 'changeSelectedRowKeys2',
        payload,
      });
    },
    *changeSelectedDetailRowKeys({ payload }, { put }) {
      yield put({
        type: 'changeSelectedDetailRowKeys2',
        payload,
      });
    },
    *changeProductselectedKeys({ payload }, { put }) {
      yield put({
        type: 'changeState',
        payload: { data: payload, typeName: 'productselectedKeys' },
      });
    },
    *changeRightMenu({ payload }, { put }) {
      yield put({
        type: 'changeRightMenu2',
        payload,
      });
    },
    *showProductModalFn({ payload }, { put }) {
      yield put({
        type: 'changeState',
        payload: { data: payload, typeName: 'showProductModal' },
      });
    },
    *getwordbookdropdown(data, { call, put }) {
      const response = yield call(listMstWordbook, { wordbookTypeCode: 'H007' });
      const wordbookData = response.body.records;
      const wordbookdropdown = wordbookData.map(({ wordbookContentZh, wordbookCode }) => {
        return { value: wordbookCode, key: wordbookContentZh };
      });
      yield put({
        type: 'changeState',
        payload: { data: wordbookdropdown, typeName: 'wordbookdropdown' },
      });
    },

    *getcurrencydropdown(data, { call, put }) {
      const response = yield call(listMstWordbook, { wordbookTypeCode: 'H006' });
      let currencydropdown = response.body.records;
      currencydropdown = currencydropdown.map(({ wordbookContentCode }) => {
        return { value: wordbookContentCode, key: wordbookContentCode };
      });
      yield put({
        type: 'changeState',
        payload: { data: currencydropdown, typeName: 'currencydropdown' },
      });
    },

    *getlistCustomerDropDown(data, { call, put }) {
      const response = yield call(listCustomerDropDown, {});
      let customerDropDownList = response.body.records;
      customerDropDownList = customerDropDownList.map(
        ({ customerNo, id, shotName, currencyCode }) => {
          return { value: id, key: customerNo, shotName, currencyCode };
        }
      );
      yield put({
        type: 'changeState',
        payload: { data: customerDropDownList, typeName: 'customerDropDownList' },
      });
    },
    *getMarkinglistDropDown(data, { call, put }) {
      const response = yield call(listMarkingDropDown, data.payload);
      let markinglist = response.body.records;
      markinglist = markinglist.map(({ zhName, id, enName }) => {
        return { value: id, key: zhName, enName };
      });
      yield put({
        type: 'changeState',
        payload: { data: markinglist, typeName: 'markinglist' },
      });
    },
    *getEndCustomerListDropDown(data, { call, put }) {
      const response = yield call(listEndCustomerDropDown, data.payload);
      let endCustomerList = response.body.records;
      endCustomerList = endCustomerList.map(({ id, endNo, endShotName }) => {
        return { value: id, key: endShotName, endShotName };
      });
      yield put({
        type: 'changeState',
        payload: { data: endCustomerList, typeName: 'endCustomerList' },
      });
    },

    *getProductList({ payload, callback }, { call, put }) {
      const response = yield call(listProductNotCreateQoute, payload.params);
      const productList = response.body;
      yield put({
        type: 'changeState',
        payload: { data: productList, typeName: 'productList' },
      });

      if (callback && typeof callback === 'function') {
        callback(productList);
      }
    },

    // 产品下拉
    *getBrandsList(data, { call, put }) {
      const response = yield call(listBrands, {});
      let brandsList = response.body.records;
      brandsList = brandsList.map(({ id, brandNo }) => {
        return { value: id, key: brandNo };
      });
      yield put({
        type: 'changeState',
        payload: { data: brandsList, typeName: 'brandsList' },
      });
    },
    *getbasicColourSettingsList(data, { call, put }) {
      const response = yield call(listBasicColourSettingsDropDown, {});
      let basicColourSettingsList = response.body.records;
      basicColourSettingsList = basicColourSettingsList.map(({ id, zhName }) => {
        return { value: id, key: zhName };
      });
      yield put({
        type: 'changeState',
        payload: { data: basicColourSettingsList, typeName: 'basicColourSettingsList' },
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

    getTimeline2(state, action) {
      return {
        ...state,
        timeline: action.payload,
      };
    },

    changeSelectedRowKeys2(state, action) {
      return {
        ...state,
        selectedRowKeys: [...action.payload],
      };
    },
    changeSelectedDetailRowKeys2(state, action) {
      return {
        ...state,
        selectedDetailRowKeys: [...action.payload],
      };
    },
    getChoosenDetailRowData2(state, action) {
      console.log(state, '=========');
      return {
        ...state,
        choosenDetailRowData: action.payload,
      };
    },
    getChoosenRowData2(state, action) {
      console.log(state, '=========');
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
    changeSearchParams2(state, action) {
      debugger;
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          ...action.payload,
        },
      };
    },
    changeSearchDetailParams2(state, action) {
      return {
        ...state,
        searchDetailParams: {
          ...state.searchDetailParams,
          ...action.payload,
        },
      };
    },
  },
};
