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
  { key: 'addSupplier', path: '/purchase-supplier/saveOrUpdate' },// 删除表头
  { key: 'approval', path: '/purchase-supplier/approval' }, // 报价单审批
  { key: 'cancelApproval', path: '/purchase-supplier/revoke' }, // 报价单审批

  { key: 'listContacts', path: '/purchase-supplier-contacts/list' },
  { key: 'deleteContacts', path: '/purchase-supplier-contacts/delete' },// 删除联系人
  { key: 'addContacts', path: '/purchase-supplier-contacts/saveOrUpdate' },// 添加联系人

  { key: 'listBlankAccount', path: '/purchase-supplier-bank-account/list' },
  { key: 'deleteBlankAccount', path: '/purchase-supplier-bank-account/delete' },// 删除联系人
  { key: 'addBlankAccount', path: '/purchase-supplier-bank-account/saveOrUpdate' },// 添加联系人


  { key: 'listMstWordbook', path: '/sys/mst-wordbook/listMstWordbook', module: 4 }, // 获取为报价的产品参数



  { key: 'queryProductQuoteHeadersAlreadyDone', path: '/product-quote-header/queryProductQuoteHeadersAlreadyDone' },
  { key: 'queryProductQuoteHeadersNotDone', path: '/product-quote-header/queryProductQuoteHeadersNotDone' },
  { key: 'createQuoteByProduct', path: '/product-quote-header/createQuoteByProduct' },
  { key: 'saveOrupdateProductQuoteRawMaterialDetail', path: '/product-quote-header/saveOrupdateProductQuoteRawMaterialDetail' },
  { key: 'listProductQuoteRawMaterialDetail', path: '/product-quote-header/listProductQuoteRawMaterialDetail' },
  { key: 'deleteProductQuoteHeader', path: '/product-quote-header/deleteProductQuoteHeader' },// 删除表头
  { key: 'listProductQuoteDetail', path: '/product-quote-detail/listProductQuoteDetail', module: 2 },
  { key: 'listProductNotCreateQoute', path: '/listProductNotCreateQoute', module: 3 }, // 获取为报价的产品参数

  { key: 'listCustomerDropDown', path: '/business/customer/listCustomerDropDown', module: 4 }, // 获取为报价的产品参数
  { key: 'listMarkingDropDown', path: '/business/marking/listMarkingDropDown', module: 4 }, // 字印编码
  { key: 'addquotelist', path: '/product-quote-header/saveProductQuoteHeader' },
  { key: 'checkIsEdit', path: '/product-quote-header/checkIsEdit' },
  { key: 'unLockEdit', path: '/product-quote-header/unLockEdit' },
  { key: 'copyQuote', path: '/product-quote-header/copyQuote' }, // 复制
  { key: 'listEndCustomerDropDown', path: '/business/end-customer/listEndCustomerDropDown', module: 4 }, // 终客编号
  { key: 'deleteProductQuoteHeader', path: '/product-quote-header/deleteProductQuoteHeader' }, // 报价单审批
  { key: 'listBrands', path: '/basic/brand/listBrands', module: 4 }, // 报价单审批
  { key: 'listBasicColourSettingsDropDown', path: '/develop/basic/colour-settings/listBasicColourSettingsDropDown', module: 4 }, // 报价单审批
  { key: 'deleteProformaInvoiceDetail', path: '/business/order/proforma-invoice-detail/deleteProformaInvoiceDetail', module: 4 }, // 报价单审批
  { key: 'addquoteDatialList', path: '/product-quote-detail/saveOrupdateProductQuoteDetail' }, // 7）添加或更新报价单产品明细信息：
  { key: 'getLastQuoteDetailByProductId', path: '/product-quote-detail/getLastQuoteDetailByProductId' }, // 前次工费
  { key: 'getTopQuoteDetailByProductId', path: '/product-quote-detail/getTopQuoteDetailByProductId' }, // 最高工费
  { key: 'getlistProductLine', path: '/business/product-line/listProductLine', module: 4 }, // 产品报价系数
  { key: 'getLastPackPriceByProductId', path: '/product-quote-detail/getLastPackPriceByProductId' }, // 抓出同一客户同款产品的最近一次包装单价
  { key: 'getActualCountByProductId', path: '/product-quote-detail/getActualCountByProductId' }, // 抓出该款产品的最近一次PI工费
  { key: 'geInitializeCountByProductId', path: '/product-quote-detail/geInitializeCountByProductId' }, // 抓出该款产品的多个参数
  { key: 'getMainMaterialPrice', path: '/product-quote-header/getMainMaterialPrice' }, // 获取当天银价（主材价）
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
