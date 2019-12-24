export const product = [{ key: 'BOM名称', value: 'bName', type: 1 }];

export const material = [
  { key: 'bom名称', value: 'BomId', type: 2, list: 'bomlist' },
  { key: '原料类别', value: 'materialType', type: 2, list: 'listMstWordbook' },
  { key: '模具编号', value: 'modelNo', type: 2, list: 'listFilmSettingsDropDown' },
  { key: '模比', value: 'modulusRatio' },
  {
    key: '原料小类',
    value: 'materialSub',
    type: 2,
    list: 'getTypeByWordbookCode',
  },
  {
    key: '领料部门',
    value: 'acquisitionDepartment',
    type: 2,
    list: 'listDeptDropDown',
    noNeed: true,
  },
  {
    key: '配模',
    value: 'filmMatch',
    type: 6,
    arr: [
      { key: '是', value: 1 },
      { key: '否', value: 0 },
    ],
    initValue: 1,
    mType: 1,
  },
  { key: '原料编号', value: 'materialNo', type: 2, list: 'materialNoList' },
  { key: '单件用量', value: 'singleDosage', mType: 1 },
  { key: '规格', value: 'specification', noNeed: true },
  { key: '中文名', value: 'zhName', noNeed: true },
  { key: '英文名', value: 'enName', noNeed: true },
  { key: '重量单位', value: 'weightUnit', noNeed: true },
  { key: '计量单位', value: 'measureUnit', noNeed: true },
  { key: '单重', value: 'inventoryWeight', noNeed: true },
  { key: '单件用重', value: 'sheetWithHeavy', noNeed: true },
  { key: '计价类别', value: 'valuationClass', noNeed: true },
  { key: '损耗率', value: 'attritionRate', noNeed: true },
  { key: '备注', value: 'remarks', noNeed: true },
];

const proccess = [
  { key: '流程名称', value: 'processId', type: 2, list:'flowlistDropDown'},
]

const productProcess = [
  { key: '工序编号', value: 'workProcessCode', row: 2 },
  { key: '工序名称', value: 'zhName', row: 2 },
  { key: '耗损（%）', value: 'isWastage', row: 2 },
  { key: '效率（件/小时）', value: 'processCapacity', row: 2 ,number:true},
  { key: '图片', value: 'picPath', row: 1 ,noNeed:true},
  // { key: '文档', value: 'workProcessCode', row: 1 ,noNeed:true},
  { key: '备注', value: 'remarks', row: 1 ,noNeed:true},
];

export default {
  product,
  material,
  proccess,
  productProcess,
};
