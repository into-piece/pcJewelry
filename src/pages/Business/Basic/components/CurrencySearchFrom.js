import React, { Component } from 'react';
import { Button, Col, Select,Form, Input, Row,DatePicker } from 'antd';
import moment from 'moment';
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
    };
  }

  render() {
    return this.renderCustomerAdvancedForm();
  }

  renderCustomerAdvancedForm() {
    const {
      form: { getFieldDecorator },
      modals
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
            <FormItem label="币种">
              {getFieldDecorator('currency')(<Select placeholder="请选择">
                {modals.currencyddlist && modals.currencyddlist.map(({ value, key }) =>
                  <Option value={value} key={value}>{key}</Option>,
                )}
              </Select>)}
            </FormItem>
          </Col>
          <Col lg={10}>
            <FormItem label="创建日期">
              {getFieldDecorator('create_time',{ initialValue: moment()})(<DatePicker   />)}
            </FormItem>
          </Col>
          <Col lg={6}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 5 }} onClick={this.handleReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
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


}

export default SearchFrom;
