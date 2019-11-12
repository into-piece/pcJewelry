import {statusConvert} from '@/utils/convert';


export const Department = [
  { 'key': '部门编号', 'value': 'role' },
  { 'key': '部门简称', 'value': 'shortName' },
  { 'key': '中文名', 'value': 'zhName' },
  { 'key': '英文名', 'value': 'enName' ,},
  { 'key': '状态', 'value': 'status' ,'convert':statusConvert,},
  { 'key': '备注', 'value': 'remarks' ,},
];


export default {
  Department,
};
