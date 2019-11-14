/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-16 23:48:54
 * @LastEditTime: 2019-08-17 23:51:37
 * @LastEditors: Please set LastEditors
 */
import request from '@/utils/request';
import devBasicUrls from './production/BasicUrls';
import productionApproveUrls from './production/productionApproveUrls';
import { getCurrentUser } from '../utils/authority';

const env = process.env.NODE_ENV === 'production' ? '' : '/server';

const rType = {
  1: 'list',
  2: 'add',
  3: 'delete',
  4: 'approve',
  5: 'revoke',
};

// 基础资料
const resultBasic = devBasicUrls.map(({ name, arr, path }) => (
  arr.map((item, index) => (
    {
      key: rType[index + 1] + name,
      path: `/${path}/${item}`,
      prefix1: `${env}/business/production/basic`
    }
  ))
));

// 新订单审核
const resultOrderApprove = productionApproveUrls.map(({ name, arr, path }) => (
  arr.map((item, index) => (
    {
      key: rType[index + 1] + name,
      path: `/${path}/${item}`,
      prefix1: `${env}/business/production/order/approve`

    }
  ))
));




const resultArr = [
  ...resultBasic.flat(),
  ...resultOrderApprove.flat(),

  { key: 'listDeptDropDown', path: '/sys.user/sys-role/listDeptDropDown', prefix1: `${env}` },// 部门下拉

];

// console.log(resultArr, '============')

// 请求url配置
const outPutObject = {};
resultArr.forEach(({ key, path, prefix1 }) => {
  outPutObject[key] = async (params) => {
    return request((prefix1 || prefix) + path, {
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
