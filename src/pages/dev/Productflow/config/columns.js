import styles from './columns.less'

let  productFlow = [
  {
    title: <div className={styles.row_normal2}>流程编号</div>,
    dataIndex: 'flowCode',
    key: 'flowCode',
    width: 100,
    render: (data) => (
      <div className={styles.tableRow1} style={{ maxWidth: 100 }}>{data}</div>
    )
  },
  {
    title: <div className={styles.row_normal2}>流程名称</div>,
    dataIndex: 'flowName',
    key: 'flowName',
    width: 100,
  },
  {
    title: <div className={styles.row_normal2}>所属部门</div>,
    dataIndex: 'departmentName',
    key: 'departmentName',
    width: 100,
  },
  {
    title: <div className={styles.row_normal2}>成品类别</div>, // ?
    dataIndex: 'productType',
    key: 'productType',
    width: 100,
  },

  {
    title: <div className={styles.row_normal2}>损耗</div>,
    dataIndex: 'isWastage',
    key: 'isWastage',
    width: 100,
    render: (data) => (data)
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
  },
  {
    title: <div className={styles.row_normal2}>状态</div>,
    dataIndex: 'status',
    key: 'status',
    width: 100,
  },
  {
    title: <div className={styles.row_normal2}>创建人</div>,
    dataIndex: 'status',
    key: 'status1',
    width: 100,
  },
];



let productProcess =[{
  title: <div className={styles.row_normal2}>创建人</div>,
  dataIndex: 'status',
  key: 'status1',
  width: 100,
},]

productFlow = productFlow.map(item => ({ ...item, sorter: true }))
productProcess = productProcess.map(item => ({ ...item, sorter: true }))

export default {
  productFlow,
  productProcess
}
