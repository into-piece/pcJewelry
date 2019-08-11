import React, { Component } from 'react';
import './index.less';
import { Table } from 'antd';

class MyTable extends Component {
  state = {
    selectedRowKeys: [],
  };

  clickRowItem = record => {
    const { changeChoosenRow } = this.props;
    let selectedRow = [];
    const { selectedRowKeys } = this.state
    console.log(record.id, selectedRowKeys);
    if (selectedRowKeys.includes(record.id)) {
      selectedRow = selectedRowKeys.filter(item => item !== record.id);
      // selectedRowKeys = []
    } else {
      // selectedRowKeys = [... this.state.selectedRowKeys, record.id]
      selectedRow = [record.id];
    }
    this.setState({
      selectedRowKeys: selectedRow,
    });
    changeChoosenRow(record);
  };

  pageChange = (page, pageSize) => {
    const { changePagination } = this.props
    changePagination({ current: page, size: pageSize });
  };

  onSelectChange = (selectedRowKeys, selectedRows) => {
    console.log(selectedRowKeys, selectedRows);
    this.setState({
      selectedRowKeys,
    });
  };

  render() {
    const { clickRowItem, props, pageChange } = this;
    const { body = {}, rowClassName, columns, pagination } = props;
    const { selectedRowKeys } = this.state;
    const { current, size } = pagination;
    const paginationProps = {
      showQuickJumper: true,
      pageSize: size,
      current,
      // total: body ? body.total : 0,
      total: 100,
      onChange: pageChange,
    };

    const rowSelection = {
      selectedRowKeys,
      type: 'checkbox',
      onChange: this.onSelectChange,
      // onSelect: this.selectChange,
    };

    return (
      <Table
        columns={columns}
        dataSource={body.records}
        rowSelection={rowSelection}
        pagination={paginationProps}
        rowClassName={rowClassName}
        rowKey={record => record.id}
        onRow={record => ({
          onClick: () => {
            clickRowItem(record);
          }, // 点击行
        })}
      />
    );
  }
}

export default MyTable;
