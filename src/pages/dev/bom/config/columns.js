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
    dataIndex: 'productNo',
    key: 'productNo',
  },
  {
    title: '原料编号',
    dataIndex: 'filmCodeName',
    key: 'filmCodeName',
  },
  {
    title: '规格',
    dataIndex: 'membraneProportion',
    key: 'membraneProportion',
  },
  {
    title: '单件用量',
    dataIndex: 'vacuumTime',
    key: 'vacuumTime',
  },
  {
    title: '单件用重',
    dataIndex: 'intoFilmPressure',
    key: 'intoFilmPressure',
  },
  {
    title: '效率',
    dataIndex: 'squeezeFilmPressure',
    key: 'squeezeFilmPressure',
  },
  {
    title: '领料部门',
    dataIndex: 'waxInjectionPressure',
    key: 'waxInjectionPressure',
  },
  {
    title: '配膜',
    dataIndex: 'noteWaxImmediately',
    key: 'noteWaxImmediately',
  },
  {
    title: '计价类别',
    dataIndex: 'waxInjectionTime',
    key: 'waxInjectionTime',
  },
  {
    title: '备注',
    dataIndex: 'waxWeight',
    key: 'waxWeight',
  },
];

product = product.map(item => ({ ...item, sorter: true }));
material = material.map(item => ({ ...item, sorter: true }));

export default {
  product,
  material,
};
