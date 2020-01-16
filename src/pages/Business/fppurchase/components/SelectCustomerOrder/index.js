import React from 'react';
import Table from '@/components/Table';
import moment from 'moment/moment';
import styles from './index.less';
import SearchForm from '@/components/SearchForm';

//
// // 新增 产品 遍历配置
// const searchParams = [
//   { key: '原料编号', value: 'materialNo' },
//   { key: '规格', value: 'specification' },
//   { key: '中文名', value: 'zhName' },
// ];

// 客户编号、简称、订单号、主材价、PI日期、要求交货日期。
const columnsarr = [
  {
    title: <div className={styles.row_normal2}>客户编号</div>,
    dataIndex: 'customerNo',
    key: 'customerNo',
  },
  {
    title: <div className={styles.row_normal2}>客户简称</div>,
    dataIndex: 'customerShotName',
    key: 'customerShotName',
  },
  {
    title: <div className={styles.row_normal2}>订单号码</div>,
    dataIndex: 'piNo',
    key: 'piNo',
  },
  {
    title: <div className={styles.row_normal2}>主材价</div>,
    dataIndex: 'mainMaterialPrice',
    key: 'mainMaterialPrice',

  },
  // {
  //   title: <div className={styles.row_normal2}>金额</div>,
  //   dataIndex: 'totalQuotation',
  //   key: 'totalQuotation',
  //
  // },
  {
    title: <div className={styles.row_normal2}>订单日期</div>,
    dataIndex: 'piDate',
    key: 'piDate',

    render: data => moment(data || new Date()).format('YYYY-MM-DD'),
  }
  {
    title: <div className={styles.row_normal2}>要求交货日期</div>,
    dataIndex: 'deliveryTime',
    key: 'deliveryTime',

    render: data => moment(data || new Date()).format('YYYY-MM-DD'),
  }
];


export default (({ pagination, returnElement, source, list, selectedRowKeys, changeChoosenRow, choosenRowData, onSelectChange, onSearch, changeMaterialSearch, handleTableChange }) => {
  return (
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
  );
});
