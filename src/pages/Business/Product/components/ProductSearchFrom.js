import React, { Component } from 'react';
import { Button, Col, Form, Icon, Input, InputNumber, Row, Select } from 'antd';
import business from "../../business.less";
import styles from '../../../Account/Center/Center.less';

const { Option } = Select
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
            <FormItem label="客户货号" className={business.from_content_col}>
              {getFieldDecorator('custoerProductNo')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col lg={8} md={8} sm={8} xs={8}>
            <FormItem label="类别名称" className={business.from_content_col}>
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col lg={8} md={8} sm={8} xs={8}>
            <FormItem label="颜色" className={business.from_content_col}>
              {getFieldDecorator('color')(<Input laceholder="请输入" />)}
            </FormItem>
          </Col>
          {/* <Col lg={8} md={8} sm={8} xs={8}> */}
          {/* <FormItem label="模具号" className={business.from_content_col}> */}
          {/* {getFieldDecorator('mouldNo')(<Input placeholder="请输入" />)} */}
          {/* </FormItem> */}
          {/* </Col> */}
          {/* <Col lg={8} md={8} sm={8} xs={8}> */}
          {/* <FormItem label="产品描述" className={business.from_content_col}> */}
          {/* {getFieldDecorator('productDesc')(<Input laceholder="请输入" />)} */}
          {/* </FormItem> */}
          {/* </Col> */}
        </Row>
        <Row gutter={2}>
          <Col lg={8} md={8} sm={8} xs={8}>
            <FormItem label="成色" className={business.from_content_col}>
              {getFieldDecorator('color1', {
                initialValue: '',
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col lg={8} md={8} sm={8} xs={8}>
            <FormItem label="电镀颜色" className={business.from_content_col}>
              {getFieldDecorator('color2', {
                initialValue: '',
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col lg={8} md={8} sm={8} xs={8}>
            <FormItem label="客户编号" className={business.from_content_col}>
              {getFieldDecorator('customerNo')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          {/* <Col lg={8} md={8} sm={8} xs={8}> */}
          {/* <FormItem label="产品编号" className={business.from_content_col}> */}
          {/* {getFieldDecorator('productNo', { */}
          {/* initialValue: '', */}
          {/* })(<Input placeholder="请输入" />)} */}
          {/* </FormItem> */}
          {/* </Col> */}
          {/* <Col lg={8} md={8} sm={8} xs={8}> */}
          {/* <FormItem label="类型" className={business.from_content_col}> */}
          {/* {getFieldDecorator('productType', { */}
          {/* initialValue: '', */}
          {/* })(<Input placeholder="请输入" />)} */}
          {/* </FormItem> */}
          {/* </Col> */}
          {/* <Col lg={8} md={8} sm={8} xs={8}> */}
          {/* <FormItem label="产品来源" className={business.from_content_col}> */}
          {/* {getFieldDecorator('sourceOfProduct')(<Input placeholder="请输入" />)} */}
          {/* </FormItem> */}
          {/* </Col> */}
        </Row>
        <Row gutter={2}>
          <Col lg={8} md={8} sm={8} xs={8}>
            <FormItem label="客户货号" className={business.from_content_col}>
              {getFieldDecorator('goodsNo', {
                initialValue: '',
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col lg={8} md={8} sm={8} xs={8}>
            <FormItem label="供应商编号" className={business.from_content_col}>
              {getFieldDecorator('supplierNo', {
                initialValue: '',
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col lg={8} md={8} sm={8} xs={8}>
            <FormItem label="供应商名称" className={business.from_content_col}>
              {getFieldDecorator('supplierName')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col lg={8} md={8} sm={8} xs={8}>
            <FormItem label="状态" className={business.from_content_col}>
              {getFieldDecorator('status', { initialValue: 0 })(
                <Select
                  style={{ width: 174 }}
                  placeholder="请选择"
                >
                  <Option value={0}>输入</Option>
                  <Option value={1}>使用中</Option>
                  <Option value={2}>审批</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          {/* <Col lg={8} md={8} sm={8} xs={8}> */}
          {/* <FormItem label="规格" className={business.from_content_col}> */}
          {/* {getFieldDecorator('specification')(<Input placeholder="请输入" />)} */}
          {/* </FormItem> */}
          {/* </Col> */}

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
            <FormItem label="客户编号">
              {getFieldDecorator('customerNo')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col lg={8} md={8} sm={8} xs={8}>
            <FormItem label="状态" className={business.from_content_col}>
              {getFieldDecorator('status', { initialValue: 0 })(
                <Select
                  style={{ width: 174 }}
                  placeholder="请选择"
                >
                  <Option value={0}>输入</Option>
                  <Option value={1}>使用中</Option>
                  <Option value={2}>审批</Option>
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
