// manuArr是 =》menu配置提供遍历
export const manuArr = [
  "measureUnit",
  "colorPercentage",
  "colorSetting",
  "electroplateSetting",
  "shapeSetting",
  "specificationSetting",
  "materialsGrade",
  "stoneCutter",
  "insertStoneTechnology",
  "rubberMouldSetting",
  "mouldPosition",
  "categorySet"
]

// modalContent => 每个menu不同的增加弹窗填写信息
export const modalContent = {
"measureUnit": [
  { "key": "单位代码", "value": "unitCode" },
  { "key": "中文名", "value": "zhName" },
  { "key": "英文名", "value": "enName" }
],
  "colorPercentage": [
  { "key": "产品材料", "value": "productMaterial" },
  { "key": "中文名", "value": "zhName" },
  { "key": "英文名", "value": "enName", "noNeed": true },
  { "key": "成色系数", "value": "assayingTheCoefficient" },
  {
    "key": "返主材类别",
    "value": "rtnMainMaterial",
    "noNeed": true,
    "type": 2,
    "list": "listMstWordbookDrop"
  }
],
  "colorSetting": [
  { "key": "颜色代码", "value": "unitCode" },
  { "key": "中文名", "value": "zhName" },
  { "key": "英文名", "value": "enName" }
],
  "electroplateSetting": [
  { "key": "电镀颜色代码", "value": "colorCode" },
  { "key": "简称", "value": "shotName" },
  { "key": "中文名", "value": "zhName" },
  { "key": "英文名", "value": "enName" },
  { "key": "含镍", "value": "isNickel", "type": 3 }
],
  "shapeSetting": [
  { "key": "形状代码", "value": "shapeCode" },
  { "key": "中文名", "value": "zhName" },
  { "key": "英文名", "value": "enName" }
],
  "specificationSetting": [
  { "key": "规格代码", "value": "specificationCode" },
  { "key": "中文名", "value": "zhName" },
  { "key": "英文名", "value": "enName" }
],
  "materialsGrade": [
  { "key": "等级代码", "value": "gradeCode" },
  { "key": "中文名", "value": "zhName" },
  { "key": "英文名", "value": "enName" }
],
  "stoneCutter": [
  { "key": "切工代码", "value": "cuttingCode" },
  { "key": "中文名", "value": "zhName" },
  { "key": "英文名", "value": "enName" }
],
  "insertStoneTechnology": [
  { "key": "切工代码", "value": "cuttingCode", "type": 2, "list": "gemSetProcessDropDown" },
  { "key": "类别", "value": "category" },
  { "key": "中文名", "value": "zhName" },
  { "key": "英文名", "value": "enName" },
  { "key": "工费", "value": "costs" },
  { "key": "备注", "value": "remarks" }
],
  "rubberMouldSetting": [
  { "key": "中文名", "value": "zhName" },
  { "key": "英文名", "value": "enName" },
  { "key": "胶膜尺寸", "value": "filmSize" },
  { "key": "胶膜片数", "value": "filmNumber" },
  { "key": "工费", "value": "costs" },
  { "key": "备注", "value": "remarks" }
],
  "mouldPosition": [
  { "key": "仓位编号", "value": "positionCode" },
  { "key": "房间号", "value": "roomNum" },
  { "key": "橱柜号", "value": "cabinetNum" },
  { "key": "抽屉号", "value": "drawerNum" },
  { "key": "备注", "value": "remarks" }
],
  "categorySet": [
    { "key": "类别代码", "value": "unitCode" },
    { "key": "中文名", "value": "zhName" , "noNeed": true},
    { "key": "英文名", "value": "enName" , "noNeed": true},
    { "key": "类别", "value": "bType",'name': true, "type": 2, "list": "listMstWordbookDroph015"  },
    { "key": "小类", "value": "sType" ,'name': true, "type": 2, "list": "listMstWordbookDroph016" },
  ],
}
