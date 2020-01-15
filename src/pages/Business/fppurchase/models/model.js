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
  listMstWordbook,
  getMainMaterialPrice,
  supplierlistDropDown,
  listnotdonepiHead,


} = servicesConfig;
const defaultModelName = 'fppurchase';


export default {
  namespace: defaultModelName,

  state: {

    choosenRowData: { id: '' }, // select to show table 1
    choosenRowDataCustomer: { id: '' }, // select to show table 1
    choosenRowDataSecond: { id: '' }, // select to show table 2

    pagination: {
      current: 1,
      size: 6,
    },
    paginationSecond: {
      current: 1,
      size: 6,
    },
    paginationCustomer: {
      current: 1,
      size: 10,
    },
    selectedRowKeys: [], // table1 select
    selectedRowKeysSecond: [], // table2 select
    list: initData,
    listSecond: initData,

    searchParams: {},
    searchParamsSecond: {},


    materialPriceToday: 0,
    listH006: [{ key: '', value: '' }],
    listH019: [{ key: '', value: '' }],
    supplierlistDropDown: [{ key: '', value: '' }],
    listPInotdone: [{ key: '', value: '' }],

  },

  effects: {

    * changeProps({ payload, callback }, { put }) {
      yield put({
        type: 'changeState',
        payload: { data: payload.data, typeName: payload.typeName },
      });
      if (callback) callback();

    },

    * getList({ payload, callback }, { call, put,select }) {
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
      yield put({
        type: 'changeState',
        payload: { data: {size:response.body.size,current:response.body.current} , typeName: 'pagination' },
      });
      const choosenRowData = yield select(state => state[defaultModelName].choosenRowData);

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
        payload: { data: {size:response.body.size,current:response.body.current} , typeName: 'paginationSecond' },
      });
      const choosenRowDataSecond = yield select(state => state[defaultModelName].choosenRowDataSecond);

      const selectRow = listSecond.records && listSecond.records.filter(e => (e.id === choosenRowDataSecond.id));
      if (selectRow && selectRow.length > 0) {
        yield put({
          type: 'changeState',
          payload: { data: selectRow[0], typeName: 'choosenRowDataSecond' },
        });
      } else {
        yield put({
          type: 'changeState',
          payload: { data: { id: '' }, typeName: 'choosenRowDataSecond' },
        });
      }
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
    * changeSelectedRowKeysSecond({ payload }, { put }) {
      yield put({
        type: 'changeSelectedRowKeysSecond2',
        payload,
      });
    },
    // 获取当天主材价格
    * getMainMaterialPrice( {payload}, { call, put }) {
      const response = yield call(getMainMaterialPrice,payload);
      const value = response.body.records[0].silver;
      yield put({
        type: 'changeState',
        payload: { data: value, typeName: 'materialPriceToday' },
      });

    },
    // 下拉获取
    * getCommonList( {payload}, { call, put }) {
      const {params,propsName,apiname,value='id',key='zhName'} = payload;
      const response = yield call(servicesConfig[apiname],params);
      const listtemp = response.body.records;
      const list = listtemp.map((item) => {
        return { ...item,value: item[value], key: item[key] };
      });
      yield put({
        type: 'changeState',
        payload: { data: list, typeName: propsName },
      });

    },
    * getwordbookdropdown({ payload }, { call, put }) {
      const response = yield call(listMstWordbook, payload.params);
      const wordbookData = response.body.records;
      const wordbookdropdown = wordbookData.map((item) => {
        return { ...item,value: item.wordbookCode, key: item.wordbookContentZh };
      });
      yield put({
        type: 'changeState',
        payload: { data: wordbookdropdown, typeName: payload.listName },
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
