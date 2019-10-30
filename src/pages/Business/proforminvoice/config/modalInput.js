export const piHead = [
  { 'key': '审批单号', 'value': 'approveNo' },
  { 'key': '订单编号', 'value': 'orderNo',},
  { 'key': '客户编号', 'value': 'customerNo',},
];

export const piDetail = [
  { 'key': '产品编号', 'value': 'productNo',  },
  { 'key': '审批人', 'value': 'approveUser',},
  { 'key': '审批部门', 'value': 'engName', 'noNeed': true},
  { 'key': '审批结果', 'value': 'sortNum',  'number': true },
];


export default {
  piDetail,
  piHead,
}
