
// 生产流程的筛选参数
export const dieSet = [
  { key: '胶膜代码', value: 'filmCode' },
  { key: '产品类别', value: 'productTypeName',type:2 ,list:'H016009' },
];

// 生产工序的筛选参数
export const dieSetChild = [
  { 'key': '子模具号', 'value': 'childMoldCode' },
];


export default {
  dieSetChild,
  dieSet,
}
