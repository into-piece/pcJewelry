import React from 'react'
import Table from '@/components/Table'
import styles from './index.less'
import SearchForm from '@/components/SearchForm'

// const arr = {
//   H016002: 'listStoneDropDown', // 石材
//   H016001: 'listPrincipalMaterialDropDown', // 主材
//   H016003: 'listAccessoriesDropDown', // 配件
//   H016004: 'listWrapperDropDown', // 包装
//   H016005: 'listAuxiliaryMaterialDropDown', // 辅材
// };

// 新增 产品 遍历配置
const searchParams = [
  { key: '原料编号', value: 'materialNo' },
  { key: '规格', value: 'specification' },
  { key: '中文名', value: 'zhName' },
];


const columnsarr = [
    {
      title: <div className={styles.row_normal2}>原料编号</div>,
      dataIndex: 'materialNo',
      key: 'materialNo',
    },
    {
      title: <div className={styles.row_normal2}>规格</div>,
      dataIndex: 'specificationName',
      key: 'specificationName',
    },
    {
      title: <div className={styles.row_normal2}>形状</div>,
      dataIndex: 'shapeName',
      key: 'shapeName',
    },
    {
      title: <div className={styles.row_normal2}>切工</div>,
      dataIndex: 'cutName',
      key: 'cutName',
    },
    {
      title: <div className={styles.row_normal2}>颜色</div>,
      dataIndex: 'colorName',
      key: 'colorName',
    },
    {
      title: <div className={styles.row_normal2}>等级</div>,
      dataIndex: 'qualityName',
      key: 'qualityName',
    },
    {
      title: <div className={styles.row_normal2}>中文名</div>,
      dataIndex: 'zhName',
      key: 'zhName',
    },
  ]



export default (({ pagination, returnElement, source, list, selectedRowKeys, changeChoosenRow, choosenRowData, onSelectChange, onSearch, changeMaterialSearch,handleTableChange }) => {
  return(
    <div className={styles.productModal}>
      {/* <SearchForm */}
      {/* onSearch={onSearch} */}
      {/* data={searchParams} */}
      {/* returnElement={returnElement} */}
      {/* source={source} */}
      {/* onchange={changeMaterialSearch} */}
      {/* /> */}
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
