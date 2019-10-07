import styles from './columns.less'

let  productFlow = [
  {
    title: <div className={styles.row_normal2}>客户编号</div>,
    dataIndex: 'customerNo',
    key: 'customerNo',
    width: 100,
    render: (data) => (
      <div className={styles.tableRow1} style={{ maxWidth: 100 }}>{data}</div>
    )
  },
  {
    title: <div className={styles.row_normal2}>简称</div>,
    dataIndex: 'customerShotName',
    key: 'customerShotName',
    width: 100,
  },
  {
    title: <div className={styles.row_normal2}>报价单号</div>,
    dataIndex: 'quoteNumber',
    key: 'quoteNumber',
    width: 100,
  },
  {
    title: <div className={styles.row_normal2}>类别</div>, // ?
    dataIndex: 'typeName',
    key: 'typeName',
    width: 100,
  },

  {
    title: <div className={styles.row_normal2}>报价日期</div>,
    dataIndex: 'quoteDate',
    key: 'quoteDate',
    width: 100,
    render: (data) => (data)
  },

  {
    title: <div className={styles.row_normal2}>数量</div>,
    dataIndex: 'quoteTotalCount',
    key: 'quoteTotalCount',
    width: 100,
  },

  {
    title: <div className={styles.row_normal2}>重量</div>,
    dataIndex: 'quoteTotalWeight',
    key: 'quoteTotalWeight',
    width: 100,
  },
  {
    title: <div className={styles.row_normal2}>总额</div>,
    dataIndex: 'quoteTotalAmount',
    key: 'quoteTotalAmount',
    width: 100,
  },
  {
    title: <div className={styles.row_normal2}>终客号</div>,
    dataIndex: 'endNo',
    key: 'endNo',
    width: 100,
  },
  {
    title: <div className={styles.row_normal2}>终客简称</div>,
    dataIndex: 'endShotName',
    key: 'endShotName',
    width: 100,
  },
  {
    title: <div className={styles.row_normal2}>产品说明</div>,// ?
    dataIndex: 'explains',
    key: 'explains',
    width: 100,
  },
];



let productProcess =[]

productFlow = productFlow.map(item => ({ ...item, sorter: true }))
productProcess = productProcess.map(item => ({ ...item, sorter: true }))

export default {
  productFlow,
  productProcess
}
