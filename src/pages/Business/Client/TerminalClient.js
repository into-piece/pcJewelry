import React, { PureComponent } from 'react';

import {
  Card,
  Row,
  Col,
  Table,
  Icon,
  Form,
  Select,
  InputNumber,
  DatePicker,
  Tabs,
  Radio,
  Button,
  Input,
  Modal,
  Divider,
  List,
  message,
} from 'antd';
import styles from './base.less';

import DescriptionList from '@/components/DescriptionList';
import clientStyle from './Client.less';
import { connect } from 'dva';
import AllCity from './components/AllCity';
import City from './components/City';
import GeographicView from './GeographicView';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Description } = DescriptionList;

const validatorGeographic = (rule, value, callback) => {
  // const { name } = value;

  console.log('validatorGeographic = ', value);
  if (!value.name) {
    callback('请输入城市名称');
  }
  // if (!city.key) {
  //   callback('Please input your city!');
  // }
  callback();
};

const validatorCounTry = (rule, value, callback) => {
  // const { name } = value;

  console.log('validatorGeographic = ', value);
  if (!value.name) {
    callback('请输入国家名称');
  }
  // if (!city.key) {
  //   callback('Please input your city!');
  // }
  callback();
};


@connect(({ loading, terminal }) => {
  return {
    body: terminal.body,
    terminalListloading: loading.effects['terminal/fetchListTerminal'],
    terminalSaveloading: loading.effects['terminal/addTerminal'],
    terminalUpdateloading: loading.effects['terminal/updateTerminal'],
    terminalDeleteloading: loading.effects['terminal/deleteTerminal'],
    terminalFreezeloading: loading.effects['terminal/freezeTerminal'],
  };

})

@Form.create()
class TerminalClient extends PureComponent {


  formLayout = {
    labelCol: { span: 12 },
    wrapperCol: {
      span: 24,
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      isEdit: true,
      isAddEdit: true,
      isAdd: true,
      update: false,
      customerId: '',
      selectedItem: '',
    };
  }


  render() {

    const {
      location, body = {}, terminalSaveloading,
      terminalUpdateloading, terminalDeleteloading, terminalFreezeloading, terminalListloading,
    } = this.props;


    const { selectedItem, visible, current = {}, update } = this.state;

    const isUpdate = terminalUpdateloading || terminalSaveloading || terminalDeleteloading || terminalFreezeloading;
    if (isUpdate) {
      this.state.update = true;
      if (terminalUpdateloading) {
        this.state.isUpdateFrom = true;
      }
    } else {
      if (update) {
        // console.log('code '+body.rtnCode)
        if (body.rtnCode === '000000') {
          this.state.requestState = 'success';
          message.success(body.rtnMsg);
        } else {
          message.error(body.rtnMsg);
          this.state.requestState = 'error';
        }
        this.handleDone();


        this.state.update = false;
        if (this.state.isUpdateFrom) {
          this.state.isUpdateFrom = false;
          this.state.showItem = { ...current };
        }
      }
    }


    if (location && location.params) {
      const data = location.params;
      // console.log("ter minal ",data)
      if (data.customerId !== this.state.customerId) {
        this.state.customerId = data.customerId;
        if (data.customerId !== '')
          this.loadTerminalList();
      }

      if (data.customerId && data.customerId !== '')
        this.state.isAddEdit = false;
      else
        this.state.isAddEdit = true;

      if (selectedItem !== '')
        this.state.isEdit = false;
      else
        this.state.isEdit = true;


    } else {
      this.state.isAddEdit = true;
      this.state.isEdit = true;

    }


    const modalFooter = this.state.done
      ? { footer: null, onCancel: this.handleDone }
      : { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };

    const getModalContent = () => {

      const { form: { getFieldDecorator } } = this.props;


      return (
        <div className={clientStyle.list_info}>
          <span className={clientStyle.sun_title_info}>终客</span>
          <Divider className={clientStyle.divder}/>
          <Form
            layout="inline"
            size={'small'}
            className={styles.from_content}
            labelAlign="left"
            onSubmit={this.handleSubmit}>

            <Row gutter={2} justify="start">
              <Col lg={8} md={8} sm={8} xs={8}>
                <FormItem label="终客编号" {...this.formLayout} className={styles.from_content_col}>
                  {getFieldDecorator('endNo', {
                    rules: [{ required: true, message: '请输入终客编号' }],
                    initialValue: current.endNo,
                  })(
                    <Input placeholder="请输入"/>,
                  )}
                </FormItem>
              </Col>
              <Col lg={8} md={8} sm={8} xs={8}>

                <FormItem label="终客简称" {...this.formLayout} className={styles.from_content_col}>
                  {getFieldDecorator('endShotName', {
                    rules: [{ required: true, message: '请输入终客简称' }],
                    initialValue: current.endShotName,
                  })(
                    <Input placeholder="请输入"/>,
                  )}
                </FormItem>
              </Col>

              <Col lg={8} md={8} sm={8} xs={8}>
                <FormItem label="中文名" {...this.formLayout} className={styles.from_content_col}>
                  {getFieldDecorator('zhName', {
                    rules: [{ message: '请输入中文名' }],
                    initialValue: current.zhName,
                  })(
                    <Input placeholder="请输入"/>,
                  )}
                </FormItem>
              </Col>


            </Row>

            <Row gutter={2}>


              <Col lg={8} md={8} sm={8} xs={8}>
                <FormItem label="国别" {...this.formLayout} className={styles.from_content_col}>
                  {getFieldDecorator('country', {
                    rules: [],
                    initialValue: current.country,
                  })(
                    <City content={current.country}/>,
                  )}
                </FormItem>
              </Col>
              <Col lg={8} md={8} sm={8} xs={8}>

                <FormItem label="城市" {...this.formLayout} className={styles.from_content_col}>
                  {getFieldDecorator('city', {
                    initialValue: current.city,

                  })(
                    <City content={current.city}/>,
                  )}
                </FormItem>
              </Col>

              <Col lg={8} md={8} sm={8} xs={8}>

                <FormItem label="英文名" {...this.formLayout} className={styles.from_content_col}>
                  {getFieldDecorator('enName', {
                    rules: [{ message: '请输入英文名' }],
                    initialValue: current.enName,
                  })(
                    <Input placeholder="请输入"/>,
                  )}
                </FormItem>
              </Col>


            </Row>
            <Row gutter={2}>
              <Col lg={8} md={8} sm={8} xs={8}>
                <FormItem label="中文地址" {...this.formLayout} className={styles.from_content_col}>
                  {getFieldDecorator('zhAddress', {
                    rules: [{ message: '请输入中文地址' }],
                    initialValue: current.zhAddress,
                  })(
                    <Input placeholder="请输入"/>,
                  )}
                </FormItem>
              </Col>
              <Col lg={8} md={8} sm={8} xs={8}>

                <FormItem label="英文地址" {...this.formLayout} className={styles.from_content_col}>
                  {getFieldDecorator('enAddress', {
                    rules: [{ message: '请输入英文地址' }],
                    initialValue: current.enAddress,
                  })(
                    <Input placeholder="请输入"/>,
                  )}
                </FormItem>
              </Col>
              <Col lg={8} md={8} sm={8} xs={8}>
                <FormItem label="电话" {...this.formLayout} className={styles.from_content_col}>
                  {getFieldDecorator('phone', {
                    rules: [{ message: '请输入电话' }],
                    initialValue: current.phone,
                  })(
                    <Input placeholder="请输入"/>,
                  )}
                </FormItem>
              </Col>

            </Row>
            <Row gutter={2}>
              <Col lg={8} md={8} sm={8} xs={8}>

                <FormItem label="联络人姓名" {...this.formLayout} className={styles.from_content_col}>
                  {getFieldDecorator('contactName', {
                    rules: [{ required: true, message: '请输入联系人' }],
                    initialValue: current.contactName,
                  })(
                    <Input placeholder="请输入"/>,
                  )}
                </FormItem>
              </Col>
              <Col lg={8} md={8} sm={8} xs={8}>

                <FormItem label="Email" {...this.formLayout} className={styles.from_content_col}>
                  {getFieldDecorator('email', {
                    rules: [{ message: '请输入Email' }],
                    initialValue: current.email,
                  })(
                    <Input placeholder="请输入"/>,
                  )}
                </FormItem>
              </Col>
              <Col lg={8} md={8} sm={8} xs={8}>
                <FormItem label="QQ" {...this.formLayout} className={styles.from_content_col}>
                  {getFieldDecorator('qq', {
                    rules: [{ message: '请输入QQ' }],
                    initialValue: current.qq,
                  })(
                    <Input placeholder="请输入"/>,
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={2}>

              <Col lg={8} md={8} sm={8} xs={8}>

                <FormItem label="微信" {...this.formLayout} className={styles.from_content_col}>
                  {getFieldDecorator('wechat', {
                    rules: [{ message: '微信' }],
                    initialValue: current.wechat,
                  })(
                    <Input placeholder="请输入"/>,
                  )}
                </FormItem>
              </Col>
              <Col lg={8} md={8} sm={8} xs={8}>

                <FormItem label="备注" {...this.formLayout} className={styles.from_content_col}>
                  {getFieldDecorator('remarks', {
                    rules: [{ message: '请输入备注' }],
                    initialValue: current.remarks,
                  })(
                    <TextArea rows={4} placeholder="请输入"/>,
                  )}
                </FormItem>
              </Col>


            </Row>


          </Form>
        </div>
      );
    };

    return (<div className={styles.content}>
      <div className={styles.right_info}>

        <List
          loading={isUpdate || terminalListloading}
          dataSource={(!this.state.isAddEdit) ? body.data : []}
          renderItem={this.getContantItem}
          size="small"
          bordered={false}
          split={true}

        />
      </div>

      <Card bodyStyle={{ paddingLeft: 5, paddingRight: 5, paddingTop: 5, paddingBottom: 5 }}
            className={styles.cardconrtll}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            flexDirection: 'column',
          }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button className={clientStyle.buttomControl} type="primary" icon="plus"
                    size={'small'} disabled={this.state.isAddEdit} onClick={this.clickNewFrom}>新增</Button>
            <Button className={clientStyle.buttomControl} type="danger" icon="delete" size={'small'}
                    disabled={this.state.isEdit} onClick={this.clickDeleteFrom}>删除</Button>
            <Button className={clientStyle.buttomControl} type="primary" size={'small'}
                    icon="edit" disabled={this.state.isEdit} onClick={this.clickEditFrom}>编辑</Button>
            <Button className={clientStyle.buttomControl} size={'small'} type="primary" icon="lock"
                    disabled={this.state.isEdit} onClick={this.clickFreezeFrom}>冻结</Button>
          </div>


          <div
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingTop: 10 }}>
            <Button className={clientStyle.buttomControl} type="primary" size={'small'}
                    icon="copy" disabled>复制</Button>
            <Button className={clientStyle.buttomControl} size={'small'} type="primary" icon="rollback"
                    disabled>撤销</Button>
          </div>
        </div>

      </Card>
      <Modal
        width={640}
        className={styles.standardListForm}
        destroyOnClose
        visible={visible}
        {...modalFooter}
      >
        {getModalContent()}
      </Modal>
    </div>);
  }


  getContantItem = (item) => {

    const { selectedItem } = this.state;

    return (
      <div className={selectedItem === item ? styles.list_selected_content : ''} onClick={() => {
        this.changeSelectItem(item);
      }}>
        <DescriptionList size='small' col='2'>
          <Description term='终客编号'>{item.endNo}</Description>
          <Description term='终客简称'>{item.endShotName}</Description>
          <Description term='中文名'>{item.zhName}</Description>
          <Description term='英文名'>{item.enName}</Description>
          <Description size="small" term='国别'>{item.country}</Description>
          <Description term='城市'>{item.city}</Description>
        </DescriptionList>
        <DescriptionList size='small' col='1'>
          <Description term='中文地址'>{item.zhAddress}</Description>
          <Description term='英文地址'>{item.enAddress}</Description>
        </DescriptionList>
        <DescriptionList size='small' col='2'>
          <Description term='联络人姓名  '>{item.contactName}</Description>
          <Description term='手机'>{item.phone}</Description>
          <Description term='电话'>{item.tel}</Description>
          <Description term='Email'>{item.email}</Description>
          <Description term='QQ'>{item.qq}</Description>
          <Description term='微信'>{item.wechat}</Description>
          <Description term='备注'>{item.remarks}</Description>
        </DescriptionList>
        <Divider className={styles.divder}/>
      </div>
    );
  };


  changeSelectItem = (item) => {

    const { selectedItem } = this.state;
    let selectitem = selectedItem === item ? '' : item;

    this.setState({
      selectedItem: selectitem,
    });

  };


  loadTerminalList = () => {
    console.log('loadTerminalList');
    const { dispatch } = this.props;
    dispatch({
      type: 'terminal/fetchListTerminal',
      payload: { 'customerId': this.state.customerId },
    });

  };


  clickNewFrom = () => {
    this.setState({
      visible: true,
      isAdd: true,
      current: {},
    });

  };

  clickEditFrom = () => {
    this.state.isAdd = false;
    this.setState({
      current: this.state.selectedItem,
      visible: true,
    });

  };

  clickDeleteFrom = () => {
    const { selectedItem } = this.state;
    const { dispatch } = this.props;
    const id = selectedItem.id;
    if (id) {
      let keys = [];
      keys.push(id);
      console.log('delet', keys, id);
      dispatch({
        type: 'terminal/deleteTerminal',
        payload: { 'list': keys },
      });
    }

    this.setState({
      showItem: false,
      isEdit: true,
    });


  };

  clickFreezeFrom = () => {

    const { selectedItem } = this.state;
    const { dispatch } = this.props;

    const id = selectedItem.id;
    if (id) {
      let keys = [];
      keys.push(id);
      dispatch({
        type: 'terminal/freezeTerminal',
        payload: { 'list': keys },
      });
    }

  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  handleDone = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'terminal/fetchListTerminal',
      payload: { 'customerId': this.state.customerId },
    });
    this.setState({
      visible: false,
      selectedItem: '',
      // fristLoad: true,
    });
  };


  handleSubmit = () => {


    const { dispatch, form } = this.props;
    const { isAdd, customerId, selectedItem } = this.state;


    form.validateFields((err, fieldsValue) => {

      if (err) return;
      let params = { ...fieldsValue };
      // if (fieldsValue.city.name)
      //   params.city = fieldsValue.city.name;
      // if (fieldsValue.country.name)
      //   params.country = fieldsValue.country.name;
      params.customerId = this.state.customerId;
      if (isAdd) {


        console.log(params);
        // if (isAdd) {
        dispatch({
          type: 'terminal/addTerminal',
          payload: {
            ...params,
          },
        });
      } else {

        params.id = selectedItem.id;

        // this.state.current = { ...data };
        dispatch({
          type: 'terminal/updateTerminal',
          payload: {
            ...params,
          },
        });
      }
    });
  };

}


export default TerminalClient;
