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

  /**
   * 点击单行回调
   * 传入 onSelectChange 进行选中
   * 传入clearFn
   */
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

  // 行样式
  onSelectRowClass = (record, index) => {
    const color = index % 2 === 0 ? styles.row_normal : ''
    return color;
  };

  onRow = record => ({
    onClick: () => {
      this.clickRowItem(record);
    }, // 点击行
  })

  /**
   * 翻页 或 排序触发回调
   * handleTableChange 为列表请求函数
   * 直接传参数触发更新
   */
  onChange = (pagination, filters, sorter) => {
    console.log(sorter)
    const { current, pageSize } = pagination
    const { handleTableChange } = this.props
    const { order, field } = sorter
    const orderKey = order === "ascend" ? 'Asc' : order === 'descend' ? 'Desc' : ''
    handleTableChange({ current, size: pageSize, [`orderBy${orderKey}`]: field });
    debugger
  }

  render() {
    const { props, pageChange, onSelectRowClass, onRow, onChange } = this;
    const { body = {}, columns, pagination, selectedRowKeys, onSelectChange, listLoading, noSelect, scroll } = props;
    const { current, size } = pagination;
    const paginationProps = {
      showQuickJumper: true,
      pageSize: size,
      current,
      total: body ? body.total : 0,
      // onChange: pageChange,
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
        scroll={scroll || { x: 900 }}
        columns={columns}
        dataSource={body.records}
        rowSelection={rowSelection}
        pagination={paginationProps}
        onChange={onChange}
        rowKey={record => record.id}
        rowClassName={onSelectRowClass}
        loading={listLoading}
        onRow={onRow}
      />
    );
  }
}

export default MyTable;
