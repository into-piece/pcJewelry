/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-17 01:25:53
 * @LastEditTime: 2019-08-17 15:24:31
 * @LastEditors: Please set LastEditors
 */
import React, { Component } from 'react';
import { Table } from 'antd';
import styles from './index.less';

class MyTable extends Component {

  clickRowItem = record => {
    const { changeChoosenRow, onSelectChange, clearFn } = this.props;
    let selectedRow = [];
    const { selectedRowKeys } = this.props
    if (selectedRowKeys.includes(record.id)) {
      selectedRow = selectedRowKeys.filter(item => item !== record.id);
      clearFn && clearFn(this.props.type)
      onSelectChange && onSelectChange(selectedRow)
      // selectedRowKeys = []
      return
    }
    // selectedRowKeys = [... this.state.selectedRowKeys, record.id]
    selectedRow = [record.id];
    onSelectChange && onSelectChange(selectedRow)
    changeChoosenRow(record);
  };

  pageChange = (page, pageSize) => {
    const { changePagination } = this.props
    changePagination({ current: page, size: pageSize });
  };

  onSelectRowClass = (record, index) => {
    const color = index % 2 === 0 ? styles.row_normal : ''
    return color;
  };

  onRow = record => ({
    onClick: () => {
      this.clickRowItem(record);
    }, // 点击行
  })

  render() {
    const { props, pageChange, onSelectRowClass, onRow } = this;
    const { body = {}, columns, pagination, selectedRowKeys, onSelectChange, listLoading, noSelect } = props;
    const { current, size } = pagination;
    const paginationProps = {
      showQuickJumper: true,
      pageSize: size,
      current,
      total: body ? body.total : 0,
      onChange: pageChange,
    };

    const rowSelection =
    // noSelect ? null :
    {
      selectedRowKeys,
      type: 'checkbox',
      onChange: onSelectChange,
      // onSelect: this.selectChange,
    };

    return (
      <Table
        columns={columns}
        dataSource={body.records}
        rowSelection={rowSelection}
        pagination={paginationProps}
        rowKey={record => record.id}
        rowClassName={onSelectRowClass}
        loading={listLoading}
        onRow={onRow}
        scroll={{ x: 900 }}
      />
    );
  }
}

export default MyTable;
