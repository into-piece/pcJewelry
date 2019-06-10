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
  Divider,
  List,
  Modal,
} from 'antd';
import styles from './base.less';
import {connect} from 'dva'
import DescriptionList from '@/components/DescriptionList';
import clientStyle from './Client.less';

const FormItem = Form.Item;
const { Description } = DescriptionList;
const {TextArea} = Input;
const listdata = [{
  name: '张三',
  phone: '0755-88888888',
  email: 'zengwl@gs.com',
  phone2: '1380013800',
  QQ: '274372131',
  wechat: 'zhangsan',
}, {
  name: '张三',
  phone: '0755-88888888',
  email: 'zengwl@gs.com',
  phone2: '1380013800',
  QQ: '274372131',
  wechat: 'zhangsan',
}, {
  name: '张三',
  phone: '0755-88888888',
  email: 'zengwl@gs.com',
  phone2: '1380013800',
  QQ: '274372131',
  wechat: 'zhangsan',
}];


@connect(({  loading, customer }) => {
  return {
    body: customer.body,
    customerSaveloading: loading.effects['customer/addCustomer'],
    customerUpdateloading: loading.effects['customer/updateCustomer'],
    customerDeleteloading: loading.effects['customer/deleteCustomer'],
    customerFreezeloading: loading.effects['customer/freezeCustomer'],
  };

})
@Form.create()
class ClientInfo extends PureComponent {

  formLayout = {
    labelCol: { span: 12 },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      content: '',
      isEdit: true,
      isAddEdit: true,
      isAdd: true,
    };
  }




  render() {

    const { location } = this.props;

    const {visible,current={}} = this.state;

    let content=''
    if (location && location.params) {
      let data = location.params;
      content = data.content
      console.log('customer render ', data);
      // data.ref()
      if (data.typeId && data.typeId !== ''){
        this.state.isAddEdit = false;
      }
      else {
        this.state.isAddEdit = true;

      }

      if(data.content&&data.content!=='')
      {
        this.state.isEdit = false;
      }else {
        this.state.isEdit = true;
      }

    } else {
      this.state.isAddEdit = true;
      this.state.isEdit = true;
    }


    const modalFooter = this.state.done
      ? { footer: null, onCancel: this.handleDone }
      : { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };

    const getModalContent = () => {


      /*
			{
				"city":"222updateCustomer",
				"companyPhone":"222updateCustomer",
				"companyWebsite":"222updateCustomer",
				"country":"222updateCustomer",
				"createTime":"2019-06-01 22:06:10",
				"createUser":"zengwl",
				"customerChannels":"222updateCustomer",
				"customerNo":"ddd",
				"customerQuotationCoefficient":"222updateCustomer",
				"delFlag":"0",
				"deliveryMethod":"222updateCustomer",
				"enName":"222updateCustomer",
				"id":"f693ce29bf4f69e8144b9e7bfb9e367f",
				"modifier":"",
				"mtime":"2019-06-07 22:42:51",
				"prepaymentRatio":"222updateCustomer",
				"qualityRequirements":"222updateCustomer",
				"remarks":"222updateCustomer",
				"settlementCurrency":"222updateCustomer",
				"shotName":"666",
				"status":"0",
				"typeId":"a21824c3ca4ec352169d36194247a413",
				"zhName":"222updateCustomer"
      * */
      const { form: { getFieldDecorator } } = this.props;

      return (
        <Form
          layout="inline"
          size={'small'}
          className={styles.from_content}
          labelAlign="left"
          onSubmit={this.handleSubmit}>

          <Row gutter={2} justify="start">
            <Col lg={12} md={12} sm={12} xs={12}  >
              <FormItem label="客户编号" {...this.formLayout} className={styles.from_content_col}>
                {getFieldDecorator('customerNo', {
                  rules: [{ required: true, message: '请输入客户编号' }],
                  initialValue: current.customerNo,
                })(
                  <Input placeholder="请输入"/>,
                )}
              </FormItem>
            </Col>
            <Col lg={12} md={12} sm={12} xs={12}>

              <FormItem label="简称" {...this.formLayout} className={styles.from_content_col}>
                {getFieldDecorator('shotName', {
                  rules: [{required: true, message: '请输入中文名称' }],
                  initialValue: current.shotName,
                })(
                  <Input placeholder="请输入"/>,
                )}
              </FormItem>
            </Col>
          </Row>

          <Row gutter={2}>
            <Col lg={12} md={12} sm={12} xs={12} >
              <FormItem label="来源" {...this.formLayout} className={styles.from_content_col}>
                {getFieldDecorator('qualityEnName', {
                  rules: [{ message: '请输入来源' }],
                  initialValue: current.source,
                })(
                  <Input placeholder="请输入"/>,
                )}
              </FormItem>
            </Col>
            <Col lg={12} md={12} sm={12} xs={12}  >

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
            <Col lg={12} md={12} sm={12} xs={12}>
              <FormItem label="英文名" {...this.formLayout} className={styles.from_content_col}>
                {getFieldDecorator('enName', {
                  rules: [{   message: '请输入英文名' }],
                  initialValue: current.enName,
                })(
                  <Input placeholder="请输入"/>,
                )}
              </FormItem>
            </Col>
            <Col lg={12} md={12} sm={12} xs={12}>

              <FormItem label="中文地址" {...this.formLayout} className={styles.from_content_col}>
                {getFieldDecorator('qualityZhName', {
                  rules: [{ message: '请输入中文地址' }],
                  initialValue: current.qualityZhName,
                })(
                  <Input placeholder="请输入"/>,
                )}
              </FormItem>
            </Col>


          </Row>
          <Row gutter={2}>
            <Col lg={12} md={12} sm={12} xs={12}>
              <FormItem label="英文地址" {...this.formLayout} className={styles.from_content_col}>
                {getFieldDecorator('qualityEnName', {
                  rules: [{  message: '请输入英文地址' }],
                  initialValue: current.qualityEnName,
                })(
                  <Input placeholder="请输入"/>,
                )}
              </FormItem>
            </Col>
            <Col lg={12} md={12} sm={12} xs={12}>

              <FormItem label="国别" {...this.formLayout} className={styles.from_content_col}>
                {getFieldDecorator('country', {
                  rules: [{ message: '请输入国别' }],
                  initialValue: current.country,
                })(
                  <Input placeholder="请输入"/>,
                )}
              </FormItem>
            </Col>


          </Row>
          <Row gutter={2}>
            <Col lg={12} md={12} sm={12} xs={12}>
              <FormItem label="城市" {...this.formLayout} className={styles.from_content_col}>
                {getFieldDecorator('city', {
                  rules: [{ message: '请输入城市' }],
                  initialValue: current.city,
                })(
                  <Input placeholder="请输入"/>,
                )}
              </FormItem>
            </Col>
            <Col lg={12} md={12} sm={12} xs={12}>

              <FormItem label="公司电话" {...this.formLayout} className={styles.from_content_col}>
                {getFieldDecorator('companyPhone', {
                  rules: [{ message: '请输入公司电话' }],
                  initialValue: current.companyPhone,
                })(
                  <Input placeholder="请输入"/>,
                )}
              </FormItem>
            </Col>


          </Row>
          <Row gutter={2}>
            <Col lg={12} md={12} sm={12} xs={12}>
              <FormItem label="公司网址" {...this.formLayout} className={styles.from_content_col}>
                {getFieldDecorator('companyWebsite', {
                  rules: [{  message: '请输入公司网址' }],
                  initialValue: current.companyWebsite,
                })(
                  <Input placeholder="请输入"/>,
                )}
              </FormItem>
            </Col>
            <Col lg={12} md={12} sm={12} xs={12}>

              <FormItem label="结算币种" {...this.formLayout} className={styles.from_content_col}>
                {getFieldDecorator('settlementCurrency', {
                  rules: [{ message: '请输入结算币种' }],
                  initialValue: current.settlementCurrency,
                })(
                  <Input placeholder="请输入"/>,
                )}
              </FormItem>
            </Col>


          </Row>
          <Row gutter={2}>
            <Col lg={12} md={12} sm={12} xs={12}>
              <FormItem label="品质等级" {...this.formLayout} className={styles.from_content_col}>
                {getFieldDecorator('qualityRequirements', {
                  rules: [{ message: '请输入品质等级' }],
                  initialValue: current.qualityRequirements,
                })(
                  <Input placeholder="请输入"/>,
                )}
              </FormItem>
            </Col>
            <Col lg={12} md={12} sm={12} xs={12}>

              <FormItem label="客户报价系数" {...this.formLayout} className={styles.from_content_col}>
                {getFieldDecorator('customerQuotationCoefficient', {
                  rules: [{ message: '请输入客户报价系数' }],
                  initialValue: current.customerQuotationCoefficient,
                })(
                  <Input placeholder="请输入"/>,
                )}
              </FormItem>
            </Col>


          </Row>
          <Row gutter={2}>
            <Col lg={12} md={12} sm={12} xs={12}>
              <FormItem label="预付款比例" {...this.formLayout} className={styles.from_content_col}>
                {getFieldDecorator('prepaymentRatio', {
                  rules: [{ message: '请输入预付款比例' }],
                  initialValue: current.prepaymentRatio,
                })(
                  <Input placeholder="请输入"/>,
                )}
              </FormItem>
            </Col>
            <Col lg={12} md={12} sm={12} xs={12}>

              <FormItem label="送货方式" {...this.formLayout} className={styles.from_content_col}>
                {getFieldDecorator('deliveryMethod', {
                  rules: [{ message: '请输入送货方式' }],
                  initialValue: current.deliveryMethod,
                })(
                  <Input placeholder="请输入"/>,
                )}
              </FormItem>
            </Col>


          </Row>

          <Row gutter={2}>
            <Col lg={12} md={12} sm={12} xs={12}>

              <FormItem label="备注" {...this.formLayout} className={styles.from_content_col}>
                {getFieldDecorator('remarks', {
                  rules: [{ message: '请输入备注' }],
                  initialValue: current.remarks,
                })(
                  <TextArea rows={4} placeholder="请输入"/>,
                )}
              </FormItem>
            </Col>
            <Col lg={12} md={12} sm={12} xs={12}>
              <FormItem label="共同维护人" {...this.formLayout} className={styles.from_content_col}>
                {getFieldDecorator('modifier', {
                  rules: [{ message: '请输入共同维护人' }],
                  initialValue: current.modifier,
                })(
                  <Input placeholder="请输入"/>,
                )}
              </FormItem>
            </Col>

          </Row>





        </Form>
      );
    };

    return (<div className={styles.content}>

      <div className={styles.right_info}>
        {content === '' ? '' : (
          this.showCustomer(content)
        )}


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
                    icon="edit" disabled={this.state.isEdit}>编辑</Button>
            <Button className={clientStyle.buttomControl} size={'small'} type="primary" icon="lock"
                    disabled={this.state.isEdit}>冻结</Button>
          </div>


          <div
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingTop: 10 }}>
            <Button className={clientStyle.buttomControl} type="primary" size={'small'}
                    icon="copy" disabled={this.state.isEdit}>复制</Button>
            <Button className={clientStyle.buttomControl} size={'small'} type="primary" icon="rollback"
                    disabled={this.state.isEdit}>撤销</Button>
          </div>
        </div>

      </Card>
      <Modal
        // title={this.state.done ? null : `任务${current.brandNo ? '编辑' : '添加'}`}
        title={'任务添加'}
        width={740}
        className={styles.standardListForm}
        bodyStyle={{ padding: '28px 0 0' }}
        destroyOnClose
        visible={visible}
        {...modalFooter}
      >
        {getModalContent()}
      </Modal>
    </div>);
    ;
  }


  clickNewFrom =()=>{
    this.setState({
      visible: true,
      isAdd: true,
      current: {},
    })
  }

  clickEditFrom = () => {
    this.state.isAdd = false;
    this.setState({
      current: this.state.showItem,
      visible: true,
    });

  };

  clickDeleteFrom = () => {
    const { selectedRowKeys } = this.state;

    const { dispatch } = this.props;
    dispatch({
      type: 'customer/deleteCustomer',
      payload: { 'list': selectedRowKeys },
    });


    this.setState({
      selectedRowKeys: '',
      showItem: false,
      isEdit: true,
    });

  };

  clickFreezeFrom = () => {
    const { selectedRowKeys } = this.state;

    const { dispatch } = this.props;
    dispatch({
      type: 'customer/freeCustomer',
      payload: { 'list': selectedRowKeys },
    });


  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };


  showCustomer = (item) => {



    return (<div>
      <DescriptionList size='small' col='2'>
        <Description size="small" term='客户编号'>{item.customerNo}</Description>
        <Description size="small" term='客户简称'>{item.shotName}</Description>
        <Description size="small" term='国别'>{item.country}</Description>
        <Description term='城市'>{item.city}</Description>
        <Description term='英文名'>{item.enName}</Description>
        <Description term='中文名'>{item.zhName}</Description>
        <Description term='客户渠道'>{item.customerChannels}</Description>
      </DescriptionList>
      <DescriptionList size='small' col='1'>
        <Description term='英文地址'></Description>
      </DescriptionList>
      <DescriptionList size='small' col='2'>
        <Description term='电话'>{item.companyPhone}</Description>
        <Description term='公司网站'>{item.companyWebsite}</Description>
        <Description term='结算币种'>{item.settlementCurrency}</Description>
        <Description term='品质质量'>{item.customerNo}</Description>
        <Description term='客户报价系数'>{item.customerNo}</Description>
        <Description term='送货方式'>{item.qualityRequirements}</Description>
        <Description term='预付款比例'>{item.prepaymentRatio}%</Description>
      </DescriptionList>
      <span className={styles.title_info}>备注</span>
      <DescriptionList size='small' col='1'>
        <Description term=''>{item.remarks}</Description>
      </DescriptionList>
      <Divider className={styles.divder}/>
      <span style={{
        marginBottom: 10,
        paddingLeft: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#35B0F4',
      }}>联络信息</span>
      <Divider className={styles.divder}/>
      <List
        loading={false}
        dataSource={listdata}
        renderItem={this.getContantItem}
        size="small"
        bordered={false}
        split={true}

      />

    </div>);
  };





  getContantItem = (item) => {

    return (<DescriptionList size='small' col='2'>
      <Description term='联系人'>{item.name}</Description>
      <Description term='电话'>{item.phone}</Description>
      <Description term='Email'>{item.email}</Description>
      <Description term='手机'>{item.phone2}</Description>
      <Description term='QQ'>{item.QQ}</Description>
      <Description term='微信'>{item.wechat}</Description>
    </DescriptionList>);
  };

  getModalContent = () => {

    const { form: { getFieldDecorator } } = this.props;

    return (
      <Form
        size={'small'}
        onSubmit={this.handleSubmit}>
        <FormItem label="品质要求英文名称" {...this.formLayout}>
          {getFieldDecorator('qualityEnName', {
            rules: [{ required: true, message: '请输入英文名称' }],
          })(
            <Input placeholder="请输入"/>,
          )}
        </FormItem>
        <FormItem label="品质要求中文名" {...this.formLayout}>
          {getFieldDecorator('qualityZhName', {
            rules: [{ message: '请输入中文名称' }],
          })(
            <Input placeholder="请输入"/>,
          )}
        </FormItem>
      </Form>
    );
  };

  handleDone = () => {
    this.setState({
      visible: false,
    });
  };




  handleSubmit = () => {

    const {visible} = this.state;


    const { dispatch, form,location } = this.props;
    const { showItem, isAdd } = this.state;

    let content=''
    let data={}
    if (location && location.params) {
      data = location.params;
      content = data.content
    }



    form.validateFields((err, fieldsValue) => {

      if (err) return;

      let params = {};
      params = { ...fieldsValue };
      console.log({ ...fieldsValue });
      if (isAdd) {

        params.typeId = data.typeId;
        console.log("param save ",params)
        dispatch({
          type: 'customer/addCustomer',
          payload: {
            ...params,
          },
        });

      } else {

        params.typeId = content.typeId;
        this.state.current = { ...data };
        dispatch({
          type: 'client/updateClient',
          payload: {
            ...params,
          },
        });
      }
    });
  }

}

export default ClientInfo;
