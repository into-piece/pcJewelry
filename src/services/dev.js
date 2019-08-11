import request from '@/utils/request';

export async function getDevDropDown() {
  const data = request('/server/business/develop/basic/measure-unit/listBasicMeasureUnitDropDown', {
    method: 'POST',
    data: {},
  });
  console.log(data);
  return data;
}
export async function listBasicMeasureUnit(params) {
  const data = request('/server/business/develop/basic/measure-unit/listBasicMeasureUnit', {
    method: 'POST',
    data: params,
  });
  console.log(data);
  return data;
}
