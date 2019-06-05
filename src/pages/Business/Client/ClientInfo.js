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

import DescriptionList from '@/components/DescriptionList';
import clientStyle from './Client.less';

const FormItem = Form.Item;
const { Description } = DescriptionList;
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

@Form.create()
class ClientInfo extends PureComponent {


  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }


  componentWillMount() {

    console.log(Object.keys(this.props.location.query));

  }

  render() {


    const { visible } = this.state;


    const modalFooter = this.state.done
      ? { footer: null, onCancel: this.handleDone }
      : { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };

    return (<div className={styles.content}>
      <div className={styles.right_info}>

        <DescriptionList size='small' col='2'>
          <Description size="small" term='客户编号'>8009</Description>
          <Description size="small" term='客户简称'>App</Description>
          <Description size="small" term='国别'>Thailand</Description>
          <Description term='城市'>Bangkok</Description>
          <Description term='英文名'>Jewelry Prncess</Description>
          <Description term='中文名'>陈先生</Description>
          <Description term='客户渠道'>展览会</Description>
        </DescriptionList>
        <DescriptionList size='small' col='1'>
          <Description term='英文地址'>53/11-12 Narathiwat Ratchanakharin Rd Thun Mahamek ,Sathorn 10120</Description>
        </DescriptionList>
        <DescriptionList size='small' col='2'>
          <Description term='电话'></Description>
          <Description term='公司网站'></Description>
          <Description term='结算币种'>USD</Description>
          <Description term='品质质量'></Description>
          <Description term='客户报价系数'>10%</Description>
          <Description term='送货方式'></Description>
          <Description term='预付款比例'>30%</Description>
        </DescriptionList>
        <span className={styles.title_info}>备注</span>
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
                    size={'small'}>新增</Button>
            <Button className={clientStyle.buttomControl} type="danger" icon="delete" size={'small'}
            >删除</Button>
            <Button className={clientStyle.buttomControl} type="primary" size={'small'}
                    icon="edit">编辑</Button>
            <Button className={clientStyle.buttomControl} size={'small'} type="primary" icon="lock"
            >冻结</Button>
          </div>


          <div
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingTop: 10 }}>
            <Button className={clientStyle.buttomControl} type="primary" size={'small'}
                    icon="copy">复制</Button>
            <Button className={clientStyle.buttomControl} size={'small'} type="primary" icon="rollback"
            >撤销</Button>
          </div>
        </div>

      </Card>

      </div>);;
      }


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

        const {form: {getFieldDecorator}} = this.props;

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

      };

      handleSubmit = () => {

      };

      }

      export default ClientInfo;
