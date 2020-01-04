import styles from './columns.less';
import {statusConvert} from '@/utils/convert';

let processSalary = [
  {
    title: <div className={styles.row_normal2}>编号</div>,
    dataIndex: 'code',
    key: 'code',
    width: 100,
    render: (data) => (
      <div className={styles.tableRow1} style={{ maxWidth: 100 }}>{data}</div>
    ),
  },
  {
    title: <div className={styles.row_normal2}>流程名称</div>,
    dataIndex: 'flowName',
    key: 'flowName',
    width: 100,
  },
  {
    title: <div className={styles.row_normal2}>流程编号</div>,
    dataIndex: 'flowCode',
    key: 'flowCode',
    width: 100,
  },
  {
    title: <div className={styles.row_normal2}>产品类别</div>,
    dataIndex: 'productType',
    key: 'productType',
    width: 100,
    render: (data,record) => (
      <div className={styles.tableRow1} style={{ maxWidth: 100 }}>{record.productTypeName}</div>
    ),
  },
  {
    title: <div className={styles.row_normal2}>工费类别</div>, // ?
    dataIndex: 'costType',
    key: 'costType',
    width: 100,
  },

  {
    title: <div className={styles.row_normal2}>工费(含镍)</div>,
    dataIndex: 'nickelCost',
    key: 'nickelCost',
    width: 100,
    render: (data) => (data),
  },

  {
    title: <div className={styles.row_normal2}>工费(不含镍)</div>,
    dataIndex: 'noNickelCost',
    key: 'noNickelCost',
    width: 100,
  },

  {
    title: <div className={styles.row_normal2}>状态</div>,
    dataIndex: 'status',
    key: 'status',
    width: 100,
    render: (data) => (
      <div className={styles.tableRow1} style={{ maxWidth: 100 }}>{statusConvert[data]}</div>
    ),
  },
  {
    title: <div className={styles.row_normal2}>创建时间</div>,
    dataIndex: 'createTime',
    key: 'createTime',
    width: 100,
  },
];


processSalary = processSalary.map(item => ({ ...item, sorter: true }));

export default {
  processSalary,
};
