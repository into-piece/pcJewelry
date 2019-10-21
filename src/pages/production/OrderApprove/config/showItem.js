import {statusConvert,YoNConvert} from '@/utils/convert';

export const orderApproveInfo = [
  { 'key': '审批编号', 'value': 'approveNo' },
  { 'key': '客户编号', 'value': 'customerNo' },
  { 'key': '客户中文名称', 'value': 'customerZhName' },
  { 'key': '客户英文名称', 'value': 'customerEnName' },
  { 'key': '客户简称', 'value': 'customerShotName' },
  { 'key': '订单类别', 'value': 'type',cName:true  },
  { 'key': '订单数量', 'value': 'orderNum'},
  { 'key': '紧急程度', 'value': 'emergency' },
];

export const orderApproveProduct = [
  { 'key': '产品编号', 'value': 'productNo' },
  { 'key': '中文名', 'value': 'zhName' },
  { 'key': '电镀颜色', 'value': 'platingColor' },
  { 'key': '宝石颜色', 'value': 'gemColor' },
  { 'key': '重量范围', 'value': 'unitOfWeight' },
  { 'key': '模具号', 'value': 'mouldNo' },
  { 'key': '成色', 'value': 'productColor' },
  { 'key': '成色重量', 'value': 'finishedWeight'  },
  { 'key': '客户货号', 'value': 'custoerProductNo'  },
];

export const orderApproveResult = [
  { 'key': '产品编号', 'value': 'productNo' },
  { 'key': '审批单号', 'value': 'approveNo' },
  { 'key': '审批人', 'value': 'approveUser' },
  { 'key': '审批人姓名', 'value': 'userName' },
  { 'key': '审批部门', 'value': 'approveDep' },
  { 'key': '部门名称', 'value': 'depName' },
  { 'key': '审批时间', 'value': 'approveTime' },
  { 'key': '审批结果', 'value': 'approveResult'  },
];

export default {
  orderApproveInfo,
  orderApproveProduct,
  orderApproveResult,
};
