export const fppurchase = [
  { 'key': '采购单号', 'value': 'purchaseNo',auto:true },
  { 'key': '采购日期', 'value': 'purchaseDate' },
  { 'key': '客户订单', 'value': 'orderNo' , 'type': 7, 'list': 'listDeptDrop',},
  { 'key': '客户编号', 'value': 'customerNo',readonly:true },
  { 'key': '客户简称', 'value': 'customerShotName',readonly:true},
  { 'key': '供货商编号', 'value': 'supplierCode', 'type': 7, 'list': 'listH017'},
  { 'key': '供货商简称', 'value': 'supplierShotName' ,readonly:true},
  { 'key': '联系人', 'value': 'contactName' ,readonly:true},
  { 'key': '手机', 'value': 'mobilePhone',readonly:true},
  { 'key': '预付款金额', 'value': 'advance' ,  'number': true,'initValue':0.0,'step':0.1,'min':0,precision:1},
  { 'key': '付款类别', 'value': 'typeOfPayment',  'type': 7, 'list': 'listH017',},
  { 'key': '供货商交期', 'value': 'supplierDate', 'type': 7, 'list': 'listH017', },
  { 'key': '主材价', 'value': 'principalPrice'  },
  { 'key': '币种', 'value': 'currency' , 'type': 7, 'list': 'listH017',},
  { 'key': '税率', 'value': 'taxRate' ,  'number': true},
  { 'key': '备注', 'value': 'remarks', type:8 },

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
