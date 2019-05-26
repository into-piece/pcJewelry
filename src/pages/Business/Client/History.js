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
import styles from './ClientInfo.less';
import DescriptionList from '@/components/DescriptionList';

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


  componentWillMount() {


  }

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
      }, {
        code: 'PI_20171125_APP',
        historyCode: 'PI_20171125_APP',
        total: 2,
        typeCount: 2,
        amount: '50.000.0',
      }, {
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


    return (<div className={styles.content}>

      <Form layout="inline">


        <FormItem label="订单号码">{<Input placeholder="请输入"/>}</FormItem>
        <Button type="primary" htmlType="submit">
          查询
        </Button>


        {/*<Col md={8} sm={12}>*/}
        {/*<span className={styles.submitButtons}>*/}
        {/*<Button type="primary" htmlType="submit">*/}
        {/*查询*/}
        {/*</Button>*/}
        {/*</span>*/}
        {/*</Col>*/}

      </Form>
      <Table
        style={{ marginBottom: 5 }}
        pagination={false}
        loading={false}
        dataSource={tempHistory}
        rowClassName={this.onSelectRowClass}
        onRow={(record, index) => {
          return {
            onClick: event => {
              this.setState({
                selectIndexAt: index,
              });
            },
            onMouseEnter: event => {
              console.log('mouse '+index);

            },
          };
        }}
        columns={historyColumn}
        rowKey="id"

      />

    </div>);
  }

  onSelectRowClass = (record, index) => {
    console.log(' inx ' + index);
    return index == this.state.selectIndexAt ? styles.row_select : styles.row_noselect;
    // return (index==this.state.selectIndexAt||index==this.state.mouseIndexAt)?styles.row_select:""
  };


}

export default History;
