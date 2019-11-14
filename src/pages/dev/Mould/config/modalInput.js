export const dieSet = [
  { 'key': '主模具号', 'value': 'mainMoldCode',},
  { 'key': '胶膜代码', 'value': 'filmCode', 'type': 2, 'list': 'listFilmSettingsDropDown',  },
  { 'key': '存放地点', 'value': 'position', 'type': 2, 'list': 'listMoldPositioningSettingsDropDown',},
  { 'key': '产品类别', 'value': 'productType', 'type': 2, 'list': 'H016009',},

];

export const dieSetChild = [
  { 'key': '子模具号', 'value': 'childMoldCode',  },
  { 'key': '进模压力', 'value': 'intoFilmPressure','number': true,'initValue':0.0},
  { 'key': '配膜比例', 'value': 'membraneProportion',},
  { 'key': '注蜡机号', 'value': 'noteWaxImmediately','number': true,'initValue':1},
  { 'key': '压膜压力', 'value': 'squeezeFilmPressure','number': true,'initValue':0.0},
  { 'key': '石头重量', 'value': 'stoneWeight','number': true,'initValue':0.0},
  { 'key': '真空时间', 'value': 'vacuumTime','number': true,'initValue':3.0},

  { 'key': '注蜡气压', 'value': 'waxInjectionPressure','number': true,'initValue':0.0},
  { 'key': '注蜡时间', 'value': 'waxInjectionTime','number': true,'initValue':3.0},
];


export default {
  dieSet,
  dieSetChild,
}
