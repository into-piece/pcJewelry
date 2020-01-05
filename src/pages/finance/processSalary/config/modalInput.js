export const processSalary = [
  { 'key': '流程编号', 'value': 'flowCode', 'type': 2, 'list': 'listProductionFlowDropDown' },
  { 'key': '流程名称', 'value': 'flowName' ,disabled:true},
  { 'key': '英文名称', 'value': 'enName' },
  { 'key': '小时工资(元/小时)', 'value': 'hourlyWage' },
  { 'key': '员工至部门系数', 'value': 'staffCoefficient' },
  { 'key': '部门至工厂系数', 'value': 'departmentCoefficient' },
  { 'key': '工厂至业务系数', 'value': 'factoryCoefficient' },
  { 'key': '备注','type':8, 'value': 'remarks' },

];

export default {
  processSalary,
};
