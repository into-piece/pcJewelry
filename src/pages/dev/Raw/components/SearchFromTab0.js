import React, { Component } from 'react';
import { Button, Col, Form, Icon, Input, InputNumber, Row } from 'antd';
import styles from '../../../Account/Center/Center.less';

const FormItem = Form.Item;

@Form.create({
  onValuesChange(props, changeFields) {
    props.onChange && props.onChange(changeFields);

  },
})

class SearchFromTab0 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandForm: false,
    };
    this.handleReset = this.handleReset.bind(this);
  }

  renderCustomerAdvancedForm() {
    const {
      form: { getFieldDecorator },
      returnElement,
      selectType,
      modalContent,
      dev,
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
          {
            modalContent && modalContent[selectType] && modalContent[selectType].map(({ key, value, type, list, span }) => {
              return <Col lg={8} key={value}>
                <FormItem label={key}>
                  {getFieldDecorator(value)(returnElement({ type, dev, list }))}
                </FormItem>
              </Col>;
            })
          }
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
    const { modalContent, selectType } = this.props;
    if (modalContent && modalContent[selectType]) {
      return expandForm ? this.renderCustomerAdvancedForm() : this.renderCustomerSimpleForm();
    }
    return null;

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
      dev,
      returnElement,
      selectType,
      modalContent,
    } = this.props;

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row>
          <Col lg={8}>
            {
              modalContent && modalContent[selectType] && modalContent[selectType].map(({ key, value, type, list, span }, index) => {
                if (index === 0) {
                  return <FormItem label={key} labelCol={{ span: 7 }} wrapperCol={{ span: 13 }}>
                    {getFieldDecorator(value)(returnElement({ type, dev, list }))}
                  </FormItem>;
                }
              })
            }
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

  render() {
    return this.renderCustomerForm();
  }

}

export default SearchFromTab0;
