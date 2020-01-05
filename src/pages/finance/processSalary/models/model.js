/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-16 23:48:54
 * @LastEditTime: 2019-08-17 15:15:50
 * @LastEditors: Please set LastEditors
 */
import servicesConfig from '@/services/finance';

const initData = { records: [] };

const {
  listProductionFlowDropDown ,

} = servicesConfig;
const defaultModelName = 'processSalary';


export default {
  namespace: defaultModelName,

  state: {

    choosenRowData: { id: '' }, // select to show table 1

    pagination: {
      current: 1,
      size: 10,
    },

    selectedRowKeys: [], // table1 select
    list: initData,

    searchParams: {},

    statusList: [{key:"不限",value:undefined},{key:"输入",value:0},{key:"已审批",value:2}],
    listProductionFlowDropDown: [{ key: '', value: '' }],
    H016003: [{ key: '', value: '' }],

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

    * changeSearchParams({ payload }, { put }) {
      yield put({
        type: 'changeSearchParams2',
        payload,
      });
    },


    * setChoosenRowData({ payload }, { put }) {
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
    // 下拉获取

    * getListProductionFlowDropDown({ payload }, { call, put }) {
      const response = yield call(listProductionFlowDropDown,payload);
      const wordbookData = response.body.records;
      const wordbookdropdown = wordbookData.map((item) => {
        return { ...item,value: item.flowCode, key: item.flowCode  };
      });
      yield put({
        type: 'changeState',
        payload: { data: wordbookdropdown, typeName:"listProductionFlowDropDown" },
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
  },
};
