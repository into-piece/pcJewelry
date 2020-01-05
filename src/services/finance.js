/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-16 23:48:54
 * @LastEditTime: 2019-08-17 23:51:37
 * @LastEditors: Please set LastEditors
 */
import request from '@/utils/request';
import processSalaryUrls from './finance/processSalary';
// import bom from './dev/bom';
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


// 财务-流程薪资
const processSalaryUrlsSet = processSalaryUrls.map(({ name, arr, path }) =>
  arr.map((item, index) => ({
    key: rType[index + 1] + name,
    path: `/${path}/${item}`,
    prefix1: `${env}/business`,
  }))
);

const resultArr = [

  ...processSalaryUrlsSet.flat(),
  {
    key: 'listProductionFlowDropDown',
    path: '/production-flow/listDropDown',
    prefix1: `${env}/business/develop/production`,
  }, // 生产流程下拉

];

// console.log(resultArr, '============')

// 请求url配置
const outPutObject = {};
resultArr.forEach(({ key, path, prefix1 }) => {
  outPutObject[key] = async params => {
    return request((prefix1) + path, {
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
