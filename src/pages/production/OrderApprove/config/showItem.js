import {statusConvert,YoNConvert} from '@/utils/convert';

export const orderApproveInfo = [
  { 'key': '成品类别', 'value': 'productType',cName:true },
  { 'key': '流程名称', 'value': 'flowName' },
  { 'key': '流程编号', 'value': 'flowCode' },
  { 'key': '所属部门', 'value': 'department'  ,cName:true},
  { 'key': '英文名称', 'value': 'engName' },
  { 'key': '类别', 'value': 'type' ,cName:true},
  { 'key': '镶石工艺', 'value': 'stoneCraft',cName:true },
  {
    'key': '是否外发',
    'value': 'isOutbound',
    'convert':YoNConvert,
  },
  { 'key': '允许损耗(%)', 'value': 'isWastage' },
  { 'key': '出货重量范围', 'value': 'weightRange' },
  { 'key': '标准工时', 'value': 'workingHour' },
  { 'key': '状态', 'value': 'status' ,'convert':statusConvert,},
];

export const orderApproveProduct = [
  { 'key': '流程编号', 'value': 'flowCode' },
  { 'key': '工序编号', 'value': 'processCode' },
  { 'key': '工序名称', 'value': 'processName' },
  { 'key': '英文名称', 'value': 'engName' },
  { 'key': '排序号码', 'value': 'sortNum' },
  { 'key': '损耗(%)', 'value': 'isWastage' },
  { 'key': '产能(件/小时)', 'value': 'processCapacity' },
  { 'key': '状态', 'value': 'status' ,'convert':statusConvert,},
];

export const orderApproveResult = [
  { 'key': '流程编号', 'value': 'flowCode' },
  { 'key': '工序编号', 'value': 'processCode' },
  { 'key': '工序名称', 'value': 'processName' },
  { 'key': '英文名称', 'value': 'engName' },
  { 'key': '排序号码', 'value': 'sortNum' },
  { 'key': '损耗(%)', 'value': 'isWastage' },
  { 'key': '产能(件/小时)', 'value': 'processCapacity' },
  { 'key': '状态', 'value': 'status' ,'convert':statusConvert,},
];

export default {
  orderApproveInfo,
  orderApproveProduct,
  orderApproveResult,
};
