
const returnNameObj = {
  status: {
    0: '输入',
    2: '已审批'
  },
  quoteMethod: {
    H008002: '计重',
    H008001: '计件'
  },
  emergency: {
    0: '不紧急',
    1: '紧急'
  },
  isWeighStones: isCheck,
  packPriceType: {
    H011001: '计收',
    H011002: '不计收',
  },
  customerPreparation: isCheck,
  purchasingMaterialsFromCustomers: isCheck
}

const returnName = (key, value) => returnNameObj[key][value]

export default {
  returnNameObj,
  returnName
}
