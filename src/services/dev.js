/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-16 23:48:54
 * @LastEditTime: 2019-08-17 23:51:37
 * @LastEditors: Please set LastEditors
 */
import request from '@/utils/request';
import devBasicUrls from './dev/devBasicUrls';
import devRawUrls from './dev/devRawUrls';
import devFlowUrls from './dev/devFlowUrls';
import devFlowCostUrls from './dev/devFlowCostUrls';
import devboom from './dev/bom';
import devnewbom from './dev/newbom';
import devDieUrls from './dev/devDieUrls';
// import bom from './dev/bom';
import { getCurrentUser } from '../utils/authority';

const env = process.env.NODE_ENV === 'production' ? '' : '/server';
const prefix = `${env}/business/develop/basic`;

const returnType = {
  1: 'listBasic',
  2: 'addBasic',
  3: 'deleteBasic',
  4: 'approve',
  5: 'revoke',
  6: 'copy',
  7: 'batchAddBasic',
};
const rType = {
  1: 'list',
  2: 'add',
  3: 'delete',
  4: 'approve',
  5: 'revoke',
  6: 'copy',
};

// 开发-基础资料
const resultBasic = devBasicUrls.map(({ name, arr, path }) =>
  arr.map((item, index) => ({
    key: returnType[index + 1] + name,
    path: `/${path}/${item}`,
  }))
);

// 开发-类别管理
const resultRaw = devRawUrls.map(({ name, arr, path }) =>
  arr.map((item, index) => ({
    key: returnType[index + 1] + name,
    path: `/${path}/${item}`,
  }))
);

// 开发-生产流程
const resultFLow = devFlowUrls.map(({ name, arr, path }) =>
  arr.map((item, index) => ({
    key: rType[index + 1] + name,
    path: `/${path}/${item}`,
    prefix1: `${env}/business/develop/production`,
  }))
);

// 开发-模框设定
const resultSet = devDieUrls.map(({ name, arr, path }) =>
  arr.map((item, index) => ({
    key: rType[index + 1] + name,
    path: `/${path}/${item}`,
    prefix1: `${env}/business/develop.die`,
  }))
);

// 开发-流程工费
const resultFLowCost = devFlowCostUrls.map(({ name, arr, path }) =>
  arr.map((item, index) => ({
    key: rType[index + 1] + name,
    path: `/${path}/${item}`,
    prefix1: `${env}/business/develop/cost`,
  }))
);

// 开发-boom
const bomlist = devboom.serviceArr.map(({ name, arr, path }) =>
  arr.map((item, index) => ({
    key: name + rType[index + 1],
    path: `/${path}/${item}`,
    prefix1: `${env}/business`,
  }))
);
console.log(bomlist);

// 开发-新款bom
const newBomList = devnewbom.serviceArr.map(({ name, arr, path }) =>
  arr.map((item, index) => ({
    key: name + rType[index + 1],
    path: `/${path}/${item}`,
    prefix1: `${env}/business`,
  }))
);
console.log('newBomList',newBomList);

const resultArr = [
  ...resultBasic.flat(),
  ...resultRaw.flat(),
  ...resultFLow.flat(),
  ...resultFLowCost.flat(),
  ...resultSet.flat(),
  ...bomlist.flat(),
  ...newBomList.flat(),
  ...devboom.extraArr,
  ...devnewbom.extraArr,
  { key: 'listGemSetProcessDropDown', path: '/gem-set-process/listGemSetProcessDropDown' },
  { key: 'listBasicMeasureUnitDropDown', path: '/measure-unit/listBasicMeasureUnitDropDown' },
  { key: 'listBasicShapeSettingsDropDown', path: '/shape-settings/listBasicShapeSettingsDropDown' },
  {
    key: 'listBasicSpecificationSettingsDropDown',
    path: '/specification-settings/listBasicSpecificationSettingsDropDown',
  },

  {
    key: 'approvecategorySet',
    path: '/develop/category/develop-basic-category-set/approval',
    prefix1: `${env}/business`,
  },
  {
    key: 'deleteBasiccategorySet',
    path: '/develop/category/develop-basic-category-set/delete',
    prefix1: `${env}/business`,
  },
  {
    key: 'revokecategorySet',
    path: '/develop/category/develop-basic-category-set/revoke',
    prefix1: `${env}/business`,
  },
  {
    key: 'listBasiccategorySet',
    path: '/develop/category/develop-basic-category-set/listCategorySet',
    prefix1: `${env}/business`,
  },
  {
    key: 'addBasiccategorySet',
    path: '/develop/category/develop-basic-category-set/saveOrUpdate',
    prefix1: `${env}/business`,
  },

  {
    key: 'listBasictypes',
    path: '/develop/basic/develop-material-set/list',
    prefix1: `${env}/business`,
  },
  // { key: 'listBasictypes', path: '/develop/category/develop-basic-category-set/list', prefix1: `${env  }/business` },

  {
    key: 'getTypeByWordbookCode',
    path: '/develop/category/develop-basic-category-set/getTypeByWordbookCode',
    prefix1: `${env}/business`,
  },
  {
    key: 'getlistBrands',
    path: '/basic/brand/listBrands',
    prefix1: `${env}/business`,
  },
  {
    key: 'getCutDrop',
    path: '/develop/basic/stone-cutting-setting/listBasicStoneCuttingSettingDropDown',
    prefix1: `${env}/business`,
  },
  {
    key: 'getColorDrop',
    path: '/develop/basic/colour-settings/listBasicColourSettingsDropDown',
    prefix1: `${env}/business`,
  },
  {
    key: 'getQualityDrop',
    path: '/develop/basic/raw-material-grade-settings/listBasicRawMaterialGradeSettingsDropDown',
    prefix1: `${env}/business`,
  },

  {
    key: 'listDieSetSubDropDown',
    path: '/develop.die/set/listDieSetSubDropDown',
    prefix1: `${env}/business`,
  }, // 胶膜管理 产品编号下拉
  { key: 'listUsers', path: 'listUsers', prefix1: `${env}/` }, // 用户下拉
  { key: 'listMstWordbook', path: '/mst-wordbook/listMstWordbook', prefix1: `${env}/business/sys` }, // 获取为报价的产品参数
  { key: 'listDeptDropDown', path: 'sys.user/sys-role/listDeptDropDown', prefix1: `${env}/` }, // 部门下拉
  { key: 'listBasicColourSetDropDown', path: '/colour-set/listBasicColourSetDropDown' }, // 成色下拉
  {
    key: 'listProductionFlowDropDown',
    path: '/production-flow/listDropDown',
    prefix1: `${env}/business/develop/production`,
  }, // 生产流程下拉
  {
    key: 'listFilmSettingsDropDown',
    path: '/film-settings/listFilmSettingsDropDown',
    prefix1: `${env}/business/develop/basic`,
  }, // 胶膜代码下拉
  {
    key: 'listMoldPositioningSettingsDropDown',
    path: '/mold-positioning-settings/listMoldPositioningSettingsDropDown',
    prefix1: `${env}/business/develop/basic`,
  }, // 胶膜仓位编号下拉
  {
    key: 'productBomRevokeListApi',
    path: '/develop.bom/develop-bom/listDraftProductDropDown',
    prefix1: `${env}/business`,
  }, // bom未审批产品下拉接口
  {
    key: 'bomSynchronize',
    path: '/develop.bom/develop-bom/synchronize',
    prefix1: `${env}/business`,
  }, // bom数据同步接口
];

// console.log(resultArr, '============')
// debugger

// 请求url配置
const outPutObject = {};
resultArr.forEach(({ key, path, prefix1 }) => {
  outPutObject[key] = async params => {
    return request((prefix1 || prefix) + path, {
      method: 'POST',
      headers: {
        token: getCurrentUser() ? getCurrentUser().token : '',
      },
      data: params,
    });
  };
});
// console.log(outPutObject)
// debugger

export default outPutObject;
