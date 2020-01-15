import {statusConvert,YoNConvert} from '@/utils/convert';

export const fppurchase = [
  { 'key': '采购单号', 'value': 'purchaseNo' },
  { 'key': '采购日期', 'value': '采购日期' },
  { 'key': '客户订单', 'value': 'orderNo'  },
  { 'key': '客户编号', 'value': 'customerNo' },
  { 'key': '客户简称', 'value': 'customerShotName' },
  { 'key': '供货商编号', 'value': 'supplierCode' },
  { 'key': '供货商简称', 'value': 'supplierShotName' },
  { 'key': '联系人', 'value': 'contactName'  },
  { 'key': '手机', 'value': 'mobilePhone' },
  { 'key': '预付款金额', 'value': 'advance' },
  { 'key': '付款类别', 'value': 'typeOfPayment',cName:true },
  { 'key': '供货商交期', 'value': 'supplierDate',data:'YYYY-MM-DD' },
  { 'key': '主材价', 'value': 'principalPrice'  },
  { 'key': '币种', 'value': 'currency' },
  { 'key': '税率', 'value': 'taxRate' },
  { 'key': '备注', 'value': 'remarks' },
  { 'key': '状态', 'value': 'status' ,'convert':statusConvert,},
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
