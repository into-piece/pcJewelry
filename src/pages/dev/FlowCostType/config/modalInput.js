export const productFlow = [
  { 'key': '成品类别', 'value': 'productType', 'type': 2, 'list': 'listH016009',  },
  { 'key': '流程名称', 'value': 'flowName',},
  { 'key': '流程编号', 'value': 'flowCode',},
  { 'key': '所属部门', 'value': 'department', 'type': 2, 'list': 'listDeptDrop',},
  { 'key': '英文名称', 'value': 'engName', 'noNeed': true },
  { 'key': '类别', 'value': 'type', 'type': 2, 'list': 'listH017',},
  { 'key': '镶石工艺', 'value': 'stoneCraft', 'type': 2, 'list': 'listGemSetProcessDropDown',},
  {
    'key': '是否外发',
    'value': 'isOutbound',
    'type': 6,
    'arr': [{ 'key': '是', 'value': 1 }, { 'key': '否', 'value': 0 }],
    'initValue': 1,
  },
  { 'key': '允许损耗(%)', 'value': 'isWastage',  'number': true, },
  { 'key': '出货重量范围', 'value': 'weightRange',},
  { 'key': '标准工时', 'value': 'workingHour', 'noNeed': true, 'number': true, },
];

export const productProcess = [
  { 'key': '工序编号', 'value': 'processCode',  },
  { 'key': '工序名称', 'value': 'processName',},
  { 'key': '英文名称', 'value': 'engName', 'noNeed': true},
  { 'key': '排序号码', 'value': 'sortNum',  'number': true },
  { 'key': '损耗(%)', 'value': 'isWastage',   'number': true },
  { 'key': '产能(件/小时)', 'value': 'processCapacity', 'number': true,  },
];


export default {
  productFlow,
  productProcess
}
