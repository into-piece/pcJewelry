/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-16 23:48:54
 * @LastEditTime: 2019-08-17 23:51:37
 * @LastEditors: Please set LastEditors
 */
import request from '@/utils/request';

const env = process.env.NODE_ENV === 'production' ? '' : '/server'
const priefx = `${env}/business/business/`;

const resultArr = [
  { key: 'listCustomerType', path: 'businesscustomer-type/listCustomerType' },
]

console.log(resultArr, '============')

// 请求url配置
const outPutObject = {}
resultArr.forEach(({ key, path }) => {
  outPutObject[key] = async (params) => {
    return request((priefx) + path, {
      method: 'POST',
      data: params,
    });
  }
})
console.log(outPutObject)

export default outPutObject