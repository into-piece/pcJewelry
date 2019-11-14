import React, { Component } from 'react';
import { Button, Col, Form, Icon, Input, InputNumber, Row } from 'antd';
import styles from '../../../Account/Center/Center.less';

const FormItem = Form.Item;

@Form.create({
  onValuesChange(props, changeFields,allf) {
    props.onChange && props.onChange(allf);

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
      searchConfig,
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
            searchConfig && searchConfig[selectType] && searchConfig[selectType].map(({ key, value, type, list,dfv }) => {
              return <Col lg={8} key={value}>
                <FormItem label={key}>
                  {getFieldDecorator(value, {
                    initialValue:   dfv ,
                  })(returnElement({ type, dev, list }))}
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
    const { searchConfig, selectType } = this.props;
    if (searchConfig && searchConfig[selectType]) {
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
      searchConfig,
    } = this.props;

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row>
          {
            searchConfig && searchConfig[selectType] && searchConfig[selectType].map(({ key, value, type, list, span,dfv }, index) => {
              if ((index === 0 || index === 1)) {
                return <Col lg={8}>
                  <FormItem label={key} key={value} labelCol={{ span: 7 }} wrapperCol={{ span: 13 }}>
                    {getFieldDecorator(value, {
                      initialValue:   dfv ,
                    })(returnElement({ type, dev, list }))}
                  </FormItem>
                </Col>
                  ;
              }
            })
          }
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

  render() {
    return this.renderCustomerForm();
  }

}

export default SearchFromTab0;
