// manuArr是 =》menu配置提供遍历
export const manuArr = [
  'material',
  'accessories',
];

// modalContent => 每个menu不同的增加弹窗填写信息
export const modalContent = {
  'material': [
    { 'key': '成色', 'value': 'assaying', 'name': true, 'list': 'gemSetProcessDropDown', 'type': 2 },
    { 'key': '中文名', 'value': 'zhName', 'noNeed': true },
    { 'key': '英文名', 'value': 'enName', 'noNeed': true },
    {
      'key': '重量单位',
      'value': 'weightUnit',
      'noNeed': true,
      'name': true,
      'list': 'getBUMropDown',
      'type': 2,
      'dfv': '8aa1fd4c3774d2c63f564f98c3471233',
    },
    { 'key': '计价类别', 'value': 'valuationClass', 'noNeed': true, 'name': true, 'type': 3, 'dfv': '0' },
    { 'key': '最低采购量', 'value': 'minimumPurchaseQuantity', 'noNeed': true },
    { 'key': '备注', 'value': 'remarks', 'noNeed': true },

  ],
  'accessories': [
    // 1)	原料编号：必填项；系统自动生成；生成规则为“成色代码-类别代码-形状代码-规格代码”；输入框禁用，根据下拉的选择自动拼接并显示。

    {span:8, disable:true,'key': '原料编号', 'value': 'accessorieCode' },
    {span:8, 'key': '成色', 'value': 'assaying', 'name': true, 'list': 'gemSetProcessDropDown', 'type': 2 },
    {span:8, 'key': '形状', 'value': 'shape', 'name': true, 'list': 'shapeSettingList', 'type': 2  },
    {span:8, 'key': '规格', 'value': 'specification', 'name': true , 'list': 'specificationSettingList', 'type': 2 },
    {span:8, 'key': '中文名', 'value': 'zhName', 'noNeed': true },
    {span:8, 'key': '英文名', 'value': 'enName', 'noNeed': true },
    {span:8, 'key': '计量单位', 'value': 'measureUnit', 'name': true , 'list': 'getBUMropDown', 'type': 2 },
    {
      span:8,
      'key': '重量单位',
      'value': 'weightUnit',
      'name': true,
      'list': 'getBUMropDown',
      'type': 2,
    },
    {span:8, 'key': '计价类别', 'value': 'valuationClass', 'name': true, 'type': 3, 'dfv': '1' },
    {span:8, 'key': '单重', 'value': 'inventoryWeight', 'noNeed': true },
    {span:8, 'key': '备注', 'value': 'remarks', 'noNeed': true },
  ],

};