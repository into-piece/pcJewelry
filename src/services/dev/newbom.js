const env = process.env.NODE_ENV === 'production' ? '' : '/server';
const prefix1 = `${env  }/business/develop.newbom/develop-new-bom`;
const prefix2 = `${env  }/business/develop.newbom/develop-new-bom-dt`;

const serviceArr = [
  // 模具
  {
    name: 'newBom',
    path: 'develop.newbom/develop-new-bom',
    arr: ['list', 'saveOrUpdate', 'delete', 'approval', 'revoke', 'copy'],
  },
  {
    name: 'newBomDt',
    path: 'develop.newbom/develop-new-bom-dt',
    arr: ['list', 'saveOrUpdate', 'delete', 'approval', 'revoke', 'copy'],
  },
  {
    name: 'newWorkFlow',
    path: 'develop.newbom/develop-new-bom-work-flow',
    arr: ['list', 'saveOrUpdate', 'delete', 'approval', 'revoke', 'copy'],
  },
  {
    name: 'newBomProcess',
    path: 'develop.newbom/develop-new-bom-work-process',
    arr: ['list', 'saveOrUpdate', 'delete', 'approval', 'revoke', 'copy'],
  },
];

const extraArr = [
  { key: 'getsample', path: '/listProduct', prefix1 },
  { key: 'getMaterialList', path: '/list',prefix1: prefix2 },
  { key: 'listMstWordbook', path: '/listMstWordbook', prefix1: `${env  }/sys/mst-wordbook` },
  {
    key: 'listFilmSettingsDropDown',
    path: '/listFilmSettingsDropDown',
    prefix1: `${env  }/develop/basic/film-settings`,
  },
  {
    key: 'listStoneDropDown',
    path: '/list',
    prefix1: `${env  }/business/develop/basic/stone`,
  },
  {
    key: 'listPrincipalMaterialDropDown',
    path: '/listPrincipalMaterial',
    prefix1: `${env  }/business/develop/basic/principal-material`,
  },
  {
    key: 'listAccessoriesDropDown',
    path: '/listAccessories',
    prefix1: `${env  }/business/develop/basic/accessories`,
  },
  {
    key: 'listWrapperDropDown',
    path: '/list',
    prefix1: `${env  }/business/develop/basic/wrapper`,
  },
  {
    key: 'listAuxiliaryMaterialDropDown',
    path: '/list',
    prefix1: `${env  }/business/develop/basic/auxiliary-material`,
  },
  {
    key: 'listGemSetProcessDropDown',
    path: '/listGemSetProcessDropDown',
    prefix1: `${env  }/business/develop/basic/gem-set-process/`,
  },
  {
    key: 'listDeptDropDown',
    path: '/listDeptDropDown',
    prefix1: `${env  }/sys.user/sys-role/listDeptDropDown`,
  },
  {
    key: 'newBomProcessDropdown',
    path: '/list',
    prefix1: `${env}/business/develop.newbom/develop-new-bom-work-flow`,
  },
  {
    key: 'flowlistDropDown',
    path: '/listDropDown ',
    prefix1: `${env}/business/develop/production/production-flow`,
  },
  {
    key: 'listBasicMeasureUnitDropDown',
    path: '/listBasicMeasureUnitDropDown ',
    prefix1: `${env}/business/develop/basic/measure-unit`,
  },
  {
    key: 'listBasicMeasureUnitDropDown',
    path: '/listBasicMeasureUnitDropDown ',
    prefix1: `${env}/business/develop/basic/measure-unit`,
  },

  // 类别下拉
  {
    key: 'productTypeDropDown',
    path: '/dropdown ',
    prefix1: `${env}/business/develop/category/develop-basic-category-set`,
  },

   // 类别下拉
   {
    key: 'listCustomerDropDown',
    path: '/listCustomerDropDown ',
    prefix1: `${env}/business/business/customer`,
  },
  // 工序名称
  {
    key: 'processRelationDropDown',
    path: '/listDropDown ',
    prefix1: `${env}/business/develop/production/production-process-relation`,
  },
  {
    key: 'listChildDieSetDropDown',
    path: '/listChildDieSetDropDown ',
    prefix1: `${env}/business/develop.die/develop-child-die-set`,
  },
  {
    key: 'newBomUpdateSampletExplain',
    path: '/updateSampleExplain ',
    prefix1: `${env}/business/develop.newbom/develop-new-bom`,
  },
  {
    key: 'newBomList',
    path: '/list ',
    prefix1: `${env}/business/develop.newbom/develop-new-bom`,
  },
];
export default { serviceArr, extraArr };
