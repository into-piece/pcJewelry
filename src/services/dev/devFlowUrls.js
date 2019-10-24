const serviceArr = [
  // 生产流程
  {
    'name': 'productflow',
    'path': 'production-flow',
    'arr': [
      'list',
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
      'list',
      'saveOrUpdate',
      'delete',
      'approval',
      'revoke',
    ],
  },

];
export default serviceArr;
