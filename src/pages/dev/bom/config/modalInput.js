export const dieSet = [
  { 'key': '产品编号', 'value': 'productNo', 'type': 2, 'list': 'listDieSetSubDropDown',  },
  { 'key': '成色', 'value': 'purity', 'type': 2, 'list': 'listBasicColourSetDropDown',  },
  { 'key': '产品类别', 'value': 'productType', 'type': 2, 'list': 'H016009',},
];

export const bom = [
  { 'key': '胶膜编号', 'value': 'productNo', disable:true },
  { 'key': '模具编号', 'value': 'filmCode','type': 2, 'list': 'listFilmSettings',  },
  { 'key': '配膜比例', 'value': 'membraneProportion','number': true,'min':0,step:0.01},
  { 'key': '注蜡机号', 'value': 'noteWaxImmediately','number': true,'initValue':1,'min':0},
  { 'key': '进模压力(牛)', 'value': 'intoFilmPressure','number': true,'initValue':0.0,'step':0.1,'min':0},
  { 'key': '压膜压力(牛)', 'value': 'squeezeFilmPressure','number': true,'initValue':0.0,'step':0.1,'min':0},
  { 'key': '注蜡气压(帕)', 'value': 'waxInjectionPressure','number': true,'initValue':0.0,'step':0.1,'min':0},
  { 'key': '真空时间(秒)', 'value': 'vacuumTime','number': true,'initValue':3.0,'step':0.1,'min':0},
  { 'key': '注蜡时间(秒)', 'value': 'waxInjectionTime','number': true,'initValue':3.0,'step':0.1,'min':0},
  { 'key': '蜡件重量(克)', 'value': 'waxWeight','number': true,'initValue':0.00,'step':0.01,'min':0},
  { 'key': '存放位置', 'value': 'position', 'type': 2, 'list': 'listMoldPositioningSettingsDropDown',},
  { 'key': '备注', 'value': 'remarks',   type:8,noNeed:true },
];


export default {
  dieSet,
  bom,
}
