import request from '@/utils/request';

export async function query() {
  return request('queryRule/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}
