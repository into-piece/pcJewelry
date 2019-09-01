import React from 'react'
import { Input } from 'antd'
import Table from '@/components/Table'
import styles from './index.less'
import SearchForm from '@/components/SearchForm'

const list = []
const columns = [
  {
    title: <div className={styles.row_normal2}>客户编号</div>,
    dataIndex: 'customerId',
    key: 'customerId',
    render: (data) => (
      <div className={styles.tableRow1} style={{ maxWidth: 100 }}>{data}</div>
    )
  },
]
export default (({ productSearchParams, pagination }) => (
  <div className={styles.productModal}>
    <Input />
    <SearchForm data={productSearchParams} />
    <Table
      columns={columns}
      body={list}
      pagination={pagination}
    // changePagination={changePagination}
    // onSelectChange={(data) => { onSelectChange(data, 1) }}
    // listLoading={listLoading}
    />
  </div>
))