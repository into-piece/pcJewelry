/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-16 23:48:54
 * @LastEditTime: 2019-08-17 15:15:50
 * @LastEditors: Please set LastEditors
 */
import servicesConfig from '@/services/business';

const initData = { records: [] };

const {
  listMstWordbook,  getTypeByWordbookCode,dropDownRAT,listMarkingDropDown,
} = servicesConfig;
const defaultModelName = 'businessPI';


export default {
  namespace: defaultModelName,

  state: {

    choosenRowData: { id: '' }, // select to show table 1
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


    piTypeList: [{ key: '', value: '' }],
    currencydropdown: [{ key: '', value: '' }],

  },

  effects: {

    * getList({ payload, callback }, { call, put,select }) {
      const { type,piListType, params } = payload;
      const listtype =piListType==='0'?"listnotdone":"listalready";
      const response = yield call(servicesConfig[`${listtype}${type}`], params);
      const list =
        response.head && response.head.rtnCode === '000000'
          ? response.body
          : initData;
      yield put({
        type: 'changeState',
        payload: { data: list, typeName: 'list' },
      });

      const choosenRowData = yield select(state => state[defaultModelName].choosenRowData);

      yield put({
        type: 'changeState',
        payload: { data: {current:response.body.current,size:response.body.size}, typeName: 'pagination' },
      });

      const selectRow = list.records && list.records.filter(e => (e.id === choosenRowData.id));
      if (selectRow && selectRow.length > 0) {
        yield put({
          type: 'changeState',
          payload: { data: selectRow[0], typeName: 'choosenRowData' },
        });
      } else {
        yield put({
          type: 'changeState',
          payload: { data: { id: '' }, typeName: 'choosenRowData' },
        });
      }

      if (callback) callback();
    },

    * getListSecond({ payload, callback }, { call, put }) {
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
      yield put({
        type: 'changeState',
        payload: { data: {current:response.body.current,size:response.body.size}, typeName: 'paginationSecond' },
      });
      if (callback) callback();

    },
    * clearListSecond(_, { put }) {
      yield put({
        type: 'changeState',
        payload: { data: initData, typeName: 'listSecond' },
      });
      yield put({
        type: 'changeState',
        payload: { data: { id: '' }, typeName: 'choosenRowDataSecond' },
      });
      yield put({
        type: 'changeState',
        payload: { data: [], typeName: 'selectedRowKeysSecond' },
      });
    },

    * clearSecondDetail(_, { put }) {
      yield put({
        type: 'changeState',
        payload: { data: { id: '' }, typeName: 'choosenRowDataSecond' },
      });
      yield put({
        type: 'changeState',
        payload: { data: [], typeName: 'selectedRowKeysSecond' },
      });
    },

    * changeSearchParams({ payload }, { put }) {
      yield put({
        type: 'changeSearchParams2',
        payload,
      });
    },

    * changeSearchParamsSecond({ payload ,callback}, { put }) {
      yield put({
        type: 'changeSearchParamsSecond2',
        payload,
      });
      if(callback)callback();
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
    * changeSelectedRowKeysSecond({ payload }, { put }) {
      yield put({
        type: 'changeSelectedRowKeysSecond2',
        payload,
      });
    },

    // 下拉获取

    * getwordbookdropdown({ payload }, { call, put }) {
      const response = yield call(listMstWordbook, payload.params);
      const wordbookData = response.body.records;
      const wordbookdropdown = wordbookData.map(({ wordbookContentZh, wordbookCode }) => {
        return { value: wordbookCode, key: wordbookContentZh };
      });
      yield put({
        type: 'changeState',
        payload: { data: wordbookdropdown, typeName: payload.listName },
      });

    },

    * getcurrencydropdown(data, { call, put }) {
      const response = yield call(listMstWordbook, { "wordbookTypeCode": "H006" });
      let currencydropdown = response.body.records
      currencydropdown = currencydropdown.map(({ wordbookContentCode }) => {
        return { value: wordbookContentCode, key: wordbookContentCode }
      })
      yield put({
        type: 'changeState',
        payload: { data: currencydropdown, typeName: 'currencydropdown' },
      });
    },
    * getTypeByWordbookCode({ payload }, { call, put }) {
      const response = yield call(getTypeByWordbookCode, payload.params);
      const wordbookData = response.body.records;
      const wordbookdropdown = wordbookData.map(({ id, zhName }) => {
        return { value: id, key: zhName };
      });
      yield put({
        type: 'changeState',
        payload: { data: wordbookdropdown, typeName: payload.listName },
      });

    },
    * getDropDownRAT({ payload }, { call, put }) {
      const response = yield call(dropDownRAT, payload.params);
      const list = response.body.records;
      const listdrop = list.map(({ id, zhName }) => {
        return { value: id, key: zhName };
      });
      yield put({
        type: 'changeState',
        payload: { data: listdrop, typeName: "dropDownRAT" },
      });

    },
    * getListMarkingDropDown({ payload }, { call, put }) {
      const response = yield call(listMarkingDropDown, payload.params);
      const list = response.body.records;
      const listdrop = list.map(({ id, zhName }) => {
        return { value: id, key: zhName };
      });
      yield put({
        type: 'changeState',
        payload: { data: listdrop, typeName: "listMarkingDropDown" },
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
    changeSelectedRowKeysSecond2(state, action) {
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
          ...action.payload,
        },
      };
    },
    changeSearchParamsSecond2(state, action) {
      return {
        ...state,
        searchParamsSecond: {
          ...action.payload,
        },
      };
    },
  },
};
