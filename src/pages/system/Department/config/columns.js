import styles from './columns.less';
import {statusConvert} from '@/utils/convert';

let Department = [
  {
    title: <div className={styles.row_normal2}>部门编号</div>,
    dataIndex: 'role',
    key: 'role',
    width: 100,
  },
  {
    title: <div className={styles.row_normal2}>部门简称</div>,
    dataIndex: 'shortName',
    key: 'shortName',
    width: 100,
  },
  {
    title: <div className={styles.row_normal2}>中文名</div>,
    dataIndex: 'zhName',
    key: 'zhName',
    width: 100,
  },

  {
    title: <div className={styles.row_normal2}>英文名</div>,
    dataIndex: 'enName',
    key: 'enName',
    width: 100,
  },

  {
    title: <div className={styles.row_normal2}>备注</div>,
    dataIndex: 'remarks',
    key: 'remarks',
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
  }
];


Department = Department.map(item => ({ ...item, sorter: true }));

export default {
  Department,
};
