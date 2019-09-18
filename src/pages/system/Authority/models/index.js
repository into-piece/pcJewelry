import {
  querylistPermissionUser,
  queryUserPermission,
  queryPermissionTree,
  updateThePermission,
  disableThePermission,
  enableThePermission,
} from '@/services/api';

export default {
  namespace: 'permission',

  state: {
    province: [],
    city: [],
    head: [],
    isLoading: false,
    treeData:[],
    permissionData:[]
  },

  effects: {
    *fetchListPermissionUser({ payload, callback }, { call, put }) {
      const response = yield call(querylistPermissionUser, payload);
      yield put({
        type: 'list',
        payload: response,
      });
      if (callback) callback();
    },
    *fetchUserPermission({ payload, callback }, { call, put }) {
      const response = yield call(queryUserPermission, payload);
      yield put({
        type: 'userpermission',
        payload: response,
      });
      if (callback) callback();
    },

    *updatePermission({ payload, callback }, { call, put }) {
      const response = yield call(updateThePermission, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    *fetchPermissionTree({ payload, callback }, { call, put }) {
      const response = yield call(queryPermissionTree, payload);
      yield put({
        type: 'treedata',
        payload: response,
      });
      if (callback) callback();
    },

    *disableThePermission({ payload, callback }, { call, put }) {
      const response = yield call(disableThePermission, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    *enableThePermission({ payload, callback }, { call, put }) {
      const response = yield call(enableThePermission, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    list(state, action) {
      return {
        ...state,
        head: action.payload,
        // rtnCode:action.payload.head.rtnCode,
        body: {
          ...state.body,
          records: action.payload.body.records,
          rtnCode: action.payload.head.rtnCode,
          rtnMsg: action.payload.head.rtnMsg,
          size: action.payload.body.size,
          total: action.payload.body.total,
        },
      };
    },


    userpermission(state, action){
      return {
        ...state,
        head: action.payload,
        permissionData:action.payload.permissionData
      };

    },
    treedata(state, action){
      return {
        ...state,
        head: action.payload,
        treeData:action.payload.body.records
      };

    },
    save(state, action) {
      return {
        ...state,
        result: action.payload,
        body: {
          ...state.body,
          rtnCode: action.payload.head.rtnCode,
          rtnMsg: action.payload.head.rtnMsg,
        },
      };
    },
  },
};
