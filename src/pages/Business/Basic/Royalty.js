import React, { PureComponent } from 'react';
import { Table } from 'antd';

const clientContentColumns = [
  {
    title: '业务提出编号',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: '业务提成中文名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '业务提成英文名',
    dataIndex: 'en_name',
    key: 'en_name',
  },
  {
    title: '利润比例从(%)',
    dataIndex: 'profit_ratio_from',
    key: 'profit_ratio_from',
  },
  {
    title: '利润比例到(%)',
    dataIndex: 'profit_ratio_to',
    key: 'profit_ratio_to',
  },
  {
    title: '提成比率(%)',
    dataIndex: 'payment',
    key: 'payment',
  },
];

class Royalty extends PureComponent {
  render() {
    return (
      <Table loading={false} pagination={false} size={'small'} columns={clientContentColumns} />
    );
  }
}

export default Royalty;
