import moment from 'moment';
import { statusConvert, numberConvert } from '@/utils/convert';

let product = [
  {
    title: '产品编号',
    dataIndex: 'productNo',
    key: 'productNo',
  },
  {
    title: '电镀颜色',
    dataIndex: 'platingColorName',
    key: 'platingColorName',
  },
  {
    title: '类别',
    dataIndex: 'productTypeName',
    key: 'productTypeName',
  },
  {
    title: '颜色名称',
    dataIndex: 'createTime',
    key: 'createTime',
  },
  {
    title: '成色名称',
    dataIndex: 'productColorName',
    key: 'productColorName',
  },
  {
    title: '英文名',
    dataIndex: 'enName',
    key: 'enName',
  },
  {
    title: '单位',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '客户编号',
    dataIndex: 'customerId',
    key: 'customerId',
  },
  {
    title: '客户货号',
    dataIndex: 'customerProductNo',
    key: 'customerProductNo',
  },
  {
    title: '客户简称',
    dataIndex: 'customerShotName',
    key: 'customerShotName',
  },
];

let material = [
  {
    title: '原料类别',
    dataIndex: 'materialType',
    key: 'materialType',
  },
  {
    title: '原料编号',
    dataIndex: 'materialNo',
    key: 'materialNo',
  },
  {
    title: '规格',
    dataIndex: 'specification',
    key: 'specification',
  },
  {
    title: '单件用量',
    dataIndex: 'singleDosage',
    key: 'singleDosage',
  },
  {
    title: '单件用重',
    dataIndex: 'sheetWithHeavy',
    key: 'sheetWithHeavy',
  },
  {
    title: '效率',
    dataIndex: 'processCapacity',
    key: 'processCapacity',
  },
  {
    title: '领料部门',
    dataIndex: 'acquisitionDepartment',
    key: 'acquisitionDepartment',
  },
  {
    title: '配膜',
    dataIndex: 'filmMatch',
    key: 'filmMatch',
  },
  {
    title: '计价类别',
    dataIndex: 'valuationClass',
    key: 'valuationClass',
  },
  {
    title: '备注',
    dataIndex: 'remarks',
    key: 'remarks',
  },
];

let productProcess = [
  {
    title: '工序编号',
    dataIndex: 'workProcessCode',
    key: 'workProcessCode',
  },
  {
    title: '工序名称',
    dataIndex: 'zhName',
    key: 'zhName',
  },
  {
    title: '效率',
    dataIndex: 'processCapacity',
    key: 'processCapacity',
  },
  {
    title: '损耗',
    dataIndex: 'isWastage',
    key: 'isWastage',
  },
  {
    title: '重量范围',
    dataIndex: 'weightRange',
    key: 'weightRange',
  },
  {
    title: '备注',
    dataIndex: 'remarks',
    key: 'remarks',
  },
];


product = product.map(item => ({ ...item, sorter: true }));
material = material.map(item => ({ ...item, sorter: true }));
productProcess = productProcess.map(item => ({ ...item, sorter: true }));

export default {
  product,
  material,
  productProcess
};
