import React, { Component } from 'react';
import { connect } from 'dva/index';
import { Form, Divider } from 'antd';
import styles from './MiddleTable.less';
import Table from '@/components/Table';
import SearchForm from '@/components/SearchForm';
import columnsConfig from '../config/columns';
import searchParamsArrConfig from '../config/search';

const defaultModelName = 'flowCostType';


@Form.create()
@connect(({ loading, flowCostType: model }) => {
  return {
    model,
    listLoading: loading.effects[`${defaultModelName}/getList`],
    list: model.list,
    pagination: model.pagination,
    choosenRowData: model.choosenRowData,
    selectedRowKeys: model.selectedRowKeys,
    searchParams: model.searchParams,
  };
})
class MiddleTable extends Component {


  // 选中某行   type  1 主table
  changeChoosenRow = (rowData) => {
    const { dispatch } = this.props;
    dispatch({
      type: `${defaultModelName}/setChoosenRowData`,
      payload: rowData,
    });
  };

  // 更改table select数组
  onSelectChange = (selectedRowKeys) => {
    const { dispatch } = this.props;

    dispatch({
      type: `${defaultModelName}/changeSelectedRowKeys`,
      payload: selectedRowKeys,
    });
  };

  // 当表头重复点击选中 清空选中 清空表体
  clearFn = (e) => {
    const { dispatch } = this.props;
    dispatch({
      type: `${defaultModelName}/setChoosenRowData`,
      payload: {},
    });
  };

  changeSearchParams = (v) => {
    const { dispatch } = this.props;
    dispatch({
      type: `${defaultModelName}/changeSearchParams`,
      payload: v,
    });
  };


  render() {
    const { onSelectChange, props, changeSearchParams, clearFn } = this;
    const {
      firstType,
      returnElement,
      onSearch,

      list,

      choosenRowData,
      pagination,

      selectedRowKeys,

      model,

      listLoading,
    } = props;
    return (
      <div className={styles.view_left_content}>

        <SearchForm
          data={searchParamsArrConfig[firstType]}
          source={model}
          onSearch={(p) => {
            onSearch(p);
          }}
          returnElement={returnElement}
          onchange={changeSearchParams}
        />
        <div className={styles.tableBox}>
          <Table
            scroll={{ x: 1400 }}
            columns={columnsConfig[firstType]}
            pagination={pagination}
            selectKey={choosenRowData.id}
            handleTableChange={(p) => {
              onSearch(p);
            }}
            body={list}
            selectedRowKeys={selectedRowKeys}
            changeChoosenRow={record => {
              this.changeChoosenRow(record);
            }}
            onSelectChange={(data) => {
              onSelectChange(data);
            }}

            listLoading={listLoading}
            clearFn={clearFn}
            type={1}
          />
        </div>
      </div>
    );
  }
}

export default MiddleTable;
