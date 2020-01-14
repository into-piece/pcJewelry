export const fppurchase = [
  { 'key': '流程编号', 'value': 'flowCode' },
  { 'key': '流程名称', 'value': 'flowName' },
  { 'key': '所属部门', 'value': 'department' , 'type': 7, 'list': 'listDeptDrop',},
  { 'key': '英文名称', 'value': 'engName' , 'noNeed': true},
  { 'key': '负责人', 'value': 'chargeUser','type': 7,'list':'userlist' },
  { 'key': '工作效率', 'value': 'efficiency',  'number': true },
  { 'key': '类别', 'value': 'flowClass', 'type': 2, 'list': 'listH017', },
  { 'key': '计价类别', 'value': 'valuationClass' ,  'type': 6, 'arr': [{ 'key': '计重', 'value': 0 }, { 'key': '计件', 'value': 1 }], 'dfv': 0 },
  { 'key': '允许损耗(%)', 'value': 'isWastage' ,  'number': true,},
  { 'key': '出货重量范围', 'value': 'weightRange' ,  'number': true},
  { 'key': '说明', 'value': 'remarks', type:8 },

];

export const fpdetail = [
  { 'key': '工序编号', 'value': 'processCode',  },
  { 'key': '工序名称', 'value': 'processName',},
  { 'key': '英文名称', 'value': 'engName', 'noNeed': true},
  { 'key': '损耗(%)', 'value': 'isWastage',   'number': true },
  { 'key': '产能(件/小时)', 'value': 'processCapacity', 'number': true,  },
  { 'key': '备注', 'value': 'remarks', type:8  },
];


export default {
  fppurchase,
  fpdetail
}
