import mockjs from 'mockjs';

const basicGoods = [
  {
    id: '1234561',
    name: '矿泉水 550ml',
    barcode: '12421432143214321',
    price: '2.00',
    num: '1',
    amount: '2.00',
  },
  {
    id: '1234562',
    name: '凉茶 300ml',
    barcode: '12421432143214322',
    price: '3.00',
    num: '2',
    amount: '6.00',
  },
  {
    id: '1234563',
    name: '好吃的薯片',
    barcode: '12421432143214323',
    price: '7.00',
    num: '4',
    amount: '28.00',
  },
  {
    id: '1234564',
    name: '特别好吃的蛋卷',
    barcode: '12421432143214324',
    price: '8.50',
    num: '3',
    amount: '25.50',
  },
];

const basicProgress = [
  {
    key: '1',
    tcode: '01',
    zhname: '重要客户',
    type: '1',
    enname: '',
  },
  {
    key: '2',
    tcode: '02',
    zhname: '一般客户',
    type: '1',
    enname: '',
  },
  {
    key: '3',
    tcode: '03',
    zhname: '电商客户',
    type: '1',
    enname: '',
  },
  {
    key: '4',
    tcode: '04',
    zhname: '加工客户',
    type: '1',
    enname: '',
  },
];

const advancedOperation1 = [
  {
    key: 'op1',
    type: '订购关系生效',
    name: '曲丽丽',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
  {
    key: 'op2',
    type: '财务复审',
    name: '付小小',
    status: 'reject',
    updatedAt: '2017-10-03  19:23:12',
    memo: '不通过原因',
  },
  {
    key: 'op3',
    type: '部门初审',
    name: '周毛毛',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
  {
    key: 'op4',
    type: '提交订单',
    name: '林东东',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '很棒',
  },
  {
    key: 'op5',
    type: '创建订单',
    name: '汗牙牙',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
];

const advancedOperation2 = [
  {
    key: 'op1',
    type: '订购关系生效',
    name: '曲丽丽',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
];

const advancedOperation3 = [
  {
    key: 'op1',
    type: '创建订单',
    name: '汗牙牙',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
];
const getProfileAdvancedData = {
  advancedOperation1,
  advancedOperation2,
  advancedOperation3,
};

const clientInfo = [
  {
    key: '1',
    code: '8002',
    name: 'VOB',
    en_name: 'Obuch Vladminir(Silver Jewelry Wholesale)',
    zh_name: '',
    status: '草稿',
  },
  {
    key: '2',
    code: '8009',
    name: 'App',
    en_name: 'Jewelry Princess',
    zh_name: '',
    status: '使用中',
  },
  {
    key: '3',
    code: '8007',
    name: 'SET',
    en_name: '',
    zh_name: '',
    status: '使用中',
  },
];

const { Random } = mockjs;

export default {
  'GET /api/client/info': getProfileAdvancedData,
  'GET /api/client/basic': (req, res) => {
    const { id } = req.query;
    const application = {
      id,
      status: '已取货',
      orderNo: Random.id(),
      childOrderNo: Random.id(),
    };
    const userInfo = {
      name: Random.cname(),
      tel: '18100000000',
      delivery: '菜鸟物流',
      addr: '浙江省杭州市西湖区万塘路18号',
      remark: '备注',
    };
    res.json({
      userInfo,
      application,
      basicGoods,
      clientInfo,
      basicProgress,
    });
  },
};
