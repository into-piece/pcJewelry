import React, { PureComponent } from 'react';
import { Table } from 'antd';

const clientContentColumns = [
  {
    title: '品质要求代码',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: '品质要求中文名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '品质要求英文名称',
    dataIndex: 'en_name',
    key: 'en_name',
  },
];

class Requested extends PureComponent {
  render() {
    return (
      <Table loading={false} pagination={false} size={'small'} columns={clientContentColumns} />
    );
  }
}

export default Requested;
