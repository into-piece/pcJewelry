import request from '@/utils/request';

// 计量单位- 下拉
export const getDevDropDown = async () => request('/server/business/develop/basic/measure-unit/listBasicMeasureUnitDropDown', {
  method: 'POST',
  data: {},
});

// 计量单位- 列表
export const listBasicMeasureUnit = async (params) => request('/server/business/develop/basic/measure-unit/listBasicMeasureUnit', {
  method: 'POST',
  data: params,
});


// 计量单位-新增更新
const addBasicmeasureUnit = async (params) => request('/server/business/develop/basic/measure-unit/saveBasicMeasureUnit', {
  method: 'POST',
  data: params,
})

// 计量单位-删除
const deleteBasicmeasureUnit = async (params) => request('/server/business/develop/basic/measure-unit/deleteBasicMeasureUnit', {
  method: 'POST',
  data: params,
})

// 成色设定列表
export const listBasicColourSet = async (params) => request('/server/business/develop/basic/colour-set/listBasicColourSet', {
  method: 'POST',
  data: params,
});




export default {
  addBasicmeasureUnit,
  deleteBasicmeasureUnit
}