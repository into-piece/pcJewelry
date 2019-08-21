/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-16 23:48:54
 * @LastEditTime: 2019-08-17 23:51:37
 * @LastEditors: Please set LastEditors
 */
import request from '@/utils/request';
import serviceArr from './dev.json'

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

// 请求url配置
const outPutObject = {}
result.flat().forEach(({ key, path }) => {
  outPutObject[key] = async (params) => {
    return request(priefx + path, {
      method: 'POST',
      data: params,
    });
  }
})


export default outPutObject