import styles from './columns.less';
import {statusConvert} from '@/utils/convert';

let processSalary = [
  {
    title: <div className={styles.row_normal2}>流程编号</div>,
    dataIndex: 'flowCode',
    key: 'flowCode',
  },
  {
    title: <div className={styles.row_normal2}>流程名称</div>,
    dataIndex: 'flowName',
    key: 'flowName',
  },
  {
    title: <div className={styles.row_normal2}>英文名称</div>,
    dataIndex: 'enName',
    key: 'enName',
  },
  {
    title: <div className={styles.row_normal2}>小时工资(元/小时)</div>,
    dataIndex: 'hourlyWage',
    key: 'hourlyWage',
  },
  {
    title: <div className={styles.row_normal2}>员工至部门系数</div>, // ?
    dataIndex: 'staffCoefficient',
    key: 'staffCoefficient',
  },

  {
    title: <div className={styles.row_normal2}>部门至工厂系数</div>,
    dataIndex: 'departmentCoefficient',
    key: 'departmentCoefficient',
  },

  {
    title: <div className={styles.row_normal2}>工厂至业务系数</div>,
    dataIndex: 'factoryCoefficient',
    key: 'factoryCoefficient',
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


processSalary = processSalary.map(item => ({ ...item, sorter: true }));

export default {
  processSalary,
};
