import React from 'react'
import { Input } from 'antd'
import Table from '@/components/Table'
import styles from './index.less'
import SearchForm from '@/components/SearchForm'

const columns = [
  {
    title: <div className={styles.row_normal2}>��Ʒ���</div>,
    dataIndex: 'productNo',
    key: 'productNo',
  },
  {
    title: <div className={styles.row_normal2}>�ͻ����</div>,
    dataIndex: 'customerNo',
    key: 'customerNo',
  },
  {
    title: <div className={styles.row_normal2}>���</div>,
    dataIndex: 'productTypeName',
    key: 'productTypeName',
  },
  {
    title: <div className={styles.row_normal2}>��ʯ��ɫ</div>,
    dataIndex: 'gemColorName',
    key: 'gemColorName',
  },
  {
    title: <div className={styles.row_normal2}>��ɫ</div>,
    dataIndex: 'productColorName',
    key: 'productColorName',
  },
  {
    title: <div className={styles.row_normal2}>��Ʒ����</div>,
    dataIndex: 'finishedWeight',
    key: 'finishedWeight',
  },
  {
    title: <div className={styles.row_normal2}>�����ɫ</div>,
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