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
  getTypeByWordbookCode,
  listBasicColourSetDropDown,
  listMoldPositioningSettingsDropDown,
  listFilmSettingsDropDown,
  listDieSetSubDropDown,
  bomapprove,
  boomrevoke,
  materialList,
} = servicesConfig;
const defaultModelName = 'devbom';
const rType = {
  1: 'list',
  2: 'add',
  3: 'delete',
  4: 'approve',
  5: 'revoke',
  6: 'copy',
};
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
    listDieSetSubDropDown: [{ key: '', value: '' }],
    listFilmSettings: [{ key: '', value: '' }],
    listBasicColourSetDropDown: [{ key: '', value: '' }],
    listMoldPositioningSettingsDropDown: [{ key: '', value: '' }],
    H016009: [{ key: '', value: '' }],
    materialList: [],
    bomList: [],

    listMstWordbook: [], // 原料类别下拉
    listFilmSettingsDropDown: [], // 模具号
  },

  effects: {
    *changeProps({ payload, callback }, { put }) {
      yield put({
        type: 'changeState',
        payload: { data: payload.data, typeName: payload.typeName },
      });
      if (callback) callback();
    },

    *getList({ payload, callback }, { call, put, select }) {
      const { type, params } = payload;
      const response = yield call(servicesConfig[`get${type}`], params);
      const list = response.head && response.head.rtnCode === '000000' ? response.body : initData;
      yield put({
        type: 'changeState',
        payload: { data: list, typeName: 'list' },
      });
      const choosenRowData = yield select(state => state[defaultModelName].choosenRowData);

      const selectRow = list.records && list.records.filter(e => e.id === choosenRowData.id);
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
      if (callback) callback(list.records[0]);
    },

    *isVerifyBom({ payload }, { call }) {
      const { params, type } = payload;
      const service = type === 1 ? bomapprove : boomrevoke;
      yield call(service, params);
    },

    *bomOpration({ payload, callback }, { call, put }) {
      const { type, params } = payload;
      const service = 'bom' + rType[type];

      const response = yield call(servicesConfig[service], params);

      if (type === 1) {
        const list = response.head && response.head.rtnCode === '000000' ? response.body : initData;
        const { records } = list;
        const arr =
          records && records.length > 0
            ? records.map(item => ({
                ...item,
                key: item.bName,
                value: item.id,
              }))
            : [];
        yield put({
          type: 'changeState',
          payload: { data: arr, typeName: 'boomList' },
        });
        callback && arr && callback(arr);
      } else {
        callback && callback();
      }
    },

    *getDropdownList({ payload, callback }, { call, put }) {
      const { params, name, key1, value1 } = payload;
      const response = yield call(servicesConfig[name], params);
      const key = key1 ? key1 : 'zhName';
      const value = value1 ? value1 : 'id';
      console.log(key1, value1, '=========');

      let list =
        response.head && response.head.rtnCode === '000000' ? response.body.records : initData;
      list = list.map(item => ({
        ...item,
        key: item[key],
        value: item[value],
      }));
      console.log(list, name);
      yield put({
        type: 'changeState',
        payload: { data: list, typeName: name },
      });
      if (callback) callback(list.records[0]);
    },

    // 原料列表接口
    *getMaterialList({ payload, callback }, { call, put }) {
      const { params } = payload;
      const response = yield call(materialList, params);
      const list = response.head && response.head.rtnCode === '000000' ? response.body : initData;
      yield put({
        type: 'changeState',
        payload: { data: list, typeName: 'materialList' },
      });
      if (callback) callback(list.records[0]);
    },

    *getListSecond({ payload, callback }, { call, put, select }) {
      const { type, params } = payload;
      const response = yield call(servicesConfig[`list${type}`], params);
      const listSecond =
        response.head && response.head.rtnCode === '000000' ? response.body : initData;
      yield put({
        type: 'changeState',
        payload: { data: listSecond, typeName: 'listSecond' },
      });
      yield put({
        type: 'changeState',
        payload: {
          data: { size: response.body.size, current: response.body.current },
          typeName: 'paginationSecond',
        },
      });
      const choosenRowDataSecond = yield select(
        state => state[defaultModelName].choosenRowDataSecond
      );

      const selectRow =
        listSecond.records && listSecond.records.filter(e => e.id === choosenRowDataSecond.id);
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
    *clearListSecond(_, { put }) {
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
    *clearDetailSecond(_, { put }) {
      yield put({
        type: 'changeState',
        payload: { data: { id: '' }, typeName: 'choosenRowDataSecond' },
      });
      yield put({
        type: 'changeState',
        payload: { data: [], typeName: 'selectedRowKeysSecond' },
      });
    },

    *changeSearchParams({ payload }, { put }) {
      yield put({
        type: 'changeSearchParams2',
        payload,
      });
    },

    *changeSearchParamsSecond({ payload }, { put }) {
      yield put({
        type: 'changeSearchParamsSecond2',
        payload,
      });
    },

    *setChoosenRowData({ payload }, { put }) {
      yield put({
        type: 'getChoosenRowData2',
        payload,
      });
    },
    *setChoosenRowDataSecond({ payload }, { put }) {
      yield put({
        type: 'getchoosenRowDataSecond2',
        payload,
      });
    },

    *changeSelectedRowKeys({ payload }, { put }) {
      yield put({
        type: 'changeSelectedRowKeys2',
        payload,
      });
    },
    *changeSelectedRowKeysSecond({ payload }, { put }) {
      yield put({
        type: 'changeSelectedRowKeysSecond2',
        payload,
      });
    },

    // 下拉获取

    *getlistDieSetSubDropDown({ payload }, { call, put }) {
      const response = yield call(listDieSetSubDropDown, payload.params);
      const wordbookData = response.body.records;
      const wordbookdropdown = wordbookData.map(({ productNo }) => {
        return { value: productNo, key: productNo };
      });
      yield put({
        type: 'changeState',
        payload: { data: wordbookdropdown, typeName: payload.listName },
      });
    },
    *getTypeByWordbookCode({ payload }, { call, put }) {
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

    *getlistMoldPositioningSettingsDropDown({ payload }, { call, put }) {
      const response = yield call(listMoldPositioningSettingsDropDown, payload);
      const wordbookData = response.body.records;
      const wordbookdropdown = wordbookData.map(({ id, positionCode }) => {
        return { value: id, key: positionCode };
      });
      yield put({
        type: 'changeState',
        payload: { data: wordbookdropdown, typeName: 'listMoldPositioningSettingsDropDown' },
      });
    },

    *getlistBasicColourSetDropDown({ payload }, { call, put }) {
      const response = yield call(listBasicColourSetDropDown, payload);
      const wordbookData = response.body.records;
      const wordbookdropdown = wordbookData.map(({ id, zhName }) => {
        return { value: id, key: zhName };
      });
      yield put({
        type: 'changeState',
        payload: { data: wordbookdropdown, typeName: 'listBasicColourSetDropDown' },
      });
    },
    *getlistFilmSettings({ payload }, { call, put }) {
      const response = yield call(listFilmSettingsDropDown, payload);
      const wordbookData = response.body.records;
      const wordbookdropdown = wordbookData.map(({ id, code }) => {
        return { value: id, key: code };
      });
      yield put({
        type: 'changeState',
        payload: { data: wordbookdropdown, typeName: 'listFilmSettings' },
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
        selectedRowKeys: [...action.payload],
      };
    },
    changeSelectedRowKeysSecond2(state, action) {
      return {
        ...state,
        selectedRowKeysSecond: [...action.payload],
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
