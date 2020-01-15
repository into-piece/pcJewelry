import {statusConvert} from '@/utils/convert';

export const fppurchase = [
  { 'key': '采购单号', 'value': 'purchaseNo' },
  { 'key': '采购日期', 'value': 'purchaseDate',date:'YYYY-MM-DD'  },
  { 'key': '客户订单', 'value': 'orderNo'  },
  { 'key': '客户编号', 'value': 'customerNo' },
  { 'key': '客户简称', 'value': 'customerShotName' },
  { 'key': '供货商编号', 'value': 'supplierCode' },
  { 'key': '供货商简称', 'value': 'supplierShotName' },
  { 'key': '联系人', 'value': 'contactName'  },
  { 'key': '手机', 'value': 'mobilePhone' },
  { 'key': '预付款金额', 'value': 'advance' },
  { 'key': '付款类别', 'value': 'typeOfPayment',cName:true },
  { 'key': '供货商交期', 'value': 'supplierDate',date:'YYYY-MM-DD' },
  { 'key': '采购数量', 'value': 'purchaseTotal'  },
  { 'key': '采购重量', 'value': 'procurementWeightTotal'  },
  { 'key': '采购总额', 'value': 'purchasePriceTotal'  },
  { 'key': '收货数量', 'value': 'goodsAmount'  },
  { 'key': '收货重量', 'value': 'goodsWeight'  },
  { 'key': '确认金额', 'value': 'amountRecognized'  },
  { 'key': '退货数量', 'value': 'salesReturnAmount'  },
  { 'key': '退货重量', 'value': 'rtnWeight'  },
  { 'key': '返主材总重', 'value': 'rtnPrincipalWeightTotal'  },
  { 'key': '主材价', 'value': 'principalPrice'  },
  { 'key': '币种', 'value': 'currency' },
  { 'key': '税率', 'value': 'taxRate' },
  { 'key': '状态', 'value': 'status' ,'convert':statusConvert,},
  { 'key': '备注', 'value': 'remarks' },
];

export const fpdetail = [
  { 'key': '流程编号', 'value': 'flowCode' },
  { 'key': '工序编号', 'value': 'processCode' },
  { 'key': '工序名称', 'value': 'processName' },
  { 'key': '英文名称', 'value': 'engName' },
  { 'key': '排序号码', 'value': 'sortNum' },
  { 'key': '损耗(%)', 'value': 'isWastage' },
  { 'key': '产能(件/小时)', 'value': 'processCapacity' },
  { 'key': '状态', 'value': 'status' ,'convert':statusConvert,},
  { 'key': '备注', 'value': 'remarks' },

];


export default {
  fppurchase,
  fpdetail,
};
