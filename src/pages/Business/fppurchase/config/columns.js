import styles from './columns.less';
import {statusConvert,YoNConvert} from '@/utils/convert';

let fppurchase = [
  {
    title: <div className={styles.row_normal2}>采购单号</div>,
    dataIndex: 'flowCode',
    key: 'flowCode',
  },
  {
    title: <div className={styles.row_normal2}>客户订单</div>,
    dataIndex: 'flowName',
    key: 'flowName',
  },
  {
    title: <div className={styles.row_normal2}>客户编号</div>,
    dataIndex: 'engName',
    key: 'engName',
  },
  {
    title: <div className={styles.row_normal2}>客户简称</div>,
    dataIndex: 'department',
    key: 'departmentName',
    width: 100,
    render:(d,i)=>(i.departmentName)

  },
  {
    title: <div className={styles.row_normal2}>供应商编号</div>,
    dataIndex: 'efficiency',
    key: 'efficiency',
  },

  {
    title: <div className={styles.row_normal2}>采购日期</div>,
    dataIndex: 'isWastage',
    key: 'isWastage',
  },

  {
    title: <div className={styles.row_normal2}>供应商简称</div>,
    dataIndex: 'weightRange',
    key: 'weightRange',
  },

  {
    title: <div className={styles.row_normal2}>联系人</div>,
    dataIndex: 'flowClass',
    key: 'flowClass',

  },
  {
    title: <div className={styles.row_normal2}>供应商交期</div>,
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: <div className={styles.row_normal2}>手机</div>,
    dataIndex: 'chargeUser',
    key: 'chargeUser',
  },
  {
    title: <div className={styles.row_normal2}>电话</div>,
    dataIndex: 'chargeUser',
    key: 'chargeUser',
  },
  {
    title: <div className={styles.row_normal2}>主材价</div>,
    dataIndex: 'chargeUser',
    key: 'chargeUser',
  },
  {
    title: <div className={styles.row_normal2}>币种</div>,
    dataIndex: 'chargeUser',
    key: 'chargeUser',
  },
  {
    title: <div className={styles.row_normal2}>采购总数</div>,
    dataIndex: 'chargeUser',
    key: 'chargeUser',
  },
  {
    title: <div className={styles.row_normal2}>采购总重(g)</div>,
    dataIndex: 'chargeUser',
    key: 'chargeUser',
  },
  {
    title: <div className={styles.row_normal2}>采购总额</div>,
    dataIndex: 'chargeUser',
    key: 'chargeUser',
  },
  {
    title: <div className={styles.row_normal2}>返回主材总重</div>,
    dataIndex: 'chargeUser',
    key: 'chargeUser',
  },
  {
    title: <div className={styles.row_normal2}>税率</div>,
    dataIndex: 'chargeUser',
    key: 'chargeUser',
  },
  {
    title: <div className={styles.row_normal2}>采购人</div>,
    dataIndex: 'chargeUser',
    key: 'chargeUser',
  },
  {
    title: <div className={styles.row_normal2}>备注</div>,
    dataIndex: 'chargeUser',
    key: 'chargeUser',
  },
  {
    title: <div className={styles.row_normal2}>状态</div>,
    dataIndex: 'chargeUser',
    key: 'chargeUser',
  },
];


let fpdetail = [
  {
    title: <div className={styles.row_normal2}>产品编号</div>,
    dataIndex: 'processCode',
    key: 'processCode',
  },
  {
    title: <div className={styles.row_normal2}>供应商编号</div>,
    dataIndex: 'processName',
    key: 'processName',
  },
  {
    title: <div className={styles.row_normal2}>中文名</div>,
    dataIndex: 'zhName',
    key: 'zhName',
  },
  {
    title: <div className={styles.row_normal2}>英文名</div>,
    dataIndex: 'enName',
    key: 'enName',
  },
  {
    title: <div className={styles.row_normal2}>生产工序产能(件/小时)</div>,
    dataIndex: 'processCapacity',
    key: 'processCapacity',
  },
  {
    title: <div className={styles.row_normal2}>类别</div>,
    dataIndex: 'createTime',
    key: 'createTime',
  },
  {
    title: <div className={styles.row_normal2}>成色名称</div>,
    dataIndex: 'createUser',
    key: 'createUser',
  },
  {
    title: <div className={styles.row_normal2}>宝石颜色</div>,
    dataIndex: 'createUser',
    key: 'createUser',
  },
  {
    title: <div className={styles.row_normal2}>电镀颜色</div>,
    dataIndex: 'createUser',
    key: 'createUser',
  },
  {
    title: <div className={styles.row_normal2}>计量单位</div>,
    dataIndex: 'createUser',
    key: 'createUser',
  },
  {
    title: <div className={styles.row_normal2}>创建人</div>,
    dataIndex: 'createUser',
    key: 'createUser',
  },
  {
    title: <div className={styles.row_normal2}>返主材类别</div>,
    dataIndex: 'createUser',
    key: 'createUser',
  },
  {
    title: <div className={styles.row_normal2}>工价类别</div>,
    dataIndex: 'createUser',
    key: 'createUser',
  },
  {
    title: <div className={styles.row_normal2}>此次工费(克/件)</div>,
    dataIndex: 'createUser',
    key: 'createUser',
  },
  {
    title: <div className={styles.row_normal2}>最低工费(克/件)</div>,
    dataIndex: 'createUser',
    key: 'createUser',
  },
  {
    title: <div className={styles.row_normal2}>成品重量(g)</div>,
    dataIndex: 'createUser',
    key: 'createUser',
  },
  {
    title: <div className={styles.row_normal2}>是否记石重</div>,
    dataIndex: 'createUser',
    key: 'createUser',
  },
  {
    title: <div className={styles.row_normal2}>石材重量(g)</div>,
    dataIndex: 'createUser',
    key: 'createUser',
  },
  {
    title: <div className={styles.row_normal2}>主材重量(g)</div>,
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: <div className={styles.row_normal2}>石材价</div>,
    dataIndex: 'createUser',
    key: 'createUser',
  },
  {
    title: <div className={styles.row_normal2}>字印编辑</div>,
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: <div className={styles.row_normal2}>字印价</div>,
    dataIndex: 'createUser',
    key: 'createUser',
  },
  {
    title: <div className={styles.row_normal2}>包装单价</div>,
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: <div className={styles.row_normal2}>单价</div>,
    dataIndex: 'createUser',
    key: 'createUser',
  },
  {
    title: <div className={styles.row_normal2}>客户订单数量</div>,
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: <div className={styles.row_normal2}>采购重量</div>,
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: <div className={styles.row_normal2}>采购金额</div>,
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: <div className={styles.row_normal2}>返主材重量</div>,
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: <div className={styles.row_normal2}>采购重量范围</div>,
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: <div className={styles.row_normal2}>成品长度</div>,
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: <div className={styles.row_normal2}>产品单位</div>,
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: <div className={styles.row_normal2}>戒围标准</div>,
    dataIndex: 'status',
    key: 'status',
  },
];

fppurchase = fppurchase.map(item => ({ ...item, sorter: true }));
fpdetail = fpdetail.map(item => ({ ...item, sorter: true }));

export default {
  fppurchase,
  fpdetail,
};
