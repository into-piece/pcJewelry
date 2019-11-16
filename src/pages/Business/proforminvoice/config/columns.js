import moment from 'moment';
import styles from './columns.less';
import { statusConvert, HasConvert } from '@/utils/convert';

let piHead = [
  {
    title: <div className={styles.row_normal2}>订单号码</div>,
    dataIndex: 'piNo',
    key: 'piNo',
  }, {
    title: <div className={styles.row_normal2}>是否拆分</div>,
    dataIndex: 'isSplit',
    key: 'isSplit',
  }, {
    title: <div className={styles.row_normal2}>是否合并</div>,
    dataIndex: 'isMerge',
    key: 'isMerge',
  }, {
    title: <div className={styles.row_normal2}>客户编号</div>,
    dataIndex: 'customerNo',
    key: 'customerNo',
  },
  {
    title: <div className={styles.row_normal2}>终客编号</div>,
    dataIndex: 'endNo',
    key: 'endNo',
  },
  {
    title: <div className={styles.row_normal2}>订单类别</div>,
    dataIndex: 'piType',
    key: 'piTypeName',
    render: (d, i) => (i.piTypeName),

  },
  {
    title: <div className={styles.row_normal2}>要求交货日期</div>,
    dataIndex: 'deliveryTime',
    key: 'deliveryTime',

    render: data => moment(data || new Date()).format('YYYY-MM-DD'),
  }
  ,
  {
    title: <div className={styles.row_normal2}>总数</div>,
    dataIndex: 'totalCount',
    key: 'totalCount',

  },

  {
    title: <div className={styles.row_normal2}>总重</div>,
    dataIndex: 'totalWeightQuotation',
    key: 'totalWeightQuotation',

  },
  {
    title: <div className={styles.row_normal2}>币种</div>,
    dataIndex: 'currency',
    key: 'currency',

  },
  {
    title: <div className={styles.row_normal2}>金额</div>,
    dataIndex: 'totalQuotation',
    key: 'totalQuotation',

  },
  {
    title: <div className={styles.row_normal2}>主材价</div>,
    dataIndex: 'mainMaterialPrice',
    key: 'mainMaterialPrice',

  },
  {
    title: <div className={styles.row_normal2}>客户采购单号</div>,
    dataIndex: 'poNo',
    key: 'poNo',

  },
  // {
  //   title: <div className={styles.row_normal2}>状态</div>,
  //   dataIndex: 'status',
  //   key: 'status',
  //
  //   render: data => statusConvert[data],
  // },
];


let piDetail = [
  {
    title: <div className={styles.row_normal2}>序号</div>,
    dataIndex: 'version',
    key: 'version',

  },
  {
    title: <div className={styles.row_normal2}>产品编号</div>,
    dataIndex: 'productNo',
    key: 'productNo',

  },
  {
    title: <div className={styles.row_normal2}>产品名称</div>,
    dataIndex: 'zhName',
    key: 'zhName',

  },
  {
    title: <div className={styles.row_normal2}>客户货号</div>,
    dataIndex: 'custoerProductNo',
    key: 'custoerProductNo',

  },
  {
    title: <div className={styles.row_normal2}>产品重量</div>,
    dataIndex: 'finishedWeight',
    key: 'finishedWeight',

  },
  {
    title: <div className={styles.row_normal2}>实际工费</div>,
    dataIndex: 'actualCount',
    key: 'actualCount',

  },
  {
    title: <div className={styles.row_normal2}>此次工费</div>,
    dataIndex: 'nowCount',
    key: 'nowCount',

  },
  {
    title: <div className={styles.row_normal2}>字印价</div>,
    dataIndex: 'markingPrice',
    key: 'markingPrice',

  },
  {
    title: <div className={styles.row_normal2}>包装价</div>,
    dataIndex: 'packPrice',
    key: 'packPrice',

  },
  {
    title: <div className={styles.row_normal2}>单价</div>,
    dataIndex: 'price',
    key: 'price',

  },
  {
    title: <div className={styles.row_normal2}>订单数量</div>,
    dataIndex: 'totalCount',
    key: 'totalCount',

  },
  {
    title: <div className={styles.row_normal2}>订单金额</div>,
    dataIndex: 'totalQuotation',
    key: 'totalQuotation',

  },
  {
    title: <div className={styles.row_normal2}>订单重量</div>,
    dataIndex: 'totalWeightQuotation',
    key: 'totalWeightQuotation',

  },
  {
    title: <div className={styles.row_normal2}>状态</div>,
    dataIndex: 'status',
    key: 'status',

    render: data => statusConvert[data],
  },
];

piHead = piHead.map(item => ({ ...item, sorter: true }));
piDetail = piDetail.map(item => ({ ...item, sorter: true }));

export default {
  piHead,
  piDetail,
};
