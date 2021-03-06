/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-16 23:48:54
 * @LastEditTime: 2019-08-17 15:15:50
 * @LastEditors: Please set LastEditors
 */
import servicesConfig from '@/services/dev';

const initData = { records: [] };

const { getDevDropDown, addBasicMeasureUnit, listBasicColourSetDropDown,getlistBrands, listGemSetProcessDropDown, listMstWordbook,getTypeByWordbookCode } = servicesConfig;
export default {
  namespace: 'dev',


  state: {
    measureUnitList: initData,
    dropDownList: [],
    pagination: {
      current: 1,
      size: 10,
    },
    initpagination: {
      current: 1,
      size: 10,
    },
    selectKey: 'measureUnit',
    colorSettingList: initData,
    selectedRowKeys: [], // table select
    choosenRowData: { id: '', zhName: '', enName: '', unitCode: '' }, // select to show
    colorPercentageList: initData,
    categorySetList: initData,
    electroplateSettingList: initData,
    shapeSettingList: initData,
    specificationSettingList: initData,
    materialsGradeList: initData,
    stoneCutterList: initData,
    insertStoneTechnologyList: initData,
    rubberMouldSettingList: initData,
    mouldPositionList: initData,

    gemSetProcessDropDown: [],
    listMstWordbookDrop: [],
    gemSetProcessDropDownh015: [],
    gemSetProcessDropDownh016: [],
    listBasicColourSetDropDown: [],
    listbrand: [],
    listH016009: [],



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
      const response = yield call(getDevDropDown, payload);
      // 存储数据
      yield put({
        type: 'getData',
        payload: response,
      });
    },

    * getTypeByWordbookCode({ payload }, { call, put }) {
      const response = yield call(getTypeByWordbookCode, payload.params);
      const wordbookData = response.body.records;
      const wordbookdropdown = wordbookData.map((item) => {
        return {...item, value: item.id, key: item.zhName };
      });
      yield put({
        type: 'changeState',
        payload: { data: wordbookdropdown, typeName: payload.listName },
      });

    },
    * getlistbrand({ payload }, { call, put }) {
      const response = yield call(getlistBrands, payload.params);
      const wordbookData = response.body.records;
      const wordbookdropdown = wordbookData.map((item) => {
        return {...item, value: item.id, key: item.brandEnName };
      });
      yield put({
        type: 'changeState',
        payload: { data: wordbookdropdown, typeName: payload.listName },
      });

    },
    * getList({ payload, callback }, { call, put }) {
      const { type, params } = payload;
      const response = yield call(servicesConfig[`listBasic${type}`], params);
      yield put({
        type: 'getDevList2',
        payload: { response, type },
      });

      yield put({
        type: 'getPagination2',
        payload: {
          total: response.body.total,
          current: response.body.current,
        },
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
    * getlistBasicColourSetDropDown({ payload }, { call, put }) {
      const response = yield call(listBasicColourSetDropDown, payload);
      yield put({
        type: 'getlistBasicColourSetDropDown2',
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
    * getListMstWordbookParams({ payload }, { call, put }) {
      const response = yield call(listMstWordbook, payload);
      if (payload.wordbookTypeCode === 'H015') {
        yield put({
          type: 'getListMstWordbook3',
          payload: response,
        });
      } else if (payload.wordbookTypeCode === 'H016') {
        yield put({
          type: 'getListMstWordbook4',
          payload: response,
        });
      } else if (payload.wordbookTypeCode === 'H013') {
        yield put({
          type: 'getListMstWordbook5',
          payload: response,
        });
      }
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

    getData(state, action) {
      const list =
        action.payload && action.payload.head && action.payload.head.rtnCode === '000000'
          ? action.payload.body
          : initData;
      return {
        ...state,
        list,
      };
    },
    getDevList2(state, action) {
      const { type, response } = action.payload;
      const listName = `${type}List`;
      const listData =
        response && response.head && response.head.rtnCode === '000000'
          ? response.body
          : initData;
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
    getColorPercentage2(state, action) {
      const colorPercentageList =
        action.payload && action.payload.head && action.payload.head.rtnCode === '000000'
          ? action.payload.body
          : initData;
      console.log(colorPercentageList);
      return {
        ...state,
        colorPercentageList,
      };
    },

    // 分类
    getCategorySetList2(state, action) {
      const categorySetList =
        action.payload && action.payload.head && action.payload.head.rtnCode === '000000'
          ? action.payload.body
          : initData;
      console.log(categorySetList);
      return {
        ...state,
        categorySetList,
      };
    },

    // 颜色
    getcolorSettingList2(state, action) {
      const colorSettingList =
        action.payload && action.payload.head && action.payload.head.rtnCode === '000000'
          ? action.payload.body
          : initData;
      return {
        ...state,
        colorSettingList,
      };
    },

    // 电镀
    getelectroplateSettingList2(state, action) {
      const electroplateSettingList =
        action.payload && action.payload.head && action.payload.head.rtnCode === '000000'
          ? action.payload.body
          : initData;
      return {
        ...state,
        electroplateSettingList,
      };
    },

    // 形状
    getshapeSettingList2(state, action) {
      const shapeSettingList =
        action.payload && action.payload.head && action.payload.head.rtnCode === '000000'
          ? action.payload.body
          : initData;
      return {
        ...state,
        shapeSettingList,
      };
    },

    // 规格
    getspecificationSettingList2(state, action) {
      const specificationSettingList =
        action.payload && action.payload.head && action.payload.head.rtnCode === '000000'
          ? action.payload.body
          : initData;
      return {
        ...state,
        specificationSettingList,
      };
    },
    // 规格
    getmaterialsGradeList2(state, action) {
      const materialsGradeList =
        action.payload && action.payload.head && action.payload.head.rtnCode === '000000'
          ? action.payload.body
          : initData;
      return {
        ...state,
        materialsGradeList,
      };
    },

    // 规格
    getstoneCutterList2(state, action) {
      const stoneCutterList =
        action.payload && action.payload.head && action.payload.head.rtnCode === '000000'
          ? action.payload.body
          : initData;
      return {
        ...state,
        stoneCutterList,
      };
    },

    // 规格
    getinsertStoneTechnologyList2(state, action) {
      const insertStoneTechnologyList =
        action.payload && action.payload.head && action.payload.head.rtnCode === '000000'
          ? action.payload.body
          : initData;
      return {
        ...state,
        insertStoneTechnologyList,
      };
    },

    // 规格
    getrubberMouldSettingList2(state, action) {
      const rubberMouldSettingList =
        action.payload && action.payload.head && action.payload.head.rtnCode === '000000'
          ? action.payload.body
          : initData;
      return {
        ...state,
        rubberMouldSettingList,
      };
    },

    // 规格
    getmouldPositionList2(state, action) {
      const mouldPositionList =
        action.payload && action.payload.head && action.payload.head.rtnCode === '000000'
          ? action.payload.body
          : initData;
      return {
        ...state,
        mouldPositionList,
      };
    },
    getGemDropDown2(state, action) {
      let gemSetProcessDropDown =
        action.payload && action.payload.head && action.payload.head.rtnCode === '000000'
          ? action.payload.body.records
          : [];
      if (gemSetProcessDropDown.length > 0) {
        gemSetProcessDropDown = gemSetProcessDropDown.map(({ zhName, id }) => {
          return { key: zhName, value: id };
        });
      }
      return {
        ...state,
        gemSetProcessDropDown,
      };
    },
    getlistBasicColourSetDropDown2(state, action) {
      let list =
        action.payload && action.payload.head && action.payload.head.rtnCode === '000000'
          ? action.payload.body.records
          : [];
      if (list.length > 0) {
        list = list.map(({ zhName, id }) => {
          return { key: zhName, value: id };
        });
      }
      return {
        ...state,
        listBasicColourSetDropDown: list,
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
    getListMstWordbook3(state, action) {
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
        listMstWordbookDroph015: listMstWordbookDrop,
      };
    },
    getListMstWordbook4(state, action) {
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
        listMstWordbookDroph016: listMstWordbookDrop,
      };
    },
    getListMstWordbook5(state, action) {
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
        listMstWordbookDroph013: listMstWordbookDrop,
      };
    },
  },

};
