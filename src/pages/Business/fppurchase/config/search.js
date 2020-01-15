
// 生产流程的筛选参数
export const fppurchase = [
  { 'key': '采购单号', 'value': 'purchaseNo'},
];

// 生产工序的筛选参数
export const fpdetail = [
  { key: '工序编号', value: 'processCode' },
  { key: '工序名称', value: 'processName' },
  { key: '工序产能', value: 'processCapacity' },
  { key: '允许损耗(%)', value: 'isWastage' ,number:true},
  { key: '英文名称', value: 'engName' },
];


export default {
  fppurchase,
  fpdetail
}
