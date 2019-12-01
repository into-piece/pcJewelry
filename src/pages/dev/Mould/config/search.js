
// 生产流程的筛选参数
export const dieSet = [
  { key: '产品编号', value: 'productNo' },
  { key: '类别', value: 'productType',type:2 ,list:'H016009' },
];

// 生产工序的筛选参数
export const dieSetChild = [
  { 'key': '胶膜编号', 'value': 'mainMoldNo' },
];


export default {
  dieSetChild,
  dieSet,
}
