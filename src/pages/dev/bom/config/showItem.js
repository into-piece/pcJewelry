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
    key: '颜色名称',
    value: 'gemColorName',
  },
  {
    key: '成色名称',
    value: 'productColorName',
  },
  {
    key: '英文名',
    value: 'enName',
  },
  {
    key: '单位',
    value: 'status',
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
];

const material = [
  { key: '原料类别', value: 'materialTypeName'},
  { key: '模具编号', value: 'modelNo' },
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
  { key: '原料编号', value: 'materialNo'},
  { key: '单件用量', value: 'singleDosage' },
  { key: '规格', value: 'specification'},
  { key: '中文名', value: 'zhName'},
  { key: '英文名', value: 'enName'},
  { key: '重量单位', value: 'weightUnit'},
  { key: '计量单位', value: 'measureUnit'},
  { key: '单重', value: 'inventoryWeight'},
  { key: '单件用重', value: 'sheetWithHeavy'},
  { key: '计价类别', value: 'valuationClass'},
  { key: '损耗率', value: 'attritionRate'},
  { key: '备注', value: 'remarks'},
];

const productProcess = [
  { key: '工序编号', value: 'workProcessCode'},
  { key: '工序名称', value: 'zhName'},
  { key: '耗损（%）', value: 'isWastage'},
  { key: '效率（件/小时）', value: 'processCapacity'},
  { key: '图片', value: 'picPath' },
  { key: '文档', value: 'workProcessCode' },
  { key: '备注', value: 'remarks' },
];

export default {
  product,
  material,
  productProcess
};
