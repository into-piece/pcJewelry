import request from '@/utils/request';
import HttpFetch, { priefx } from '../utils/HttpFetch';


export async function login(params) {

  return request(priefx + '/userCtrl/doLogin', {
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
