import { statusConvert, numberConvert } from '@/utils/convert';

const product = [
  {
    key: '产品编号',
    value: 'productNo',
  },
  {
    key: '电镀颜色',
    value: 'platingColorName',
  },
  {
    key: '类别',
    value: 'productTypeName',
  },
  {
    key: '宝石颜色',
    value: 'gemColorName',
  },
  {
    key: '成色',
    value: 'productColorName',
  },
  {
    key: '英文名',
    value: 'enName',
  },
  {
    key: '客户编号',
    value: 'customerNo',
  },
  {
    key: '客户货号',
    value: 'customerProductNo',
  },
  {
    key: '客户简称',
    value: 'customerShotName',
  },
  {
    key: '重量',
    value: 'finishedWeight',
  },
  {
    key: '重量单位',
    value: 'unitOfWeightName',
  },
  {
    key: '规格',
    value: 'specification',
  },
  {
    key: '数量单位',
    value: 'unitOfMeasurementName',
  },

  {
    key: '产品来源',
    value: 'sourceOfProductName',
  },
  {
    key: '模具号',
    value: 'mouldNoName',
  },
  {
    key: '客户货号',
    value: 'customerProductNo',
  },
  {
    key: '供应商编号',
    value: 'supplierNo',
  },
  {
    key: '备注',
    value: 'marks',
  },
];

const material = [
  { key: '原料类别', value: 'materialTypeName' },
  { key: '胶膜编号', value: 'modelNoName' },
  { key: '模比', value: 'modulusRatio' },
  {
    key: '原料小类',
    value: 'materialSubName',
  },
  {
    key: '领料部门',
    value: 'acquisitionDepartmentName',
  },
  {
    key: '配模',
    value: 'filmMatch',
  },
  { key: '原料编号', value: 'materialNo' },
  { key: '单件用量', value: 'singleDosage' },
  { key: '规格', value: 'specification' },
  { key: '中文名', value: 'zhName' },
  { key: '英文名', value: 'enName' },
  { key: '重量单位', value: 'weightUnit' },
  { key: '计量单位', value: 'measureUnit' },
  { key: '单重', value: 'inventoryWeight' },
  { key: '单件用重', value: 'sheetWithHeavy' },
  { key: '计价类别', value: 'valuationClass' },
  { key: '损耗率', value: 'attritionRate' },
  { key: '备注', value: 'remarks' },
];

const productProcess = [
  { key: '工序编号', value: 'workProcessCode' },
  { key: '工序名称', value: 'zhName' },
  { key: '耗损（%）', value: 'isWastage' },
  { key: '效率（件/小时）', value: 'processCapacity' },
  { key: '图片', value: 'picPath' },
  // { key: '文档', value: 'workProcessCode' },
  { key: '备注', value: 'remarks' },
];

export default {
  product,
  material,
  productProcess,
};
