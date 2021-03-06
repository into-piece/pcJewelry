/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-16 23:48:54
 * @LastEditTime: 2019-08-17 15:15:50
 * @LastEditors: Please set LastEditors
 */
import servicesConfig from '@/services/purchase';

const initData = { records: [] };
const initPagination = {
  current: 1,
  size: 10,
};

const {
  listProductNotCreateQoute,
  listMstWordbook,
  listCustomerDropDown,
  listMarkingDropDown,
  listEndCustomerDropDown,
  listBrands,
  listBasicColourSettingsDropDown,
  change,
  listSupplier,
  listContacts,
  listDropDownPurchase,
  listBlankAccount,
} = servicesConfig;
export default {
  namespace: 'purchase',

  state: {
    supplierList: initData,
    contactsList: initData,
    blankAccountList: initData,
    quoteDatialList: initData,
    supplierSearchStatus: [
      { key: '不限', value: '' },
      { key: '输入', value: 0 },
      { key: '已审批', value: 2 },
    ],
    selectedRowKeys: [], // table1 select
    selectedContactsRowKeys: [], // contacts select
    selectedBlankAccountRowKeys: [], // contacts select
    timeLine: 'contacts',
    detailChoosenType: 1,
    selectKey: '',
    pagination: initPagination,
    contactsPagination: initPagination,
    blankAccountPagination: initPagination,
    choosenRowData: { id: '' }, // select to show
    choosenContactsRowData: { id: '' }, // select to show
    choosenBlankAccountRowData: { id: '' }, // select to show
    rightMenu: 1,
    productList: [],
    productselectedKeys: [],
    productChoosenRowData: [],
    productPagination: {
      current: 1,
      size: 10,
    },
    showProductModal: false,
    wordbookdropdownType: [{ key: '', value: '', wordbookContentCode: '' }],
    listDropDownPurchase: [{ key: '', value: '' }],
    wordbookdropdownMode: [{ key: '', value: '' }],
    wordbookdropdownCurrency: [{ key: '', value: '' }],
    currencydropdown: [{ key: '', value: '' }],
    customerDropDownList: [{ key: '', value: '' }],
    endCustomerList: [{ key: '', value: '' }],
    markinglist: [],
    markingEnName: '',
    brandsList: [],
    materialPriceList: [],
    searchParams: {status:0},
    searchDetailParams: {},
    searchContactsParams: {},
    searchBlankAccountParams: {},
  },

  effects: {
    * getList({ payload }, { call, put, select }) {
      const { params, sendReq } = payload;


      // const sendType =
      //   sendReq === 'currentQuote'
      //     ? queryProductQuoteHeadersNotDone
      //     : queryProductQuoteHeadersAlreadyDone;
      const response = yield call(listSupplier, params);
      const supplierList =
        response.head && response.head.rtnCode === '000000' ? response.body : initData;


      yield put({
        type: 'changeState',
        payload: { data: supplierList, typeName: 'supplierList' },
      });
      yield put({
        type: 'changeState',
        payload: { data: { size: response.body.size, current: response.body.current }, typeName: 'pagination' },
      });

      const choosenRowData = yield select(state => {
        return state.purchase.choosenRowData;
      });

      const rowData = supplierList.records.filter(value => value.id === choosenRowData.id);
      if (rowData.length > 0)
        yield put({
          type: 'getChoosenRowData2',
          payload: rowData[0],
        });
    },

    * clearPagination(data, { put }) {
      yield put({
        type: 'changeState',
        payload: { data: initPagination, typeName: 'pagination' },
      });
    },


    * getContactsList({ payload }, { call, put, select }) {

      const { type, params } = payload;
      const response = yield call(
        listContacts, params);

      const contactsList =
        response.head && response.head.rtnCode === '000000' ? response.body : initData;

      const choosenRowData = yield select(state => {
        return state.purchase.choosenRowData;
      });

      if (choosenRowData && choosenRowData.id && choosenRowData.id !== '') {
        yield put({
          type: 'changeState',
          payload: { data: contactsList, typeName: 'contactsList' },
        });


        yield put({
          type: 'changeState',
          payload: {
            data: { size: response.body.size, current: response.body.current },
            typeName: 'contactsPagination',
          },
        });

        const choosenContactsRowData = yield select(state => {
          return state.purchase.choosenContactsRowData;
        });
        if (choosenContactsRowData.id !== '') {
          const rowData = contactsList.records.filter(value => value.id === choosenContactsRowData.id);
          if (rowData.length > 0)
            yield put({
              type: 'getchoosenContactsRowData2',
              payload: rowData[0],
            });
        }
      }
    },

    * getBlankAccountList({ payload }, { call, put, select }) {

      const { type, params } = payload;
      const response = yield call(
        listBlankAccount, params);

      const blankAccountList =
        response.head && response.head.rtnCode === '000000' ? response.body : initData;

      const choosenRowData = yield select(state => {
        return state.purchase.choosenRowData;
      });
      if (choosenRowData && choosenRowData.id && choosenRowData.id !== '') {

        yield put({
          type: 'changeState',
          payload: { data: blankAccountList, typeName: 'blankAccountList' },
        });

        yield put({
          type: 'changeState',
          payload: {
            data: { size: response.body.size, current: response.body.current },
            typeName: 'blankAccountPagination',
          },
        });


        const choosenBlankAccountRowData = yield select(state => {
          return state.purchase.choosenBlankAccountRowData;
        });
        if (choosenBlankAccountRowData.id !== '') {
          const rowData = blankAccountList.records.filter(value => value.id === choosenBlankAccountRowData.id);
          if (rowData.length > 0)
            yield put({
              type: 'getchoosenBlankAccountRowData2',
              payload: rowData[0],
            });
        }
      }
    },


    * clearContactsList(data, { put }) {
      yield put({
        type: 'changeState',
        payload: { data: initData, typeName: 'contactsList' },
      });

      yield put({
        type: 'changeState',
        payload: { data: initPagination, typeName: 'contactsPagination' },
      });


    },

    * clearBlankAccountList(data, { put }) {
      yield put({
        type: 'changeState',
        payload: { data: initData, typeName: 'blankAccountList' },
      });

      yield put({
        type: 'changeState',
        payload: { data: initPagination, typeName: 'blankAccountPagination' },
      });

    },


    * clearContacts(data, { put }) {
      yield put({
        type: 'changeState',
        payload: { data: { id: '' }, typeName: 'choosenContactsRowData' },
      });

      yield put({
        type: 'changeState',
        payload: { data: [], typeName: 'selectedContactsRowKeys' },
      });

    },


    * clearContactsPagination(data, { put }) {
      yield put({
        type: 'changeState',
        payload: { data: initPagination, typeName: 'contactsPagination' },
      });
    },


    * clearBlankAccount(data, { put }) {
      yield put({
        type: 'changeState',
        payload: { data: { id: '' }, typeName: 'choosenBlankAccountRowData' },
      });

      yield put({
        type: 'changeState',
        payload: { data: [], typeName: 'selectedBlankAccountRowKeys' },
      });
    },

    * changeSearchParams({ payload }, { put }) {
      yield put({
        type: 'changeSearchParams2',
        payload,
      });
    },

    * changeSearchBlankAccountParams({ payload }, { put }) {
      yield put({
        type: 'changeSearchBlankAccountParams2',
        payload,
      });
    },

    * clearBlankAccountPagination(data, { put }) {
      yield put({
        type: 'changeState',
        payload: { data: initPagination, typeName: 'BlankAccountPagination' },
      });
    },

    * changeSearchContactsParams({ payload }, { put }) {
      yield put({
        type: 'changeSearchContactsParams2',
        payload,
      });
    },

    * clearSearchBlankAccountParams({ payload }, { put }) {
      yield put({
        type: 'clearSearchBlankAccountParams2',
        payload,
      });
    },

    * clearSearchContactsParams({ payload }, { put }) {
      yield put({
        type: 'clearSearchContactsParams2',
        payload,
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
    * getChoosenContactsRowData({ payload }, { put }) {
      yield put({
        type: 'getchoosenContactsRowData2',
        payload,
      });
    },

    * getChoosenBlankAccountRowData({ payload }, { put }) {
      yield put({
        type: 'getchoosenBlankAccountRowData2',
        payload,
      });
    },
    * getProductChoosenRowData({ payload }, { put }) {
      yield put({
        type: 'changeState',
        payload: { data: payload, typeName: 'productChoosenRowData' },
      });
    },
    * changeSelectedRowKeys({ payload }, { put }) {
      yield put({
        type: 'changeSelectedRowKeys2',
        payload,
      });
    },
    * changeSelectedContactsRowKeys({ payload }, { put }) {
      yield put({
        type: 'changeSelectedContactsRowKeys2',
        payload,
      });
    },
    * changeSelectedBlankAccountRowKeys({ payload }, { put }) {
      yield put({
        type: 'changeSelectedBlankAccountRowKeys2',
        payload,
      });
    },
    * changeProductselectedKeys({ payload }, { put }) {
      yield put({
        type: 'changeState',
        payload: { data: payload, typeName: 'productselectedKeys' },
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
    * getwordbookdropdownMode(data, { call, put }) {
      const response = yield call(listMstWordbook, { wordbookTypeCode: 'H019' });
      const wordbookData = response.body.records;
      const wordbookdropdown = wordbookData.map(({ wordbookContentZh, wordbookCode }) => {
        return { value: wordbookCode, key: wordbookContentZh };
      });
      yield put({
        type: 'changeState',
        payload: { data: wordbookdropdown, typeName: 'wordbookdropdownMode' },
      });
    },

    * getwordbookdropdownType(data, { call, put }) {
      const response = yield call(listMstWordbook, { wordbookTypeCode: 'H018' });
      const wordbookData = response.body.records;

      const wordbookdropdown = wordbookData.map(({ wordbookContentZh, wordbookCode, wordbookContentCode }) => {
        return { value: wordbookCode, key: wordbookContentZh, wordbookContentCode };
      });
      yield put({
        type: 'changeState',
        payload: { data: wordbookdropdown, typeName: 'wordbookdropdownType' },
      });
    },


    * getListDropDownPurchase(data, { call, put }) {
      const response = yield call(listDropDownPurchase,{});
      const wordbookData = response.body.records;

      const list = wordbookData.map(({ id, zhName }) => {
        return { value: id, key: zhName };
      });
      yield put({
        type: 'changeState',
        payload: { data: list, typeName: 'listDropDownPurchase' },
      });
    },


    * getwordbookdropdownCurrency(data, { call, put }) {
      const response = yield call(listMstWordbook, { wordbookTypeCode: 'H006' });
      const wordbookData = response.body.records;
      const wordbookdropdown = wordbookData.map(({ wordbookContentCode, wordbookCode }) => {
        return { value: wordbookCode, key: wordbookContentCode };
      });
      yield put({
        type: 'changeState',
        payload: { data: wordbookdropdown, typeName: 'wordbookdropdownCurrency' },
      });
    },

    * getcurrencydropdown(data, { call, put }) {
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

    * getlistCustomerDropDown(data, { call, put }) {
      const response = yield call(listCustomerDropDown, {});
      let customerDropDownList = response.body.records;
      customerDropDownList = customerDropDownList.map(
        ({ customerNo, id, shotName, currencyCode }) => {
          return { value: id, key: customerNo, shotName, currencyCode };
        },
      );
      yield put({
        type: 'changeState',
        payload: { data: customerDropDownList, typeName: 'customerDropDownList' },
      });
    },
    * getMarkinglistDropDown(data, { call, put }) {
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
    * getEndCustomerListDropDown(data, { call, put }) {
      const response = yield call(listEndCustomerDropDown, data.payload);
      let endCustomerList = response.body.records;
      endCustomerList = endCustomerList.map(({ id, endNo, endShotName }) => {
        return { value: id, key: endNo, endNo };
      });
      yield put({
        type: 'changeState',
        payload: { data: endCustomerList, typeName: 'endCustomerList' },
      });
    },

    * getProductList({ payload, callback }, { call, put }) {
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
    * getBrandsList(data, { call, put }) {
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
    * getbasicColourSettingsList(data, { call, put }) {
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
    * change(data,{call}) {

      // debugger

      const supplierIds = data.payload.selectedRowKeys;
      const contactIds = data.payload.selectedContactsRowKeys;
      const bankAccountIds = data.payload.selectedBlankAccountRowKeys;
      const type = data.payload.type;

      if (supplierIds) {
        if (supplierIds.length > 1) {
          console.log('不支持多选');
        }
      }

      if (bankAccountIds) {
        if (bankAccountIds.length > 1) {
          console.log('不支持多选');
        }
      }

      if (contactIds) {
        if (contactIds.length > 1) {
          console.log('不支持多选');
        }
      }

      console.log(type)

      if (type === 'contacts') {
        const response = yield call(change,{
          supplierId: supplierIds[0],
          contactId: contactIds[0],
        });

        return response;
      }

      if(type === 'blankAccount') {
        const response = yield call(change,{
          supplierId: supplierIds[0],
          bankAccountId: bankAccountIds[0],
        });

        return response;
      }
    }
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
        timeLine: action.payload,
      };
    },

    changeSelectedRowKeys2(state, action) {
      return {
        ...state,
        selectedRowKeys: [...action.payload],
      };
    },
    changeSelectedContactsRowKeys2(state, action) {
      return {
        ...state,
        selectedContactsRowKeys: [...action.payload],
      };
    }, changeSelectedBlankAccountRowKeys2(state, action) {
      return {
        ...state,
        selectedBlankAccountRowKeys: [...action.payload],
      };
    },
    getchoosenContactsRowData2(state, action) {
      return {
        ...state,
        choosenContactsRowData: action.payload,
      };
    },

    getchoosenBlankAccountRowData2(state, action) {
      return {
        ...state,
        choosenBlankAccountRowData: action.payload,
      };
    },


    getChoosenRowData2(state, action) {
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
      return {
        ...state,
        searchParams: {
          ...action.payload,
        },
      };
    },

    changeSearchBlankAccountParams2(state, action) {
      return {
        ...state,
        searchBlankAccountParams: {
          ...state.searchBlankAccountParams,
          ...action.payload,
        },
      };
    },
    changeSearchContactsParams2(state, action) {
      return {
        ...state,
        searchContactsParams: {
          ...state.searchContactsParams,
          ...action.payload,
        },
      };
    },

    clearSearchBlankAccountParams2(state) {
      return {
        ...state,
        searchBlankAccountParams: {},
      };
    },
    clearSearchContactsParams2(state) {
      return {
        ...state,
        searchContactsParams: {},
      };
    },
  },
};
