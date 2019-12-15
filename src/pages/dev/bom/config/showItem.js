import { statusConvert, numberConvert } from '@/utils/convert';

export const product = [
  { key: '产品编号', value: 'productNo' },
  { key: '类别', value: 'productType', cName: true },
  { key: '成色', value: 'purity', cName: true },
  { key: '新增日期', value: 'createTime', date: 'YYYY-MM-DD HH:mm:ss' },
  { key: '状态', value: 'status', convert: statusConvert },
];

export const material = [
  { key: '胶膜编号', value: 'productNo' },
  { key: '模具编号', value: 'filmCodeName' },
  { key: '配膜比例', value: 'membraneProportion', convert: numberConvert, fixed: 2 },
  { key: '注蜡机号', value: 'noteWaxImmediately' },
  { key: '进模压力(牛)', value: 'intoFilmPressure', convert: numberConvert, fixed: 1 },
  { key: '压膜压力(牛)', value: 'squeezeFilmPressure', convert: numberConvert, fixed: 1 },
  { key: '注蜡气压(帕)', value: 'waxInjectionPressure', convert: numberConvert, fixed: 1 },
  { key: '真空时间(秒)', value: 'vacuumTime', convert: numberConvert, fixed: 1 },
  { key: '注蜡时间(秒)', value: 'waxInjectionTime', convert: numberConvert, fixed: 1 },
  { key: '蜡件重量(克)', value: 'waxWeight', convert: numberConvert, fixed: 2 },
  { key: '存放位置', value: 'position', cName: true },
  { key: '备注', value: 'remarks' },
  { key: '状态', value: 'status', convert: statusConvert },
];

export default {
  product,
  material,
};
