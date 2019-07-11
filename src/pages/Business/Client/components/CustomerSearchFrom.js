import React, { Component } from 'react';
import { Button, Col, Form, Icon, Input, InputNumber, Row } from 'antd';
import clientStyle from '../Client.less';
import styles from '../../../Account/Center/Center.less';

const FormItem = Form.Item;

@Form.create()
class CustomerSearchFrom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandForm: false,
    };
  }

  render() {
    return this.renderCustomerForm();
  }

  renderCustomerAdvancedForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form
        onSubmit={this.handleCustomerSearch}
        layout="inline"
        size="small"
        labelAlign="right"
        labelCol={{ span: 7 }}
      >
        <Row gutter={2}>
          <Col lg={8} md={8} sm={8} xs={8}>
            <FormItem label="客户编号" className={clientStyle.from_content_col}>
              {getFieldDecorator('customerNo')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col lg={8} md={8} sm={8} xs={8}>
            <FormItem label="简称" className={clientStyle.from_content_col}>
              {getFieldDecorator('shotName')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col lg={8} md={8} sm={8} xs={8}>
            <FormItem label="客户渠道" className={clientStyle.from_content_col}>
              {getFieldDecorator('customerChannels')(<InputNumber style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={2}>
          <Col lg={8} md={8} sm={8} xs={8}>
            <FormItem label="中文名" className={clientStyle.from_content_col}>
              {getFieldDecorator('zhName', {
                initialValue: '',
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col lg={8} md={8} sm={8} xs={8}>
            <FormItem label="英文名" className={clientStyle.from_content_col}>
              {getFieldDecorator('enName', {
                initialValue: '',
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col lg={8} md={8} sm={8} xs={8}>
            <FormItem label="中文地址" className={clientStyle.from_content_col}>
              {getFieldDecorator('zh_address')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={2}>
          <Col lg={8} md={8} sm={8} xs={8}>
            <FormItem label="英文地址" className={clientStyle.from_content_col}>
              {getFieldDecorator('en_address')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col lg={8} md={8} sm={8} xs={8}>
            <FormItem label="国别" className={clientStyle.from_content_col}>
              {getFieldDecorator('country')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col lg={8} md={8} sm={8} xs={8}>
            <FormItem label="城市" className={clientStyle.from_content_col}>
              {getFieldDecorator('city')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={2}>
          <Col lg={8} md={8} sm={8} xs={8}>
            <FormItem label="电话" className={clientStyle.from_content_col}>
              {getFieldDecorator('companyPhone', {
                initialValue: '',
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col lg={8} md={8} sm={8} xs={8}>
            <FormItem label="网址" className={clientStyle.from_content_col}>
              {getFieldDecorator('companyWebsite')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col lg={8} md={8} sm={8} xs={8}>
            <FormItem label="币种" className={clientStyle.from_content_col}>
              {getFieldDecorator('settlementCurrency')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={2}>
          <Col lg={8} md={8} sm={8} xs={8}>
            <FormItem label="品质" className={clientStyle.from_content_col}>
              {getFieldDecorator('qualityRequirements')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col lg={8} md={8} sm={8} xs={8}>
            <FormItem label="报价系数" className={clientStyle.from_content_col}>
              {getFieldDecorator('customerQuotationCoefficient')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col lg={8} md={8} sm={8} xs={8}>
            <FormItem label="预付款例" className={clientStyle.from_content_col}>
              {getFieldDecorator('prepaymentRatio')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={2}>
          <Col lg={8} md={8} sm={8} xs={8}>
            <FormItem label="送货方式" className={clientStyle.from_content_col}>
              {getFieldDecorator('deliveryMethod')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col lg={8} md={8} sm={8} xs={8}>
            <FormItem label="备注" className={clientStyle.from_content_col}>
              {getFieldDecorator('remarks')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col lg={8}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 5 }} onClick={this.handleCustomerFormReset}>
                重置
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                收起 <Icon type="up" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderCustomerForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderCustomerAdvancedForm() : this.renderCustomerSimpleForm();
  }

  handleCustomerSearch = e => {
    const { form, onCustomerSearch } = this.props;
    //禁止表单提交，采用Ajax提交
    e.preventDefault();
    form.validateFields((err, fieldsValue) => {
      if (onCustomerSearch) onCustomerSearch({ ...fieldsValue });
    });
  };

  handleCustomerFormReset = () => {
    const { onCustomerReset, form } = this.props;
    form.resetFields();
    this.setState({
      searchCustomerParams: {},
    });
    if (onCustomerReset) onCustomerReset();
  };

  renderCustomerSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form onSubmit={this.handleCustomerSearch} layout="inline">
        <Row>
          <Col lg={8}>
            <FormItem label="客户编号" className={clientStyle.small_font}>
              {getFieldDecorator('customerNo')(<Input size="small" placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col lg={8}>
            <span className={styles.submitButtons}>
              <Button size="small" type="primary" htmlType="submit">
                查询
              </Button>
              <Button  size="small" style={{ marginLeft: 5 }} onClick={this.handleCustomerFormReset}>
                重置
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };
}

export default CustomerSearchFrom;
