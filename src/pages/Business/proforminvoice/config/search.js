export const orderApproveInfo = [
  { 'key': '审批单号', 'value': 'approveNo' },
  { 'key': '订单编号', 'value': 'orderNo',},
  { 'key': '客户编号', 'value': 'customerNo',},
];

export const orderApproveProduct = [
  { 'key': '产品编号', 'value': 'productNo',  },
];


export const orderApproveResult = [
  { 'key': '产品编号', 'value': 'productNo',},
  { 'key': '审批人', 'value': 'approveUser'},
  { 'key': '审批部门', 'value': 'approveDep'},
  { 'key': '审批结果', 'value': 'approveResult',type:2,list:'approveResultList'},
];


export default {
  orderApproveInfo,
  orderApproveProduct,
  orderApproveResult,
}
