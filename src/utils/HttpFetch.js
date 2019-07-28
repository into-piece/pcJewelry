import React from 'react';


  const priefx =  '/server'

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
 * 加载图片
 * @type {string}
 */
  export const queryImage =priefx+'/business/upload-img/listUploadImg'

/**
 * 加载产品图片
 * @type {string}
 */
export const queryProductImage =priefx+'/business/product-picture/listProductPicture'

/**
 * 保存产品图片
 * @type {string}
 */
export const saveProductImage =priefx+'/business/product-picture/saveProductPicture'

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

/**
 *
 * @type {string}
 */
  export const queryBrands = priefx+'/basic/brand/listBrands'

/**
 * 查询客户类别
 * @type {string}
 */
export const queryproductDropDown = priefx+'/develop/basic/finished-product/listFinishedProductDropDown'

/**
 * 加载宝石材料
 * @type {string}
 */
export const queryProductMaterial = priefx+'/develop/basic/colour-set/listBasicColourSetDropDown'

/**
 * 加载宝石颜色
 * @type {string}
 */
export const queryunitColor = priefx+'/develop/basic/colour-settings/listBasicColourSettingsDropDown'
/**
 * 加载电镀颜色
 * @type {string}
 */
export const queryPlatingColor = priefx+'/develop/basic/plating-color-setting/listBasicPlatingColorSettingDropDown'

/**
 * 加载电镀颜色
 * @type {string}
 */
export const queryTerminalNoList = priefx+'/business/customer/listCustomerDropDown'

/**
 * 加载模具号
 * @type {string}
 */
export const queryMoldList = priefx+'/develop.die/set/listDieSetDropDown'

/**
 * 加载重量单位
 * @type {string}
 */
export const queryMeasureUniList = priefx+'/develop/basic/measure-unit/listBasicMeasureUnitDropDown'

/**
 * 查询锁定状态
 * @type {string}
 */
export const queryProductLock = priefx+'/business/product/checkIsEdit'

/**
 * 加载产品
 * @type {string}
 */
export const queryProductList = priefx+'/business/product/listProduct'


export default {
  loadMaintainer,
  loadContacts,
  saveContacts,
  saveMaintainer,
  deleteContacts,
  queryDelivery,
  queryMarkImage,
  queryImage,
  queryQuality,
  queryTerminalList,
  loadCustomerList,
  queryMstWordList,
  queryBrands,
  queryproductDropDown,
  queryProductMaterial,
  queryunitColor,
  queryPlatingColor,
  queryTerminalNoList,
  queryMoldList,
  queryMeasureUniList,
  queryProductLock,
  queryProductImage,
  saveProductImage,
  queryProductList,


};
