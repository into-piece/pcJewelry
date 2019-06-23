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
  message,
} from 'antd';
import styles from './base.less';
import { connect } from 'dva';
import DescriptionList from '@/components/DescriptionList';
import clientStyle from './Client.less';
import GeographicView from './../../Account/Settings/GeographicView';
import City from './components/City';
import Dict from './components/Dict';
import QualityRequirements from './components/QualityRequirements';
import DeliveryMethods from './components/DeliveryMethods';

const FormItem = Form.Item;
const { Description } = DescriptionList;
const { TextArea } = Input;
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


const validatorGeographic = (rule, value, callback) => {

  console.log('validatorGeographic = ', value);
  //   if(value)
  //   {}
  // if (!value.name) {
  //   callback("请输入城市名称");
  // }
  callback();
};

@connect(({ loading, customer }) => {
  return {
    body: customer.body,
    customerListloading: loading.effects['customer/fetchListCustomer'],
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
      span: 24,
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
      update: false,
      settlementCurrency: '',
      qualityRequirements: '',
      deliveryMethod: '',

    };
  }


  render() {

    const {
      location, body, customerSaveloading,
      customerUpdateloading, customerDeleteloading, customerFreezeloading,
    } = this.props;

    const { visible, current = {}, update } = this.state;

    let content = '';
    if (location && location.params) {
      let data = location.params;
      content = data.content;
      this.state.showItem = { ...content };
      this.featQuality();
      this.featCurrency();
      this.featDelivery();
      this.state.info = { ...data };

      // console.log('customer render ', data);
      // data.ref()
      if (data.typeId && data.typeId !== '')
        this.state.isAddEdit = false;
      else
        this.state.isAddEdit = true;

      if (data.content && data.content !== '')

        this.state.isEdit = false;
      else
        this.state.isEdit = true;


    } else {
      this.state.isAddEdit = true;
      this.state.isEdit = true;
      content = '';
    }

    let isCurstomerUpdate = customerDeleteloading || customerSaveloading || customerUpdateloading || customerFreezeloading;


    if (isCurstomerUpdate) {
      this.state.update = true;
      if (customerUpdateloading)
        this.state.customerUpdate = true;
    } else {
      if (update) {


        if (body.rtnCode === '000000') {
          this.state.requestState = 'success';
          message.success(body.rtnMsg);
        } else {
          message.error(body.rtnMsg);
          this.state.requestState = 'error';
        }
        if (this.state.customerUpdate) {
          console.log('update fini');
          const { updateCustomer } = this.state;
          this.setState({
            info: updateCustomer,
          });
          this.state.customerUpdate = false;
        }

        this.handleDone();
        this.state.update = false;
      }


    }


    const modalFooter = this.state.done
      ? { footer: null, onCancel: this.handleDone }
      : { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };

    const getModalContent = () => {

      const { form: { getFieldDecorator } } = this.props;

      return (

        <div className={clientStyle.list_info}>
          <span className={clientStyle.sun_title_info}>客户</span>
          <Divider className={clientStyle.divder}/>
          <Form
            layout="inline"
            size={'small'}
            className={styles.from_content}
            labelAlign="left"
            onSubmit={this.handleSubmit}>

            <Row gutter={2} justify="start">
              <Col lg={8} md={8} sm={8} xs={8}>
                <FormItem label="客户编号" {...this.formLayout} className={styles.from_content_col}>
                  {getFieldDecorator('customerNo', {
                    rules: [{ required: true, message: '请输入客户编号' }],
                    initialValue: current.customerNo,
                  })(
                    <Input placeholder="请输入"/>,
                  )}
                </FormItem>
              </Col>
              <Col lg={8} md={8} sm={8} xs={8}>

                <FormItem label="简称" {...this.formLayout} className={styles.from_content_col}>
                  {getFieldDecorator('shotName', {
                    rules: [{ required: true, message: '请输入简称' }],
                    initialValue: current.shotName,
                  })(
                    <Input placeholder="请输入"/>,
                  )}
                </FormItem>
              </Col>

              <Col lg={8} md={8} sm={8} xs={8}>
                <FormItem label="客户渠道" {...this.formLayout} className={styles.from_content_col}>
                  {getFieldDecorator('customerChannels', {
                    rules: [{ message: '请输入客户渠道' }],
                    initialValue: current.customerChannels,
                  })(
                    <Input placeholder="请输入"/>,
                  )}
                </FormItem>
              </Col>

            </Row>

            <Row gutter={2}>

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
              <Col lg={8} md={8} sm={8} xs={8}>

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
              <Col lg={8} md={8} sm={8} xs={8}>
                <FormItem label="英文地址" {...this.formLayout} className={styles.from_content_col}>
                  {getFieldDecorator('qualityEnName', {
                    rules: [{ message: '请输入英文地址' }],
                    initialValue: current.qualityEnName,
                  })(
                    <Input placeholder="请输入"/>,
                  )}
                </FormItem>
              </Col>
              <Col lg={8} md={8} sm={8} xs={8}>

                <FormItem label="国别" {...this.formLayout} className={styles.from_content_col}>
                  {getFieldDecorator('country', {
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

            </Row>
            <Row gutter={2}>
              <Col lg={8} md={8} sm={8} xs={8}>

                <FormItem label="电话" {...this.formLayout} className={styles.from_content_col}>
                  {getFieldDecorator('companyPhone', {
                    rules: [{ message: '请输入电话' }],
                    initialValue: current.companyPhone,
                  })(
                    <Input placeholder="请输入"/>,
                  )}
                </FormItem>
              </Col>

              <Col lg={8} md={8} sm={8} xs={8}>
                <FormItem label="网址" {...this.formLayout} className={styles.from_content_col}>
                  {getFieldDecorator('companyWebsite', {
                    rules: [{ message: '请输入网址' }],
                    initialValue: current.companyWebsite,
                  })(
                    <Input placeholder="请输入"/>,
                  )}
                </FormItem>
              </Col>
              <Col lg={8} md={8} sm={8} xs={8}>

                <FormItem label="币种" {...this.formLayout} className={styles.from_content_col}>
                  {getFieldDecorator('settlementCurrency', {
                    initialValue: current.settlementCurrency,
                  })(
                    <Dict dict="H006" defaultValue="美元" content={current.settlementCurrency}/>,
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={2}>
              <Col lg={8} md={8} sm={8} xs={8}>
                <FormItem label="品质" {...this.formLayout} className={styles.from_content_col}>
                  {getFieldDecorator('qualityRequirements', {
                    initialValue: current.qualityRequirements,
                  })(
                    <QualityRequirements placeholder="请输入" content={current.qualityRequirements}/>,
                  )}
                </FormItem>
              </Col>
              <Col lg={8} md={8} sm={8} xs={8}>

                <FormItem label="报价系数" {...this.formLayout} className={styles.from_content_col}>
                  {getFieldDecorator('customerQuotationCoefficient', {
                    rules: [{ message: '请输入客户报价系数' }],
                    initialValue: current.customerQuotationCoefficient,
                  })(
                    <Input placeholder="请输入"/>,
                  )}
                </FormItem>
              </Col>
              <Col lg={8} md={8} sm={8} xs={8}>
                <FormItem label="预付款比例" {...this.formLayout} className={styles.from_content_col}>
                  {getFieldDecorator('prepaymentRatio', {
                    rules: [{ message: '请输入预付款比例' }],
                    initialValue: current.prepaymentRatio,
                  })(
                    <Input placeholder="请输入"/>,
                  )}
                </FormItem>
              </Col>


            </Row>
            <Row gutter={2}>
              <Col lg={8} md={8} sm={8} xs={8}>

                <FormItem label="送货方式" {...this.formLayout} className={styles.from_content_col}>
                  {getFieldDecorator('deliveryMethod', {
                    rules: [{ message: '请输入送货方式' }],
                    initialValue: current.deliveryMethod,
                  })(
                    <DeliveryMethods content={current.deliveryMethod}/>,
                  )}
                </FormItem>
              </Col>
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


            </Row>


          </Form>
        </div>
      );
    };

    return (<div className={styles.content}>

      <div className={styles.right_info}>
        {content === '' ? '' : (
          this.showCustomer({ ...content })
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
                    icon="edit" disabled={this.state.isEdit} onClick={this.clickEditFrom}>编辑</Button>
            <Button className={clientStyle.buttomControl} size={'small'} type="primary" icon="lock"
                    disabled={this.state.isEdit} onClick={this.clickFreezeFrom}>冻结</Button>
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
        width={740}
        className={styles.standardListForm}
        destroyOnClose
        visible={visible}
        {...modalFooter}
      >
        {getModalContent()}
      </Modal>
    </div>);
    ;
  }


  clickNewFrom = () => {
    const { info } = this.state;
    this.setState({
      visible: true,
      isAdd: true,
      current: {},
    });

  };

  clickEditFrom = () => {
    const { info } = this.state;
    this.state.isAdd = false;
    this.setState({
      current: this.state.showItem,
      visible: true,
    });

  };

  clickDeleteFrom = () => {
    const { info } = this.state;
    const { dispatch } = this.props;

    if (info.ckeys) {
      const keys = info.ckeys;
      dispatch({
        type: 'customer/deleteCustomer',
        payload: { 'list': info.ckeys },
      });
    }

    this.setState({
      selectedRowKeys: '',
      showItem: false,
      isEdit: true,
    });


  };

  clickFreezeFrom = () => {
    const { info } = this.state;

    const keys = info.ckeys;
    const { dispatch } = this.props;
    dispatch({
      type: 'customer/freezeCustomer',
      payload: { 'list': keys },
    });


  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };


  showCustomer = (item) => {

    const { settlementCurrency, qualityRequirements, deliveryMethod } = this.state;

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
        <Description term='网站'>{item.companyWebsite}</Description>
        <Description term='币种'>{settlementCurrency}</Description>
        <Description term='品质'>{qualityRequirements}</Description>
        <Description term='报价系数'>{item.customerQuotationCoefficient}</Description>
        <Description term='送货方式'>{deliveryMethod}</Description>
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

  featQuality = () => {
    const { showItem } = this.state;
    // console.log('featQuality item ', showItem);
    if (showItem && showItem.qualityRequirements) {
      let params = { id: showItem.qualityRequirements };
      fetch('/server/basic/quality-requirements/listQualityRequirementss', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })
        .then(response => response.json())
        .then(d => {
          const body = d.body;
          let qualityRequirements = '';
          if (body.records.length > 0) {
            qualityRequirements = body.records[0].qualityEnName;
            this.setState({
              qualityRequirements,
            });
          }
          // console.log('qualityRequirements value ', qualityRequirements);
        }).catch(function(ex) {
        // message.error('加载图片失败！');

      });
    }
  };


  featCurrency = () => {
    const { showItem } = this.state;
    // console.log('featQuality item ', showItem);
    if (showItem && showItem.settlementCurrency) {
      let params = { id: showItem.settlementCurrency };
      fetch('/server/sys/mst-wordbook/listMstWordbook', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })
        .then(response => response.json())
        .then(d => {
          const body = d.body;
          let settlementCurrency = '';
          if (body.records.length > 0) {
            settlementCurrency = body.records[0].wordbookContentZh;
            this.setState({
              settlementCurrency,
            });
          }
          // console.log('settlementCurrency value ', settlementCurrency);
        }).catch(function(ex) {
        // message.error('加载图片失败！');
      });
    }

  }

  featDelivery = () => {
    const { showItem } = this.state;
    // console.log('featQuality item ', showItem);
    if (showItem && showItem.deliveryMethod) {
      let params = { id: showItem.deliveryMethod };
      fetch('/server/basic/delivery-method/listDeliveryMethods', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })
        .then(response => response.json())
        .then(d => {
          const body = d.body;
          let deliveryMethod = '';
          if (body.records.length > 0) {
            deliveryMethod = body.records[0].deliveryZhName;
            this.setState({
              deliveryMethod,
            });
          }
          // console.log('settlementCurrency value ', deliveryMethod);
        }).catch(function(ex) {
        // message.error('加载图片失败！');
      });
    }
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

    // const { location } = this.props;
    const { info } = this.state;


    if (info && info.ref)
      info.ref();

    // console.log('customer render ', data);
    // data.ref()
    //handle
    this.setState({
      visible: false,
    });
  };


  handleSubmit = () => {

    const { visible } = this.state;


    const { dispatch, form } = this.props;
    const { isAdd, info } = this.state;

    let content = '';

    if (info) {
      content = info.content;
    }


    form.validateFields((err, fieldsValue) => {

      if (err) return;

      let params = {};
      params = { ...fieldsValue };
      // if (isAdd) {

      // if(fieldsValue.city)
      //   params.city=fieldsValue.city.name

      // if(fieldsValue.country)
      //   params.country=fieldsValue.country.name

      // if(fieldsValue.settlementCurrency)
      //   params.settlementCurrency=fieldsValue.settlementCurrency.name


      // if(fieldsValue.qualityRequirements)
      //   params.qualityRequirements=fieldsValue.qualityRequirements.name

      params.typeId = info.typeId;
      if (!isAdd && info.content && info.content.id) {
        let tempFields = { ...fieldsValue };


        const updateCustomer = Object.assign(info.content, { ...tempFields });
        console.log('assign params = ', updateCustomer);
        this.state.updateCustomer = updateCustomer;
        params.id = info.content.id;
        if (params.status === '冻结')
          params.status = 2;
        else if (params.status === '使用中')
          params.status = 1;
        else if (params.status === '草稿')
          params.status = 0;
      }

      dispatch({
        type: 'customer/updateCustomer',
        payload: {
          ...params,
        },
      });


    });
  };


}

export default ClientInfo;
