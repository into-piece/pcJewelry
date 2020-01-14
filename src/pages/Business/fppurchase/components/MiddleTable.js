import React, { Component } from 'react';
import { connect } from 'dva/index';
import { Form, Divider } from 'antd';
import styles from './MiddleTable.less';
import Table from '@/components/Table';
import SearchForm from '@/components/SearchForm';
import columnsConfig from '../config/columns';
import searchParamsArrConfig from '../config/search';

const defaultModelName = 'fppurchase';


@Form.create()
@connect(({ loading, fppurchase: model }) => {
  return {
    model,
    listLoading: loading.effects[`${defaultModelName}/getList`],
    listLoadingSecond: loading.effects[`${defaultModelName}/getListSecond`],
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


  // 选中某行   type  1 主table
  changeChoosenRow = (rowData, type) => {
    const { dispatch, pagination, onSearch ,changedetailtab} = this.props;
    const str = type === 1 ? '' : 'Second';

    changedetailtab&&changedetailtab(type);
    dispatch({
      type: `${defaultModelName}/setChoosenRowData${str}`,
      payload: rowData,
    });
    if (type === 1) {
      this.searchSecond.handleReset();
      if (onSearch) onSearch({ flowCode: rowData.flowCode }, 2);
    } else {
      // dispatch({
      //   type: `${defaultModelName}/changeRightMenu`,
      //   payload: 2,
      // });
    }
  };

  // 更改table select数组
  onSelectChange = (selectedRowKeys, type) => {
    const { dispatch } = this.props;

    const str = type === 2 ? 'Second' : '';

    dispatch({
      type: `${defaultModelName}/changeSelectedRowKeys${str}`,
      payload: selectedRowKeys,
    });
  };

  // 当表头重复点击选中 清空选中 清空表体
  clearFn = (type) => {
    const { dispatch } = this.props;
    if (type === 1) {
      // 清除第二table数据
      dispatch({
        type: `${defaultModelName}/clearListSecond`,
      });
      dispatch({
        type: `${defaultModelName}/setChoosenRowData`,
        payload: {},
      });
    }
  };

  changeSearchParams = (v) => {
    const { dispatch } = this.props;
    dispatch({
      type: `${defaultModelName}/changeSearchParams`,
      payload: v,
    });
  };

  changeSearchDetailParams = (v) => {
    const { dispatch } = this.props;
    dispatch({
      type: `${defaultModelName}/changeSearchParamsSecond`,
      payload: v,
    });
  };

  render() {
    const { onSelectChange, props, changeSearchParams, changeSearchDetailParams,clearFn } = this;
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

        <SearchForm
          data={searchParamsArrConfig[firstType]}
          source={model}
          onSearch={(p) => {
            onSearch({...p,current:1}, 1);
          }}
          returnElement={returnElement}
          onchange={changeSearchParams}
        />
        <div className={styles.tableBox}>
          <Table
            scroll={{ x: 'max-content' }}
            columns={columnsConfig[firstType]}
            pagination={pagination}
            selectKey={choosenRowData.id}
            handleTableChange={(p) => {
              onSearch(p, 1);
            }}
            body={list}
            selectedRowKeys={selectedRowKeys}
            changeChoosenRow={record => {
              this.changeChoosenRow(record, 1);
            }}
            onSelectChange={(data) => {
              onSelectChange(data, 1);
            }}

            listLoading={listLoading}
            clearFn={clearFn}
            type={1}
          />
        </div>
        <Divider />
        <SearchForm
          wrappedComponentRef={ref => {
            this.searchSecond = ref;
          }}
          data={searchParamsArrConfig[secondType]}
          source={model}
          onSearch={(p) => {
            onSearch({...p,current:1}, 2);
          }}
          returnElement={returnElement}
          onchange={changeSearchDetailParams}
        />
        <div className={styles.tableBox}>
          <Table
            scroll={{ x: 'max-content' }}
            columns={columnsConfig[secondType]}
            pagination={paginationSecond}
            selectKey={choosenRowDataSecond.id}
            handleTableChange={(p) => {
              onSearch(p, 2);
            }}
            selectedRowKeys={selectedRowKeysSecond}
            body={listSecond}
            changeChoosenRow={record => {
              this.changeChoosenRow(record, 2);
            }}
            onSelectChange={data => {
              onSelectChange(data, 2);
            }}

            listLoading={listLoadingSecond}
            clearFn={clearFn}
            type={2}
          />
        </div>
      </div>
    );
  }
}

export default MiddleTable;
