import { stringify } from 'qs';
import request from '@/utils/request';
import HttpFetch, { priefx } from '../utils/HttpFetch';
import { getCurrentUser } from '../utils/authority';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function logout() {
  return request('/logout');
}

/*
* 实时行情接口
* */

export async function realTimeMarket(params) {
  return request(`${priefx  }/business/basic/currency/realTimeMarket`, {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: params,
  });
}

/*
* 币种下拉接口
* */

export async function listCurrencydd(params) {
  return request(`${priefx  }/business/basic/currency/listCurrencydd`, {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: params,
  });
}

/*
* 新款档案  转产品接口
* */

export async function specimenTransferProduct(params) {
  return request(`${priefx  }/business/business/product/sample/createProduct`, {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: params,
  });
}

/*
* 权限接口
* */

export async function disableThePermission(params) {
  return request(`${priefx  }/sys.user/sys-resource/disableUser`, {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...params,
    },
  });
}

export async function enableThePermission(params) {
  return request(`${priefx  }/sys.user/sys-resource/enableUser`, {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...params,
    },
  });
}

export async function querylistPermissionUser(params) {
  return request(`${priefx  }/sys.user/sys-resource/getPermissionUsers`, {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...params,
    },
  });
}

export async function queryUserPermission(params) {
  return request(`${priefx  }/sys.user/sys-resource/getPermissionByUser`, {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...params,
    },
  });
}

export async function queryPermissionTree(params) {
  return request(`${priefx  }/sys.user/sys-resource/getTreeData`, {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...params,
    },
  });
}

export async function updateThePermission(params) {
  return request(`${priefx  }/sys.user/sys-resource/savePermission`, {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...params,
    },
  });
}


/*
* 员工接口
* */
export async function querylistPerson(params) {
  return request(`${priefx  }/listUsers`, {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...params,
    },
  });
}

export async function saveThePerson(params) {
  return request(`${priefx  }/saveOrUpdate`, {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...params,
    },
  });
}

export async function deleteThePerson(params) {
  return request(`${priefx  }/delete`, {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...params,
    },
  });
}

export async function updateThePerson(params) {
  return request(`${priefx }/saveOrUpdate`, {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...params,
    },
  });
}

export async function approvalThePerson(params) {
  return request(`${priefx  }/approval`, {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...params,
    },
  });
}

export async function unApprovalThePerson(params) {
  return request(`${priefx  }/cancel`, {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...params,
    },
  });
}


/*
*
* 部门接口
*
* */
export async function approvalDept(params) {
  return request(`${priefx  }/sys.user/sys-role/approval`, {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...params,
    },
  });
}

export async function cancelDept(params) {
  return request(`${priefx  }/sys.user/sys-role/cancel`, {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...params,
    },
  });
}

export async function saveOrUpdatedept(params) {
  return request(`${priefx  }/sys.user/sys-role/saveOrUpdate`, {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...params,
    },
  });
}

export async function deleteTheDept(params) {
  return request(`${priefx  }/sys.user/sys-role/delete`, {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...params,
    },
  });
}

export async function querylistDept(params) {
  return request(`${priefx  }/sys.user/sys-role/listDept`, {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...params,
    },
  });
}


export async function querylistBrands(params) {
  return request(`${priefx  }/business/basic/brand/listBrands`, {
    // return request(priefx+'/business/basic/brand/listBrands', {

    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...params,
    },
  });
}

export async function saveTheBrand(params) {
  return request(`${priefx  }/business/basic/brand/saveOrUpdate`, {
    // return request(priefx+'/business/basic/brand/saveBrand', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...params,
    },
  });
}

export async function deleteTheBrand(params) {
  return request(`${priefx  }/business/basic/brand/deleteBrand`, {
    // return request(priefx+'/business/basic/brand/deleteBrand', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: params.list,
  });
}

export async function updateTheBrand(params) {
  return request(`${priefx  }/business/basic/brand/saveOrUpdate`, {
    // return request(priefx+'/business/basic/brand/updateBrand', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...params,
    },
  });
}

export async function freezeTheBrand(params) {
  return request(`${priefx  }/business/basic/brand/freeze`, {
    // return request(priefx+'/business/basic/brand/freeze', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: params.list,
  });
}

export async function unfreezeTheBrand(params) {
  return request(`${priefx  }/business/basic/brand/cancelApproval`, {
    // return request(priefx+'/business/basic/brand/freeze', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: params.list,
    // data: {
    //   ...params
    // },
  });
}

export async function querylistRoyalty(params) {
  return request(
    `${priefx  }/business/basic/business-commission-setting/listBusinessCommissionSettings`,
    {
      // return request(priefx+'/business/basic/business-commission-setting/listBusinessCommissionSettings', {
      method: 'POST',
      headers: {
        token: getCurrentUser() ? getCurrentUser().token : '',
      },
      data: {
        ...params,
      },
    },
  );
}

export async function saveTheRoyalty(params) {
  return request(
    `${priefx  }/business/basic/business-commission-setting/saveOrUpdateBusinessCommissionSetting`,
    {
      // return request(priefx+'/business/basic/business-commission-setting/saveBusinessCommissionSetting', {
      method: 'POST',
      headers: {
        token: getCurrentUser() ? getCurrentUser().token : '',
      },
      data: {
        ...params,
      },
    },
  );
}

export async function deleteTheRoyalty(params) {
  return request(
    `${priefx  }/business/basic/business-commission-setting/deleteBusinessCommissionSetting`,
    {
      // return request(priefx+'/business/basic/business-commission-setting/deleteBusinessCommissionSetting', {
      method: 'POST',
      headers: {
        token: getCurrentUser() ? getCurrentUser().token : '',
      },
      data: params.list,
    },
  );
}

export async function updateTheRoyalty(params) {
  return request(
    `${priefx  }/business/basic/business-commission-setting/saveOrUpdateBusinessCommissionSetting`,
    {
      // return request(priefx+'/business/basic/business-commission-setting/updateBusinessCommissionSetting', {
      method: 'POST',
      headers: {
        token: getCurrentUser() ? getCurrentUser().token : '',
      },
      data: {
        ...params,
      },
    },
  );
}

export async function freezeTheRoyalty(params) {
  return request(`${priefx  }/business/basic/business-commission-setting/freeze`, {
    // return request(priefx+'/business/basic/business-commission-setting/freeze', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: params.list,
  });
}

export async function unfreezeTheRoyalty(params) {
  return request(`${priefx  }/business/basic/business-commission-setting/cancelApproval`, {
    // return request(priefx+'/business/basic/business-commission-setting/freeze', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: params.list,
  });
}

export async function querylistsendWay(params) {
  return request(`${priefx  }/business/basic/delivery-method/listDeliveryMethods`, {
    // return request(priefx+'/business/basic/delivery-method/listDeliveryMethods', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...params,
    },
  });
}

export async function saveTheSendWay(params) {
  return request(`${priefx  }/business/basic/delivery-method/saveOrUpdateDeliveryMethod`, {
    // return request(priefx+'/business/basic/delivery-method/saveDeliveryMethod', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...params,
    },
  });
}

export async function deleteTheSendWay(params) {
  return request(`${priefx  }/business/basic/delivery-method/deleteDeliveryMethod`, {
    // return request(priefx+'/business/basic/delivery-method/deleteDeliveryMethod', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: params.list,
  });
}

export async function updateTheSendWay(params) {
  return request(`${priefx  }/business/basic/delivery-method/saveOrUpdateDeliveryMethod`, {
    // return request(priefx+'/business/basic/delivery-method/updateDeliveryMethod', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...params,
    },
  });
}

export async function freezeTheSendWay(params) {
  return request(`${priefx  }/business/basic/delivery-method/freeze`, {
    // return request(priefx+'/business/basic/delivery-method/freeze', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: params.list,
  });
}

export async function unfreezeTheSendWay(params) {
  return request(`${priefx  }/business/basic/delivery-method/cancelApproval`, {
    // return request(priefx+'/business/basic/delivery-method/freeze', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: params.list,
  });
}

export async function querylistRequested(params) {
  return request(`${priefx  }/business/basic/quality-requirements/listQualityRequirementss`, {
    // return request(priefx+'/business/basic/quality-requirements/listQualityRequirementss', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...params,
    },
  });
}

export async function saveTheRequested(params) {
  return request(`${priefx  }/business/basic/quality-requirements/saveOrUpdateQualityRequirements`, {
    // return request(priefx+'/business/basic/quality-requirements/saveOrUpdateQualityRequirements', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...params,
    },
  });
}

export async function deleteTheRequested(params) {
  return request(`${priefx  }/business/basic/quality-requirements/deleteQualityRequirements`, {
    // return request(priefx+'/business/basic/quality-requirements/deleteQualityRequirements', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: params.list,
  });
}

export async function updateTheRequested(params) {
  return request(`${priefx  }/business/basic/quality-requirements/saveOrUpdateQualityRequirements`, {
    // return request(priefx+'/business/basic/quality-requirements/saveOrUpdateQualityRequirements', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...params,
    },
  });
}

export async function freezeTheRequested(params) {
  return request(`${priefx  }/business/basic/quality-requirements/freeze`, {
    // return request(priefx+'/business/basic/quality-requirements/freeze', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: params.list,
  });
}

export async function unfreezeTheRequested(params) {
  return request(`${priefx  }/business/basic/quality-requirements/cancelApproval`, {
    // return request(priefx+'/business/basic/quality-requirements/freeze', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: params.list,
  });
}

export async function querylistCurrency(params) {
  return request(`${priefx  }/business/basic/currency/listCurrency`, {
    // return request(priefx+'/business/basic/currency/listCurrency', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: params,
  });
}

export async function saveTheCurrency(params) {
  return request(`${priefx  }/business/basic/quality-requirements/saveOrUpdateQualityRequirements`, {
    // return request(priefx+'/business/basic/quality-requirements/saveOrUpdateQualityRequirements', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...params,
    },
  });
}

export async function deleteTheCurrency(params) {
  return request(`${priefx  }/business/basic/quality-requirements/deleteQualityRequirements`, {
    // return request(priefx+'/business/basic/quality-requirements/deleteQualityRequirements', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: params.list,
  });
}

export async function updateTheCurrency(params) {
  return request(`${priefx  }/business/basic/quality-requirements/saveOrUpdateQualityRequirements`, {
    // return request(priefx+'/business/basic/quality-requirements/saveOrUpdateQualityRequirements', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...params,
    },
  });
}

export async function freezeTheCurrency(params) {
  return request(`${priefx  }/business/basic/quality-requirements/freeze`, {
    // return request(priefx+'/business/basic/quality-requirements/freeze', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...params,
    },
  });
}

export async function querylistRingNum(params) {
  const data = await request(
    `${priefx  }/business/basic/ring-around-the-standard/listRingAroundTheStandards`,
    {
      // return request(priefx+'/business/basic/ring-around-the-standard/listRingAroundTheStandards', {
      method: 'POST',
      headers: {
        token: getCurrentUser() ? getCurrentUser().token : '',
      },
      data: {
        ...params,
      },
    },
  );
  console.log(data);
  return data;
}

export async function saveTheRingNum(params) {
  return request(
    `${priefx  }/business/basic/ring-around-the-standard/saveOrUpdateRingAroundTheStandard`,
    {
      // return request(priefx+'/business/basic/ring-around-the-standard/saveOrUpdateRingAroundTheStandard', {
      method: 'POST',
      headers: {
        token: getCurrentUser() ? getCurrentUser().token : '',
      },
      data: {
        ...params,
      },
    },
  );
}

export async function deleteTheRingNum(params) {
  return request(`${priefx  }/business/basic/ring-around-the-standard/delete`, {
    // return request(priefx+'/business/basic/ring-around-the-standard/delete', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: params.list,
  });
}

export async function updateTheRingNum(params) {
  return request(
    `${priefx  }/business/basic/ring-around-the-standard/saveOrUpdateRingAroundTheStandard`,
    {
      // return request(priefx+'/business/basic/ring-around-the-standard/saveOrUpdateRingAroundTheStandard', {
      method: 'POST',
      headers: {
        token: getCurrentUser() ? getCurrentUser().token : '',
      },
      data: {
        ...params,
      },
    },
  );
}

export async function freezeTheRingNum(params) {
  return request(`${priefx}/business/basic/ring-around-the-standard/approval`, {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: params.list,
  });
}

export async function unfreezeTheRingNum(params) {
  return request(`${priefx}/business/basic/ring-around-the-standard/revoke`, {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: params.list,
  });
}

export async function querylistSonRingNum(params) {
  return request(`${priefx  }/business/basic/ring-around/listRingAroundByStandardId`, {
    // return request(priefx+'/business/basic/ring-around/listRingAroundByStandardId', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...params,
    },
  });
}

export async function saveTheSonRingNum(params) {
  return request(`${priefx  }/business/basic/ring-around/saveOrUpdateRingAround`, {
    // return request(priefx+'/business/basic/ring-around/saveOrUpdateRingAround', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...params,
      method: 'POST',
      headers: {
        token: getCurrentUser() ? getCurrentUser().token : '',
      },
    },
  });
}

export async function deleteTheSonRingNum(params) {
  return request(`${priefx  }/business/basic/ring-around/delete`, {
    // return request(priefx+'/business/basic/ring-around/delete', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: params.list,
  });
}

export async function updateTheSonRingNum(params) {
  return request(`${priefx  }/business/basic/ring-around/saveOrUpdateRingAround`, {
    // return request(priefx+'/business/basic/ring-around/saveOrUpdateRingAround', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...params,
    },
  });
}

export async function freezeTheSonRingNum(params) {
  // return request(priefx+'/business/basic/ring-around/freeze', {
  return request(`${priefx  }/business/basic/ring-around/freeze`, {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: params.list,
  });
}

export async function unfreezeTheSonRingNum(params) {
  return request(`${priefx  }/business/basic/ring-around/cancelApproval`, {
    // return request(priefx+'/business/basic/ring-around-the-standard/freeze', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: params.list,
  });
}

/*= ==============基础接口部分=结束=============== */

/*= ==============客户接口部分=开始=============== */
export async function querylistClient(parmas) {
  return request(`${priefx  }/business/business/customer-type/listCustomerType`, {
    // return request('/basic/ring-around/listRingAroundByStandardId', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...parmas,
    },
  });
}

export async function saveTheClient(params) {
  return request(`${priefx  }/business//business/customer-type/saveOrUpdate`, {
    // return request('/basic/ring-around/saveOrUpdateRingAround', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...params,
    },
  });
}

export async function deleteTheClient(params) {
  return request(`${priefx  }/business//business/customer-type/delete`, {
    // return request('/basic/ring-around/delete', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: params.list,
  });
}

export async function updateTheClient(params) {
  return request(`${priefx  }/business/business/customer-type/saveOrUpdate`, {
    // return request('/basic/ring-around/saveOrUpdateRingAround', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...params,
    },
  });
}

export async function freezeTheClient(params) {
  // return request('/basic/ring-around/freeze', {
  return request(`${priefx  }/business/business/customer-type/freeze`, {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: params.list,
  });
}

export async function unfreezeTheClient(params) {
  // return request('/basic/ring-around/freeze', {
  return request(`${priefx  }/business/business/customer-type/cancelApproval`, {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: params.list,
  });
}

export async function querylistCustomer(parmas) {
  return request(`${priefx  }/business/business/customer/listCustomer`, {
    // return request('/basic/ring-around/listRingAroundByStandardId', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...parmas,
    },
  });
}

export async function saveTheCustomer(params) {
  return request(`${priefx  }/business/business/customer/saveCustomer`, {
    // return request('/basic/ring-around/saveOrUpdateRingAround', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...params,
    },
  });
}

export async function deleteTheCustomer(params) {
  return request(`${priefx  }/business/business/customer/deleteCustomer`, {
    // return request('/basic/ring-around/delete', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: params.list,
  });
}

export async function updateTheCustomer(params) {
  return request(`${priefx  }/business/business/customer/saveCustomer`, {
    // return request('/basic/ring-around/saveOrUpdateRingAround', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...params,
    },
  });
}

export async function freezeTheCustomer(params) {
  // return request('/basic/ring-around/freeze', {
  return request(`${priefx  }/business/business/customer/freeze`, {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: params.list,
  });
}

export async function unfreezeTheCustomer(params) {
  // return request('/basic/ring-around/freeze', {
  return request(`${priefx  }/business/business/customer/cancelApproval`, {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: params.list,
  });
}

export async function querylistTerminalDrop(parmas) {
  return request(`${priefx  }/business/business/end-customer/listEndCustomerDropDown`, {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...parmas,
    },
  });
}
export async function querylistTerminal(parmas) {
  return request(`${priefx  }/business/business/end-customer/listEndCustomer`, {
    // return request('/basic/ring-around/listRingAroundByStandardId', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...parmas,
    },
  });
}

export async function listEndCustomerDropDown(parmas) {
  return request(`${priefx  }/business/business/end-customer/listEndCustomerDropDown`, {
    // return request('/basic/ring-around/listRingAroundByStandardId', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...parmas,
    },
  });
}

export async function saveTheTerminal(params) {
  return request(`${priefx  }/business/business/end-customer/saveEndCustomer`, {
    // return request('/basic/ring-around/saveOrUpdateRingAround', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...params,
    },
  });
}

export async function deleteTheTerminal(params) {
  return request(`${priefx  }/business/business/end-customer/deleteEndCustomer`, {
    // return request('/basic/ring-around/delete', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: params.list,
  });
}

export async function updateTheTerminal(params) {
  return request(`${priefx  }/business/business/end-customer/saveEndCustomer`, {
    // return request('/basic/ring-around/saveOrUpdateRingAround', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...params,
    },
  });
}

export async function freezeTheTerminal(params) {
  // return request('/basic/ring-around/freeze', {
  return request(`${priefx  }/business/business/end-customer/freeze`, {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: params.list,
  });
}


export async function unfreezeTheTerminal(params) {
  // return request('/basic/ring-around/freeze', {
  return request(`${priefx}/business/business/end-customer/cancelApproval`, {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: params.list,
  });
}


export async function querylistMark(parmas) {
  return request(`${priefx  }/business/business/marking/listMarking`, {
    // return request('/basic/ring-around/listRingAroundByStandardId', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...parmas,
    },
  });
}

export async function saveTheMark(params) {
  return request(`/server/business/business/marking/saveMarking`, {
    // return request('/basic/ring-around/saveOrUpdateRingAround', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    requestType: 'json',
    data: { ...params },
  });
}

export async function deleteTheMark(params) {
  return request(`${priefx  }/business/business/marking/deleteMarking`, {
    // return request('/basic/ring-around/delete', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: params.list,
  });
}

export async function updateTheMark(params) {
  return request(`${priefx  }/business/business/marking/saveMarking`, {
    // return request('/basic/ring-around/saveOrUpdateRingAround', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...params,
    },
  });
}

export async function freezeTheMark(params) {
  // return request('/basic/ring-around/freeze', {
  return request(`${priefx  }/business/business/marking/freeze`, {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: params.list,
  });
}


export async function unfreezeTheMark(params) {

  // return request('/basic/ring-around/freeze', {
  return request(`${priefx}/business/business/marking/revoke`, {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: params.list,
  });
}

export async function querylistPackage(parmas) {
  return request(`${priefx  }/business/business/pack/listPack`, {
    // return request('/basic/ring-around/listRingAroundByStandardId', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...parmas,
    },
  });
}

export async function saveThePackage(params) {
  return request(`${priefx  }/business/business/pack/savePack`, {
    // return request('/basic/ring-around/saveOrUpdateRingAround', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...params,
    },
  });
}

export async function deleteThePackage(params) {
  return request(`${priefx  }/business/business/pack/deletePack`, {
    // return request('/basic/ring-around/delete', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: params.list,
  });
}

export async function updateThePackage(params) {
  return request(`${priefx  }/business/business/pack/savePack`, {
    // return request('/basic/ring-around/saveOrUpdateRingAround', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...params,
    },
    requestType: 'json',
  });
}

export async function freezeThePackage(params) {
  // return request('/basic/ring-around/freeze', {
  return request(`${priefx  }/business/business/pack/freeze`, {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: params.list,
  });
}

export async function unfreezeThePackage(params) {

  // return request('/basic/ring-around/freeze', {
  return request(`${priefx}/business/business/pack/revoke`, {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: params.list,
  });
}


export async function querylistProduct(parmas) {
  return request(`${priefx  }/business/business/product/listProduct`, {
    // return request('/basic/ring-around/listRingAroundByStandardId', {/business/product/listProduct
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...parmas,
    },
  });
}

export async function saveTheProduct(params) {
  return request(`${priefx  }/business/business/product/saveProduct`, {
    // return request('/basic/ring-around/saveOrUpdateRingAround', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...params,
    },
  });
}

export async function deleteTheProduct(params) {
  return request(`${priefx  }/business/business/product/deleteProduct`, {
    // return request('/basic/ring-around/delete', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: params.list,
  });
}

export async function updateTheProduct(params) {
  return request(`${priefx  }/business/business/product/saveProduct`, {
    // return request('/basic/ring-around/saveOrUpdateRingAround', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...params,
    },
  });
}

export async function freezeTheProduct(params) {
  // return request('/basic/ring-around/freeze', {
  return request(`${priefx  }/business/business/product/freeze`, {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: params.list,
  });
}

export async function unFreezeTheProduct(params) {
  // return request('/basic/ring-around/freeze', {
  return request(`${priefx  }/business/business/product/revoke`, {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: params.list,
  });
}

export async function queryTheProductLock(params) {
  // return request('/basic/ring-around/freeze', {
  return request(`${priefx  }/business/business/product/checkIsEdit`, {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...params,
    },
  });
}

export async function updateTheProductUnLock(params) {
  // return request('/basic/ring-around/freeze', {
  return request(`${priefx  }/business/business/product/unLockEdit`, {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...params,
    },
  });
}

export async function querylistProductSeries(parmas) {
  return request(`${priefx  }/business/business/product-line/listProductLine`, {
    // return request('/basic/ring-around/listRingAroundByStandardId', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...parmas,
    },
  });
}

export async function saveTheProductSeries(params) {
  return request(`${priefx  }/business/business/product-line/saveProductLine`, {
    // return request('/basic/ring-around/saveOrUpdateRingAround', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...params,
    },
  });
}

export async function deleteTheProductSeries(params) {
  return request(`${priefx  }/business/business/product-line/deleteProductLine`, {
    // return request('/basic/ring-around/delete', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: params.list,
  });
}

export async function updateTheProductSeries(params) {
  return request(`${priefx  }/business/business/product-line/saveProductLine`, {
    // return request('/basic/ring-around/saveOrUpdateRingAround', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...params,
    },
  });
}

export async function freezeTheProductSeries(params) {
  // return request('/basic/ring-around/freeze', {
  return request(`${priefx  }/business/business/product-line/freeze`, {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: params.list,
  });
}

export async function queryListWordbook(params) {
  // return request('/basic/ring-around/freeze', {
  return request(`${priefx  }/business/sys/mst-wordbook/listMstWordbook`, {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: { ...params },
  });
}

export async function queryAllCity(parmas) {
  return request(`${priefx  }/business/basic/ht-location/listHtLocation`, {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...parmas,
    },
  });
}

/*= ==========样品=============== */

export async function querylistSpecimen(parmas) {
  return request(`${priefx  }/business/business/product/sample/listSample`, {
    // return request('/basic/ring-around/listRingAroundByStandardId', {/business/product/listProduct
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...parmas,
    },
  });
}

export async function saveTheSpecimen(params) {
  return request(`${priefx  }/business/business/product/sample/saveSample`, {
    // return request('/basic/ring-around/saveOrUpdateRingAround', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...params,
    },
  });
}

export async function deleteTheSpecimen(params) {
  return request(`${priefx  }/business/business/product/sample/deleteSample`, {
    // return request('/basic/ring-around/delete', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: params.list,
  });
}

export async function updateTheSpecimen(params) {
  return request(`${priefx  }/business/business/product/sample/saveSample`, {
    // return request('/basic/ring-around/saveOrUpdateRingAround', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...params,
    },
  });
}

export async function freezeTheSpecimen(params) {
  // return request('/basic/ring-around/freeze', {
  return request(`${priefx  }/business/business/product/sample/freeze`, {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    headers: {
      token: '',
    },
    data: params.list,
  });
}

export async function unFreezeTheSpecimen(params) {
  // return request('/basic/ring-around/freeze', {
  return request(`${priefx  }/business/business/product/sample/revoke`, {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    headers: {
      token: '',
    },
    data: params.list,
  });
}

export async function queryTheSpecimenLock(params) {
  // return request('/basic/ring-around/freeze', {
  return request(`${priefx  }/business/business/product/sample/checkIsEdit`, {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...params,
    },
  });
}

export async function updateTheSpecimenUnLock(params) {
  // return request('/basic/ring-around/freeze', {
  return request(`${priefx  }/business/business/product/sample/unLockEdit`, {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...params,
    },
  });
}

/*= =========样品接口结束============= */

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  console.log(`rule = ${  params}`);
  return request('/api/rule', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...params,
      method: 'POST',
      headers: {
        token: getCurrentUser() ? getCurrentUser().token : '',
      },
    },
  });
}

export async function updateRule(params = {}) {
  return request(`/api/rule?${stringify(params.query)}`, {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...params.body,
      method: 'update',
    },
  });
}

export async function fakeSonmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
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
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
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
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...restParams,
      method: 'POST',
      headers: {
        token: getCurrentUser() ? getCurrentUser().token : '',
      },
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    headers: {
      token: getCurrentUser() ? getCurrentUser().token : '',
    },
    data: params,
  });
}

export async function queryNotices(params = {}) {
  return request(`/api/notices?${stringify(params)}`);
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}
