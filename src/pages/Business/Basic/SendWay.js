import React, { PureComponent } from 'react';
import { Table } from 'antd';

const clientContentColumns = [
  {
    title: '送货方式代码',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: '送货方式中文名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '送货方式英文名称',
    dataIndex: 'en_name',
    key: 'en_name',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
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
