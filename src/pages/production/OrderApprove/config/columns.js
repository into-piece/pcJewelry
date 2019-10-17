import styles from './columns.less';
import {statusConvert,HasConvert} from '@/utils/convert';

let orderApproveInfo = [
  {
    title: <div className={styles.row_normal2}>审批单号</div>,
    dataIndex: 'approveNo',
    key: 'approveNo',
    width: 100,
    render: (data) => (
      <div className={styles.tableRow1} style={{ maxWidth: 100 }}>{data}</div>
    ),
  }, {
    title: <div className={styles.row_normal2}>订单号码</div>,
    dataIndex: 'orderNo',
    key: 'orderNo',
    width: 100,
  },
  {
    title: <div className={styles.row_normal2}>订单类别</div>,
    dataIndex: 'customerGoodNo',
    key: 'customerGoodNo',
    width: 100,
  },
  {
    title: <div className={styles.row_normal2}>客户简称</div>,
    dataIndex: 'customerShotName',
    key: 'customerShotName',
    width: 100,
  },
  {
    title: <div className={styles.row_normal2}>客户编号</div>, // ?
    dataIndex: 'customerNo',
    key: 'customerNo',
    width: 100,
  },

  {
    title: <div className={styles.row_normal2}>紧急程度</div>,
    dataIndex: 'weightRange',
    key: 'weightRange',
    width: 100,
  },
  {
    title: <div className={styles.row_normal2}>审批日期</div>,
    dataIndex: 'orderNo2',
    key: 'orderNo2',
    width: 100,
  },
  {
    title: <div className={styles.row_normal2}>订单数量</div>,
    dataIndex: 'workingHour',
    key: 'workingHour',
    width: 100,
  }
];


let orderApproveProduct = [
  {
    title: <div className={styles.row_normal2}>产品编号</div>,
    dataIndex: 'processCode',
    key: 'processCode',
    width: 100,
    render: (data) => (
      <div className={styles.tableRow1} style={{ maxWidth: 100 }}>{data}</div>
    ),
  },
  {
    title: <div className={styles.row_normal2}>产品名称</div>,
    dataIndex: 'processName',
    key: 'processName',
    width: 100,
  },
  {
    title: <div className={styles.row_normal2}>模具号</div>,
    dataIndex: 'engName',
    key: 'engName',
    width: 60,
  },
  {
    title: <div className={styles.row_normal2}>电镀颜色</div>,
    dataIndex: 'sortNum',
    key: 'sortNum',
    width: 50,
  },
  {
    title: <div className={styles.row_normal2}>成色</div>,
    dataIndex: 'isWastage',
    key: 'isWastage',
    width: 40,
  },
  {
    title: <div className={styles.row_normal2}>重量范围</div>,
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
    width: 60,
  },
  {
    title: <div className={styles.row_normal2}>有无BOM</div>,
    dataIndex: 'status',
    key: 'status',
    width: 40,
    render: (data) => (
      <div className={styles.tableRow1} style={{ maxWidth: 40 }}>{HasConvert[data]}</div>
    ),
  },
];

let orderApproveResult = [
  {
    title: <div className={styles.row_normal2}>员工编号</div>,
    dataIndex: 'processCode',
    key: 'processCode',
    width: 100,
    render: (data) => (
      <div className={styles.tableRow1} style={{ maxWidth: 100 }}>{data}</div>
    ),
  },
  {
    title: <div className={styles.row_normal2}>员工姓名</div>,
    dataIndex: 'processName',
    key: 'processName',
    width: 100,
  },
  {
    title: <div className={styles.row_normal2}>审批部门</div>,
    dataIndex: 'engName',
    key: 'engName',
    width: 60,
  },
  {
    title: <div className={styles.row_normal2}>产品编号</div>,
    dataIndex: 'sortNum',
    key: 'sortNum',
    width: 50,
  },
  {
    title: <div className={styles.row_normal2}>审批结果</div>,
    dataIndex: 'status',
    key: 'status',
    width: 40,
  },
  {
    title: <div className={styles.row_normal2}>审批时间</div>,
    dataIndex: 'processCapacity',
    key: 'processCapacity',
    width: 60,
  }
];

orderApproveInfo = orderApproveInfo.map(item => ({ ...item, sorter: true }));
orderApproveProduct = orderApproveProduct.map(item => ({ ...item, sorter: true }));
orderApproveResult = orderApproveResult.map(item => ({ ...item, sorter: true }));

export default {
  orderApproveInfo,
  orderApproveProduct,
  orderApproveResult,
};
