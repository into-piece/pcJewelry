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
const postArr = [
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
  { key: 'addquotelist', path: '/product-quote-header/saveProductQuoteHeader' },
  { key: 'checkIsEdit', path: '/product-quote-header/checkIsEdit' },
  { key: 'unLockEdit', path: '/product-quote-header/unLockEdit' },
  { key: 'copyQuote', path: '/product-quote-header/copyQuote' }, // 复制
  { key: 'listEndCustomerDropDown', path: '/business/end-customer/listEndCustomerDropDown', module: 4 }, // 终客编号
  { key: 'approval', path: '/product-quote-header/approval' }, // 报价单审批
  { key: 'cancelApproval', path: '/product-quote-header/cancelApproval' }, // 报价单审批
  { key: 'deleteProductQuoteHeader', path: '/product-quote-header/deleteProductQuoteHeader' }, // 报价单审批
  { key: 'listBrands', path: '/basic/brand/listBrands', module: 4 }, // 报价单审批
  { key: 'listBasicColourSettingsDropDown', path: '/develop/basic/colour-settings/listBasicColourSettingsDropDown', module: 4 }, // 报价单审批
  { key: 'deleteProformaInvoiceDetail', path: '/business/order/proforma-invoice-detail/deleteProformaInvoiceDetail', module: 4 }, // 报价单审批
  { key: 'deleteProductQuoteDetail', path: '/business/product/product-quote-detail/deleteProductQuoteDetail', module: 4 }, // 报价单明细删除
  { key: 'addquoteDatialList', path: '/product-quote-detail/saveOrUpdate' }, // 7）添加或更新报价单产品明细信息：
  { key: 'getLastQuoteDetailByProductId', path: '/product-quote-detail/getLastQuoteDetailByProductId' }, // 前次工费
  { key: 'getTopQuoteDetailByProductId', path: '/product-quote-detail/getTopQuoteDetailByProductId' }, // 最高工费
  { key: 'getlistProductLine', path: '/business/product-line/listProductLine', module: 4 }, // 产品报价系数
  { key: 'getLastPackPriceByProductId', path: '/product-quote-detail/getLastPackPriceByProductId' }, // 抓出同一客户同款产品的最近一次包装单价
  { key: 'getActualCountByProductId', path: '/product-quote-detail/getActualCountByProductId' }, // 抓出该款产品的最近一次PI工费
  { key: 'geInitializeCountByProductId', path: '/product-quote-detail/geInitializeCountByProductId' }, // 抓出该款产品的多个参数
  { key: 'getMainMaterialPrice', path: '/product-quote-header/getMainMaterialPrice' }, // 获取当天银价（主材价）
  {
    key: 'mainTypeDropdown',
    path: '/develop/category/develop-basic-category-set/dropdown',
    module: 4
  },
  {
    key: 'listTodayRate',
    path: '/basic/currency/listTodayRate',
    module: 4
  },
  {
    key: 'getQuoteDtInit',
    path: '/business/product/product-quote-detail/getQuoteDtInit',
    module: 4
  },
  {
    key: 'getPrintInfo', path: '/business/product/product-quote-header/getPrintInfo', module: 4 // 获取打印列表数据
  }
]

const getArr = [
  { key: 'getPrintInfoExcel', path: '/business/product/product-quote-header/getPrintInfoExcel', module: 4 }, // 供应商导出excel接口
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

export default outPutObject