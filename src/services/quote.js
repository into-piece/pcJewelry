/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-16 23:48:54
 * @LastEditTime: 2019-08-17 23:51:37
 * @LastEditors: Please set LastEditors
 */
import request from '@/utils/request';

const env = process.env.NODE_ENV === 'production' ? '' : '/server'
const priefx = `${env}/business/business/product`;
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
  { key: 'queryProductQuoteHeadersAlreadyDone', path: '/product-quote-header/queryProductQuoteHeadersAlreadyDone' },
  { key: 'queryProductQuoteHeadersNotDone', path: '/product-quote-header/queryProductQuoteHeadersNotDone' },
  { key: 'createQuoteByProduct', path: '/product-quote-header/createQuoteByProduct' },
  { key: 'saveOrupdateProductQuoteRawMaterialDetail', path: '/product-quote-header/saveOrupdateProductQuoteRawMaterialDetail' },
  { key: 'listProductQuoteRawMaterialDetail', path: '/product-quote-header/listProductQuoteRawMaterialDetail' },
  { key: 'deleteProductQuoteHeader', path: '/product-quote-header/deleteProductQuoteHeader' },// 删除表头
  { key: 'cancelApproval', path: '/product-quote-header/cancelApproval' },// 报价单取消审批
  { key: 'listProductQuoteDetail', path: '/product-quote-detail/listProductQuoteDetail', module: 2 },
  { key: 'listProductNotCreateQoute', path: '/listProductNotCreateQoute', module: 3 }, // 获取为报价的产品参数
  { key: 'listMstWordbook', path: '/sys/mst-wordbook/listMstWordbook', module: 4 }, // 获取为报价的产品参数
  { key: 'listCustomerDropDown', path: '/business/customer/listCustomerDropDown', module: 4 }, // 获取为报价的产品参数
  { key: 'listMarkingDropDown', path: '/business/marking/listMarkingDropDown', module: 4 }, // 字印编码
]
// /listMstWordbook

console.log(resultArr, '============')

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
console.log(outPutObject)

export default outPutObject