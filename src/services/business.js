/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-16 23:48:54
 * @LastEditTime: 2019-08-17 23:51:37
 * @LastEditors: Please set LastEditors
 */
import request from '@/utils/request';
import { piUrls, piDetailUrls } from './business/piUrls';
import { fppurchaseUrls, fpdetailUrls } from './business/fppurchaseUrls';
import { sampleUrls, sampleDetailUrls } from './business/sampleUrls';
import { getCurrentUser } from '../utils/authority';

const env = process.env.NODE_ENV === 'production' ? '' : '/server';

const rType = {
  1: 'listnotdone',
  2: 'listalready',
  3: 'approve',
  4: 'revoke',
  5: 'merge',
  6: 'split',
  7: 'update',
};

const pidType = {
  1: 'list',
  2: 'update',
  3: 'delete',
};

const sampleType = {
  1: 'list',
  2: 'update',
  3: 'delete',
  4: 'approval',
  5: 'revoke'
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


// 业务-样品管理 订单主页
const sampleList = sampleUrls.map(({ name, arr, path }) => (
  arr.map((item, index) => (
    {
      key: sampleType[index + 1] + name,
      path: `/${path}/${item}`,
      prefix: `${env}/business/business/sample`
    }
  ))
));


// 业务-成品采购主页
const fppurchaseList = fppurchaseUrls.map(({ name, arr, path }) => (
  arr.map((item, index) => (
    {
      key: sampleType[index + 1] + name,
      path: `/${path}/${item}`,
      prefix: `${env}/business/business.purchase`
    }
  ))
));


// 业务-成品采购详细
const fpdetailList = fpdetailUrls.map(({ name, arr, path }) => (
  arr.map((item, index) => (
    {
      key: sampleType[index + 1] + name,
      path: `/${path}/${item}`,
      prefix: `${env}/business/business.purchase`
    }
  ))
));


const resultArr = [
  ...piUrlsList.flat(),
  ...piDetailUrlsList.flat(),
  ...sampleList.flat(),
  ...fppurchaseList.flat(),
  ...fpdetailList.flat(),
  { key: 'listProductType', path: '/business/business/sample/business-sample/listProductType', prefix: `${env}` },// 产品类别
  { key: 'listAllPiDetail', path: '/business/business/order/proforma-invoice-detail/listAll', prefix: `${env}` },// PI详情 获取所有
  { key: 'productBatchUpdate', path: '/business/business/product/batch', prefix: `${env}` },// 部门下拉
  { key: 'getTypeByWordbookCode', path: '/business/develop/category/develop-basic-category-set/getTypeByWordbookCode', prefix: `${env}` },// 类别下拉
  { key: 'listMstWordbook', path: '/business/sys/mst-wordbook/listMstWordbook', prefix: `${env}` },// 类别下拉
  { key: 'listMarkingDropDown', path: '/business/business/marking/listMarkingDropDown', prefix: `${env}` },// 字印编码下拉
  { key: 'dropDownRAT', path: '/business/basic/ring-around-the-standard/dropDownRAT', prefix: `${env}` },// 戒围标准下拉
];

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

export default outPutObject;
