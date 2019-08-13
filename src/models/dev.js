import { getDevDropDown, listBasicMeasureUnit, listBasicColourSet } from '@/services/dev';

export default {
  namespace: 'dev',

  state: {
    measureUnitList: [],
    dropDownList: [],
    pagination: {
      current: 1,
      size: 10,
    },
    selectKey: 'measureUnit',
    colorSettingList: [],
    selectedRowKeys: [], // table select
    choosenRowData: { id: '', zhName: '', enName: '', unitCode: '' }, // select to show
  },

  effects: {

    // table
    *getPagination({ payload }, { put }) {
      yield put({
        type: 'getPagination2',
        payload,
      });
    },
    *getSelectKey({ payload }, { put }) {
      yield put({
        type: 'getSelectKey2',
        payload,
      });
    },
    *getChoosenRowData({ payload }, { put }) {
      yield put({
        type: 'getChoosenRowData2',
        payload,
      });
    },
    *changeSelectedRowKeys({ payload }, { put }) {
      yield put({
        type: 'changeSelectedRowKeys2',
        payload,
      });
    },



    // 计量单位
    *getUnitDropDown({ payload }, { call, put }) {
      const response = yield call(getDevDropDown, payload);
      yield put({
        type: 'getData',
        payload: response,
      });
    },
    *getMeasureUnit({ payload }, { call, put }) {
      const response = yield call(listBasicMeasureUnit, payload);
      yield put({
        type: 'getDevList2',
        payload: response,
      });
    },
    // *addMeasureUnit({ payload }, { call, put }) {
    //   const response = yield call(addBasicMeasureUnit, payload);
    //   yield put({
    //     type: 'addMeasureUnit2',
    //     payload: response,
    //   });
    // },

    // 成色设定
    *getColorSetList({ payload }, { call, put }) {
      const response = yield call(listBasicColourSet, payload);
      yield put({
        type: 'getColorSetList2',
        payload: response,
      });
    },

    // *getColorSetList({ payload }, { call, put }) {
    //   const response = yield call(listBasicColourSet, payload);
    //   yield put({
    //     type: 'getColorSetList2',
    //     payload: response,
    //   });
    // },

  },

  reducers: {
    getData(state, action) {
      const list =
        action.payload && action.payload.head && action.payload.head.rtnCode === '000000'
          ? action.payload.body
          : [];
      return {
        ...state,
        list,
      };
    },
    getDevList2(state, action) {
      const measureUnitList =
        action.payload && action.payload.head && action.payload.head.rtnCode === '000000'
          ? action.payload.body
          : [];
      console.log(measureUnitList);
      return {
        ...state,
        measureUnitList,
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
    getColorSetList2(state, action) {
      const colorSettingList =
        action.payload && action.payload.head && action.payload.head.rtnCode === '000000'
          ? action.payload.body
          : [];
      return {
        ...state,
        colorSettingList,
      };
    },
    addMeasureUnit2(state, action) {
      const colorSettingList =
        action.payload && action.payload.head && action.payload.head.rtnCode === '000000'
          ? action.payload.body
          : [];
      return {
        ...state,
        colorSettingList,
      };
    },
  },
};
