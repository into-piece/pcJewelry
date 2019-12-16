export const product = [{ key: 'BOM名称', value: 'bName', type: 1 }];

export const material = [
  { key: 'bom名称', value: 'productNo', type: 2, list: 'boomList' },
  { key: '原料类别', value: 'filmCode', type: 2, list: 'listMstWordbook' },
  { key: '模具编号', value: 'membraneProportion', type: 2, list: 'listFilmSettingsDropDown' },
  { key: '模比', value: 'noteWaxImmediately' },
  {
    key: '原料小类',
    value: 'intoFilmPressure',
    type: 2,
    list: 'getTypeByWordbookCode',
  },
  {
    key: '领料部门',
    value: 'squeezeFilmPressure',
    type: 2,
    list: '',
  },
  {
    key: '配模',
    value: 'waxInjectionPressure',
    type: 6,
    arr: [
      { key: '是', value: 1 },
      { key: '否', value: 0 },
    ],
    initValue: 1,
  },
  { key: '原料编号', value: 'vacuumTime', type: 2, list: '' },
  {
    key: '注蜡时间(秒)',
    value: 'waxInjectionTime',
  },
  { key: '蜡件重量(克)', value: 'waxWeight', number: true, initValue: 0.0, step: 0.01, min: 0 },
  { key: '存放位置', value: 'position', type: 2, list: 'listMoldPositioningSettingsDropDown' },
  { key: '备注', value: 'remarks', type: 8, noNeed: true },
];

export default {
  product,
  material,
};
