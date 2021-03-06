/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-16 23:48:54
 * @LastEditTime: 2019-08-17 23:51:37
 * @LastEditors: Please set LastEditors
 */
import request from '@/utils/request';

const env = process.env.NODE_ENV === 'production' ? '' : '/server';
const priefx = `${env}/business/purchase.supplier`;
const priefx2 = `${env}/business`;
const returnApi = (module) => {
  const pre = module === 4 ? priefx2 : priefx;
  return pre;
};


// module 1 普通 product-quote-header模块
// module 2 product-quote-detail模块
// moudle 3 product模块
// 4/sys/mst-wordbook
const postArr = [
  { key: 'listSupplier', path: '/purchase-supplier/list' },// 供应商list
  { key: 'listSupplierNoPage', path: '/purchase-supplier/listAll' },// 供应商list
  { key: 'deleteSupplier', path: '/purchase-supplier/delete' },// 删除表头
  { key: 'addSupplier', path: '/purchase-supplier/saveOrUpdate' },// 删除表头
  { key: 'approval', path: '/purchase-supplier/approval' }, // 报价单审批
  { key: 'cancelApproval', path: '/purchase-supplier/revoke' }, // 报价单审批
  { key: 'getTurnoverCode', path: '/purchase-supplier/getTurnoverCode' }, // 报价单审批

  { key: 'listContacts', path: '/purchase-supplier-contacts/list' },
  { key: 'deleteContacts', path: '/purchase-supplier-contacts/delete' },// 删除联系人
  { key: 'addContacts', path: '/purchase-supplier-contacts/saveOrUpdate' },// 添加联系人

  { key: 'listBlankAccount', path: '/purchase-supplier-bank-account/list' },
  { key: 'deleteBlankAccount', path: '/purchase-supplier-bank-account/delete' },// 删除联系人
  { key: 'addBlankAccount', path: '/purchase-supplier-bank-account/saveOrUpdate' },// 添加联系人

  { key: 'listMstWordbook', path: '/sys/mst-wordbook/listMstWordbook', module: 4 }, // 获取为报价的产品参数
  { key: 'listDropDownPurchase', path: '/purchase.supplier/purchase-supplier/listDropDown', module: 4 }, // 新增供应商下拉接口
  { key: 'change', path: '/purchase-supplier/change' },
];

const getArr = [
  { key: 'purchaseExport', path: '/purchase.supplier/purchase-supplier/export', module: 4 }, // 供应商导出excel接口
];
// /listMstWordbook

const buildUrlByParams = (url, params = false) => {
  const keys = Object.keys(params);
  if (params && keys && 0 < keys.length) {
    let query = /\?/.test(url) ? '' : '?';
    for (let key of keys) {
      query += `${key}=${params[key]}&`;
    }
    url += query;
    url = url.substring(0, url.length - 1);
  }
  return url;
};

// 请求url配置
const outPutObject = {};
postArr.forEach(({ key, path, module }) => {
  outPutObject[key] = async (params) => {
    return request(returnApi(module) + path, {
      method: 'POST',
      data: params,
    });
  };
});

getArr.forEach(({ key, path, module }, i) => {
  if (i === 0) {
    outPutObject[key] = (params) => {
      var url = returnApi(module) + path;
      return buildUrlByParams(url, params);
    };
  } else {
    outPutObject[key] = async (params) => {
      return request(returnApi(module) + path, {
        method: 'GET',
        params: params,
      });
    };
  }
});

export default outPutObject;
