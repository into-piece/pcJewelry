// manuArr是 =》menu配置提供遍历
export const manuArr = [
  'material',
  'accessories',
];

// modalContent => 每个menu不同的增加弹窗填写信息
export const modalContent = {
  material: [
    { 'key': '成色', 'value': 'assaying', 'name': true, 'list': 'gemSetProcessDropDown', 'type': 2  ,search:true},
    { 'key': '类别', 'value': 'sId', 'name': true, 'list': 'H016001', 'type': 2},
    { 'key': '中文名', 'value': 'zhName', 'noNeed': true ,search:true },
    { 'key': '英文名', 'value': 'enName', 'noNeed': true  ,search:true},
    {
      'key': '重量单位',
      'value': 'weightUnit',
      'noNeed': true,
      'name': true,
      'list': 'getBUMropDown',
      'type': 2,
      'dfv': '8aa1fd4c3774d2c63f564f98c3471233',
    search:true
    },
    { 'key': '计价类别', 'value': 'valuationClass', 'noNeed': true, 'name': true, 'type': 3, 'dfv': '0' ,search:true },
    { 'key': '库存重量', 'value': 'repertoryWeight', 'noNeed': true,'dfv': '0'  ,search:true },
    { 'key': '最低采购量', 'value': 'minimumPurchaseQuantity', 'noNeed': true  ,search:true},
    { 'key': '状态', 'value': 'status',   'list': 'statusList', 'type': 2  ,noedit:true},
    { 'key': '备注', 'value': 'remarks', 'noNeed': true  ,search:true},

  ],
  accessories: [
    // 1)	原料编号：必填项；系统自动生成；生成规则为“成色代码-类别代码-形状代码-规格代码”；输入框禁用，根据下拉的选择自动拼接并显示。

    {span:8, disable:true,'key': '原料编号', 'value': 'materialNo'  ,search:true},
    {span:8, 'key': '成色', 'value': 'assaying', 'name': true, 'list': 'H016003', 'type': 2 ,search:true },
    {span:8, 'key': '类别', 'value': 'sId', 'name': true, 'list': 'listMstWordbookDropH016001', 'type': 2 },
    {span:8, 'key': '形状', 'value': 'shape', 'name': true, 'list': 'shapeSettingList', 'type': 2  ,search:true },
    {span:8, 'key': '规格', 'value': 'specification', 'name': true , 'list': 'specificationSettingList', 'type': 2  ,search:true},
    {span:8, 'key': '中文名', 'value': 'zhName', 'noNeed': true  ,search:true},
    {span:8, 'key': '英文名', 'value': 'enName', 'noNeed': true  ,search:true},
    {span:8, 'key': '计量单位', 'value': 'measureUnit', 'name': true , 'list': 'getBUMropDown', 'type': 2 ,search:true },
    {
      span:8,
      'key': '重量单位',
      'value': 'weightUnit',
      'name': true,
      'list': 'getBUMropDown',
      'type': 2,
      search:true

    },
    {span:8, 'key': '计价类别', 'value': 'valuationClass', 'name': true, 'type': 3, 'dfv': '1',search:true },
    {span:8, 'key': '单重', 'value': 'inventoryWeight', 'noNeed': true ,search:true},
    {span:8,  'key': '状态', 'value': 'status',   'list': 'statusList', 'type': 2  ,noedit:true},
    {span:8, 'key': '备注', 'value': 'remarks', 'noNeed': true },

  ],
  stone: [
    // 1)	原料编号：必填项；系统自动生成；生成规则为“类别代码-形状代码-切工代码-颜色代码-等级编号-规格代码”
    {span:8, disable:true,'key': '原料编号', 'value': 'materialNo' ,search:true},
    {span:8, 'key': '类别', 'value': 'sId', 'name': true, 'list': 'H016002', 'type': 2 },
    {span:8, 'key': '形状', 'value': 'shape', 'name': true, 'list': 'shapeSettingList', 'type': 2 ,search:true },
    {span:8, 'key': '规格', 'value': 'specification', 'name': true , 'list': 'specificationSettingList', 'type': 2,search:true },
    {span:8, 'key': '切工', 'value': 'cut', 'name': true , 'list': 'listCutDrop', 'type': 2 ,search:true},
    {span:8, 'key': '颜色', 'value': 'color', 'name': true , 'list': 'listColorDrop', 'type': 2,search:true },
    {span:8, 'key': '等级', 'value': 'quality', 'name': true , 'list': 'listQualityDrop', 'type': 2,search:true },
    {span:8, 'key': '中文名', 'value': 'zhName', 'noNeed': true,search:true },
    {span:8, 'key': '英文名', 'value': 'enName', 'noNeed': true ,search:true},
    {span:8, 'key': '是否配料模块', 'value': 'isIngredient', 'name': true , 'type': 4 , 'noNeed': true },
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
    {span:8,  'key': '状态', 'value': 'status',   'list': 'statusList', 'type': 2  ,noedit:true},
    {span:8, 'key': '备注', 'value': 'remarks', 'noNeed': true },
  ],
  wrapper: [
    // 1)	原料编号：必填项；系统自动生成；生成规则为“类别代码-形状代码-颜色代码-规格代码”
    {span:8, disable:true,'key': '原料编号', 'value': 'materialNo' ,search:true},
    {span:8, 'key': '类别', 'value': 'sId', 'name': true, 'list': 'H016004', 'type': 2 },
    {span:8, 'key': '形状', 'value': 'shape', 'name': true, 'list': 'shapeSettingList', 'type': 2 ,search:true },
    {span:8, 'key': '规格', 'value': 'specification', 'name': true , 'list': 'specificationSettingList', 'type': 2,search:true },
    {span:8, 'key': '颜色', 'value': 'color', 'name': true , 'list': 'listColorDrop', 'type': 2,search:true },
    {span:8, 'key': '基本材料', 'value': 'basicMaterials', 'noNeed': true },
    {span:8, 'key': '条码', 'value': 'barCode', 'noNeed': true },
    {span:8, 'key': '售价', 'value': 'price', 'noNeed': true  },
    {span:8, 'key': '成本价', 'value': 'costPirce', 'noNeed': true  },
    {span:8, 'key': '中文名', 'value': 'zhName', 'noNeed': true,search:true },
    {span:8, 'key': '英文名', 'value': 'enName', 'noNeed': true ,search:true},
    {span:8, 'key': '计量单位', 'value': 'measureUnit', 'name': true, 'list': 'getBUMropDown', 'type': 2 },
    {
      span:8,
      'key': '重量单位',
      'value': 'weightUnit',
      'name': true,
      'list': 'getBUMropDown',
      'type': 2,
    },
    {span:8, 'key': '计价类别', 'value': 'valuationClass', 'name': true, 'type': 3, 'dfv': '1' },
    {span:8, 'key': '单重', 'value': 'singleWeight', 'noNeed': true },
    {span:8,  'key': '状态', 'value': 'status',   'list': 'statusList', 'type': 2  ,noedit:true},
    {span:8, 'key': '备注', 'value': 'remarks', 'noNeed': true },
  ],
  otherMaterial: [
    // 1)	原料编号：必填项；系统自动生成；1)	；生成规则为“类别代码”+流水号；
    {span:8, disable:true,'key': '原料编号', 'value': 'materialNo' ,search:true},
    {span:8, 'key': '类别', 'value': 'sId', 'name': true, 'list': 'H016005', 'type': 2 ,search:true  },
    {span:8, 'key': '中文名', 'value': 'zhName', 'noNeed': true  ,search:true },
    {span:8, 'key': '英文名', 'value': 'enName', 'noNeed': true  ,search:true },
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
    {span:8, 'key': '状态', 'value': 'status',   'list': 'statusList', 'type': 2,noedit:true},

    {span:8, 'key': '备注', 'value': 'remarks', 'noNeed': true },
  ],
  auxiliaryMaterial:[
    //  “类别代码-形状代码-颜色代码-规格代码”；
    {span:8, disable:true,'key': '原料编号', 'value': 'materialNo' ,search:true},
    {span:8, 'key': '类别', 'value': 'sId', 'name': true, 'list': 'H016005', 'type': 2  ,search:true},
    {span:8, 'key': '颜色', 'value': 'color', 'name': true, 'list': 'listColorDrop', 'type': 2 ,search:true },
    {span:8, 'key': '形状', 'value': 'shape', 'name': true, 'list': 'shapeSettingList', 'type': 2   ,search:true},
    {span:8, 'key': '规格', 'value': 'specification', 'name': true , 'list': 'specificationSettingList', 'type': 2  ,search:true},
    {span:8, 'key': '中文名', 'value': 'zhName', 'noNeed': true ,search:true },
    {span:8, 'key': '英文名', 'value': 'enName', 'noNeed': true ,search:true },
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
    {span:8, 'key': '单重', 'value': 'singleWeight', 'noNeed': true },
    {span:8, 'key': '状态', 'value': 'status',   'list': 'statusList', 'type': 2 ,noedit:true},
    {span:8, 'key': '备注', 'value': 'remarks', 'noNeed': true },
  ]

};
