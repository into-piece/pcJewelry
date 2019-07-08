import React from 'react';


  const priefx =  ''

/**
 * 加载共同维护人
 * @type {string}
 */
  export const loadMaintainer = priefx+'/business/co-maintainer/listCoMaintainer'
/**
 * 加载联系人
 * @type {string}
 */
  export const loadContacts = priefx+'/business.customer/business-contact-information/listContact'
/**
 * 保存联系人
 * @type {string}
 */
  export const saveContacts = priefx+'/business.customer/business-contact-information/saveOrUpdate'
/**
 * 保存共同维护人
 * @type {string}
 */
  export const saveMaintainer = priefx+'/business/co-maintainer/saveCoMaintainer'
/**
 * 删除联系人
 * @type {string}
 */
  export const deleteContacts =priefx+'/business.customer/business-contact-information/delete'

/**
 * 加载配送方式
 * @type {string}
 */
export const queryDelivery =priefx+'/basic/delivery-method/listDeliveryMethods'
/**
 * 加载图片
 * @type {string}
 */
  export const queryMarkImage =priefx+'/business/upload-img/listUploadImg'
/**
 * 加载品质要求
 * @type {string}
 */
  export const queryQuality = priefx+'/basic/quality-requirements/listQualityRequirementss'
/**
 * 加载终客列表
 * @type {string}
 */
  export const queryTerminalList = priefx+'/business/end-customer/listEndCustomer'
/**
 * 加载客户列表
 * @type {string}
 */
  export const loadCustomerList = priefx+'/business/customer/listCustomer'
/**
 * 加载字段类型
 * @type {string}
 */
  export const queryMstWordList = priefx+'/sys/mst-wordbook/listMstWordbook'

export default {
  loadMaintainer,
  loadContacts,
  saveContacts,
  saveMaintainer,
  deleteContacts,
  queryDelivery,
  queryMarkImage,
  queryQuality,
  queryTerminalList,
  loadCustomerList,
  queryMstWordList,


};
