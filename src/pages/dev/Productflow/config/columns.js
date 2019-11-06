import styles from './columns.less';
import {statusConvert,YoNConvert} from '@/utils/convert';

let productflow = [
  {
    title: <div className={styles.row_normal2}>流程编号</div>,
    dataIndex: 'flowCode',
    key: 'flowCode',
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
    title: <div className={styles.row_normal2}>所属部门</div>,
    dataIndex: 'department',
    key: 'departmentName',
    width: 100,
    render:(d,i)=>(i.departmentName)

  },
  {
    title: <div className={styles.row_normal2}>成品类别</div>, // ?
    dataIndex: 'productType',
    key: 'productType',
    width: 100,
    render: (data,record) => (
      <div className={styles.tableRow1} style={{ maxWidth: 100 }}>{record.productTypeName}</div>
    ),
  },

  {
    title: <div className={styles.row_normal2}>损耗</div>,
    dataIndex: 'isWastage',
    key: 'isWastage',
    width: 100,
    render: (data) => (data),
  },

  {
    title: <div className={styles.row_normal2}>重量范围</div>,
    dataIndex: 'weightRange',
    key: 'weightRange',
    width: 100,
  },

  {
    title: <div className={styles.row_normal2}>标准工时</div>,
    dataIndex: 'workingHour',
    key: 'workingHour',
    width: 100,
  },
  {
    title: <div className={styles.row_normal2}>是否外发</div>,
    dataIndex: 'isOutbound',
    key: 'isOutbound',
    width: 100,
    render: (data) => (
      <div className={styles.tableRow1} style={{ maxWidth: 100 }}>{YoNConvert[data]}</div>
    ),
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
    title: <div className={styles.row_normal2}>创建人</div>,
    dataIndex: 'createUser',
    key: 'createUser',
    width: 100,
  },
];


let productProcess = [
  {
    title: <div className={styles.row_normal2}>员工工序编号</div>,
    dataIndex: 'processCode',
    key: 'processCode',
    width: 100,
    render: (data) => (
      <div className={styles.tableRow1} style={{ maxWidth: 100 }}>{data}</div>
    ),
  },
  {
    title: <div className={styles.row_normal2}>工序名称</div>,
    dataIndex: 'processName',
    key: 'processName',
    width: 100,
    render:(d,i)=>(i.processName)
  },
  {
    title: <div className={styles.row_normal2}>英文名称</div>,
    dataIndex: 'engName',
    key: 'engName',
    width: 60,
  },
  {
    title: <div className={styles.row_normal2}>排序号码</div>,
    dataIndex: 'sortNum',
    key: 'sortNum',
    width: 50,
  },
  {
    title: <div className={styles.row_normal2}>耗损(%)</div>,
    dataIndex: 'isWastage',
    key: 'isWastage',
    width: 40,
  },
  {
    title: <div className={styles.row_normal2}>员工工序产能(件/小时)</div>,
    dataIndex: 'processCapacity',
    key: 'processCapacity',
    width: 60,
  },
  {
    title: <div className={styles.row_normal2}>创建时间</div>,
    dataIndex: 'createTime',
    key: 'createTime',
    width: 80,
  },
  {
    title: <div className={styles.row_normal2}>创建人</div>,
    dataIndex: 'createUser',
    key: 'createUser',
    width: 40,
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

productflow = productflow.map(item => ({ ...item, sorter: true }));
productProcess = productProcess.map(item => ({ ...item, sorter: true }));

export default {
  productflow,
  productProcess,
};
