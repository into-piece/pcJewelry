import React, { PureComponent } from 'react';
import { Table } from 'antd';

const clientContentColumns = [
  {
    title: '货币代码',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: '中文名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '英文名',
    dataIndex: 'en_name',
    key: 'en_name',
  },
  {
    title: '是否记账本位币',
    dataIndex: 'is_keep_accounts',
    key: 'is_keep_accounts',
  },
  {
    title: '销售汇率',
    dataIndex: 'sell_currency',
    key: 'sell_currency',
  },
  {
    title: '采购汇率',
    dataIndex: 'shop_currency',
    key: 'shop_currency',
  },
];

class Currency extends PureComponent {
  render() {
    return (
      <Table loading={false} pagination={false} size={'small'} columns={clientContentColumns} />
    );
  }
}

export default Currency;
