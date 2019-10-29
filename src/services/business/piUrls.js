const serviceArr = [
  // 基础数据
  {
    'name': 'piHead',
    'path': 'proforma-invoice-head',
    'arr': [
      'queryPiHeadersnNotDone',
      'saveBasicMeasureUnit',
      'deleteBasicMeasureUnit',
      'approval',
      'revoke',
    ],
  },
  {
    'name': 'piDetail',
    'path': 'proforma-invoice-detail',
    'arr': [
      'listBasicColourSet',
      'saveBasicColourSet',
      'deleteBasicColourSet',
      'approval',
      'revoke',
    ],
  },



];
export default serviceArr;
