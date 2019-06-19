import React, { Component } from 'react';
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
  Divider,
  Breadcrumb,
} from 'antd';
import business from '../business.less';
import listStyles from '../Client/TableList.less';


class Quote extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rightlg: 16,
      leftlg: 8,
    };
  }


  render() {

    const { leftlg, rightlg } = this.state;

    return (
      <div className={business.page}>
        <div className={business.nav}>
          <Breadcrumb>
            <Breadcrumb.Item>主页</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">业务</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="#/business/quote">报价</a>
            </Breadcrumb.Item>

          </Breadcrumb>
        </div>
        <div className={business.center_content}>
          <Row gutter={24}>
            <Col lg={rightlg} md={24}>
              <Card bordered={false} className={business.left_content} loading={false}>
                <div style={{ marginBottom: 16 }}>

                </div>
              </Card>
            </Col>
            <Col lg={leftlg} md={24}>
              <div
                className={business.right_info}
              >

                <div className={business.list_info}>

                </div>


              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }

}

export default Quote;