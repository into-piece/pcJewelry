import React, { Component } from 'react';
import { Button, Col, Form, Icon, Input, InputNumber, Row, Select } from 'antd';
import business from '../../business.less';
import styles from '../../../Account/Center/Center.less';

const { Option } = Select;
const FormItem = Form.Item;

@Form.create()
class ProductSearchFrom extends Component {
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
        onSubmit={this.handleSearch}
        layout="inline"
        size="small"
        labelAlign="right"
        labelCol={{ span: 7 }}
      >
        <Row gutter={2}>
          <Col lg={8} md={8} sm={8} xs={8}>
            <FormItem label="产品编号" className={business.from_content_col}>
              {getFieldDecorator('productNo')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col lg={8} md={8} sm={8} xs={8}>
            <FormItem label="产品类别" className={business.from_content_col}>
              {getFieldDecorator('productType')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col lg={8} md={8} sm={8} xs={8}>
            <FormItem label="颜色" className={business.from_content_col}>
              {getFieldDecorator('gemColor')(<Input laceholder="请输入" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={2}>
          <Col lg={8} md={8} sm={8} xs={8}>
            <FormItem label="成色" className={business.from_content_col}>
              {getFieldDecorator('productColor', {
                initialValue: '',
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col lg={8} md={8} sm={8} xs={8}>
            <FormItem label="电镀颜色" className={business.from_content_col}>
              {getFieldDecorator('platingColor', {
                initialValue: '',
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col lg={8} md={8} sm={8} xs={8}>
            <FormItem label="客户编号" className={business.from_content_col}>
              {getFieldDecorator('customerNo')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={2}>
          <Col lg={8} md={8} sm={8} xs={8}>
            <FormItem label="客户货号" className={business.from_content_col}>
              {getFieldDecorator('customerProductNo', {
                initialValue: '',
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col lg={8} md={8} sm={8} xs={8}>
            <FormItem label="状态" className={business.from_content_col}>
              {getFieldDecorator('status', { initialValue: 0 })(
                <Select style={{ width: 174 }} placeholder="请选择">
                  <Option value={undefined}>不限</Option>
                  <Option value={0}>输入</Option>
                  <Option value={2}>已审批</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col lg={8}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 5 }} onClick={this.handleReset}>
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

  handleSearch = e => {
    const { form, onSearch } = this.props;
    // 禁止表单提交，采用Ajax提交
    e.preventDefault();
    form.validateFields((err, fieldsValue) => {
      if (onSearch) onSearch({ ...fieldsValue });
    });
  };

  handleReset = () => {
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
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row>
          <Col lg={8}>
            <FormItem label="产品编号">
              {getFieldDecorator('productNo')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col lg={8} md={8} sm={8} xs={8}>
            <FormItem label="状态" className={business.from_content_col}>
              {getFieldDecorator('status', { initialValue: 0 })(
                <Select style={{ width: 174 }} placeholder="请选择">
                  <Option value={undefined}>不限</Option>
                  <Option value={0}>输入</Option>
                  <Option value={2}>已审批</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col lg={8}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 5 }} onClick={this.handleReset}>
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

export default ProductSearchFrom;
