import styles from './columns.less';
import { statusConvert, HasConvert } from '@/utils/convert';
import moment from 'moment';

let piHead = [
  {
    title: <div className={styles.row_normal2}>订单号码</div>,
    dataIndex: 'piNo',
    key: 'piNo',
    width: 100,
  }, {
    title: <div className={styles.row_normal2}>客户编号</div>,
    dataIndex: 'customerId',
    key: 'customerId',
    width: 100,
  },
  {
    title: <div className={styles.row_normal2}>终客编号</div>,
    dataIndex: 'endId',
    key: 'endId',
    width: 100,
  },
  {
    title: <div className={styles.row_normal2}>订单类别</div>,
    dataIndex: 'piTypeName',
    key: 'piTypeName',
    width: 100,
  },
  {
    title: <div className={styles.row_normal2}>要求交货日期</div>,
    dataIndex: 'deliveryTime',
    key: 'deliveryTime',
    width: 100,
    render: data => moment(data).format('YYYY-MM-dd'),
  }
  ,
  {
    title: <div className={styles.row_normal2}>总数</div>,
    dataIndex: 'totalCount',
    key: 'totalCount',
    width: 100,
  },

  {
    title: <div className={styles.row_normal2}>总重</div>,
    dataIndex: 'totalWeightQuotation',
    key: 'totalWeightQuotation',
    width: 100,
  },
  {
    title: <div className={styles.row_normal2}>币种</div>,
    dataIndex: 'currency',
    key: 'currency',
    width: 100,
  },
  {
    title: <div className={styles.row_normal2}>金额</div>,
    dataIndex: 'totalQuotation',
    key: 'totalQuotation',
    width: 100,
  },
  {
    title: <div className={styles.row_normal2}>主材价</div>,
    dataIndex: 'mainMaterialPrice',
    key: 'mainMaterialPrice',
    width: 100,
  },
  {
    title: <div className={styles.row_normal2}>客户采购单号</div>,
    dataIndex: 'poNo',
    key: 'poNo',
    width: 100,
  },
  {
    title: <div className={styles.row_normal2}>状态</div>,
    dataIndex: 'status',
    key: 'status',
    width: 100,
    render: data => statusConvert[data],
  },
];


let piDetail = [
  {
    title: <div className={styles.row_normal2}>序号</div>,
    dataIndex: 'version',
    key: 'version',
    width: 40,
  },
  {
    title: <div className={styles.row_normal2}>产品编号</div>,
    dataIndex: 'productNo',
    key: 'productNo',
    width: 100,
  },
  {
    title: <div className={styles.row_normal2}>产品名称</div>,
    dataIndex: 'zhName',
    key: 'zhName',
    width: 100,
  },
  {
    title: <div className={styles.row_normal2}>客户货号</div>,
    dataIndex: 'custoerProductNo',
    key: 'custoerProductNo',
    width: 60,
  },
  {
    title: <div className={styles.row_normal2}>产品重量</div>,
    dataIndex: 'finishedWeight',
    key: 'finishedWeight',
    width: 50,
  },
  {
    title: <div className={styles.row_normal2}>实际工费</div>,
    dataIndex: 'actualCount',
    key: 'actualCount',
    width: 40,
  },
  {
    title: <div className={styles.row_normal2}>此次工费</div>,
    dataIndex: 'nowCount',
    key: 'nowCount',
    width: 60,
  },
  {
    title: <div className={styles.row_normal2}>字印价</div>,
    dataIndex: 'markingPrice',
    key: 'markingPrice',
    width: 40,
  },
  {
    title: <div className={styles.row_normal2}>包装价</div>,
    dataIndex: 'packPrice',
    key: 'packPrice',
    width: 60,
  },
  {
    title: <div className={styles.row_normal2}>单价</div>,
    dataIndex: 'price',
    key: 'price',
    width: 60,
  },
  {
    title: <div className={styles.row_normal2}>订单数量</div>,
    dataIndex: 'totalCount',
    key: 'totalCount',
    width: 60,
  },
  {
    title: <div className={styles.row_normal2}>订单金额</div>,
    dataIndex: 'totalQuotation',
    key: 'totalQuotation',
    width: 60,
  },
  {
    title: <div className={styles.row_normal2}>订单重量</div>,
    dataIndex: 'totalWeightQuotation',
    key: 'totalWeightQuotation',
    width: 60,
  },
  {
    title: <div className={styles.row_normal2}>状态</div>,
    dataIndex: 'status',
    key: 'status',
    width: 60,
    render: data => statusConvert[data],
  },
];

piHead = piHead.map(item => ({ ...item, sorter: true }));
piDetail = piDetail.map(item => ({ ...item, sorter: true }));

export default {
  piHead,
  piDetail,
};
