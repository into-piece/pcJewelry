import React, { Component } from 'react';
import { connect } from 'dva/index';
import {  Form} from 'antd';
import styles from './MiddleTable.less';
import Table from '@/components/Table';
import SearchForm from '@/components/SearchForm';
import columnsConfig from '../config/columns';
import searchParamsArrConfig from '../config/search';

const defaultModelName = 'productflow';


@Form.create()
@connect(({ loading, productflow :model }) => {
  return {
    model,
    listLoading: loading.effects[`${defaultModelName}/getList`],
    listLoadingSecond: loading.effects[`${defaultModelName}/getDetailList`],
    list: model.list,
    listSecond: model.listSecond,
    pagination: model.pagination,
    paginationSecond: model.paginationSecond,
    choosenRowData: model.choosenRowData,
    choosenRowDataSecond: model.choosenRowDataSecond,
    selectedRowKeys: model.selectedRowKeys,
    selectedRowKeysSecond: model.selectedRowKeysSecond,
    searchParams: model.searchParams,
    searchParamsSecond: model.searchParamsSecond,
  };
})
class MiddleTable extends Component {

  getDetailList = (params) => {
    const { dispatch, pagination, choosenRowData } = this.props;
    dispatch({
      type: `${defaultModelName}/getDetailList`,
      payload: {
        params: { quoteHeadId: choosenRowData.id, ...pagination, ...params },
      },
    });
  }

  // 选中某行
  changeChoosenRow = (rowData, type) => {
    const { dispatch, pagination } = this.props;
    const str = type === 1 ? '' : 'Detail'
    dispatch({
      type: `${defaultModelName}/getChoosen${str}RowData`,
      payload: rowData,
    });
    if (type === 1) {
      this.getDetailList({ quoteHeadId: rowData.id })
    } else {
      dispatch({
        type: `${defaultModelName}/changeRightMenu`,
        payload: 2,
      });
    }
  };

  // 更改table select数组
  onSelectChange = (selectedRowKeys, type) => {
    const str = type === 2 ? 'Detail' : ''
    this.props.dispatch({
      type: `${defaultModelName}/changeSelected${str}RowKeys`,
      payload: selectedRowKeys,
    })
  };

  // 当表头重复点击选中 清空选中 清空表体
  clearFn = (type) => {
    const { dispatch } = this.props;
    if (type === 1) {
      dispatch({
        type: `${defaultModelName}/clearDetailList`,
      });
      dispatch({
        type: `${defaultModelName}/getChoosenRowData`,
        payload: {}
      });
    }
  }

  changeSearchParams = (v) => {
    const { dispatch } = this.props;
    dispatch({
      type: `${defaultModelName}/changeSearchParams`,
      payload: v,
    });
  }

  changeSearchDetailParams = (v) => {
    const { dispatch } = this.props;
    dispatch({
      type: `${defaultModelName}/changeSearchParams`,
      payload: v,
    });
  }

  render() {
    const { onSelectChange, props, getDetailList, changeSearchParams, changeSearchDetailParams } = this
    const {
      firstType,
      secondType,
      returnElement,
      onSearch,

      list,
      listSecond,

      choosenRowData,
      choosenRowDataSecond,
      pagination,
      paginationSecond,

      selectedRowKeys,
      selectedRowKeysSecond,

      model,

      listLoading,
      listLoadingSecond,
        } = props;
    return (
      <div className={styles.view_left_content}>

        <SearchForm data={searchParamsArrConfig[firstType]} source={model} onSearch={onSearch} returnElement={returnElement} onchange={changeSearchParams} />
        <div className={styles.tableBox}>
          <Table
            scroll={{ x: 1400 }}
            columns={columnsConfig[firstType]}
            pagination={pagination}
            selectKey={choosenRowData.id}
            handleTableChange={onSearch}
            body={list}
            selectedRowKeys={selectedRowKeys}
            changeChoosenRow={record => { this.changeChoosenRow(record, 1) }}
            onSelectChange={(data) => { onSelectChange(data, 1) }}

            listLoading={listLoading}
          />
        </div>

        <SearchForm data={searchParamsArrConfig[secondType]} source={model} onSearch={getDetailList} returnElement={returnElement} onchange={changeSearchDetailParams} />
        <div className={styles.tableBox}>
          <Table
            scroll={{ x: 1600 }}
            columns={columnsConfig[secondType]}
            pagination={paginationSecond}
            selectKey={choosenRowDataSecond.id}
            handleTableChange={getDetailList}
            selectedRowKeys={selectedRowKeysSecond}
            body={listSecond}
            changeChoosenRow={record => { this.changeChoosenRow(record, 2) }}
            onSelectChange={data => { onSelectChange(data, 2) }}

            listLoading={listLoadingSecond}

          />
        </div>
      </div>
    );
  }
}
export default MiddleTable;
