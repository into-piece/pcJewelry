
// export const priefx = '/server'
export const priefx = process.env.NODE_ENV === 'production' ? '' : '/server'
/**
 * 加载共同维护人
 * @type {string}
 */
export const loadMaintainer = `${priefx}/business/business/co-maintainer/listCoMaintainer`
/**
 * 加载联系人
 * @type {string}
 */
export const loadContacts = `${priefx}/business/business.customer/business-contact-information/listContact`

/**
 * 保存联系人
 * @type {string}
 */
export const saveContacts = `${priefx}/business/business.customer/business-contact-information/saveOrUpdate`

/**
 * 保存共同维护人
 * @type {string}
 */
export const saveMaintainer = `${priefx}/business/business/co-maintainer/saveCoMaintainer`

/**
 * 删除联系人
 * @type {string}
 */
export const deleteContacts = `${priefx}/business/business.customer/business-contact-information/delete`

/**
 * 加载配送方式
 * @type {string}
 */
export const queryDelivery2 = `${priefx}/business/basic/delivery-method/listDeliveryMethodsDropDown`
export const queryDelivery = `${priefx}/business/basic/delivery-method/listDeliveryMethods`

/**
 * 加载图片
 * @type {string}
 */
export const queryMarkImage = `${priefx}/business/business/upload-img/listUploadImg`

/**
 * 加载图片
 * @type {string}
 */
export const queryImage = `${priefx}/business/business/upload-img/listUploadImg`

/**
 * 加载产品图片
 * @type {string}
 */
export const queryProductImage = `${priefx}/business/business/product-picture/listProductPicture`

/**
 * 保存产品图片
 * @type {string}
 */
export const saveProductImage = `${priefx}/business/business/product-picture/saveProductPicture`

/**
 * 加载品质要求
 * @type {string}
 */
export const queryQuality2 = `${priefx}/business/basic/quality-requirements/listQualityRequirementssDropDown`
export const queryQuality = `${priefx}/business/basic/quality-requirements/listQualityRequirementss`

/**
 * 加载终客列表
 * @type {string}
 */
export const queryTerminalList = `${priefx}/business/business/end-customer/listEndCustomer`

/**
 * 加载客户列表
 * @type {string}
 */
export const loadCustomerList = `${priefx}/business/business/customer/listCustomer`

/**
 * 加载字段类型
 * @type {string}
 */
export const queryMstWordList = `${priefx}/business/sys/mst-wordbook/listMstWordbook`

/**
 *
 * @type {string}
 */
export const queryBrands = `${priefx}/business/basic/brand/listBrands`

/**
 * 查询客户类别
 * @type {string}
 */
export const queryproductDropDown = `${priefx}/business/develop/basic/finished-product/listFinishedProductDropDown`
export const queryproductDropDown2 = `${priefx}/business/develop/category/develop-basic-category-set/dropdown`

/**
 * 加载宝石材料
 * @type {string}
 */
export const queryProductMaterial = `${priefx}/business/develop/basic/colour-set/listBasicColourSetDropDown`

/**
 * 加载宝石颜色
 * @type {string}
 */
export const queryunitColor = `${priefx}/business/develop/basic/colour-settings/listBasicColourSettingsDropDown`
/**
 * 加载电镀颜色
 * @type {string}
 */
export const queryPlatingColor = `${priefx}/business/develop/basic/plating-color-setting/listBasicPlatingColorSettingDropDown`

/**
 * 加载电镀颜色
 * @type {string}
 */
export const queryTerminalNoList = `${priefx}/business/business/customer/listCustomerDropDown`

/**
 * 加载模具号
 * @type {string}
 */
export const queryMoldList = `${priefx}/business/develop.die/set/listDieSetDropDown`

/**
 * 加载重量单位
 * @type {string}
 */
export const queryMeasureUniList = `${priefx}/business/develop/basic/measure-unit/listBasicMeasureUnitDropDown`

/**
 * 查询锁定状态
 * @type {string}
 */
export const queryProductLock = `${priefx}/business/business/product/checkIsEdit`

/**
 * 加载产品
 * @type {string}
 */
export const queryProductList = `${priefx}/business/business/product/listProduct`

/**
 * 加载部门
 * @type {string}
 */
export const queryDeptList = `${priefx}/sys.user/sys-role/listDept`



/**
 * 保存样品图片
 * @type {string}
 */
export const saveSpecimentImage = `${priefx}/business/business/product-picture/listProductPicture`

/**
 * 保存样品图片
 * @type {string}
 */
export const querySpecimentImage = `${priefx}/business/business/product-picture/listProductPicture`


/**
 * 加载样品
 * @type {string}
 */
export const saveSpecimenList = `${priefx}/business/business/product/sample/saveSample`
/**
 * 查询锁定状态
 * @type {string}
 */
export const querSpecimentLock = `${priefx}/business/business/product/sample/checkIsEdit`
/**
 * 查询锁定状态
 * @type {string}
 */
export const querSpecimentUnLock = `${priefx}/business/business/product/sample/unLockEdit`

/**
 * 加载产品
 * @type {string}
 */
export const querySpecimenList = `${priefx}/business/business/product/sample/listSample`

/**
 * 员工列表
 * @type {string}
 */
export const queryPersonList = `${priefx}/listUsers`

/**
 * 员工  部门下拉
 * @type {string}
 */
export const listDeptDropDown = `${priefx}/sys.user/sys-role/listDeptDropDown`



/**
 * 权限  获取员工列表
 * @type {string}
 */
export const queryPermissionUserList = `${priefx}/sys.user/sys-resource/getPermissionUsers`



/**
 *   根据客户id获取戒围号
 * @type {string}
 */
export const loadRings = `${priefx}/business/business.customer/ring/getRingAroundByCustomerId`



/**
 * 客户资料 圈戒资料新建  戒围下拉
 * @type {string}
 */
// export const listRingAround = `${priefx}/business/basic/ring-around/listRingAround`
export const listRingAround = `${priefx}/business/basic/ring-around/dropDownByStandardId`
export const listRingStandAround = `${priefx}/business/basic/ring-around-the-standard/dropDownRAT`



/**
 *   客户圈戒资料保存
 * @type {string}
 */
export const saveRings = `${priefx}/business/business.customer/ring/save`


/**
 *   客户圈戒资料删除
 * @type {string}
 */
export const deleteRings = `${priefx}/business/business.customer/ring/delete`


/**
 *   公共上传图片
 * @type {string}
 */
export const uploadImg = `${priefx}/zuul/business/business/file/uploadFile`

/**
 *   产品报价 导入excel
 * @type {string}
 */
export const productExcelImport = `${priefx}/business/business/product/product-quote-header/excelImport`


export default {
  priefx,
  productExcelImport,
  listRingStandAround,
  listRingAround,
  uploadImg,
  deleteRings,
  saveRings,
  queryPermissionUserList,
  listDeptDropDown,
  queryPersonList,
  loadMaintainer,
  loadContacts,
  loadRings,
  saveContacts,
  saveMaintainer,
  deleteContacts,
  queryDelivery,
  queryDelivery2,
  queryMarkImage,
  queryImage,
  queryQuality,
  queryQuality2,
  queryTerminalList,
  loadCustomerList,
  queryMstWordList,
  queryBrands,
  queryproductDropDown,
  queryproductDropDown2,
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
  queryDeptList,
  querSpecimentLock,
  querSpecimentUnLock,
  querySpecimenList,
  saveSpecimenList,
  saveSpecimentImage,


};
