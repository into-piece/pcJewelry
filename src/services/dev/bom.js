const env = process.env.NODE_ENV === 'production' ? '' : '/server';
const prefix1 = env + '/business/develop.bom/develop-bom';
const prefix2 = env + '/business/develop.bom/develop-bom-dt';

const serviceArr = [
  // 模具
  {
    name: 'bom',
    path: 'develop.bom/develop-bom',
    arr: ['list', 'saveOrUpdate', 'delete', 'approval', 'revoke', 'copy'],
  },
];

const extraArr = [
  { key: 'getproduct', path: '/listProduct', prefix1 },
  { key: 'materialList', path: '/list', prefix1: prefix2 },
  { key: 'listMstWordbook', path: '/listMstWordbook', prefix1: env + '/sys/mst-wordbook' },
  {
    key: 'listFilmSettingsDropDown',
    path: '/listFilmSettingsDropDown',
    prefix1: env + '/develop/basic/film-settings',
  },
  {
    key: 'listStoneDropDown',
    path: '/listStoneDropDown',
    prefix1: env + '/bussiness/develop/basic/stone',
  },
  {
    key: 'listPrincipalMaterialDropDown',
    path: '/listPrincipalMaterialDropDown',
    prefix1: env + '/bussiness/develop/basic/principal-material',
  },
  {
    key: 'listAccessoriesDropDown',
    path: '/listAccessoriesDropDown',
    prefix1: env + '/bussiness/develop/basic/accessories',
  },
  {
    key: 'listWrapperDropDown',
    path: '/listWrapperDropDown',
    prefix1: env + '/bussiness/develop/basic/wrapper',
  },
  {
    key: 'listAuxiliaryMaterialDropDown',
    path: '/listAuxiliaryMaterialDropDown',
    prefix1: env + '/bussiness/develop/basic/auxiliary-material',
  },
];
export default { serviceArr, extraArr };
