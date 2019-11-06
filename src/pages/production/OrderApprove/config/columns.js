import styles from './columns.less';
import {statusConvert,HasConvert} from '@/utils/convert';

let orderApproveInfo = [
  {
    title: <div className={styles.row_normal2}>审批编号</div>,
    dataIndex: 'approveNo',
    key: 'approveNo',
    width: 100,
    render: (data) => (
      <div className={styles.tableRow1} style={{ maxWidth: 100 }}>{data}</div>
    ),
  }, {
    title: <div className={styles.row_normal2}>客户编号</div>,
    dataIndex: 'customerNo',
    key: 'customerNo',
    width: 100,
  },
  {
    title: <div className={styles.row_normal2}>客户中文名称</div>,
    dataIndex: 'customerGoodNo',
    key: 'customerGoodNo',
    width: 100,
  },
  {
    title: <div className={styles.row_normal2}>客户英文名称</div>,
    dataIndex: 'customerShot',
    key: 'customerShotName',
    width: 100,
    render:(d,i)=>(i.customerShotName)
  },
  {
    title: <div className={styles.row_normal2}>订单号码</div>, // ?
    dataIndex: 'orderNo',
    key: 'orderNo',
    width: 100,
  },

  {
    title: <div className={styles.row_normal2}>订单类别</div>,
    dataIndex: 'type',
    key: 'type',
    width: 100,
    render:(data,item)=>item.typeName
  },
  {
    title: <div className={styles.row_normal2}>订单数量</div>,
    dataIndex: 'orderNum',
    key: 'orderNum',
    width: 100,
  },
  {
    title: <div className={styles.row_normal2}>紧急程度</div>,
    dataIndex: 'emergency',
    key: 'emergency',
    width: 100,
  },
  {
    title: <div className={styles.row_normal2}>审批日期</div>,
    dataIndex: 'mtime',
    key: 'mtime',
    width: 100,
  }
];


let orderApproveProduct = [
  {
    title: <div className={styles.row_normal2}>产品编号</div>,
    dataIndex: 'productNo',
    key: 'productNo',
    width: 100,
    render: (data) => (
      <div className={styles.tableRow1} style={{ maxWidth: 100 }}>{data}</div>
    ),
  },
  {
    title: <div className={styles.row_normal2}>中文名</div>,
    dataIndex: 'zhName',
    key: 'zhName',
    width: 100,
  },
  {
    title: <div className={styles.row_normal2}>电镀颜色</div>,
    dataIndex: 'platingColor',
    key: 'platingColor',
    width: 60,
  },
  {
    title: <div className={styles.row_normal2}>宝石颜色</div>,
    dataIndex: 'gemColor',
    key: 'gemColor',
    width: 50,
  },
  {
    title: <div className={styles.row_normal2}>重量范围</div>,
    dataIndex: 'unitOfWeight',
    key: 'unitOfWeight',
    width: 40,
  },
  {
    title: <div className={styles.row_normal2}>模具号</div>,
    dataIndex: 'mouldNo',
    key: 'mouldNo',
    width: 60,
  },
  {
    title: <div className={styles.row_normal2}>成色</div>,
    dataIndex: 'productColor',
    key: 'productColor',
    width: 80,
  },
  {
    title: <div className={styles.row_normal2}>成色重量</div>,
    dataIndex: 'finishedWeight',
    key: 'finishedWeight',
    width: 60,
  },
  {
    title: <div className={styles.row_normal2}>创建时间</div>,
    dataIndex: 'createTime',
    key: 'createTime',
    width: 40,
  },
  {
    title: <div className={styles.row_normal2}>客户货号</div>,
    dataIndex: 'custoerProductNo',
    key: 'custoerProductNo',
    width: 40,
  },
];

let orderApproveResult = [
  {
    title: <div className={styles.row_normal2}>产品编号</div>,
    dataIndex: 'productNo',
    key: 'productNo',
    width: 100,
    render: (data) => (
      <div className={styles.tableRow1} style={{ maxWidth: 100 }}>{data}</div>
    ),
  },
  {
    title: <div className={styles.row_normal2}>审批单号</div>,
    dataIndex: 'approveNo',
    key: 'approveNo',
    width: 100,
  },
  {
    title: <div className={styles.row_normal2}>审批人</div>,
    dataIndex: 'approveUser',
    key: 'approveUser',
    width: 60,
  },
  {
    title: <div className={styles.row_normal2}>审批人姓名</div>,
    dataIndex: 'userName',
    key: 'userName',
    width: 50,
  },
  {
    title: <div className={styles.row_normal2}>审批部门</div>,
    dataIndex: 'approveDep',
    key: 'approveDep',
    width: 40,
  },
  {
    title: <div className={styles.row_normal2}>部门名称</div>,
    dataIndex: 'depName',
    key: 'depName',
    width: 60,
  },
  {
    title: <div className={styles.row_normal2}>审批时间</div>,
    dataIndex: 'approveTime',
    key: 'approveTime',
    width: 40,
  },
  {
    title: <div className={styles.row_normal2}>审批结果</div>,
    dataIndex: 'approveResult',
    key: 'approveResult',
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
