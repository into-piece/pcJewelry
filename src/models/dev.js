/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-16 23:48:54
 * @LastEditTime: 2019-08-17 15:15:50
 * @LastEditors: Please set LastEditors
 */
import servicesConfig from '@/services/dev';

const initData = { records: [] }

const { getDevDropDown, addBasicMeasureUnit, listGemSetProcessDropDown, listMstWordbook } = servicesConfig
export default {
  namespace: 'dev',


  state: {
    measureUnitList: initData,
    dropDownList: [],
    pagination: {
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
    listMstWordbookDrop: []
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
      const response = yield call(getDevDropDown, payload);
      yield put({
        type: 'getData',
        payload: response,
      });
    },
    * getList({ payload }, { call, put }) {
      const { type, params } = payload
      console.log(servicesConfig)
      console.log(type, params, servicesConfig[`listBasic${type}`])
      const response = yield call(servicesConfig[`listBasic${type}`], params);
      yield put({
        type: 'getDevList2',
        payload: { response, type },
      });
    },
    *addMeasureUnit({ payload }, { call, put }) {
      const response = yield call(addBasicMeasureUnit, payload);
      yield put({
        type: 'addMeasureUnit2',
        payload: response,
      });
    },
    *getGemDropDown({ payload }, { call, put }) {
      const response = yield call(listGemSetProcessDropDown, payload);
      yield put({
        type: 'getGemDropDown2',
        payload: response,
      });
    },
    *getListMstWordbook({ payload }, { call, put }) {
      const response = yield call(listMstWordbook, payload);
      yield put({
        type: 'getListMstWordbook2',
        payload: response,
      });
    },
  },

  reducers: {
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
      console.log(action.payload)
      const { type, response } = action.payload
      const listName = `${type}List`
      const listData =
        response && response.head && response.head.rtnCode === '000000'
          ? response.body
          : initData;
      console.log(listData);
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
      console.log(colorPercentageList)
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
      console.log(categorySetList)
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
    getListMstWordbook2(state, action) {
      let listMstWordbookDrop =
        action.payload && action.payload.head && action.payload.head.rtnCode === '000000'
          ? action.payload.body.records
          : initData;
      if (listMstWordbookDrop.length > 0) {
        listMstWordbookDrop = listMstWordbookDrop.map(({ wordbookCode, wordbookContentZh }) => {
          return { key: wordbookContentZh, value: wordbookCode }
        })
      }

      return {
        ...state,
        listMstWordbookDrop,
      };
    },
  },

};
