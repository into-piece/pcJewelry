import React, { Component } from 'react';
import { Button, Col, Divider, Form, Icon, Input, InputNumber, Modal, Row, Switch } from 'antd';
import clientStyle from "../../Client.less";
import styles from "../../../../Account/Center/Center.less";

const FormItem = Form.Item;

@Form.create()
class ContactsModalForm extends Component {
  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  centerFormLayout = {
    labelCol: { span: 12 },
    wrapperCol: {
      span: 24,
    },
  };

  render() {
    const { handleCancel,contactsCurrent ,contactsLoading} = this.props;

    const contactsModalFooter = !contactsCurrent.id ? [
      <Button
        key="back"
        onClick={handleCancel}
      >
        取消
      </Button>,
      <Button
        key="submit"
        type="primary"
        loading={contactsLoading}
        onClick={() => {
          this.handleContactsSubmit(true);
        }}
      >
        保存
      </Button>,
      <Button
        key="continue"
        type="primary"
        loading={contactsLoading}
        onClick={() => {
          this.handleContactsSubmit(false);
        }}
      >
        继续添加
      </Button>,
    ] : [
      <Button
        key="back"
        onClick={handleCancel}
      >
        取消
      </Button>,
      <Button
        key="submit"
        type="primary"
        loading={contactsLoading}
        onClick={() => {
          this.handleContactsSubmit(false);
        }}
      >
        保存
      </Button>,
    ];



    return (
      <Modal
        maskClosable={false}
        {...this.props}
        width={720}
        className={styles.standardListForm}
        destroyOnClose
        footer={contactsModalFooter}
      >
        {this.getContactsContent()}
      </Modal>
    );
  }

  getContactsContent = () => {
    const {
      form: { getFieldDecorator },
      contactsCurrent = {},
    } = this.props;

    return (
      <div>
        <span className={clientStyle.sun_title_info}>联系人</span>
        <Divider className={clientStyle.divder} />
        <Form
          size="small"
          labelAlign="left"
          layout="inline"
          className={clientStyle.from_content}
          // onSubmit={this.handleContactsSubmit}
        >
          <Row>
            <Col lg={8} md={8} sm={8} xs={8}>
              <FormItem
                label="联系人姓名"
                {...this.centerFormLayout}
                className={clientStyle.from_content_col}
              >
                {getFieldDecorator('contacts', {
                  rules: [{ required: true, message: '请输入姓名' }],
                  initialValue: contactsCurrent.contacts,
                })(<Input placeholder="请输入" />)}
              </FormItem>
            </Col>
            <Col lg={8} md={8} sm={8} xs={8}>
              <FormItem
                label="手机"
                {...this.centerFormLayout}
                className={clientStyle.from_content_col}
              >
                {getFieldDecorator('tel', {
                  rules: [{ required: true, message: '请输入手机' }],
                  initialValue: contactsCurrent.tel,
                })(<Input placeholder="请输入" />)}
              </FormItem>
            </Col>

            <Col lg={8} md={8} sm={8} xs={8}>
              <FormItem
                label="电话"
                {...this.centerFormLayout}
                className={clientStyle.from_content_col}
              >
                {getFieldDecorator('phone', {
                  rules: [{ message: '请输入电话' }],
                  initialValue: contactsCurrent.phone,
                })(<Input placeholder="请输入" />)}
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col lg={8} md={8} sm={8} xs={8}>
              <FormItem
                label="email"
                {...this.centerFormLayout}
                className={clientStyle.from_content_col}
              >
                {getFieldDecorator('email', {
                  rules: [
                    {
                      type: 'email',
                      message: '请输入正确邮箱格式',
                    },
                  ],
                  initialValue: contactsCurrent.email,
                })(<Input type="email" placeholder="请输入" />)}
              </FormItem>
            </Col>
            <Col lg={8} md={8} sm={8} xs={8}>
              <FormItem
                label="QQ"
                {...this.centerFormLayout}
                className={clientStyle.from_content_col}
              >
                {getFieldDecorator('qq', {
                  rules: [{ message: '请输入QQ' }],
                  initialValue: contactsCurrent.qq,
                })(<Input type="number" placeholder="请输入" />)}
              </FormItem>
            </Col>

            <Col lg={8} md={8} sm={8} xs={8}>
              <FormItem
                label="wechat"
                {...this.centerFormLayout}
                className={clientStyle.from_content_col}
              >
                {getFieldDecorator('wechat', {
                  rules: [{ message: '请输入微信' }],
                  initialValue: contactsCurrent.wechat,
                })(<Input placeholder="请输入" />)}
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col lg={12} md={12} sm={12} xs={12}>
              <FormItem
                label="主要联系人"
                {...this.centerFormLayout}
                className={clientStyle.from_content_col}
              >
                {getFieldDecorator('isPrimaryContact', {
                  valuePropName: 'checked',
                  initialValue: contactsCurrent.isPrimaryContact==='主联系人',
                })(<Switch />)}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    );
  };


  handleContactsSubmit = (close) => {
    const { form, contactsSubmit } = this.props;
    form.validateFields((err, fieldsValue) => {

      if (err) return;

      if (contactsSubmit)
        contactsSubmit(fieldsValue,close);
    });


  };

  handleCancel = () => {

  };



}

export default ContactsModalForm;
