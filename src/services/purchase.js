/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-16 23:48:54
 * @LastEditTime: 2019-08-17 23:51:37
 * @LastEditors: Please set LastEditors
 */
import request from '@/utils/request';

const env = process.env.NODE_ENV === 'production' ? '' : '/server'
const priefx = `${env}/business/purchase.supplier`;
const priefx2 = `${env}/business`
const returnApi = (module) => {
  const pre = module === 4 ? priefx2 : priefx
  return pre
}


// module 1 普通 product-quote-header模块
// module 2 product-quote-detail模块
// moudle 3 product模块
// 4/sys/mst-wordbook
const resultArr = [


  { key: 'listSupplier', path: '/purchase-supplier/list' },
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
  { key: 'change', path: '/purchase-supplier/change' }
]
// /listMstWordbook

// 请求url配置
const outPutObject = {}
resultArr.forEach(({ key, path, module }) => {
  outPutObject[key] = async (params) => {
    return request(returnApi(module) + path, {
      method: 'POST',
      data: params,
    });
  }
})

export default outPutObject
