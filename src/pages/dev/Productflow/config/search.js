
// 生产流程的筛选参数
export const productflow = [
  { key: '流程编号', value: 'flowCode' },
  { key: '流程名字', value: 'flowName' },
  { key: '英文名称', value: 'engName' },
  { key: '所属部门', value: 'department', 'type': 2, 'list': 'listDeptDrop'},
  { key: '成品类别', value: 'productType', 'type': 2, 'list': 'listH016009'},
  { key: '类别', value: 'type', 'type': 2, 'list': 'listH017'},
  { key: '镶石工艺', value: 'stoneCraft', 'type': 2, 'list': 'listGemSetProcessDropDown'},
  { key: '重量范围', value: 'weightRange',number:true},
  { key: '标准工时', value: 'workingHour',number:true},
  { key: '允许损耗(%)', value: 'isWastage',number:true},
  { key: '排序号', value: 'sortNum',number:true },
  {
    'key': '是否外发',
    'value': 'isOutbound',
    'type': 6,
    'arr': [{ 'key': '是', 'value': 1 }, { 'key': '否', 'value': 0 }],
  },
];

// 员工工序的筛选参数
export const productProcess = [
  { key: '工序编号', value: 'processCode' },
  { key: '工序名称', value: 'processName' },
  { key: '工序产能', value: 'processCapacity' },
  { key: '允许损耗(%)', value: 'isWastage' ,number:true},
  { key: '英文名称', value: 'engName' },
  { key: '排序号', value: 'sortNum',number:true },
];


export default {
  productflow,
  productProcess
}
