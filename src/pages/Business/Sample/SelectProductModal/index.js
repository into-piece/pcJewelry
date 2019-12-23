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
  },
  {
    title: <div className={styles.row_normal2}>客户编号</div>,
    dataIndex: 'customerNo',
    key: 'customerNo',
  },
  {
    title: <div className={styles.row_normal2}>类别</div>,
    dataIndex: 'productTypeName',
    key: 'productTypeName',
  },
  {
    title: <div className={styles.row_normal2}>宝石颜色</div>,
    dataIndex: 'gemColorName',
    key: 'gemColorName',
  },
  {
    title: <div className={styles.row_normal2}>成色</div>,
    dataIndex: 'productColorName',
    key: 'productColorName',
  },
  {
    title: <div className={styles.row_normal2}>成品重量</div>,
    dataIndex: 'finishedWeight',
    key: 'finishedWeight',
  },
  {
    title: <div className={styles.row_normal2}>电镀颜色</div>,
    dataIndex: 'platingColorName',
    key: 'platingColorName',
  },
]
export default (({ productSearchParams, pagination, returnElement, source, list, productselectedKeys, changeChoosenRow, choosenRowData, onSelectChange, onSearch, changeProductSearch }) => (
  <div className={styles.productModal}>
    <SearchForm
      onSearch={onSearch}
      data={productSearchParams}
      returnElement={returnElement}
      source={source}
      onchange={changeProductSearch}
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
    />
  </div>
))