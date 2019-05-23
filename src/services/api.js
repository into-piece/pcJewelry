import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}
export async function querylistBrands() {

    return request('/basic/brand/listBrands', {
      method: 'POST',
      data: {
        method: 'POST',
      },
    });
}


export async function saveTheBrand(params) {

  return request('/basic/brand/saveBrand', {
    method: 'POST',
    data: {
       ...params

    },
  });
}


export async function deleteTheBrand(params) {

  return request('/basic/brand/deleteBrand', {
    method: 'POST',
    data: {
       ...params
    },
  });
}


export async function updateTheBrand(params) {

  return request('/basic/brand/updateBrand', {
    method: 'POST',
    data: {
      ...params
    },
  });
}



export async function freezeTheBrand(params) {

  return request('/basic/brand/freeze', {
    method: 'POST',
    data: {
      ...params
    },
  });
}


export async function querylistRoyalty() {

  return request('/basic/business-commission-setting/listBusinessCommissionSettings', {
    method: 'POST',
    data: {
      method: 'POST',
    },
  });
}

export async function saveTheRoyalty(params) {

  return request('/basic/business-commission-setting/saveBusinessCommissionSetting', {
    method: 'POST',
    data: {
      ...params

    },
  });
}

export async function deleteTheRoyalty(params) {

  return request('/basic/business-commission-setting/deleteBusinessCommissionSetting', {
    method: 'POST',
    data: {
      ...params
    },
  });
}

export async function updateTheRoyalty(params) {

  return request('/basic/business-commission-setting/updateBusinessCommissionSetting', {
    method: 'POST',
    data: {
      ...params
    },
  });
}


export async function freezeTheRoyalty(params) {

  return request('/basic/business-commission-setting/freeze', {
    method: 'POST',
    data: {
      ...params
    },
  });
}




export async function querylistsendWay() {

  return request('/basic/delivery-method/listDeliveryMethods', {
    method: 'POST',
    data: {
      method: 'POST',
    },
  });
}

export async function saveTheSendWay(params) {

  return request('/basic/delivery-method/saveDeliveryMethod', {
    method: 'POST',
    data: {
      ...params

    },
  });
}

export async function deleteTheSendWay(params) {

  return request('/basic/delivery-method/deleteDeliveryMethod', {
    method: 'POST',
    data: {
      ...params
    },
  });
}

export async function updateTheSendWay(params) {

  return request('/basic/delivery-method/updateDeliveryMethod', {
    method: 'POST',
    data: {
      ...params
    },
  });
}


export async function freezeTheSendWay(params) {

  return request('/basic/delivery-method/freeze', {
    method: 'POST',
    data: {
      ...params
    },
  });
}







export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}



export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  console.log('rule = '+params);
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params = {}) {
  return request(`/api/rule?${stringify(params.query)}`, {
    method: 'POST',
    data: {
      ...params.body,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    data: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile(id) {
  return request(`/api/profile/basic?id=${id}`);
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryBasicClient(id) {
  return request(`/api/client/basic?id=${id}`);
}

export async function queryAdvancedClient() {
  return request('/api/client/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    data: params,
  });
}

export async function queryNotices(params = {}) {
  return request(`/api/notices?${stringify(params)}`);
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}
