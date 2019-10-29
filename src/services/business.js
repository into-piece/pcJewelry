/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-16 23:48:54
 * @LastEditTime: 2019-08-17 23:51:37
 * @LastEditors: Please set LastEditors
 */
import request from '@/utils/request';
import piUrls from './business/piUrls';
import { getCurrentUser } from '../utils/authority';

const env = process.env.NODE_ENV === 'production' ? '' : '/server';

const rType = {
  1: 'list',
  2: 'add',
  3: 'delete',
  4: 'approve',
  5: 'revoke',
  6: 'copy',
};

// 业务-PI 产品发票
const piUrlsList = piUrls.map(({ name, arr, path }) => (
  arr.map((item, index) => (
    {
      key: rType[index + 1] + name,
      path: `/${path}/${item}`,
      prefix:'/business/business/order'
    }
  ))
));

const resultArr = [
  ...piUrlsList.flat(),

];

// console.log(resultArr, '============')

// 请求url配置
const outPutObject = {};
resultArr.forEach(({ key, path, prefix }) => {
  outPutObject[key] = async (params) => {
    return request((prefix) + path, {
      method: 'POST',
      headers: {
        token: getCurrentUser() ? getCurrentUser().token : '',
      },
      data: params,
    });
  };
});
// console.log(outPutObject)

export default outPutObject;
