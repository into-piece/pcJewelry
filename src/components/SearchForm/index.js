import React, { Component } from 'react';
import { Button, Form, Icon, Input } from 'antd';
import styles from './index.less';

const FormItem = Form.Item;
@Form.create()
class SearchFrom extends Component {
  state = {
    expandForm: false, // 是否展开
  }

  // 返回遍历的筛选条件组件
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
                  {getFieldDecorator(data[0].value, {
                    initialValue: undefined,
                  })(returnElement({ ...data[0], data: source, }))}
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

  // 确认筛选按钮回调
  handleSearch = e => {
    const { form, onSearch } = this.props;
    // 禁止表单提交，采用Ajax提交
    e.preventDefault();
    form.validateFields((err, fieldsValue) => {
      if (onSearch) onSearch({ ...fieldsValue });
    });
  };

  // 重置回调
  handleReset = () => {
    const { onCustomerReset, form } = this.props;
    form.resetFields();
    if (onCustomerReset) onCustomerReset();
  };

  // 切换展开
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

export default SearchFrom;
