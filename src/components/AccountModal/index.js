import React, { Component } from 'react';
import PrintTable from '@/pages/purchase/supplier/PrintPage';
import { Button, Checkbox, DatePicker, Form, Input, Modal, notification, Radio, Select } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import BuildTitle from '@/components/BuildTitle';
import styles from '@/pages/purchase/supplier/index.less';
import jsonData from './index.json';
import { connect } from 'dva';

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Description } = DescriptionList;
const FormItem = Form.Item;
const { Option } = Select;


const { headList } = jsonData;
@Form.create()
@connect(({ loading, user }) => {
  return {
    user,
    queryLoading: loading.effects['user/queryUser'],
    submitLoading: loading.effects['user/saveUserInfo'],
    loginUser: user.loginUser,

  };
})
export default class AccountModal extends Component {

  state = {
    isClose: true,
  };


  render() {

    const { props, getModalContent, handleModalOk ,closeModal} = this;
    const { onCancel, queryLoading, submitLoading } = props;

    this.requestUserifNeed()
    const modalFooter =
      [
        <Button key="back" onClick={() => {
          const { form, dispatch } = this.props;
          onCancel();
        }}>
          取消
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={queryLoading || submitLoading}
          onClick={handleModalOk}
        >
          保存
        </Button>,

      ];

    return <Modal
      title={<BuildTitle title='个人中心'/>}
      zIndex={1000}
      maskClosable={false}
      width={1000}
      bodyStyle={{ padding: '28px 0 0' }}
      afterClose={closeModal}
      destroyOnClose={false}
      footer={modalFooter}
      {...props}
    >
      {getModalContent()}
    </Modal>;
  }

  closeModal=()=>{
    const { form } = this.props;

    this.setState({
      isClose:true
    })
    form.resetFields();
  }

  /**
   * 根据打开弹出窗口瞬间进行查询
   */
  requestUserifNeed=()=>{
    const { visible,dispatch } = this.props;
    if(visible&&this.state.isClose)
    {
      dispatch({
        type: 'user/queryUser',
      });
      this.state.isClose = false
    }
  }

  handleModalOk = () => {
    const { form, dispatch, loginUser, onCancel } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'user/saveUserInfo',
          payload: { ...values, id: loginUser.id },
        }).then((response) => {
          if (response.head.rtnCode === '000000') {
            notification.success({
              message: response.head.rtnMsg,
            });
          }
        });
      }
    });


  };

  // 获取新增/编辑弹窗内容
  getModalContent = () => {
    const {
      form,
      loginUser,
      user,
      searchParams,
    } = this.props;


    const { getFieldDecorator, getFieldValue } = form;
    const { modalType } = this.state;
    const isEdit = true;


    if (modalType === 'printer') {
      return <PrintTable args={searchParams}/>;
    }

    return (
      <Form size="small">
        {headList &&
        headList.map(
          ({
             key,
             value,
             noNeed,
             type,
             list,
             clickFn,
             text,
             arr,
             initValue,
             number,
             priceUnit,
             inputType,
           }) => (
            <div
              className="addModal"
              key={key}
              style={value === 'supplierCode' ? { width: 800 } : {}}
            >
              <FormItem
                label={
                  key
                }
              >
                {getFieldDecorator(value, {
                  rules: [
                    {
                      required: !noNeed,
                      message: `请${type && type === 2 ? '选择' : '输入'}${key}`,
                    },
                  ],
                  initialValue: loginUser[value],

                })(
                  this.returnElement({
                    key,
                    value,
                    noNeed,
                    type,
                    list,
                    clickFn,
                    text,
                    arr,
                    initValue,
                    data: user,
                    form,
                    inputType,
                  }),
                )}
              </FormItem>
            </div>
          ),
        )}

      </Form>
    );
  };

  // 根据btn点击 返回对应弹窗内容
  // type 2 下啦选择
  // type 3 点击事件
  // type 4 文字
  // type 5 check
  // type 6 radio
  // type 7 被顺带出的文字
  // type 8 inputext
  // type 9 RangePicker
  returnElement = ({ key, value, noNeed, type, list, clickFn, text, arr, data, form, inputType }) => {
    switch (type) {
      case 2:
        return (
          <Select
            style={{ width: 180 }}
            placeholder="请选择"
            onChange={v => {
              this.handleSelectChange(v, value);
            }}
          >
            {data[list] &&
            data[list].map(({ value, key }) => (
              <Option value={value} key={value}>
                {key}
              </Option>
            ))}
          </Select>
        );
      case 3:
        return (
          <p style={{ maxWidth: 180 }}>
            {form.getFieldValue(value) || ''}
            <p
              style={{ color: '#40a9ff', cursor: 'pointer' }}
              onClick={() => {
                this[clickFn](1);
              }}
            >
              {text}
            </p>
          </p>
        );
      case 4:
        return <span>{value || ''}</span>;
      case 5:
        return (
          <Checkbox
            checked={form.getFieldValue(value)}
            onChange={e => {
              this.handleCheckChange(e, value);
            }}
          >
            {text}
          </Checkbox>
        );
      case 6:
        return (
          <Radio.Group>
            {arr.map(({ key, value }) => {
              return (
                <Radio value={value} key={value}>
                  {key}
                </Radio>
              );
            })}
          </Radio.Group>
        );
      case 7:
        return <Input disabled style={{ width: '100' }} placeholder=""/>;
      case 8:
        return <TextArea rows={1} placeholder="请输入" style={{ width: 820 }}/>;
      case 9:
        return (
          <RangePicker
            allowClear={false}
            style={{ marginRight: 10 }}
            onChange={(date, dateString) => {
              this.handleDatePicker(date, dateString, value);
            }}
          />
        );
      case 10:
        return (
          <DatePicker
            allowClear={false}
            style={{ marginRight: 10 }}
            onChange={(date, dateString) => {
              this.handleDatePicker1(date, dateString, value);
            }}
          />
        );
      case 11:
        return <Input placeholder="自动生成" disabled/>;


      default:
        return (
          <Input
            style={{ width: '100' }}
            placeholder="请输入"
            type={inputType || 'text'}
            onChange={v => {
              this.inputChange(v, value);
            }}
          />
        );
    }
  };

  inputChange = (v, value) => {

  };

}
