import React, { Component } from 'react';
import { Form, Row, Input, Modal } from 'antd';


import business from '../../business.less';

const FormItem = Form.Item;

@Form.create()
class ProductForm extends Component {


  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Modal
        maskClosable={false}
        width={740}
        okText='保存'
        onOk={this.ok}
        onCancel={this.cancle}
        destroyOnClose
        {...this.props}
      >
        <Form
          size="small"
          layout="inline"
          style={{ width: '100%' }}
          className={business.from_content}
        >
          <Row style={{ width: '100%' }}>
            <div className="adddevModal">
              <FormItem label="模具号" {...this.centerFormLayout}>
                {getFieldDecorator('mould', {
                  rules: [{ required: true, message: '请输入模具号' }],
                })(<Input placeholder="请输入"/>)}
              </FormItem>
            </div>

          </Row>
        </Form>
      </Modal>);

  }

  ok =()=>{
    const { form ,submit} = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      if(submit)
        submit(fieldsValue)

    });
  }

  cancle =()=>{
    const { cancle} = this.props;
    if(cancle)
    cancle()
  }

}

export default ProductForm;
