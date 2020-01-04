
// 生产流程的筛选参数
export const processSalary = [
  { key: '编号', value: 'code' },
  { key: '产品类别', value: 'productType', 'type': 2, 'list': 'H016003'},
  { key: '工费类别', value: 'costType'},
  { key: '流程编号', value: 'flowCode', 'type': 2, 'list': 'listProductionFlowDropDown'},

];


export default {
  processSalary,
}
