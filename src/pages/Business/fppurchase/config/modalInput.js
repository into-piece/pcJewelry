export const fppurchase = [
  { key: '采购单号', value: 'purchaseNo',auto:true ,disabled:true,wrapperColSpan:24,labelColSpan:24},
  { key: '采购日期', value: 'purchaseDate',type:3,wrapperColSpan:24,labelColSpan:24 },
  { key: '客户订单', value: 'customerOrderId' , 'type': 4,wrapperColSpan:24,labelColSpan:24 },
  { key: '客户编号', value: 'customerNo',disabled:true,wrapperColSpan:24,labelColSpan:24 },
  { key: '客户简称', value: 'customerShotName',disabled:true,wrapperColSpan:24,labelColSpan:24},
  { key: '供货商简称', value: 'supplierId', 'type': 7, 'list': 'supplierlistDropDown',wrapperColSpan:24,labelColSpan:24},
  { key: '联系人', value: 'contactName' ,disabled:true,wrapperColSpan:24,labelColSpan:24},
  { key: '手机', value: 'mobilePhone',disabled:true,wrapperColSpan:24,labelColSpan:24},
  { key: '预付款金额', value: 'advance' ,  'number': true,dfv:0.0,'step':0.1,'min':0,precision:1,wrapperColSpan:24,labelColSpan:24},
  { key: '付款类别', value: 'typeOfPayment',  'type': 7, 'list': 'listH019',dfv:'H019001',wrapperColSpan:24,labelColSpan:24},
  { key: '供货商交期', value: 'supplierDate',type:3,wrapperColSpan:24,labelColSpan:24 },
  { key: '主材价', value: 'principalPrice'  ,wrapperColSpan:24,labelColSpan:24},// 获取当天默认主材价格
  { key: '币种', value: 'currency' , 'type': 7, 'list': 'listH006',wrapperColSpan:24,labelColSpan:24},
  { key: '税率', value: 'taxRate' ,  'number': true,dfv:0.00,'step':0.01,'min':0,precision:2,wrapperColSpan:24,labelColSpan:24},
  { key: '备注', value: 'remarks',type:8, wrapperColSpan:24,labelColSpan:24 ,colSpan:24},

];

export const fpdetail = [
  { key: '工序编号', value: 'processCode',  },
  { key: '工序名称', value: 'processName',},
  { key: '英文名称', value: 'engName', 'noNeed': true},
  { key: '损耗(%)', value: 'isWastage',   'number': true },
  { key: '产能(件/小时)', value: 'processCapacity', 'number': true,  },
  { key: '备注', value: 'remarks', type:8  },
];


export default {
  fppurchase,
  fpdetail
}
