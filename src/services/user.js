import request from '@/utils/request';
import HttpFetch, { priefx } from '../utils/HttpFetch';
import { getCurrentUser } from '../utils/authority';
const env = process.env.NODE_ENV === 'production' ? '' : '/server';

const prefix1 = `${env}/`;
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

export async function queryUser() {
  return request(`${prefix1}listUsers`,{
    method: 'POST',
    data: {
      id: getCurrentUser().id,
    }
    });
}


export async function query() {
  return request('queryRule/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}

export async function saveUserInfo(params) {
  return request(`${prefix1}updateUserById`,{
    method: 'POST',
    data: {
     ...params
    }
  });
}
