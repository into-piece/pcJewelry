const serviceArr = [
  // 主材
  {
    'name': 'material',
    'path': 'principal-material',
    'arr': [
      'listPrincipalMaterial',
      'savePrincipalMaterial',
      'deletePrincipalMaterial',
      'approval',
      'revoke',
    ],
  },
  // 配件
  {
    'name': 'accessories',
    'path': 'accessories',
    'arr': [
      'listAccessories',
      'saveOrUpdate',
      'deleteAccessories',
      'approval',
      'revoke',
    ],
  },
  // 石材
  {
    'name': 'stone',
    'path': 'stone',
    'arr': [
      'list',
      'saveOrUpdate',
      'delete',
      'approval',
      'revoke',
    ],
  },
  // 包装
  {
    'name': 'wrapper',
    'path': 'wrapper',
    'arr': [
      'list',
      'saveOrUpdate',
      'delete',
      'approval',
      'revoke',
    ],
  },
  // 辅材
  {
    'name': 'auxiliaryMaterial',
    'path': 'auxiliary-material',
    'arr': [
      'list',
      'saveOrUpdate',
      'delete',
      'approval',
      'revoke',
    ],
  },
  // 其他
  {
    'name': 'otherMaterial',
    'path': 'other-material',
    'arr': [
      'list',
      'saveOrUpdate',
      'delete',
      'approval',
      'revoke',
    ],
  },


];
export default serviceArr;
