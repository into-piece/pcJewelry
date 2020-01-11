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
  productBomRevokeListApi,
  processList,
  listBasicSpecificationSettingsDropDown,
  bomSynchronize,
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
      size: 6,
    },
    paginationSecond: {
      current: 1,
      size: 100,
    },
    proccessPagination:{
      current: 1,
      size: 100,
    },
    materialNoPagination:{
      current: 1,
      size: 10,
    },
    productBomRevokePagination:{
      current: 1,
      size: 5,
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
    bomlist: [],
    listMstWordbook: [], // 原料类别下拉
    listFilmSettingsDropDown: [], // 模具号
    listGemSetProcessDropDown: [], // 镶石工艺下拉
    listBasicSpecificationSettingsDropDown: [], // 规格下拉
    materialList: initData,
    processList: initData,
    choosenProccessData:{id:''},
    selectedProccessRowKeys:[],
    materialNoList:[],
    materialNoChoosenRowData:{id:''},
    materialSelectedKeys:[],

    sysProductSelectedBom:[],
    productBomRevokeList:[],
    productBomRevokeChoosenRowData:{id:''},
    productBomRevokeSelectedKeys:[],
  },

  effects: {
    *batchUpdatedispatch({ payload ,callback}, { put }) {
      yield put({
        type: 'batchUpdateState',
        payload,
      });
      if (callback) callback();
    },

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
      yield put({
        type: 'changeState',
        payload: { data: { size: response.body.size, current: response.body.current }, typeName: 'pagination' },
      });
      // const choosenRowData = yield select(state => state[defaultModelName].choosenRowData);
      // const selectRow = list.records && list.records.filter(e => e.id === choosenRowData.id);
      // if (selectRow && selectRow.length > 0) {
      //   yield put({
      //     type: 'changeState',
      //     payload: { data: selectRow[0], typeName: 'choosenRowData' },
      //   });
      // } else {
      //   yield put({
      //     type: 'changeState',
      //     payload: { data: { id: '' }, typeName: 'choosenRowData' },
      //   });
      // }
      if (callback) callback(list.records[0]);
    },

    *isVerifyBom({ payload }, { call }) {
      const { params, type } = payload;
      const service = type === 1 ? bomapprove : boomrevoke;
      yield call(service, params);
    },

    *commonOpration({ payload, callback }, { call, put }) {
      const { type, params,name ,listName} = payload;
      const service = name+rType[type];
      const response = yield call(servicesConfig[service], params);
      if (type === 1) {
        console.log(payload,response);
        const list = response.head && response.head.rtnCode === '000000' ? response.body : initData;
        yield put({
          type: 'changeState',
          payload: { data: list, typeName: listName },
        });
        yield put({
          type: 'changeState',
          payload: { data: { size: response.body.size, current: response.body.current }, typeName: 'proccessPagination' },
        });
        callback && arr && callback(arr);
      } else {
        callback && callback();
      }
    },

    *getDropdownList({ payload, callback }, { call, put }) {
      const { params, name, key1, value1 } = payload;
      const response = yield call(servicesConfig[name], params || {});
      const key = key1 || 'zhName';
      const value = value1 || 'id';

      let list =
        response.head && response.head.rtnCode === '000000' ? response.body.records : initData;
      list = list.map(item => ({
        ...item,
        key: item[key],
        value: item[value],
      }));

      // 计量单位和重量单位 都是由basicmeasuer list来的
      if(name === 'listBasicMeasureUnitDropDown'){
        const list1 = list.map(item => ({
          ...item,
          key: item[key],
          value: item[value],
        }));
        yield put({
          type: 'changeState',
          payload: { data: list1, typeName: 'weightUnitList'},
        });
        const list2 = list.map(item => ({
          ...item,
          key: item[key],
          value: item[value],
        }));
        yield put({
          type: 'changeState',
          payload: { data: list2, typeName: 'countist' },
        });
        return
      }
      // 排除出不要的原料分类
      if(name === 'listMstWordbook'){
        const filterArr = ['H016001','H016002','H016003','H016004','H016005']
        list = list.filter(item=>filterArr.includes(item.value))
      }

      yield put({
        type: 'changeState',
        payload: { data: list, typeName: name },
      });
      if (callback) callback(list[0]);
    },

    *clearmaterialNoList( {payload}, { put }) {
      yield put({
        type: 'changeState',
        payload: { data: [], typeName: 'materialNoList' },
      });
    },

    *productBomRevokeList({ payload, callback }, { call, put }) {
      const { params, name } = payload;
      const response = yield call(productBomRevokeListApi,params);

      const list =
        response.head && response.head.rtnCode === '000000' ? response.body : initData;
      yield put({
        type: 'changeState',
        payload: { data: list, typeName: name },
      });
      if (callback) callback(list.records[0]);
    },

    *materialNoList({ payload, callback }, { call, put }) {
      const { params, name, materialType,listdata } = payload;
      const arr = {
        H016002: 'listStoneDropDown', // 石材
        H016001: 'listPrincipalMaterialDropDown', // 主材
        H016003: 'listAccessoriesDropDown', // 配件
        H016004: 'listWrapperDropDown', // 包装
        H016005: 'listAuxiliaryMaterialDropDown', // 辅材
      };
      const services = servicesConfig[arr[materialType]];
      const response = yield call(services, params);

      const list =
        response.head && response.head.rtnCode === '000000' ? response.body : initData;
      yield put({
        type: 'changeState',
        payload: { data: listdata||list, typeName: name },
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
      yield put({
        type: 'changeState',
        payload: { data: { size: response.body.size, current: response.body.current }, typeName: 'paginationSecond' },
      });
      if (callback) callback(list.records[0]);
    },

    // 原料列表接口
    *getProccessList({ payload, callback }, { call, put }) {
      const { params } = payload;
      const response = yield call(processList, params);
      const list = response.head && response.head.rtnCode === '000000' ? response.body : initData;
      yield put({
        type: 'changeState',
        payload: { data: list, typeName: 'processList' },
      });
      if (callback) callback(list.records[0]);
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

    *clearProccess(_, { put }) {
      yield put({
        type: 'changeState',
        payload: { data: { id: '' }, typeName: 'choosenProccessData' },
      });
      yield put({
        type: 'changeState',
        payload: { data: [], typeName: 'selectedProccessRowKeys' },
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

    *setChooseData({ payload }, { put }) {
      const { name,list } = payload;
      yield put({
        type: 'changeState',
        payload: { data: list, typeName: name },
      });
    },

    *changeStateOut({ payload }, { put }) {
      const {name,data} = payload
      yield put({
        type: 'changeState',
        payload: { data, typeName: name },
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
    batchUpdateState(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },

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
