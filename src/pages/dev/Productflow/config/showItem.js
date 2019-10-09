export const productFlow = [
  { 'key': '成品类别', 'value': 'productType' },
  { 'key': '流程名称', 'value': 'flowName' },
  { 'key': '流程编号', 'value': 'flowCode' },
  { 'key': '所属部门', 'value': 'department'  },
  { 'key': '英文名称', 'value': 'engName' },
  { 'key': '类别', 'value': 'type' },
  { 'key': '镶石工艺', 'value': 'stoneCraft' },
  {
    'key': '是否外发',
    'value': 'isOutbound',
  },
  { 'key': '允许损耗(%)', 'value': 'isWastage' },
  { 'key': '出货重量范围', 'value': 'weightRange' },
  { 'key': '标准工时', 'value': 'workingHour' },
];

export const productProcess = [
  { 'key': '流程编号', 'value': 'flowCode' },
  { 'key': '工序编号', 'value': 'processCode' },
  { 'key': '工序名称', 'value': 'processName' },
  { 'key': '英文名称', 'value': 'engName' },
  { 'key': '排序号码', 'value': 'sortNum' },
  { 'key': '损耗(%)', 'value': 'isWastage' },
  { 'key': '产能(件/小时)', 'value': 'processCapacity' },
];


export default {
  productFlow,
  productProcess,
};
