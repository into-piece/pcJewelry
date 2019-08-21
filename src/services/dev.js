/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-16 23:48:54
 * @LastEditTime: 2019-08-17 23:51:37
 * @LastEditors: Please set LastEditors
 */
import request from '@/utils/request';

const env = process.env.NODE_ENV === 'production' ? '' : '/server'
const priefx = `${env}/business/develop/basic`;

const serverArr = [
  // 计量单位
  { key: 'getDevDropDown', path: '/measure-unit/listBasicMeasureUnitDropDown' },
  { key: 'listBasicmeasureUnit', path: '/measure-unit/listBasicMeasureUnit' },
  { key: 'addBasicmeasureUnit', path: '/measure-unit/saveBasicMeasureUnit' },
  { key: 'deleteBasicmeasureUnit', path: '/measure-unit/deleteBasicMeasureUnit' },
  { key: 'approvemeasureUnit', path: '/measure-unit/approve' },
  { key: 'revokemeasureUnit', path: '/measure-unit/revoke' },

  // 成色设定
  { key: 'listBasiccolorPercentage', path: '/colour-set/listBasicColourSet' },
  { key: 'addBasiccolorPercentage', path: '/colour-set/saveBasicColourSet' },
  { key: 'deleteBasiccolorPercentage', path: '/colour-set/deleteBasicColourSet' },
  { key: 'revokecolorPercentage', path: '/colour-set/revoke' },
  { key: 'approvecolorPercentage', path: '/colour-set/freeze' },

  // 
  { key: 'listBasiccategorySet', path: '/category-set/listCategorySet' },

  // 颜色设定
  { key: 'listBasiccolorSetting', path: '/colour-settings/listBasicColourSettings' },

  // 电镀
  { key: 'listBasicelectroplateSetting', path: '/plating-color-setting/listBasicPlatingColorSetting' },

  // 形状
  { key: 'listBasicshapeSetting', path: '/shape-settings/listBasicShapeSettings' },

  // 规格
  { key: 'listBasicspecificationSetting', path: '/specification-settings/listBasicSpecificationSettings' },

  // 原料
  { key: 'listBasicmaterialsGrade', path: '/raw-material-grade-settings/listBasicRawMaterialGradeSettings' },

  // 石头切工
  { key: 'listBasicstoneCutter', path: '/stone-cutting-setting/listBasicStoneCuttingSetting' },


  // 镶石工艺列表
  { key: 'listBasicinsertStoneTechnology', path: '/gem-set-process/listGemSetProcess' },

  // 胶膜设定列表
  { key: 'listBasicrubberMouldSetting', path: '/film-settings/listFilmSettings' },

  // 模具仓位设定列表
  { key: 'listBasicmouldPosition', path: '/mold-positioning-settings/listMoldPositioningSettings' },
]

// 请求url配置
const outPutObject = {}
serverArr.forEach(({ key, path }) => {
  outPutObject[key] = async (params) => {
    return request(priefx + path, {
      method: 'POST',
      data: params,
    });
  }
})

export default outPutObject