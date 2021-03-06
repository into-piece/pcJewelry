const serviceArr = [
  // 基础数据
  {
    'name': 'measureUnit',
    'path': 'measure-unit',
    'arr': [
      'listBasicMeasureUnit',
      'saveBasicMeasureUnit',
      'deleteBasicMeasureUnit',
      'approval',
      'revoke',
    ],
  },
  {
    'name': 'colorPercentage',
    'path': 'colour-set',
    'arr': [
      'listBasicColourSet',
      'saveBasicColourSet',
      'deleteBasicColourSet',
      'approval',
      'revoke',
    ],
  },
  {
    'name': 'colorSetting',
    'path': 'colour-settings',
    'arr': [
      'listBasicColourSettings',
      'saveOrUpdate',
      'deleteBasicColourSettings',
      'approval',
      'revoke',
    ],
  },
  {
    'name': 'electroplateSetting',
    'path': 'plating-color-setting',
    'arr': [
      'listBasicPlatingColorSetting',
      'saveOrUpdate',
      'deleteBasicPlatingColorSetting',
      'approval',
      'revoke',
    ],
  },
  {
    'name': 'shapeSetting',
    'path': 'shape-settings',
    'arr': [
      'listBasicShapeSettings',
      'saveOrUpdate',
      'deleteBasicShapeSettings',
      'approval',
      'revoke',
    ],
  },
  {
    'name': 'specificationSetting',
    'path': 'specification-settings',
    'arr': [
      'listBasicSpecificationSettings',
      'saveBasicSpecificationSettings',
      'deleteBasicSpecificationSettings',
      'approval',
      'revoke',
    ],
  },
  {
    'name': 'materialsGrade',
    'path': 'raw-material-grade-settings',
    'arr': [
      'listBasicRawMaterialGradeSettings',
      'saveOrUpdate',
      'deleteBasicRawMaterialGradeSettings',
      'approval',
      'revoke',
    ],
  },
  {
    'name': 'stoneCutter',
    'path': 'stone-cutting-setting',
    'arr': ['listBasicStoneCuttingSetting', 'saveOrUpdate', 'delete', 'approval', 'revoke'],
  },
  {
    'name': 'insertStoneTechnology',
    'path': 'gem-set-process',
    'arr': ['listGemSetProcess', 'saveOrUpdate', 'deleteGemSetProcess', 'approval', 'revoke'],
  },

  {
    'name': 'rubberMouldSetting',
    'path': 'film-settings',
    'arr': ['listFilmSettings', 'saveOrUpdate', 'deleteFilmSettings', 'approval', 'revoke'],
  },
  {
    'name': 'mouldPosition',
    'path': 'mold-positioning-settings',
    'arr': [
      'listMoldPositioningSettings',
      'saveOrUpdate',
      'deleteMoldPositioningSettings',
      'approval',
      'revoke',
    ],
  },


];
export default serviceArr;
