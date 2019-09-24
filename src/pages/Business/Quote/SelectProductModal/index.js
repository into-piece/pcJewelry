import React from 'react'
import { Input } from 'antd'
import Table from '@/components/Table'
import styles from './index.less'
import SearchForm from '@/components/SearchForm'

const columns = [
  {
    title: <div className={styles.row_normal2}>产品编号</div>,
    dataIndex: 'productNo',
    key: 'productNo',
    render: (data) => (
      <div className={styles.tableRow1} style={{ maxWidth: 100 }}>{data}</div>
    )
  },
  {
    title: <div className={styles.row_normal2}>客户编号</div>,
    dataIndex: 'customerNo',
    key: 'customerNo',
    render: (data) => (
      <div className={styles.tableRow1} style={{ maxWidth: 100 }}>{data}</div>
    )
  },
  {
    title: <div className={styles.row_normal2}>类别</div>,
    dataIndex: 'productTypeName',
    key: 'productTypeName',
    render: (data) => (
      <div className={styles.tableRow1} style={{ maxWidth: 100 }}>{data}</div>
    )
  },
  {
    title: <div className={styles.row_normal2}>宝石颜色</div>,
    dataIndex: 'gemColorName',
    key: 'gemColorName',
    render: (data) => (
      <div className={styles.tableRow1} style={{ maxWidth: 100 }}>{data}</div>
    )
  },
  {
    title: <div className={styles.row_normal2}>成色</div>,
    dataIndex: 'productColorName',
    key: 'productColorName',
    render: (data) => (
      <div className={styles.tableRow1} style={{ maxWidth: 100 }}>{data}</div>
    )
  },
  {
    title: <div className={styles.row_normal2}>产品重量</div>,
    dataIndex: 'finishedWeight',
    key: 'finishedWeight',
    render: (data) => (
      <div className={styles.tableRow1} style={{ maxWidth: 100 }}>{data}</div>
    )
  },
  {
    title: <div className={styles.row_normal2}>成品重量</div>,
    dataIndex: 'platingColorName',
    key: 'platingColorName',
    render: (data) => (
      <div className={styles.tableRow1} style={{ maxWidth: 100 }}>{data}</div>
    )
  },
  // {
  //   title: <div className={styles.row_normal2}>报价重量</div>,
  //   dataIndex: 'customerId',
  //   key: 'customerId',
  //   render: (data) => (
  //     <div className={styles.tableRow1} style={{ maxWidth: 100 }}>{data}</div>
  //   )
  // },
  // {
  //   title: <div className={styles.row_normal2}>类别中文名</div>,
  //   dataIndex: 'customerId',
  //   key: 'customerId',
  //   render: (data) => (
  //     <div className={styles.tableRow1} style={{ maxWidth: 100 }}>{data}</div>
  //   )
  // },
  // {
  //   title: <div className={styles.row_normal2}>颜色名称</div>,
  //   dataIndex: 'customerId',
  //   key: 'customerId',
  //   render: (data) => (
  //     <div className={styles.tableRow1} style={{ maxWidth: 100 }}>{data}</div>
  //   )
  // },
]
export default (({ productSearchParams, pagination, returnElement, source, list, productselectedKeys, changeChoosenRow, choosenRowData, onSelectChange, onSearch }) => (
  <div className={styles.productModal}>
    <SearchForm
      onSearch={onSearch}
      data={productSearchParams}
      returnElement={returnElement}
      source={source}
    />
    <Table
      columns={columns}
      body={list}
      pagination={pagination}
      noSelect
      selectedRowKeys={productselectedKeys}
      changeChoosenRow={changeChoosenRow}
      selectKey={choosenRowData.id}
      onSelectChange={onSelectChange}
    // changePagination={changePagination}
    // listLoading={listLoading}
    />
  </div>
))