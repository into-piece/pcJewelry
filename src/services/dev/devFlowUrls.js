const serviceArr = [
  // 生产流程
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
  // 员工工序
  {
    'name': 'productProcess',
    'path': 'production-process-relation',
    'arr': [
      'listProductionProcessRelation',
      'saveOrUpdate',
      'delete',
      'approval',
      'revoke',
    ],
  },

];
export default serviceArr;
