import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function querylistBrands() {

  // return request('/server/basic/brand/listBrands', {
  return request('/basic/brand/listBrands', {
    method: 'POST',
    data: {
      method: 'POST',
    },
  });
}


export async function saveTheBrand(params) {

  // return request('/server/basic/brand/saveBrand', {
  return request('/basic/brand/saveOrUpdate', {
    method: 'POST',
    data: {
      ...params,

    },
  });
}


export async function deleteTheBrand(params) {

  // return request('/server/basic/brand/deleteBrand', {
  return request('/basic/brand/deleteBrand', {
    method: 'POST',
    data: params.list,
  });
}


export async function updateTheBrand(params) {

  // return request('/server/basic/brand/updateBrand', {
  return request('/basic/brand/saveOrUpdate', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}


export async function freezeTheBrand(params) {

  // return request('/server/basic/brand/freeze', {
  return request('/basic/brand/freeze', {
    method: 'POST',
    data: params.list,
  });
}


export async function querylistRoyalty() {

  // return request('/server/basic/business-commission-setting/listBusinessCommissionSettings', {
  return request('/basic/business-commission-setting/listBusinessCommissionSettings', {
    method: 'POST',
    data: {
      method: 'POST',
    },
  });
}

export async function saveTheRoyalty(params) {

  // return request('/server/basic/business-commission-setting/saveBusinessCommissionSetting', {
  return request('/basic/business-commission-setting/saveOrUpdateBusinessCommissionSetting', {
    method: 'POST',
    data: {
      ...params,

    },
  });
}

export async function deleteTheRoyalty(params) {

  // return request('/server/basic/business-commission-setting/deleteBusinessCommissionSetting', {
  return request('/basic/business-commission-setting/deleteBusinessCommissionSetting', {
    method: 'POST',
    data: params.list,
  });
}

export async function updateTheRoyalty(params) {

  // return request('/server/basic/business-commission-setting/updateBusinessCommissionSetting', {
  return request('/basic/business-commission-setting/saveOrUpdateBusinessCommissionSetting', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}


export async function freezeTheRoyalty(params) {

  // return request('/server/basic/business-commission-setting/freeze', {
  return request('/basic/business-commission-setting/freeze', {
    method: 'POST',
    data: params.list,
  });
}


export async function querylistsendWay() {

  // return request('/server/basic/delivery-method/listDeliveryMethods', {
  return request('/basic/delivery-method/listDeliveryMethods', {
    method: 'POST',
    data: {
      method: 'POST',
    },
  });
}

export async function saveTheSendWay(params) {

  // return request('/server/basic/delivery-method/saveDeliveryMethod', {
  return request('/basic/delivery-method/saveOrUpdateDeliveryMethod', {
    method: 'POST',
    data: {
      ...params,

    },
  });
}

export async function deleteTheSendWay(params) {

  // return request('/server/basic/delivery-method/deleteDeliveryMethod', {
  return request('/basic/delivery-method/deleteDeliveryMethod', {
    method: 'POST',
    data: params.list,
  });
}

export async function updateTheSendWay(params) {

  // return request('/server/basic/delivery-method/updateDeliveryMethod', {
  return request('/basic/delivery-method/saveOrUpdateDeliveryMethod', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}


export async function freezeTheSendWay(params) {

  // return request('/server/basic/delivery-method/freeze', {
  return request('/basic/delivery-method/freeze', {
    method: 'POST',
    data: params.list,
  });
}


export async function querylistRequested() {

  // return request('/server/basic/quality-requirements/listQualityRequirementss', {
  return request('/basic/quality-requirements/listQualityRequirementss', {
    method: 'POST',
    data: {
      method: 'POST',
    },
  });
}

export async function saveTheRequested(params) {

  // return request('/server/basic/quality-requirements/saveOrUpdateQualityRequirements', {
  return request('/basic/quality-requirements/saveOrUpdateQualityRequirements', {
    method: 'POST',
    data: {
      ...params,

    },
  });
}

export async function deleteTheRequested(params) {

  // return request('/server/basic/quality-requirements/deleteQualityRequirements', {
  return request('/basic/quality-requirements/deleteQualityRequirements', {
    method: 'POST',
    data: params.list,
  });
}

export async function updateTheRequested(params) {

  // return request('/server/basic/quality-requirements/saveOrUpdateQualityRequirements', {
  return request('/basic/quality-requirements/saveOrUpdateQualityRequirements', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}


export async function freezeTheRequested(params) {

  // return request('/server/basic/quality-requirements/freeze', {
  return request('/basic/quality-requirements/freeze', {
    method: 'POST',
    data: params.list,
  });
}


export async function querylistCurrency() {

  // return request('/server/basic/currency/listCurrency', {
  return request('/basic/currency/listCurrency', {
    method: 'POST',
    data: {
      method: 'POST',
    },
  });
}

export async function saveTheCurrency(params) {

  // return request('/server/basic/quality-requirements/saveOrUpdateQualityRequirements', {
  return request('/basic/quality-requirements/saveOrUpdateQualityRequirements', {
    method: 'POST',
    data: {
      ...params,

    },
  });
}

export async function deleteTheCurrency(params) {

  // return request('/server/basic/quality-requirements/deleteQualityRequirements', {
  return request('/basic/quality-requirements/deleteQualityRequirements', {
    method: 'POST',
    data: params.list,
  });
}

export async function updateTheCurrency(params) {

  // return request('/server/basic/quality-requirements/saveOrUpdateQualityRequirements', {
  return request('/basic/quality-requirements/saveOrUpdateQualityRequirements', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}


export async function freezeTheCurrency(params) {

  // return request('/server/basic/quality-requirements/freeze', {
  return request('/basic/quality-requirements/freeze', {
    method: 'POST',
    data: params.list,
  });
}


export async function querylistRingNum() {

  // return request('/server/basic/ring-around-the-standard/listRingAroundTheStandards', {
  return request('/basic/ring-around-the-standard/listRingAroundTheStandards', {
    method: 'POST',
    data: {
      method: 'POST',
    },
  });
}

export async function saveTheRingNum(params) {

  // return request('/server/basic/ring-around-the-standard/saveOrUpdateRingAroundTheStandard', {
  return request('/basic/ring-around-the-standard/saveOrUpdateRingAroundTheStandard', {
    method: 'POST',
    data: {
      ...params,

    },
  });
}

export async function deleteTheRingNum(params) {

  // return request('/server/basic/ring-around-the-standard/delete', {
  return request('/basic/ring-around-the-standard/delete', {
    method: 'POST',
    data: params.list,
  });
}

export async function updateTheRingNum(params) {

  // return request('/server/basic/ring-around-the-standard/saveOrUpdateRingAroundTheStandard', {
  return request('/basic/ring-around-the-standard/saveOrUpdateRingAroundTheStandard', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}


export async function freezeTheRingNum(params) {

  // return request('/server/basic/ring-around-the-standard/freeze', {
  return request('/basic/ring-around-the-standard/freeze', {
    method: 'POST',
    data: params.list,
  });
}


export async function querylistSonRingNum(params) {

  // return request('/server/basic/ring-around/listRingAroundByStandardId', {
  return request('/basic/ring-around/listRingAroundByStandardId', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function saveTheSonRingNum(params) {

  // return request('/server/basic/ring-around/saveOrUpdateRingAround', {
  return request('/basic/ring-around/saveOrUpdateRingAround', {
    method: 'POST',
    data: {
      ...params,
      method: 'POST',

    },
  });
}

export async function deleteTheSonRingNum(params) {

  // return request('/server/basic/ring-around/delete', {
  return request('/basic/ring-around/delete', {
    method: 'POST',
    data: params.list,
  });
}

export async function updateTheSonRingNum(params) {

  // return request('/server/basic/ring-around/saveOrUpdateRingAround', {
  return request('/basic/ring-around/saveOrUpdateRingAround', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}


export async function freezeTheSonRingNum(params) {

  // return request('/server/basic/ring-around/freeze', {
  return request('/basic/ring-around/freeze', {
    method: 'POST',
    data: params.list,
  });
}


/*===============基础接口部分=结束===============*/




/*===============客户接口部分=开始===============*/
export async function querylistClient(parmas) {

  return request('/business/customer-type/listCustomerType', {
    // return request('/basic/ring-around/listRingAroundByStandardId', {
    method: 'POST',
    data: {
      ...parmas
    }
  });
}

export async function saveTheClient(params) {

  return request('/business/customer-type/saveOrUpdate', {
    // return request('/basic/ring-around/saveOrUpdateRingAround', {
    method: 'POST',
    data: {
      ...params,

    },
  });
}

export async function deleteTheClient(params) {

  return request('/business/customer-type/delete', {
    // return request('/basic/ring-around/delete', {
    method: 'POST',
    data: params.list,
  });
}

export async function updateTheClient(params) {

  return request('/business/customer-type/saveOrUpdate', {
    // return request('/basic/ring-around/saveOrUpdateRingAround', {
    method: 'POST',
    data: {
      ...params
    },
  });
}
export async function freezeTheClient(params) {

  // return request('/server/basic/ring-around/freeze', {
  return request('/business/customer-type/freeze', {
    method: 'POST',
    data: params.list,
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
  console.log('rule = ' + params);
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

export async function fakeSonmitForm(params) {
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
