import {statusConvert} from '@/utils/convert';
import moment from 'moment';
import styles from './columns.less';

let fppurchase = [
  {
    title: <div className={styles.row_normal2}>客户编号</div>,
    dataIndex: 'customerNo',
    key: 'customerNo',
  },
  {
    title: <div className={styles.row_normal2}>客户简称</div>,
    dataIndex: 'customerShotName',
    key: 'customerShotName',
  },
  {
    title: <div className={styles.row_normal2}>采购单号</div>,
    dataIndex: 'purchaseNo',
    key: 'purchaseNo',
  },
  {
    title: <div className={styles.row_normal2}>采购日期</div>,
    dataIndex: 'purchaseDate',
    key: 'purchaseDate',
    render: d => moment(d).format("YYYY/MM/DD")
  }
  ,
  {
    title: <div className={styles.row_normal2}>供应商交期</div>,
    dataIndex: 'supplierDate',
    key: 'supplierDate',
    render:d=>moment(d).format("YYYY/MM/DD")
  },
  {
    title: <div className={styles.row_normal2}>采购数量</div>,
    dataIndex: 'purchaseTotal',
    key: 'purchaseTotal',

  },
  {
    title: <div className={styles.row_normal2}>采购重量</div>,
    dataIndex: 'procurementWeightTotal',
    key: 'procurementWeightTotal',
  },
  {
    title: <div className={styles.row_normal2}>采购总额</div>,
    dataIndex: 'purchasePriceTotal',
    key: 'purchasePriceTotal',
  },
  {
    title: <div className={styles.row_normal2}>收货数量</div>,
    dataIndex: 'goodsAmount',
    key: 'goodsAmount',
  },
  {
    title: <div className={styles.row_normal2}>收货重量</div>,
    dataIndex: 'goodsWeight',
    key: 'goodsWeight',
  },
  {
    title: <div className={styles.row_normal2}>确认金额</div>,
    dataIndex: 'amountRecognized',
    key: 'amountRecognized',
  },
  {
    title: <div className={styles.row_normal2}>退货数量</div>,
    dataIndex: 'salesReturnAmount',
    key: 'salesReturnAmount',
  },
  {
    title: <div className={styles.row_normal2}>退货重量</div>,
    dataIndex: 'rtnWeight',
    key: 'rtnWeight',
  },
  {
    title: <div className={styles.row_normal2}>供应商简称</div>,
    dataIndex: 'supplierShotName',
    key: 'supplierShotName',
  },
  {
    title: <div className={styles.row_normal2}>联系人</div>,
    dataIndex: 'contactName',
    key: 'contactName',
  },
  {
    title: <div className={styles.row_normal2}>手机</div>,
    dataIndex: 'mobilePhone',
    key: 'mobilePhone',
  },
  {
    title: <div className={styles.row_normal2}>预付款金额</div>,
    dataIndex: 'advance',
    key: 'advance',
  },
  {
    title: <div className={styles.row_normal2}>主材价</div>,
    dataIndex: 'principalPrice',
    key: 'principalPrice',
  },
  {
    title: <div className={styles.row_normal2}>返主材总重</div>,
    dataIndex: 'rtnPrincipalWeightTotal',
    key: 'rtnPrincipalWeightTotal',
  },
  {
    title: <div className={styles.row_normal2}>客户订单</div>,
    dataIndex: 'orderNo',
    key: 'orderNo',
  },
  {
    title: <div className={styles.row_normal2}>币种</div>,
    dataIndex: 'currency',
    key: 'currency',
  },
  {
    title: <div className={styles.row_normal2}>汇率</div>,
    dataIndex: 'taxRate',
    key: 'taxRate',
  },
  {
    title: <div className={styles.row_normal2}>数据状态</div>,
    dataIndex: 'status',
    key: 'status',
    render:d=>statusConvert[d]
  }
];


let fpdetail = [
  {
    title: <div className={styles.row_normal2}>产品编号</div>,
    dataIndex: 'processCode',
    key: 'processCode',
  },
  // {
  //   title: <div className={styles.row_normal2}>供应商编号</div>,
  //   dataIndex: 'processName',
  //   key: 'processName',
  // },
  // {
  //   title: <div className={styles.row_normal2}>中文名</div>,
  //   dataIndex: 'zhName',
  //   key: 'zhName',
  // },
  // {
  //   title: <div className={styles.row_normal2}>英文名</div>,
  //   dataIndex: 'enName',
  //   key: 'enName',
  // },
  // {
  //   title: <div className={styles.row_normal2}>生产工序产能(件/小时)</div>,
  //   dataIndex: 'processCapacity',
  //   key: 'processCapacity',
  // },
  // {
  //   title: <div className={styles.row_normal2}>类别</div>,
  //   dataIndex: 'createTime',
  //   key: 'createTime',
  // },
  // {
  //   title: <div className={styles.row_normal2}>成色名称</div>,
  //   dataIndex: 'createUser',
  //   key: 'createUser',
  // },
  // {
  //   title: <div className={styles.row_normal2}>宝石颜色</div>,
  //   dataIndex: 'createUser',
  //   key: 'createUser',
  // },
  // {
  //   title: <div className={styles.row_normal2}>电镀颜色</div>,
  //   dataIndex: 'createUser',
  //   key: 'createUser',
  // },
  // {
  //   title: <div className={styles.row_normal2}>计量单位</div>,
  //   dataIndex: 'createUser',
  //   key: 'createUser',
  // },
  // {
  //   title: <div className={styles.row_normal2}>创建人</div>,
  //   dataIndex: 'createUser',
  //   key: 'createUser',
  // },
  // {
  //   title: <div className={styles.row_normal2}>返主材类别</div>,
  //   dataIndex: 'createUser',
  //   key: 'createUser',
  // },
  // {
  //   title: <div className={styles.row_normal2}>工价类别</div>,
  //   dataIndex: 'createUser',
  //   key: 'createUser',
  // },
  // {
  //   title: <div className={styles.row_normal2}>此次工费(克/件)</div>,
  //   dataIndex: 'createUser',
  //   key: 'createUser',
  // },
  // {
  //   title: <div className={styles.row_normal2}>最低工费(克/件)</div>,
  //   dataIndex: 'createUser',
  //   key: 'createUser',
  // },
  // {
  //   title: <div className={styles.row_normal2}>成品重量(g)</div>,
  //   dataIndex: 'createUser',
  //   key: 'createUser',
  // },
  // {
  //   title: <div className={styles.row_normal2}>是否记石重</div>,
  //   dataIndex: 'createUser',
  //   key: 'createUser',
  // },
  // {
  //   title: <div className={styles.row_normal2}>石材重量(g)</div>,
  //   dataIndex: 'createUser',
  //   key: 'createUser',
  // },
  // {
  //   title: <div className={styles.row_normal2}>主材重量(g)</div>,
  //   dataIndex: 'status',
  //   key: 'status',
  // },
  // {
  //   title: <div className={styles.row_normal2}>石材价</div>,
  //   dataIndex: 'createUser',
  //   key: 'createUser',
  // },
  // {
  //   title: <div className={styles.row_normal2}>字印编辑</div>,
  //   dataIndex: 'status',
  //   key: 'status',
  // },
  // {
  //   title: <div className={styles.row_normal2}>字印价</div>,
  //   dataIndex: 'createUser',
  //   key: 'createUser',
  // },
  // {
  //   title: <div className={styles.row_normal2}>包装单价</div>,
  //   dataIndex: 'status',
  //   key: 'status',
  // },
  // {
  //   title: <div className={styles.row_normal2}>单价</div>,
  //   dataIndex: 'createUser',
  //   key: 'createUser',
  // },
  // {
  //   title: <div className={styles.row_normal2}>客户订单数量</div>,
  //   dataIndex: 'status',
  //   key: 'status',
  // },
  // {
  //   title: <div className={styles.row_normal2}>采购重量</div>,
  //   dataIndex: 'status',
  //   key: 'status',
  // },
  // {
  //   title: <div className={styles.row_normal2}>采购金额</div>,
  //   dataIndex: 'status',
  //   key: 'status',
  // },
  // {
  //   title: <div className={styles.row_normal2}>返主材重量</div>,
  //   dataIndex: 'status',
  //   key: 'status',
  // },
  // {
  //   title: <div className={styles.row_normal2}>采购重量范围</div>,
  //   dataIndex: 'status',
  //   key: 'status',
  // },
  // {
  //   title: <div className={styles.row_normal2}>成品长度</div>,
  //   dataIndex: 'status',
  //   key: 'status',
  // },
  // {
  //   title: <div className={styles.row_normal2}>产品单位</div>,
  //   dataIndex: 'status',
  //   key: 'status',
  // },
  // {
  //   title: <div className={styles.row_normal2}>戒围标准</div>,
  //   dataIndex: 'status',
  //   key: 'status',
  // },
];

fppurchase = fppurchase.map(item => ({ ...item, sorter: true }));
fpdetail = fpdetail.map(item => ({ ...item, sorter: true }));

export default {
  fppurchase,
  fpdetail,
};
