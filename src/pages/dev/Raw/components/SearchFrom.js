import React, { Component } from 'react';
import { Button, Col, Select,Form, Icon, Input, InputNumber, Row } from 'antd';
import styles from '../../../Account/Center/Center.less';

const FormItem = Form.Item;
const { Option } = Select;

@Form.create({
  onValuesChange(props, changeFields,f) {
    props.onChange && props.onChange(f);

  },
})
class SearchFrom extends Component {
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
      devRaw
    } = this.props;
    return (
      <Form
        onSubmit={this.handleSearch}
        layout="inline"
        size="small"
        labelAlign="right"
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 13 }}

      >
        <Row gutter={2} style={{ width: '100%' }}>
          <Col lg={8}>
            <FormItem label="类别编码">
              {getFieldDecorator('unitCode')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col lg={8}>
            <FormItem label="大类">
              {getFieldDecorator('bType')(<Select placeholder="请选择">
                {devRaw.listMstWordbookDroph015 && devRaw.listMstWordbookDroph015.map(({ value, key }) =>
                  <Option value={value} key={value}>{key}</Option>,
                )}
              </Select>)}
            </FormItem>
          </Col>
          <Col lg={8}>
            <FormItem label="小类">
              {getFieldDecorator('sType')(<Select placeholder="请选择">
                {devRaw.listMstWordbookDroph016 && devRaw.listMstWordbookDroph016.map(({ value, key }) =>
                  <Option value={value} key={value}>{key}</Option>,
                )}
              </Select>)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={2}>
          <Col lg={8}>
            <FormItem label="英文名">
              {getFieldDecorator('enName')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col lg={8}>
            <FormItem label="中文名">
              {getFieldDecorator('zhName')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={{ md: 8, lg: 20, xl: 48 }}>
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
    const { onReset, form } = this.props;
    form.resetFields();
    this.setState({
      searchCustomerParams: {},
    });
    if (onReset) onReset();
  };

  renderCustomerSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row>
          <Col lg={8}>
            <FormItem label="类别编码">
              {getFieldDecorator('unitCode')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col lg={8} push={1}>
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

export default SearchFrom;
