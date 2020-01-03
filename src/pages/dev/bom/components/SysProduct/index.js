import React from 'react'
import { Input } from 'antd'
import Table from '@/components/Table'
import styles from './index.less'

const columnsarr = [
  {
    title: '产品编号',
    dataIndex: 'productNo',
    key: 'productNo',
  },
  {
    title: '电镀颜色',
    dataIndex: 'platingColorName',
    key: 'platingColorName',
  },
  {
    title: '类别',
    dataIndex: 'productTypeName',
    key: 'productTypeName',
  },
  {
    title: '颜色名称',
    dataIndex: 'gemColorName',
    key: 'gemColorName',
  },
  {
    title: '成色名称',
    dataIndex: 'productColorName',
    key: 'productColorName',
  },
  {
    title: '英文名',
    dataIndex: 'enName',
    key: 'enName',
  },
  {
    title: '客户编号',
    dataIndex: 'customerNo',
    key: 'customerNo',
  },
  {
    title: '客户货号',
    dataIndex: 'customerProductNo',
    key: 'customerProductNo',
  },
  {
    title: '客户简称',
    dataIndex: 'customerShotName',
    key: 'customerShotName',
  },
]


export default (({ productChoosenData,choosenRowData,pagination, returnElement, source, list, selectedRowKeys, changeChoosenRow,   onSelectChange, handleTableChange }) => {
  console.log(pagination,'pagination======');

  return(
    <div className={styles.productModal}>
      {productChoosenData.id}
      <Table
        columns={columnsarr}
        body={list}
        pagination={pagination}
        noSelect
        selectedRowKeys={selectedRowKeys}
        changeChoosenRow={changeChoosenRow}
        selectKey={choosenRowData.id}
        onSelectChange={onSelectChange}
        handleTableChange={handleTableChange}
        checkType="radio"
      />
    </div>
  )
})
