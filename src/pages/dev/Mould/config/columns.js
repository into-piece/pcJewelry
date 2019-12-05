import moment from 'moment'
import styles from './columns.less';
import {statusConvert,numberConvert} from '@/utils/convert';

let dieSet = [
  {
    title: <div className={styles.row_normal2}>产品编号</div>,
    dataIndex: 'productNo',
    key: 'productNo',
  },
  {
    title: <div className={styles.row_normal2}>类别</div>,
    dataIndex: 'productType',
    key: 'productTypeName',
    render:(d,i)=>(i.productTypeName)

  },
  {
    title: <div className={styles.row_normal2}>成色</div>,
    dataIndex: 'purity',
    key: 'purity',
    render:(d,i) => i.purityName

  },
  {
    title: <div className={styles.row_normal2}>新增日期</div>,
    dataIndex: 'createTime',
    key: 'createTime',
    render:(d) => moment(d).format("YYYY-MM-DD HH:mm:ss")

  },
  {
    title: <div className={styles.row_normal2}>状态</div>,
    dataIndex: 'status',
    key: 'status',
    render: (data) => (
      <div className={styles.tableRow1} style={{ maxWidth: 100 }}>{statusConvert[data]}</div>
    ),
  },
];


let dieSetChild = [
  {
    title: <div className={styles.row_normal2}>胶膜编号</div>,
    dataIndex: 'productNo',
    key: 'productNo',
  },
  {
    title: <div className={styles.row_normal2}>模具编号</div>,
    dataIndex: 'filmCodeName',
    key: 'filmCodeName',
  },
  {
    title: <div className={styles.row_normal2}>配膜比例</div>,
    dataIndex: 'membraneProportion',
    key: 'membraneProportion',
    render:d=>  numberConvert(d,2)

  },
  {
    title: <div className={styles.row_normal2}>注蜡机号</div>,
    dataIndex: 'vacuumTime',
    key: 'vacuumTime',
  },
  {
    title: <div className={styles.row_normal2}>进模压力(牛)</div>,
    dataIndex: 'intoFilmPressure',
    key: 'intoFilmPressure',
    render:d=>  numberConvert(d,1)

  },
  {
    title: <div className={styles.row_normal2}>压膜压力(牛)</div>,
    dataIndex: 'squeezeFilmPressure',
    key: 'squeezeFilmPressure',
    render:d=>  numberConvert(d,1)

  },
  {
    title: <div className={styles.row_normal2}>注蜡气压(帕)</div>,
    dataIndex: 'waxInjectionPressure',
    key: 'waxInjectionPressure',
    render:d=>  numberConvert(d,1)

  },
  {
    title: <div className={styles.row_normal2}>真空时间(秒)</div>,
    dataIndex: 'noteWaxImmediately',
    key: 'noteWaxImmediately',
    render:d=>  numberConvert(d,1)

  },
  {
    title: <div className={styles.row_normal2}>注蜡时间(秒)</div>,
    dataIndex: 'waxInjectionTime',
    key: 'waxInjectionTime',
    render:d=>  numberConvert(d,1)

  },
  {
    title: <div className={styles.row_normal2}>蜡件重量(克)</div>,
    dataIndex: 'waxWeight',
    key: 'waxWeight',
    render:d=>  numberConvert(d,2)

  },
  {
    title: <div className={styles.row_normal2}>存放位置</div>,
    dataIndex: 'position',
    key: 'position',
    render:(e,i)=>i.positionName

  },
  {
    title: <div className={styles.row_normal2}>状态</div>,
    dataIndex: 'status',
    key: 'status',
    render: (data) => (
      <div className={styles.tableRow1} style={{ maxWidth: 100 }}>{statusConvert[data]}</div>
    ),
  },
];

dieSet = dieSet.map(item => ({ ...item, sorter: true }));
dieSetChild = dieSetChild.map(item => ({ ...item, sorter: true }));

export default {
  dieSet,
  dieSetChild,
};
