import {statusConvert} from '@/utils/convert';


export const processSalary = [
  { 'key': '编号', 'value': 'code' },
  { 'key': '流程编号', 'value': 'flowCode' },
  { 'key': '流程名称', 'value': 'flowName' },
  { 'key': '产品类别', 'value': 'productType' ,cName:true },
  { 'key': '工费类别', 'value': 'costType' },
  { 'key': '工费(含镍)', 'value': 'nickelCost' },
  { 'key': '工费(不含镍)', 'value': 'noNickelCost' },
  { 'key': '状态', 'value': 'status' ,'convert':statusConvert,},
];


export default {
  processSalary,
};
