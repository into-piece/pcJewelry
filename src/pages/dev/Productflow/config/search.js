

// 生产流程的筛选参数
export const productFlow = [
  { key: '客户编号', value: 'customerId' },
  { key: '报价单号', value: 'quoteNumber' },
  { key: '类别', value: 'type', 'type': 2, 'list': 'listH017', noNeed: true },
  { key: '报价日期', value: 'quoteDate', type: 9 },
  { key: '终客编号', value: 'endId' },
];

// 员工工序的筛选参数
export const productProcess = [
  { key: '产品编号', value: 'productNo' },
  { key: '客户货号', value: 'custoerProductNo' },
  { key: '前次工费/克', value: 'lastCount' },
  { key: '实际工费/克', value: 'actualCount' },
];


export default {
  productFlow,
  productProcess
}
