/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-16 23:48:54
 * @LastEditTime: 2019-08-17 15:15:50
 * @LastEditors: Please set LastEditors
 */
import servicesConfig from '@/services/dev';

const initData = { records: [] };
const initList =  [] ;

const {
  addBasicMeasureUnit,
  listGemSetProcessDropDown,
  listBasicColourSetDropDown,
  listBasicShapeSettingsDropDown,
  listBasicSpecificationSettingsDropDown,
  listBasicMeasureUnitDropDown,
  listMstWordbook,
  getTypeByWordbookCode,
  getCutDrop,
  getColorDrop,
  getQualityDrop,
} = servicesConfig;
export default {
  namespace: 'devRaw',


  state: {
    searchparamsTypes:{},
    searchparams:{
      status:0
    },


    dropDownList: [],
    gemSetProcessDropDown: [],
    listBasicColourSetDropDown: [],
    getBUMropDown: [],
    listMstWordbookDrop: [],
    listMstWordbookDroph015: [],
    listMstWordbookDroph016: [],
    listMstWordbookDroph013: [],
    H016001: [],
    H016002: [],
    H016003: [],
    H016004: [],
    H016005: [],

    listCutDrop:[],
    listColorDrop:[],
    listQualityDrop:[],


    statusList: [{key:"不限",value:undefined},{key:"输入",value:0},{key:"已审批",value:2}],
    shapeSettingList: [],
    specificationSettingList: [],
    pagination: {
      current: 1,
      size: 10,
    },

    selectKey: 'material',
    colorSettingList: [],
    selectedRowKeys: [], // table select
    choosenRowData: { id: '', zhName: '', enName: '', unitCode: '' }, // select to show

    choosenTypesRowData: { id: '', zhName: '', enName: '' }, // select to show
    paginationTypes: {
      current: 1,
      size: 10,
    },


    typesList: initData,

    materialList: initData,
    accessoriesList: initData,
    stoneList: initData,
    wrapperList: initData,
    auxiliaryMaterialList: initData,
    otherMaterialList: initData,


  },

  effects: {
    * setsearchparamsTypes({ payload }, {  put }) {
      yield put({
        type: 'setsearchparamsTypes2',
        payload,
      });
    },
    * setsearchparams({ payload }, {  put }) {
      yield put({
        type: 'setsearchparams2',
        payload,
      });
    },



    * getCutDrop({ payload }, { call, put }) {
      const response = yield call(getCutDrop, payload);
      yield put({
        type: 'getCutDrop2',
        payload: response,
      });
      },
    * getColorDrop({ payload }, { call, put }) {
      const response = yield call(getColorDrop, payload);
      yield put({
        type: 'getColorDrop2',
        payload: response,
      });
      },
    * getQualityDrop({ payload }, { call, put }) {
      const response = yield call(getQualityDrop, payload);
      yield put({
        type: 'getQualityDrop2',
        payload: response,
      });
      },
    * getTypeByWordbookCode({ payload }, { call, put }) {
      const response = yield call(getTypeByWordbookCode, payload);
      let list =
        response&& response.head && response.head.rtnCode === '000000'
          ? response.body.records
          : initData;
      if (list.length > 0) {
        list = list.map((item) => {
          return { ...item,key:item.zhName , value:item.id  };
        });
      }
      yield put({
        type: 'getTypeByWordbookCode2',
        payload: {list,fieldName:payload.key},
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
      }

    },
    // table
    * getPagination({ payload, callback }, { put }) {
      yield put({
        type: 'getPagination2',
        payload,
      });
      if (callback) callback();
    },
    * getTypesPagination({ payload, callback }, { put }) {
      yield put({
        type: 'getTypesPagination2',
        payload,
      });
      if (callback) callback();
    },
    * getSelectKey({ payload, callback }, { put }) {
      yield put({
        type: 'getSelectKey2',
        payload,
      });
      if (callback) callback();

    },
    * getChoosenTypeRowData({ payload, callback }, { put }) {
      yield put({
        type: 'getChoosenTypeRowData2',
        payload,
      });
      if (callback) callback();
    },
    * getChoosenRowData({ payload, callback }, { put }) {
      yield put({
        type: 'getChoosenRowData2',
        payload,
      });
      if (callback) callback();
    },
    * changeSelectedRowKeys({ payload }, { put,select }) {
      // debugger
      const choosenRowData = yield select(state => state.devRaw.choosenRowData);

      const selectRow = payload.filter(e => (e=== choosenRowData.id));

      yield put({
        type: 'getChoosenRowData2',
        payload:  selectRow[0]||{},
      });
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
    * getList({ payload, callback }, { call, put,select }) {
      const { type, params } = payload;
      const response = yield call(servicesConfig[`listBasic${type}`], params);
      yield put({
        type: 'getDevList2',
        payload: { response, type },
      });

      const choosenRowData = yield select(state => state.devRaw.choosenRowData);
      const selectedRowKeys = yield select(state => state.devRaw.selectedRowKeys);
      const selectRow = response.body.records.filter(e => (e.id=== choosenRowData.id));
      const selectkeys = response.body.records.filter(e => (selectedRowKeys.indexOf(e.id)>-1)).map(e=>e.id);

      yield put({
        type: 'getChoosenRowData2',
        payload:  selectRow[0]||{},
      });

      yield put({
        type: 'changeSelectedRowKeys2',
        payload:  selectkeys,
      });



      if (callback) callback();
    },
    * clearSixList({callback}, { put }) {
      yield put({
        type: 'clearSixListData',
        payload: {},
      });
      if(callback)callback();
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
    setsearchparamsTypes2(state, action) {
      return {
        ...state,
        searchparamsTypes: action.payload,
      };
    },
    setsearchparams2(state, action) {
      return {
        ...state,
        searchparams: action.payload,
      };
    },

    getListMstWordbook3(state, action) {
      let listMstWordbookDrop =
        action.payload && action.payload.head && action.payload.head.rtnCode === '000000'
          ? action.payload.body.records
          : initList;
      if (listMstWordbookDrop.length > 0) {
        listMstWordbookDrop = listMstWordbookDrop.map((item) => {
          return {...item, key: item.wordbookContentZh, value: item.wordbookCode };
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
          : initList;
      if (listMstWordbookDrop.length > 0) {
        listMstWordbookDrop = listMstWordbookDrop.map((item) => {
          return { ...item,key: item.wordbookContentZh, value: item.wordbookCode };
        });
      }
      return {
        ...state,
        listMstWordbookDroph016: listMstWordbookDrop,
      };
    },
    getTypeByWordbookCode2(state, action) {
      return {
        ...state,
      [action.payload.fieldName]: action.payload.list,
      };
    },
    getCutDrop2(state, action) {
      let list =
        action.payload && action.payload.head && action.payload.head.rtnCode === '000000'
          ? action.payload.body.records
          : initList;
      if (list.length > 0) {
        list = list.map((item) => {
          return { ...item,key:item.zhName , value:item.id  };
        });
      }
      return {
        ...state,
        listCutDrop: list,
      };
    },
    getColorDrop2(state, action) {
      let list =
        action.payload && action.payload.head && action.payload.head.rtnCode === '000000'
          ? action.payload.body.records
          : initList;
      if (list.length > 0) {
        list = list.map((item) => {
          return { ...item,key:item.zhName , value:item.id  };
        });
      }
      return {
        ...state,
        listColorDrop: list,
      };
    },
    getQualityDrop2(state, action) {
      let list =
        action.payload && action.payload.head && action.payload.head.rtnCode === '000000'
          ? action.payload.body.records
          : initList;
      if (list.length > 0) {
        list = list.map((item) => {
          return { ...item,key:item.zhName , value:item.id  };
        });
      }
      return {
        ...state,
        listQualityDrop: list,
      };
    },


    getData(state, action) {
      const list =
        action.payload && action.payload.head && action.payload.head.rtnCode === '000000'
          ? action.payload.body
          : initList;
      return {
        ...state,
        listBasicMeasureUnitDropDown: list,
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
          ...action.payload,
        },
      };
    },
    // table
    getTypesPagination2(state, action) {
      return {
        ...state,
        paginationTypes: {
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
    getChoosenTypeRowData2(state, action) {
      return {
        ...state,
        choosenTypesRowData: action.payload,
      };
    },
    // 镶石工艺
    getGemDropDown2(state, action) {
      let gemSetProcessDropDown =
        action.payload && action.payload.head && action.payload.head.rtnCode === '000000'
          ? action.payload.body.records
          : initList;
      if (gemSetProcessDropDown.length > 0) {
        gemSetProcessDropDown = gemSetProcessDropDown.map((item) => {
          return {...item , key: item.zhName, value: item.id };
        });
      }
      return {
        ...state,
        gemSetProcessDropDown,
      };
    },
    // 成色
    getlistBasicColourSetDropDown2(state, action) {
      let list =
        action.payload && action.payload.head && action.payload.head.rtnCode === '000000'
          ? action.payload.body.records
          : initList;
      if (list.length > 0) {
        list = list.map((item) => {
          return {...item , key: item.zhName, value: item.id };
        });
      }
      return {
        ...state,
        listBasicColourSetDropDown:list,
      };
    },

    // 形状
    getshapeSettingList2(state, action) {
      let shapeSettingList =
        action.payload && action.payload.head && action.payload.head.rtnCode === '000000'
          ? action.payload.body.records
          : initList;
      if (shapeSettingList.length > 0) {
        shapeSettingList = shapeSettingList.map((item) => {
          return { ...item ,key: item.zhName, value: item.id };
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
          : initList;
      if (list.length > 0) {
        list = list.map((item) => {
          return { ...item,key: item.zhName, value: item.id };
        });
      }
      return {
        ...state,
        specificationSettingList: list,
      };
    },
    // 重量 计量单位
    getBUMropDownre(state, action) {
      let getBUMropDown =
        action.payload && action.payload.head && action.payload.head.rtnCode === '000000'
          ? action.payload.body.records
          : initList;
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
    clearSixListData(state) {
      return {
        ...state,
        materialList: initData,
        accessoriesList: initData,
        stoneList: initData,
        wrapperList: initData,
        auxiliaryMaterialList: initData,
        otherMaterialList: initData,
        choosenRowData: { id: '', zhName: '', enName: '', unitCode: '' }, // select to show
        pagination: {
          current: 1,
          size: 10,
        },
        selectedRowKeys: [], // table select

      };
    },
    getListMstWordbook2(state, action) {
      let listMstWordbookDrop =
        action.payload && action.payload.head && action.payload.head.rtnCode === '000000'
          ? action.payload.body.records
          : initList;
      if (listMstWordbookDrop.length > 0) {
        listMstWordbookDrop = listMstWordbookDrop.map((item) => {
          return { ...item ,key:item.wordbookContentZh, value: item.wordbookCode};
        });
      }

      return {
        ...state,
        listMstWordbookDrop,
      };
    },
  },

};
