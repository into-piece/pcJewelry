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
  addBasicMeasureUnit,
  listGemSetProcessDropDown,
  listBasicShapeSettingsDropDown,
  listBasicSpecificationSettingsDropDown,
  listBasicMeasureUnitDropDown,
  listMstWordbook } = servicesConfig;
export default {
  namespace: 'devRaw',


  state: {
    dropDownList: [],
    gemSetProcessDropDown: [],
    getBUMropDown: [],
    listMstWordbookDrop: [],
    shapeSettingList:[],
    specificationSettingList:[],
    pagination: {
      current: 1,
      size: 10,
    },
    searchParams:{},

    selectKey: 'material',
    colorSettingList: initData,
    selectedRowKeys: [], // table select
    choosenRowData: { id: '', zhName: '', enName: '', unitCode: '' }, // select to show

    materialList: initData,
    accessoriesList:initData,


    paginationTypes: {
      current: 1,
      size: 10,
    },

  },

  effects: {
    // table
    * getPagination({ payload }, { put }) {
      yield put({
        type: 'getPagination2',
        payload,
      });
    },
    * getSelectKey({ payload }, { put }) {
      yield put({
        type: 'getSelectKey2',
        payload,
      });
    },
    * getChoosenRowData({ payload }, { put }) {
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
    // 计量单位
    * getUnitDropDown({ payload }, { call, put }) {
      // 请求数据接口  getDevDropDown接口方法   payload请求参数
      const response = yield call(listBasicMeasureUnitDropDown, payload);
      // 存储数据
      yield put({
        type: 'getData',
        payload: response,
      });
    },
    * getList({ payload, callback }, { call, put }) {
      const { type, params } = payload;
      // console.log(servicesConfig)
      // console.log(type, params, servicesConfig[`listBasic${type}`])
      const response = yield call(servicesConfig[`listBasic${type}`], params);
      yield put({
        type: 'getDevList2',
        payload: { response, type },
      });
      if (callback) callback();
    },
    * addMeasureUnit({ payload }, { call, put }) {
      const response = yield call(addBasicMeasureUnit, payload);
      yield put({
        type: 'addMeasureUnit2',
        payload: response,
      });
    },
    * getGemDropDown({ payload }, { call, put }) {
      const response = yield call(listGemSetProcessDropDown, payload);
      yield put({
        type: 'getGemDropDown2',
        payload: response,
      });
    },
    // 重量单位 计量单位下拉
    * getBUMDropDown({ payload }, { call, put }) {
      const response = yield call(listBasicMeasureUnitDropDown, payload);
      yield put({
        type: 'getBUMropDownre',
        payload: response,
      });
    },
    // 形状下拉
    * getShapeDropDown({ payload }, { call, put }) {
      const response = yield call(listBasicShapeSettingsDropDown, payload);
      yield put({
        type: 'getshapeSettingList2',
        payload: response,
      });
    },
    // 规格下拉
    * getSpecificationDropDown({ payload }, { call, put }) {
      const response = yield call(listBasicSpecificationSettingsDropDown, payload);
      yield put({
        type: 'getspecificationSettingList2',
        payload: response,
      });
    },
    * getListMstWordbook({ payload }, { call, put }) {
      const response = yield call(listMstWordbook, payload);
      yield put({
        type: 'getListMstWordbook2',
        payload: response,
      });
    },
  },

  reducers: {
    setSearchParams(state,action){
      return {
        ...state,
        searchParams:action.payload
      }
    },
    getData(state, action) {
      const list =
        action.payload && action.payload.head && action.payload.head.rtnCode === '000000'
          ? action.payload.body
          : initData;
      return {
        ...state,
        listBasicMeasureUnitDropDown:list,
      };
    },
    getDevList2(state, action) {
      // console.log(action.payload)
      const { type, response } = action.payload;
      const listName = `${type}List`;
      const listData =
        response && response.head && response.head.rtnCode === '000000'
          ? response.body
          : initData;
      // console.log(listData);
      return {
        ...state,
        [listName]: listData,
      };
    },

    // table
    getPagination2(state, action) {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          ...action.payload,
        },
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

    getSelectKey2(state, action) {
      return {
        ...state,
        selectKey: action.payload,
      };
    },

    getChoosenRowData2(state, action) {
      return {
        ...state,
        choosenRowData: action.payload,
      };
    },
    // 成色
    getGemDropDown2(state, action) {
      let gemSetProcessDropDown =
        action.payload && action.payload.head && action.payload.head.rtnCode === '000000'
          ? action.payload.body.records
          : initData;
      if (gemSetProcessDropDown.length > 0) {
        gemSetProcessDropDown = gemSetProcessDropDown.map(({ zhName, id }) => {
          return { key: zhName, value: id }
        })
      }
      return {
        ...state,
        gemSetProcessDropDown,
      };
    },

     // 形状
    getshapeSettingList2(state, action) {
      let shapeSettingList =
        action.payload && action.payload.head && action.payload.head.rtnCode === '000000'
          ? action.payload.body.records
          : initData;
      if (shapeSettingList.length > 0) {
        shapeSettingList = shapeSettingList.map(({ zhName, id }) => {
          return { key: zhName, value: id };
        });
      }
      return {
        ...state,
        shapeSettingList,
      };
    },

    // 规格
    getspecificationSettingList2(state, action) {
      let list =
        action.payload && action.payload.head && action.payload.head.rtnCode === '000000'
          ? action.payload.body.records
          : initData;
      if (list.length > 0) {
        list = list.map(({ zhName, id }) => {
          return { key: zhName, value: id };
        });
      }
      return {
        ...state,
        specificationSettingList:list,
      };
    },
    // 重量 计量单位
    getBUMropDownre(state, action) {
      let getBUMropDown =
        action.payload && action.payload.head && action.payload.head.rtnCode === '000000'
          ? action.payload.body.records
          : initData;
      if (getBUMropDown.length > 0) {
        getBUMropDown = getBUMropDown.map(({ zhName, id }) => {
          return { key: zhName, value: id };
        });
      }
      return {
        ...state,
        getBUMropDown,
      };
    },
    getListMstWordbook2(state, action) {
      let listMstWordbookDrop =
        action.payload && action.payload.head && action.payload.head.rtnCode === '000000'
          ? action.payload.body.records
          : initData;
      if (listMstWordbookDrop.length > 0) {
        listMstWordbookDrop = listMstWordbookDrop.map(({ wordbookCode, wordbookContentZh }) => {
          return { key: wordbookContentZh, value: wordbookCode };
        });
      }

      return {
        ...state,
        listMstWordbookDrop,
      };
    },
  },

};
