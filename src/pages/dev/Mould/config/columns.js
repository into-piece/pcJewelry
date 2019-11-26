import moment from 'moment'
import styles from './columns.less';
import {statusConvert,numberConvert} from '@/utils/convert';

let dieSet = [
  {
    title: <div className={styles.row_normal2}>主模具号</div>,
    dataIndex: 'mainMoldCode',
    key: 'mainMoldCode',
    width: 100,
    render: (data) => (
      <div className={styles.tableRow1} style={{ maxWidth: 100 }}>{data}</div>
    ),
  },
  {
    title: <div className={styles.row_normal2}>产品类别</div>,
    dataIndex: 'productType',
    key: 'productTypeName',
    width: 100,
    render:(d,i)=>(i.productTypeName)

  },
  {
    title: <div className={styles.row_normal2}>胶膜代码</div>,
    dataIndex: 'filmCode',
    key: 'filmCode',
    width: 100,
    render:(d,i) => i.filmCodeName

  },
  {
    title: <div className={styles.row_normal2}>存放地点</div>, // ?
    dataIndex: 'position',
    key: 'position',
    width: 100,
    render:(d,i) => i.positionName
  },

  {
    title: <div className={styles.row_normal2}>创建人</div>,
    dataIndex: 'createUser',
    key: 'createUser',
    width: 100,
    render: (data) => (data),
  },

  {
    title: <div className={styles.row_normal2}>创建时间</div>,
    dataIndex: 'createTime',
    key: 'createTime',
    width: 100,
    render: d=>moment(d).format("YYYY-MM-DD HH:mm:ss")
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
];


let dieSetChild = [
  {
    title: <div className={styles.row_normal2}>子模具号</div>,
    dataIndex: 'childMoldCode',
    key: 'childMoldCode',
    render: (data) => (
      <div className={styles.tableRow1} style={{ maxWidth: 100 }}>{data}</div>
    ),
  },
  {
    title: <div className={styles.row_normal2}>石头重量</div>,
    dataIndex: 'stoneWeight',
    key: 'stoneWeight',
    render:d=>  numberConvert(d,2)

  },
  {
    title: <div className={styles.row_normal2}>配膜比例</div>,
    dataIndex: 'membraneProportion',
    key: 'membraneProportion',
  },
  {
    title: <div className={styles.row_normal2}>注蜡气压</div>,
    dataIndex: 'waxInjectionPressure',
    key: 'waxInjectionPressure',
    render:d=>  numberConvert(d,1)

  },
  {
    title: <div className={styles.row_normal2}>进模压力</div>,
    dataIndex: 'intoFilmPressure',
    key: 'intoFilmPressure',
    render:d=>  numberConvert(d,1)

  },
  {
    title: <div className={styles.row_normal2}>压膜压力</div>,
    dataIndex: 'squeezeFilmPressure',
    key: 'squeezeFilmPressure',
    render:d=>  numberConvert(d,1)

  },
  {
    title: <div className={styles.row_normal2}>注蜡时间</div>,
    dataIndex: 'waxInjectionTime',
    key: 'waxInjectionTime',
    render:d=>  numberConvert(d,1)

  },
  {
    title: <div className={styles.row_normal2}>真空时间</div>,
    dataIndex: 'noteWaxImmediately',
    key: 'noteWaxImmediately',
    render:d=>  numberConvert(d,1)

  },
  {
    title: <div className={styles.row_normal2}>注蜡机号</div>,
    dataIndex: 'vacuumTime',
    key: 'vacuumTime',
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
