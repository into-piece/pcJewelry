const serviceArr = [
  // 主材
  {
    'name': 'productFlow',
    'path': 'production-flow',
    'arr': [
      'listProductionFlow',
      'saveOrUpdate',
      'delete',
      'approval',
      'revoke',
    ],
  },
  // 配件
  {
    'name': 'productProcess',
    'path': 'product-process',
    'arr': [
      'listProductProcess',
      'saveOrUpdate',
      'delete',
      'approval',
      'revoke',
    ],
  },

];
export default serviceArr;
