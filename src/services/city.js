import request from '@/utils/request';

export async function queryAllCity(parmas) {
  return request('/basic/ht-location/listHtLocation',{
    method: 'POST',
    data: {
      ...parmas,
    },
  });

}
export async function queryProvince(parmas) {
  return request('/basic/basic-provinces/listProvinces',{
    method: 'POST',
    data: {
      ...parmas,
    },
  });
}

export async function queryAreas(parmas) {
  return request(`/server/basic/basic-areas/listAreas`,{
    method: 'POST',
      data: {
    ...parmas,
    },
  });
}

export async function queryCity(parmas) {
  return request(`/server/basic/basic-cities/listCities`, {
    method: 'POST',
    data: {
      ...parmas,
    },
  });
}
