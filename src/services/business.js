/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-16 23:48:54
 * @LastEditTime: 2019-08-17 23:51:37
 * @LastEditors: Please set LastEditors
 */
import request from '@/utils/request';
import { piUrls, piDetailUrls } from './business/piUrls';
import { getCurrentUser } from '../utils/authority';

const env = process.env.NODE_ENV === 'production' ? '' : '/server';

const rType = {
  1: 'listnotdone',
  2: 'listalready',
  3: 'approve',
  4: 'revoke',
  5: 'merge',
  6: 'split',
};

const pidType = {
  1: 'list',
  2: 'update',
};

// 业务-PI 订单主页
const piUrlsList = piUrls.map(({ name, arr, path }) => (
  arr.map((item, index) => (
    {
      key: rType[index + 1] + name,
      path: `/${path}/${item}`,
      prefix: `${env}/business/business/order`
    }
  ))
));
// 业务-PI 产品详细
const piDetailUrlsList = piDetailUrls.map(({ name, arr, path }) => (
  arr.map((item, index) => (
    {
      key: pidType[index + 1] + name,
      path: `/${path}/${item}`,
      prefix: `${env}/business/business/order`
    }
  ))
));

const resultArr = [
  ...piUrlsList.flat(),
  ...piDetailUrlsList.flat(),
  { key: 'productBatchUpdate', path: '/business/business/product/batch', prefix: `${env}` },// 部门下拉
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
