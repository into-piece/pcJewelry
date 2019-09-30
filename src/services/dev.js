/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-16 23:48:54
 * @LastEditTime: 2019-08-17 23:51:37
 * @LastEditors: Please set LastEditors
 */
import request from '@/utils/request';
import {serviceArr} from './devUrl'
import { getCurrentUser } from '../utils/authority';

const env = process.env.NODE_ENV === 'production' ? '' : '/server'
const priefx = `${env}/business/develop/basic`;

const returnType = {
  1: 'listBasic',
  2: 'addBasic',
  3: 'deleteBasic',
  4: 'approve',
  5: 'revoke'
}

const result = serviceArr.map(({ name, arr, path }) => (
  arr.map((item, index) => (
    {
      key: returnType[index + 1] + name,
      path: `/${path}/${item}`
    }
  ))
))

const resultArr = [
  ...result.flat(),
  { key: 'listGemSetProcessDropDown', path: '/colour-set/listBasicColourSetDropDown' },
  { key: 'listBasicMeasureUnitDropDown', path: '/measure-unit/listBasicMeasureUnitDropDown' },
  { key: 'listBasicShapeSettingsDropDown', path: '/shape-settings/listBasicShapeSettingsDropDown' },
  { key: 'listBasicSpecificationSettingsDropDown', path: '/specification-settings/listBasicSpecificationSettingsDropDown' },


  { key: 'approvecategorySet', path: '/develop.category/develop-basic-category-set/approval', priefx1: `${env}/business` },
  { key: 'deleteBasiccategorySet', path: '/develop.category/develop-basic-category-set/delete', priefx1: `${env}/business` },
  { key: 'revokecategorySet', path: '/develop.category/develop-basic-category-set/revoke', priefx1: `${env}/business` },
  { key: 'listBasiccategorySet', path: '/develop.category/develop-basic-category-set/list', priefx1: `${env}/business` },
  { key: 'addBasiccategorySet', path: '/develop.category/develop-basic-category-set/saveOrUpdate', priefx1: `${env}/business` },


  { key: 'listBasictypes', path: '/develop.category/develop-basic-category-set/list', priefx1: `${env  }/business` },

  { key: 'listMstWordbook', path: '/mst-wordbook/listMstWordbook', priefx1: `${env  }/business/sys` }
]

// console.log(resultArr, '============')

// 请求url配置
const outPutObject = {}
resultArr.forEach(({ key, path, priefx1 }) => {
  outPutObject[key] = async (params) => {
    return request((priefx1 || priefx) + path, {
      method: 'POST',
      headers: {
        token: getCurrentUser() ? getCurrentUser().token : '',
      },
      data: params,
    });
  }
})
// console.log(outPutObject)

export default outPutObject
