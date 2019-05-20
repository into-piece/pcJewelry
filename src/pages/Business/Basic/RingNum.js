import React, { PureComponent } from 'react';
import { Table } from 'antd';

const clientContentColumns = [
  {
    title: '戒围标准',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: '戒围号',
    dataIndex: 'name',
    key: 'name',
  },
];

class RingNum extends PureComponent {
  render() {
    return (
      <Table loading={false} pagination={false} size={'small'} columns={clientContentColumns} />
    );
  }
}

export default RingNum;
