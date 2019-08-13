import React, { Component } from 'react';
import { Table } from 'antd';
import styles from './index.less';

class MyTable extends Component {

  clickRowItem = record => {
    const { changeChoosenRow, onSelectChange } = this.props;
    let selectedRow = [];
    const { selectedRowKeys } = this.props
    if (selectedRowKeys.includes(record.id)) {
      selectedRow = selectedRowKeys.filter(item => item !== record.id);
      // selectedRowKeys = []
    } else {
      // selectedRowKeys = [... this.state.selectedRowKeys, record.id]
      selectedRow = [record.id];
    }

    onSelectChange(selectedRow)
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

  render() {
    const { clickRowItem, props, pageChange, onSelectRowClass } = this;
    const { body = {}, columns, pagination, selectedRowKeys, onSelectChange } = props;
    const { current, size } = pagination;
    const paginationProps = {
      showQuickJumper: true,
      pageSize: size,
      current,
      total: body ? body.total : 0,
      onChange: pageChange,
    };

    const rowSelection = {
      selectedRowKeys,
      type: 'checkbox',
      onChange: onSelectChange,
      // onSelect: this.selectChange,
    };

    console.log(body, body.records)

    return (
      <Table
        columns={columns}
        dataSource={body.records}
        rowSelection={rowSelection}
        pagination={paginationProps}
        rowKey={record => record.id}
        rowClassName={onSelectRowClass}
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
