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

/**
 * body 直接将接口返回的body存进model中，包含records数据数组和total数据总数
 * columns为表头
 * selectedRowKeys为勾选中的列表数组 存储的是数据的id
 * onSelectChange 触发勾选回调  返回选中数据对应id的数组=》进行本地model存储
 * listLoading 列表的loading
 * scroll 可以固定前后的列，横向滚动
 * handleTableChange 为翻页或排序触发回调 传入列表请求函数 返回筛选参数对象
 */

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
    const { current, pageSize } = pagination
    const { handleTableChange } = this.props
    const { order, field } = sorter
    const orderKey = order === "ascend" ? 'Asc' : order === 'descend' ? 'Desc' : ''
    handleTableChange({ current, size: pageSize, [`orderBy${orderKey}`]: field });
  }

  render() {
    const { props, onSelectRowClass, onRow, onChange } = this;
    const {checkType, body, columns, pagination, selectedRowKeys, onSelectChange, listLoading, scroll } = props;
    const paginationProps = {
      showQuickJumper: true,
      pageSize: pagination?pagination.size:10,
      total: body ? body.total : 0,
      current: pagination?pagination.current:1
      // total: 100, //做测试
    };

    const rowSelection =
    {
      selectedRowKeys,
      type: checkType || 'checkbox',
      onChange: onSelectChange,
    };

    return (
      <Table
        scroll={scroll || { x: 900 }}
        columns={columns}
        dataSource={body.records}
        rowSelection={rowSelection}
        pagination={pagination?paginationProps:false}
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
