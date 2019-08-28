/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-16 23:48:54
 * @LastEditTime: 2019-08-17 15:15:50
 * @LastEditors: Please set LastEditors
 */
import servicesConfig from '@/services/dev';

const initData = { records: [] }

const { listCustomerType } = servicesConfig
export default {
  namespace: 'quote',

  state: {
    listCustomerTypeData: initData,
    selectedRowKeys: [], // table select
    pagination: {
      current: 1,
      size: 10,
    },
    choosenRowData: { id: '', zhName: '', enName: '', unitCode: '' }, // select to show
  },

  effects: {
    * getList({ payload }, { call, put }) {
      const { type, params } = payload
      const response = yield call(listCustomerType, params);
      yield put({
        type: 'getData',
        payload: { response, type },
      });
    },
  },

  reducers: {
    getData(state, action) {
      const listCustomerTypeData =
        action.payload && action.payload.head && action.payload.head.rtnCode === '000000'
          ? action.payload.body
          : initData;
      return {
        ...state,
        listCustomerTypeData,
      };
    },
  },

};
