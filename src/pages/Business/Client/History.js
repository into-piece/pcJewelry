import React, { PureComponent } from 'react';

import {
  Card,
  Row,
  Col,
  Table,
  Icon,
  Form,
  Select,
  InputNumber,
  DatePicker,
  Tabs,
  Radio,
  Button,
  Input,
  List,
  Divider,
} from 'antd';
import styles from './base.less';
import DescriptionList from '@/components/DescriptionList';
import clientStyle from './Client.less';

const { Description } = DescriptionList;
const FormItem = Form.Item;
const historyColumn = [
  {
    title: '订单号码',
    dataIndex: 'code',
    key: 'code',
    render: (text, row, index) => {
      return text;
    },
  },
  {
    title: '原始订单码',
    dataIndex: 'historyCode',
    key: 'historyCode',
  },
  {
    title: '总数',
    dataIndex: 'total',
    key: 'total',
  },

  {
    title: '款数',
    dataIndex: 'typeCount',
    key: 'typeCount',
  },

  {
    title: '总重',
    dataIndex: 'sum',
    key: 'sum',
  },

  {
    title: '金额',
    dataIndex: 'amount',
    key: 'amount',
  },
];

class History extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectIndexAt: -1,
      mouseIndexAt: -1,
    };
  }

  componentWillMount() {}

  render() {
    const historyData = [
      {
        code: 'PI_20171125_APP',
        historyCode: 'PI_20171125_APP',
        total: 2,
        typeCount: 2,
        amount: '50.000.0',
      },
      {
        code: 'PI_20171125_APP',
        historyCode: 'PI_20171125_APP',
        total: 2,
        typeCount: 2,
        amount: '50.000.0',
      },
      {
        code: 'PI_20171125_APP',
        historyCode: 'PI_20171125_APP',
        total: 2,
        typeCount: 2,
        amount: '50.000.0',
      },
      {
        code: 'PI_20171125_APP',
        historyCode: 'PI_20171125_APP',
        total: 2,
        typeCount: 2,
        amount: '50.000.0',
      },
    ];

    const amount = 3;
    let tempHistory = historyData.concat({
      code: '总计',
      amount,
    });

    return (
      <div className={styles.content}>
        <div className={styles.right_info}>
          {/*<Form layout="inline">*/}
            {/*<FormItem label="订单号码">{<Input placeholder="请输入" />}</FormItem>*/}
            {/*<Button type="primary" htmlType="submit">*/}
              {/*查询*/}
            {/*</Button>*/}
          {/*</Form>*/}
          {/*<Table*/}
            {/*// style={{ marginBottom: 5 ,paddingLeft:3,paddingRight:3}}*/}
            {/*style={{ marginBottom: 5 }}*/}
            {/*pagination={false}*/}
            {/*loading={false}*/}
            {/*dataSource={tempHistory}*/}
            {/*rowClassName={this.onSelectRowClass}*/}
            {/*onRow={(record, index) => {*/}
              {/*return {*/}
                {/*onClick: event => {*/}
                  {/*this.setState({*/}
                    {/*selectIndexAt: index,*/}
                  {/*});*/}
                {/*},*/}
                {/*onMouseEnter: event => {*/}
                  {/*// console.log('mouse '+index);*/}
                {/*},*/}
              {/*};*/}
            {/*}}*/}
            {/*columns={historyColumn}*/}
            {/*rowKey="id"*/}
          {/*/>*/}
        </div>
        <Card
          bodyStyle={{ paddingLeft: 5, paddingRight: 5, paddingTop: 5, paddingBottom: 5 }}
          className={styles.cardconrtll}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              flexDirection: 'column',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Button
                className={clientStyle.buttomControl}
                type="primary"
                icon="plus"
                size={'small'}
              >
                新增
              </Button>
              <Button
                className={clientStyle.buttomControl}
                type="danger"
                icon="delete"
                size={'small'}
              >
                删除
              </Button>
              <Button
                className={clientStyle.buttomControl}
                type="primary"
                size={'small'}
                icon="edit"
              >
                编辑
              </Button>
              <Button
                className={clientStyle.buttomControl}
                size={'small'}
                type="primary"
                icon="lock"
              >
                审批
              </Button>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                paddingTop: 10,
              }}
            >
              <Button
                className={clientStyle.buttomControl}
                type="primary"
                size={'small'}
                icon="copy"
              >
                复制
              </Button>
              <Button
                className={clientStyle.buttomControl}
                size={'small'}
                type="primary"
                icon="rollback"
              >
                撤销
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  onSelectRowClass = (record, index) => {
    console.log(' inx ' + index);
    return index == this.state.selectIndexAt ? styles.row_select : styles.row_noselect;
    // return (index==this.state.selectIndexAt||index==this.state.mouseIndexAt)?styles.row_select:""
  };
}

export default History;
