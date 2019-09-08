import React, { Component } from 'react';
import { Button, Form, Icon, Input } from 'antd';
// import business from "../../business.less";
// import styles from '../../../Account/Center/Center.less';
import styles from './index.less';

const FormItem = Form.Item;
@Form.create()
class ProductSearchFrom extends Component {
  state = {
    expandForm: false,
  }

  renderCustomerForm = (type) => {
    const {
      form,
      data,
      source,
      returnElement
    } = this.props;
    const { getFieldDecorator } = form
    return (
      <div className="searchform">
        <Form
          onSubmit={this.handleSearch}
        >
          {
            type ?
              data && data.map(({ key, value, type, list, clickFn, text, arr }) => {
                return (
                  <div className="addModal" key={key}>
                    <FormItem label={key} className={styles.from_content_col}>
                      {getFieldDecorator(value, {
                        initialValue: undefined,
                      })(returnElement({ key, value, data: source, type, list, clickFn, text, arr, form }))}
                    </FormItem>
                  </div>
                )
              }) :
              <div className="addModal">
                <FormItem label={data[0].key}>
                  {getFieldDecorator(data[0].value)(<Input placeholder="请输入" />)}
                </FormItem>
              </div>
          }
          <p className={styles.submitButtons}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 5 }} onClick={this.handleReset}>
                重置
              </Button>
              <a style={{ marginLeft: 8, whiteSpace: 'nowrap' }} onClick={this.toggleForm}>
                {
                  type ? <>收起 <Icon type="up" /></> : <>展开<Icon type="down" /></>
                }

              </a>
            </span>
          </p>
        </Form>
      </div>
    )
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

  renderCustomerSimpleForm = () => {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <div className="addModal">
          <FormItem label="客户编号">
            {getFieldDecorator('customerNo')(<Input placeholder="请输入" />)}
          </FormItem>
          <p className={styles.submitButtons}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 5 }} onClick={this.handleReset}>
              重置
            </Button>
            <a style={{ marginLeft: 8, whiteSpace: 'nowrap' }} onClick={this.toggleForm}>
              展开 <Icon type="down" />
            </a>
          </p>
        </div>
      </Form>
    );
  }

  toggleForm = () => {
    this.setState((state) => ({
      expandForm: !state.expandForm,
    }));
  };

  render() {
    const { expandForm } = this.state
    return this.renderCustomerForm(expandForm);
  }
}

export default ProductSearchFrom;
