/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-16 23:48:54
 * @LastEditTime: 2019-08-17 00:49:50
 * @LastEditors: Please set LastEditors
 */
import request from '@/utils/request';

console.log(process.env.NODE_ENV)
const priefx = process.env.NODE_ENV === 'production' ? '' : '/server'

// 计量单位- 下拉
export const getDevDropDown = async () => request(`${priefx}/business/develop/basic/measure-unit/listBasicMeasureUnitDropDown`, {
  method: 'POST',
  data: {},
});

// 计量单位- 列表
export const listBasicMeasureUnit = async (params) => request(`${priefx}/business/develop/basic/measure-unit/listBasicMeasureUnit`, {
  method: 'POST',
  data: params,
});


// 计量单位-新增更新
const addBasicmeasureUnit = async (params) => request(`${priefx}/business/develop/basic/measure-unit/saveBasicMeasureUnit`, {
  method: 'POST',
  data: params,
})

// 计量单位-删除
const deleteBasicmeasureUnit = async (params) => request(`${priefx}/business/develop/basic/measure-unit/deleteBasicMeasureUnit`, {
  method: 'POST',
  data: params,
})

// 计量单位-审批
const approvemeasureUnit = async (params) => request(`${priefx}/business/develop/basic/measure-unit/approve`, {
  method: 'POST',
  data: params,
})

// 计量单位-审批
const revokemeasureUnit = async (params) => request(`${priefx}/business/develop/basic/measure-unit/revoke`, {
  method: 'POST',
  data: params,
})


// 成色设定列表
export const listBasicColorPercentage = async (params) => request(`${priefx}/business/develop/basic/colour-set/listBasicColourSet`, {
  method: 'POST',
  data: params,
});

// 成色 新增更新
const addBasiccolorPercentage = async (params) => request(`${priefx}/business/develop/basic/colour-set/saveBasicColourSet`, {
  method: 'POST',
  data: params,
});

const deleteBasiccolorPercentage = async (params) => request(`${priefx}/business/develop/basic/colour-set/deleteBasicColourSet`, {
  method: 'POST',
  data: params,
});

const revokecolorPercentage = async (params) => request(`${priefx}/business/develop/basic/colour-set/revoke`, {
  method: 'POST',
  data: params,
});


const approvecolorPercentage = async (params) => request(`${priefx}/business/develop/basic/colour-set/freeze`, {
  method: 'POST',
  data: params,
});

// 类别设定
export const listBasicCategorySet = async (params) => request(`${priefx}/business/develop/basic/category-set/listCategorySet`, {
  method: 'POST',
  data: params,
});



export default {
  addBasicmeasureUnit,
  deleteBasicmeasureUnit,
  approvemeasureUnit,
  addBasiccolorPercentage,
  deleteBasiccolorPercentage,
  revokecolorPercentage,
  approvecolorPercentage,
  revokemeasureUnit,
}