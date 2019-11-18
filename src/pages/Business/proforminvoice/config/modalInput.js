export const piHead = [
  { 'key': '订单类别', 'value': 'piType', 'type': 2, 'list': 'piTypeList' },
  { 'key': '要求交货期', 'value': 'deliveryTime','type':10 },
  { 'key': '要求预付款', 'value': 'advancePayment', 'number': true },
  {
    'key': '币种', 'value': 'currency',
    'type': 2,
    'list': 'currencydropdown',
  },
  { 'key': '主材价', 'value': 'mainMaterialPrice','number': true },
  {
    'key': '报价方式',
    'value': 'quoteMethod',
    'type': 6,
    'arr': [{ 'key': '计重', 'value': 'H008002' }, { 'key': '计件', 'value': 'H008001' }],
    'initValue': 'H008002',
  },
  { 'key': '产品说明', 'value': 'productDescription' },
  { 'key': '包装说明', 'value': 'packExplains' },
  { 'key': '客户要求', 'value': 'requirement' },
  { 'key': '备注', 'value': 'remark' },
];

export const piDetail = [
  { 'key': '此次工费', 'value': 'nowCount', 'number': true },
  { 'key': '订单总数', 'value': 'totalCount', 'number': true },
  { 'key': '产品长度', 'value': 'productLength', 'number': true },
  { 'key': '字印编码', 'value': 'markingId' ,type:2,list:'listMarkingDropDown', },
  { 'key': '产品戒围', 'value': 'sizeCodeId' ,type:2,list:'dropDownRAT','noneed':true},
  { 'key': '报价单号', 'value': 'quoteHeaderId' },
  { 'key': '产品系列', 'value': 'productLineName' },
];


export default {
  piDetail,
  piHead,
};
