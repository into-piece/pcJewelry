import {statusConvert} from '@/utils/convert';


export const processSalary = [
  { 'key': '流程编号', 'value': 'flowCode' },
  { 'key': '流程名称', 'value': 'flowName' },
  { 'key': '英文名称', 'value': 'enName' },
  { 'key': '小时工资(元/小时)', 'value': 'hourlyWage' },
  { 'key': '员工至部门系数', 'value': 'staffCoefficient' },
  { 'key': '部门至工厂系数', 'value': 'departmentCoefficient' },
  { 'key': '工厂至业务系数', 'value': 'factoryCoefficient' },
  { 'key': '状态', 'value': 'status' ,'convert':statusConvert,},
];


export default {
  processSalary,
};
