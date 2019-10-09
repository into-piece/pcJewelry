export const flowCostType = [
  { 'key': '编号', 'value': 'code' },
  { 'key': '流程名称', 'value': 'flowName' },
  { 'key': '流程编号', 'value': 'flowCode', 'type': 2, 'list': 'listProductionFlowDropDown' },
  { 'key': '工费类别', 'value': 'costType' },
  { 'key': '工费(含镍)', 'value': 'nickelCost' },
  { 'key': '工费(不含镍)', 'value': 'noNickelCost' },
  { 'key': '产品类别', 'value': 'productType', 'type': 2, 'list': 'H016003' },

];

export default {
  flowCostType,
};
