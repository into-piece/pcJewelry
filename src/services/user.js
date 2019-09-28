import request from '@/utils/request';
import HttpFetch, { priefx } from '../utils/HttpFetch';
import { getCurrentUser } from '../utils/authority';


export async function getMenuData(params) {
  // return request('/basic/ring-around/freeze', {
  return request(`${priefx  }/sys.user/sys-resource/getMenuTree`, {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...params,
    },
  });
}

export async function checkLogin(params) {

  return request(`${priefx  }/checkLogin`, {
    method: 'POST',
    data: {
      ...params,
    },
  });

}

export async function login(params) {

  return request(`${priefx  }/userCtrl/doLogin`, {
    method: 'POST',
    data: {
      ...params,
    },
  });

}

export async function query() {
  return request('queryRule/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}
