
// 生产流程的筛选参数
export const fppurchase = [
  { key: '流程编号', value: 'flowCode' },
  { key: '流程名称', value: 'flowName' },
  { key: '英文名称', value: 'engName' },
  { key: '所属部门', value: 'department', 'type': 2, 'list': 'listDeptDrop'},
  { key: '允许损耗(%)', value: 'isWastage',number:true},
];

// 生产工序的筛选参数
export const productProcess = [
  { key: '工序编号', value: 'processCode' },
  { key: '工序名称', value: 'processName' },
  { key: '工序产能', value: 'processCapacity' },
  { key: '允许损耗(%)', value: 'isWastage' ,number:true},
  { key: '英文名称', value: 'engName' },
];


export default {
  fppurchase,
  productProcess
}
