import {statusConvert} from '@/utils/convert';

export const dieSet = [
  { key: '主模具号', value: 'mainMoldCode' },
  { key: '产品类别', value: 'productTypeName' },
  { key: '胶膜代码', value: 'filmCode' },
  { key: '存放地点', value: 'position' },
  { key: '创建人', value: 'createUserName' },
  { key: '创建时间', value: 'createTime' },
  { key: '修改人', value: 'modifierName' },
  { key: '修改时间', value: 'mtime' },
  { key: '状态', value: 'status' ,convert:statusConvert},

];

export const dieSetChild = [
  { 'key': '子模具号', 'value': 'childMoldCode' },
  { 'key': '石头重量', 'value': 'stoneWeight' },
  { 'key': '配膜比例', 'value': 'membraneProportion' },
  { 'key': '注蜡气压', 'value': 'waxInjectionPressure' },
  { 'key': '进模压力', 'value': 'intoFilmPressure' },
  { 'key': '压膜压力', 'value': 'squeezeFilmPressure' },
  { 'key': '注蜡时间', 'value': 'waxInjectionTime' },
  { 'key': '真空时间', 'value': 'vacuumTime' },
  { 'key': '注蜡机号', 'value': 'noteWaxImmediately' },
  { 'key': '状态', 'value': 'status' ,'convert':statusConvert,},
];


export default {
  dieSet,
  dieSetChild,
};
