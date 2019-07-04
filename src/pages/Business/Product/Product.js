import React, { Component } from 'react';
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
  Switch,
  Divider,
  Modal,
  Breadcrumb,
  message,
  Drawer,
} from 'antd';
import { connect } from 'dva';

const FormItem = Form.Item;
const { Option } = Select;
const { TabPane } = Tabs;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

import business from '../business.less';
import listStyles from '../Client/TableList.less';
import clientStyle from '../Client/Client.less';
import baseStyles from '../Client/base.less';
import DescriptionList from '@/components/DescriptionList';
import router from 'umi/router';
import styles from '../../Account/Center/Center.less';
import JewelryTable from '../Client/components/JewelryTable';
import ProductSearchFrom from './components/ProductSearchFrom';

const { Description } = DescriptionList;

const productColumns = [
  {
    title: '客户货号',
    dataIndex: 'custoerProductNo',
    key: 'custoerProductNo',
  },
  {
    title: '模具号',
    dataIndex: 'mouldNo',
    key: 'mouldNo',
  },
  {
    title: '客户产品描述',
    dataIndex: 'productDesc',
    key: 'productDesc',
  },
  {
    title: '产品编号',
    dataIndex: 'productNo',
    key: 'productNo',
  },
  {
    title: '类型',
    dataIndex: 'productType',
    key: 'productType',
  },
  {
    title: '产品来源',
    dataIndex: 'sourceOfProduct',
    key: 'sourceOfProduct',
  },
  {
    title: '规格',
    dataIndex: 'specification',
    key: 'specification',
  },

];

const  defaultPageSize=1

@Form.create()
@connect(({ product, loading }) => {
  const { rtnCode, rtnMsg } = product;
  return {
    body: product.body,
    rtnCode,
    rtnMsg,
    productListloading: loading.effects['product/fetchListProduct'],
    productSaveloading: loading.effects['product/addProduct'],
    productUpdateloading: loading.effects['product/updateProduct'],
    productDeleteloading: loading.effects['product/deleteProduct'],
    productFreezeloading: loading.effects['product/freezeProduct'],
  };
})


class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rightlg: 16,
      leftlg: 8,
      drawVisible: false,
      isEdit:true,
      visible:false,
      pageCurrent:1,
      selectProductItem:{},
      selectProductData:[],

    };
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'product/fetchListProduct',
      payload: { size: defaultPageSize },
    });
    // router.replace('/business/client/emptyView');
  }


  render() {
    const { leftlg, rightlg, drawVisible,visible } = this.state;
    const modalFooter = { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };

    const {
      productListloading,
      productUpdateloading,
      productSaveloading,
      productFreezeloading,
      productDeleteloading,
      body = {},
    } = this.props;


    let isUpdate =
      productUpdateloading || productSaveloading || productFreezeloading || productDeleteloading;

    return (
      <div className={business.page}>
        <div className={business.nav}>
          <Breadcrumb style={{ display: 'none' }}>
            <Breadcrumb.Item>主页</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">业务</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="#/business/product">产品信息</a>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className={business.center_content}>
          <Row gutter={24}>
            <Col lg={rightlg} md={24}>
              <Card bordered={false} className={business.left_content} loading={false}>
                <div style={{ marginBottom: 16 }}/>
                <ProductSearchFrom/>
                <JewelryTable
                  onSelectItem={(item, rows) => {
                    this.setState({
                      selectProductItem: item,
                      selectProductData: rows,
                    });
                  }}
                  loading={productListloading || isUpdate}
                  columns={productColumns}
                  body={body.data}
                  pageChange={this.pageProductChange}
                />


              </Card>
            </Col>
            <Col lg={leftlg} md={24}>
              {this.getDetailInfo()}
            </Col>
          </Row>
        </div>
        <Drawer width={720} onClose={this.onClose} visible={drawVisible}>
          {this.getDetailInfo()}
        </Drawer>
        <Modal
          width={640}
          className={styles.standardListForm}
          destroyOnClose
          visible={visible}
          {...modalFooter}
        >
          {this.getProductModalContent()}
        </Modal>
      </div>

    );
  }

  getDetailInfo = () => {

    const { showItem ,isEdit} = this.state;


    return (<div className={business.right_info}>
      <div className={business.list_info}>

      <span className={business.title_info} onClick={this.clickToggleDrawer}>
            产品
          </span>
        <Divider className={business.divder}/>
        <div className={baseStyles.content}>
          <div className={baseStyles.right_info}>
            {showItem ? (
              <DescriptionList size="small" col="1">
                <Description term="英文名">{showItem.enName}</Description>
                <Description term="中文名">{showItem.zhName}</Description>
                <Description term="创建日期">{showItem.createTime}</Description>
              </DescriptionList>
            ) : (
              <div/>
            )}
          </div>

          <Card bodyStyle={{ paddingLeft: 5, paddingRight: 5, paddingTop: 5, paddingBottom: 5 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                flexDirection: 'column',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Button
                  type="primary"
                  icon="plus"
                  className={business.buttomControl}
                  size={'small'}
                  onClick={this.handleNewProduct}
                >
                  新增
                </Button>
                <Button
                  type="danger"
                  icon="delete"
                  className={business.buttomControl}
                  size={'small'}
                  onClick={this.handleDeleteProduct}
                  disabled={isEdit}
                >
                  删除
                </Button>
                <Button
                  type="primary"
                  size={'small'}
                  className={business.buttomControl}
                  icon="edit"
                  disabled={isEdit}
                  onClick={this.handleEditProduct}
                >
                  编辑
                </Button>
                <Button
                  className={business.buttomControl}
                  size={'small'}
                  type="primary"
                  icon="lock"
                  disabled={isEdit}
                  onClick={this.handleFreezeProduct}
                >
                  冻结
                </Button>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  paddingTop: 10,
                }}
              >
                <Button
                  className={business.buttomControl}
                  type="primary"
                  size={'small'}
                  icon="copy"
                  disabled
                >
                  复制
                </Button>
                <Button
                  className={business.buttomControl}
                  size={'small'}
                  type="primary"
                  icon="rollback"
                  disabled
                >
                  撤销
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

    </div>);
  };

  handleSubmit=()=>{

    const { dispatch, form } = this.props;
    const { showItem, isAdd } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (isAdd) {
        dispatch({
          type: 'product/addProduct',
          payload: {
            ...fieldsValue,
          },
        });

        this.setState({
          showItem: false,
          selectedRowKeys: '',
          isEdit: true,
          update: true,
        });
      } else {
        const temp = { ...fieldsValue };
        const data = { ...showItem };


        this.state.current = { ...data };
        dispatch({
          type: 'product/updateProduct',
          payload: {
            ...data,
          },
        });
      }
    });

    this.setState({
      visible:false
    })
  }

  handleCancel=()=>{
    this.setState({
      visible:false
    })
  }

  handleNewProduct = () => {
    this.setState({
      visible: true,
      isAdd: true,
      current: {},
    });
  };

  handleEditProduct = () => {
    const { showItem } = this.state;

    this.setState({
      current: showItem,
      visible: true,
      isAdd: false,
    });
  };

  handleDeleteProduct = () => {
    const { selectedRowKeys } = this.state;

    const { dispatch } = this.props;
    const data = [];
    data.push(selectedRowKeys);

    dispatch({
      type: 'client/deleteClient',
      payload: { list: selectedRowKeys },
    });

    this.setState({
      selectedRowKeys: '',
      showItem: false,
      isEdit: true,
      pageCurrent: 1,
      rowData: [],
      contactsTableBody: [],
      contactsItem: '',
      rowSelectedData: [],
      customerSelectedRowKeys: '',
      selectCustomerItem: '',
    });
  };

  handleFreezeProduct = () => {
    const { selectedRowKeys } = this.state;

    const { dispatch } = this.props;
    const data = [];
    data.push(selectedRowKeys);

    dispatch({
      type: 'client/deleteClient',
      payload: { list: selectedRowKeys },
    });

    this.setState({
      selectedRowKeys: '',
      showItem: false,
      isEdit: true,
      pageCurrent: 1,
      rowData: [],
      contactsTableBody: [],
      contactsItem: '',
      rowSelectedData: [],
      customerSelectedRowKeys: '',
      selectCustomerItem: '',
    });
  };

  pageProductChange =(page,pageSize)=>{

  }
  clickToggleDrawer = () => {
    const { drawVisible } = this.state;

    if (!drawVisible) this.showDrawer();

  };

  showDrawer = () => {
    this.setState({
      drawVisible: true,
    });
  };

  onClose = () => {
    this.setState({
      drawVisible: false,
    });
  };
  getProductModalContent = () => {

    const { form: { getFieldDecorator } } = this.props;
    const { current = {} } = this.state;

    return (
      <div>
        <span className={business.sun_title_info}>类型</span>
        <Divider className={business.divder}/>
        <Form
          size={'small'}
          labelAlign="left"
          layout="inline"
          className={business.from_content}
          onSubmit={this.handleContactsSubmit}
        >
          <Row>
            <Col lg={8} md={8} sm={8} xs={8}>
              <FormItem
                label="客户货号"
                className={business.from_content_col}
              >
                {getFieldDecorator('custoerProductNo', {
                  rules: [{ required: true, message: '请输入姓名' }],
                  initialValue: current.custoerProductNo,
                })(<Input placeholder="请输入"/>)}
              </FormItem>
            </Col>
            <Col lg={8} md={8} sm={8} xs={8}>
              <FormItem
                label="模具号"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('mouldNo', {
                  rules: [{ required: true, message: '请输入手机' }],
                  initialValue: current.mouldNo,
                })(<Input placeholder="请输入"/>)}
              </FormItem>
            </Col>

            <Col lg={8} md={8} sm={8} xs={8}>
              <FormItem
                label="客户产品描述"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('productDesc', {
                  rules: [{ message: '请输入电话' }],
                  initialValue: current.productDesc,
                })(<Input placeholder="请输入"/>)}
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col lg={8} md={8} sm={8} xs={8}>
              <FormItem
                label="产品编号"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('productNo', {
                  rules: [
                    {
                      message: '请输入正确邮箱格式',
                    },
                  ],
                  initialValue: current.productNo,
                })(<Input type="email" placeholder="请输入"/>)}
              </FormItem>
            </Col>
            <Col lg={8} md={8} sm={8} xs={8}>
              <FormItem
                label="类型"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('productType', {
                  rules: [{ message: '请输入类型' }],
                  initialValue: current.productType,
                })(<Input  placeholder="请输入"/>)}
              </FormItem>
            </Col>

            <Col lg={8} md={8} sm={8} xs={8}>
              <FormItem
                label="产品来源"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('sourceOfProduct', {
                  rules: [{ message: '请输入微信' }],
                  initialValue: current.sourceOfProduct,
                })(<Input placeholder="请输入"/>)}
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col lg={8} md={8} sm={8} xs={8}>
              <FormItem
                label="规格"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('specification', {
                  rules: [{ message: '请输入规格' }],
                  initialValue: current.specification,
                })(<Input placeholder="请输入"/>)}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    );
  };

}

export default Product;
