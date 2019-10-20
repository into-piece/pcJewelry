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
import devDieUrls from './dev/devDieUrls';
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
const resultBasic = devBasicUrls.map(({ name, arr, path }) => (
  arr.map((item, index) => (
    {
      key: returnType[index + 1] + name,
      path: `/${path}/${item}`,
    }
  ))
));

// 开发-类别管理
const resultRaw = devRawUrls.map(({ name, arr, path }) => (
  arr.map((item, index) => (
    {
      key: returnType[index + 1] + name,
      path: `/${path}/${item}`,
    }
  ))

));

// 开发-生产流程
const resultFLow = devFlowUrls.map(({ name, arr, path }) => (
  arr.map((item, index) => (
    {
      key: rType[index + 1] + name,
      path: `/${path}/${item}`,
      prefix1:`${env}/business/develop/production`
    }
  ))

));

// 开发-模具设定
const resultSet = devDieUrls.map(({ name, arr, path }) => (
  arr.map((item, index) => (
    {
      key: rType[index + 1] + name,
      path: `/${path}/${item}`,
      prefix1:`${env}/business/develop.die`
    }
  ))

));

// 开发-流程工费
const resultFLowCost = devFlowCostUrls.map(({ name, arr, path }) => (
  arr.map((item, index) => (
    {
      key: rType[index + 1] + name,
      path: `/${path}/${item}`,
      prefix1:`${env}/business/develop/cost`
    }
  ))

));





const resultArr = [
  ...resultBasic.flat(),
  ...resultRaw.flat(),
  ...resultFLow.flat(),
  ...resultFLowCost.flat(),
  ...resultSet.flat(),
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
  { key: 'revokecategorySet', path: '/develop/category/develop-basic-category-set/revoke', prefix1: `${env}/business` },
  {
    key: 'listBasiccategorySet',
    path: '/develop/category/develop-basic-category-set/list',
    prefix1: `${env}/business`,
  },
  {
    key: 'addBasiccategorySet',
    path: '/develop/category/develop-basic-category-set/saveOrUpdate',
    prefix1: `${env}/business`,
  },


  { key: 'listBasictypes', path: '/develop/category/develop-basic-category-set/list', prefix1: `${env  }/business` },

  {
    key: 'getTypeByWordbookCode',
    path: '/develop/category/develop-basic-category-set/getTypeByWordbookCode',
    prefix1: `${env  }/business`,
  },
  {
    key: 'getCutDrop',
    path: '/develop/basic/stone-cutting-setting/listBasicStoneCuttingSettingDropDown',
    prefix1: `${env  }/business`,
  },
  {
    key: 'getColorDrop',
    path: '/develop/basic/colour-settings/listBasicColourSettingsDropDown',
    prefix1: `${env  }/business`,
  },
  {
    key: 'getQualityDrop',
    path: '/develop/basic/raw-material-grade-settings/listBasicRawMaterialGradeSettingsDropDown',
    prefix1: `${env  }/business`,
  },

  { key: 'listMstWordbook', path: '/mst-wordbook/listMstWordbook', prefix1: `${env}/business/sys` },// 获取为报价的产品参数
  { key: 'listDeptDropDown', path: '/sys.user/sys-role/listDeptDropDown', prefix1: `${env}` },// 部门下拉
  { key: 'listBasicColourSetDropDown', path: '/colour-set/listBasicColourSetDropDown' },// 成色下拉
  { key: 'listProductionFlowDropDown', path: '/production-flow/listDropDown',prefix1:`${env}/business/develop/production` },// 生产流程下拉
  { key: 'listFilmSettingsDropDown', path: '/film-settings/listFilmSettingsDropDown',prefix1:`${env}/business/develop/basic` },// 胶膜代码下拉
  { key: 'listMoldPositioningSettingsDropDown', path: '/mold-positioning-settings/listMoldPositioningSettingsDropDown',prefix1:`${env}/business/develop/basic` },// 模具仓位编号下拉
];

// console.log(resultArr, '============')

// 请求url配置
const outPutObject = {};
resultArr.forEach(({ key, path, prefix1 }) => {
  outPutObject[key] = async (params) => {
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

export default outPutObject;
