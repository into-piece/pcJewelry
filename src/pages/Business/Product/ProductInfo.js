import React, { Component } from 'react';
import {
  Card,
  Row,
  Col,
  Icon,
  Form,
  Select,
  Tabs,
  Radio,
  Button,
  Input,
  Divider,
  Modal,
  Breadcrumb,
  message,
  Drawer, Upload,
} from 'antd';
import { connect } from 'dva';

const FormItem = Form.Item;
// const { Option } = Select;
// const { TabPane } = Tabs;
// const RadioButton = Radio.Button;
// const RadioGroup = Radio.Group;

import business from '../business.less';
import listStyles from '../Client/TableList.less';
import clientStyle from '../Client/Client.less';
import baseStyles from '../Client/base.less';
import DescriptionList from '@/components/DescriptionList';
import styles from '../../Account/Center/Center.less';
import JewelryTable from '../Client/components/JewelryTable';
import ProductSearchFrom from './components/ProductSearchFrom';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import BrandListSelect from './components/BrandListSelect';
import Dict from '../Client/components/Dict';
import ProductTypeListSelect from './components/ProductTypeListSelect';
import UnitColorListSelect from './components/UnitColorListSelect';
import PlatingColorListSelect from './components/PlatingColorListSelect';
import TerminalListSelected from './components/TerminalListSelected';

const { Description } = DescriptionList;

const productColumns = [
  {
    title: '客户货号',
    dataIndex: 'customerId',
    key: 'customerId',
  },
  {
    title: '类别名称',
    dataIndex: 'productType',
    key: 'productType',
  },
  {
    title: '颜色',
    dataIndex: 'color',
    key: 'color',
  },
  {
    title: '成色',
    dataIndex: 'productColor',
    key: 'productColor',
  },
  {
    title: '电镀颜色',
    dataIndex: 'platingColor',
    key: 'platingColor',
  },

  // {
  //   title: '客户编号',
  //   dataIndex: 'customerId',
  //   key: 'customerId',
  // },

  {
    title: '客户货号',
    dataIndex: 'custoerProductNo',
    key: 'custoerProductNo',
  },

  {
    title: '供应商编号',
    dataIndex: 'supplierId',
    key: 'supplierId',
  },

  {
    title: '供应商名称',
    dataIndex: 'supplierProductNo',
    key: 'supplierProductNo',
  },


  // {
  //   title: '模具号',
  //   dataIndex: 'mouldNo',
  //   key: 'mouldNo',
  // },
  // {
  //   title: '客户产品描述',
  //   dataIndex: 'productDesc',
  //   key: 'productDesc',
  // },
  // {
  //   title: '产品编号',
  //   dataIndex: 'productNo',
  //   key: 'productNo',
  // },
  // {
  //   title: '类型',
  //   dataIndex: 'productType',
  //   key: 'productType',
  // },
  // {
  //   title: '产品来源',
  //   dataIndex: 'sourceOfProduct',
  //   key: 'sourceOfProduct',
  // },
  // {
  //   title: '规格',
  //   dataIndex: 'specification',
  //   key: 'specification',
  // },

];

const defaultPageSize = 1;

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


class ProductInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rightlg: 16,
      leftlg: 8,
      drawVisible: false,
      isEdit: true,
      visible: false,
      pageCurrent: 1,
      selectProductItem: {},
      selectProductData: [],
      cNoBrandNo: '',
      cNofCode: '',
      cNoUnitCode: '',
      cNoColorCode: '',
      productNo: '',
      cNoCustomerCombine: '',


    };
  }

  centerFormLayout = {
    labelCol: { span: 12 },
    wrapperCol: {
      span: 24,
    },
  };


  resetParse = () => {
    this.setState({
      cNoBrandNo: '',
      cNofCode: '',
      cNoUnitCode: '',
      cNoColorCode: '',
      productNo: '',
      cNoCustomerCombine: '',
      customerShotName:'',
    });
  };

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'product/fetchListProduct',
      payload: { size: defaultPageSize },
    });
    // router.replace('/business/client/emptyView');
  }


  render() {
    const { leftlg, rightlg, drawVisible, visible,update } = this.state;
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


    if (isUpdate) {
      this.state.update = true;
      if (productUpdateloading) {
        this.state.isUpdateFrom = true;
      }
    } else {
      console.log(" upload date ",update,body)
      if (update) {

        // console.log('code '+body.rtnCode)
        if (body.rtnCode === '000000') {
          this.state.requestState = 'success';
          message.success(body.rtnMsg);
        } else {
          message.error(body.rtnMsg);
          this.state.requestState = 'error';
        }
        // this.handleDone();

        this.state.update = false;
        if (this.state.isUpdateFrom) {
          this.state.isUpdateFrom = false;
          // this.state.showItem = { ...current };
        }
      }
    }

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
                  // onSelectItem={(item, rows) => {
                  //   this.setState({
                  //     selectProductItem: item,
                  //     selectProductData: rows,
                  //   });
                  // }}
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
          width={800}
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

    const { showItem, isEdit } = this.state;


    return (<div className={business.right_info}>
      <div className={business.list_info}>

      <span className={business.title_info} onClick={this.clickToggleDrawer}>
            产品
          </span>
        <Divider className={business.divder}/>
        <div className={baseStyles.content}>
          <div className={baseStyles.right_info}>
            {showItem ? (
              <div>
                <DescriptionList size="small" col="1">
                  <Description term="名称">{showItem.name}</Description>
                  <Description term="编号">{showItem.productNo}</Description>
                  <Description term="类别">{showItem.productType}</Description>
                  <Description term="重量">{showItem.finishedWeight}</Description>
                  <Description term="工价">{showItem.createTime}</Description>
                </DescriptionList>
                <span className={business.title_info}>
            参数详情
          </span>
                <Divider className={business.divder}/>
                <DescriptionList size="small" col="2">
                  <Description term="颜色">{showItem.color}</Description>
                  <Description term="单位件数">{showItem.unitOfMeasurement}</Description>
                  <Description term="报价重量">{showItem.finishedWeight}</Description>
                  <Description term="成色重量">{showItem.weight}</Description>
                  <Description term="电镀">{showItem.productNo}</Description>
                  <Description term="成色">{showItem.productNo}</Description>
                  <Description term="产品来源">{showItem.sourceOfProduct}</Description>
                  <Description term="模具">{showItem.mouldNo}</Description>
                  <Description term="客户货号">{showItem.customerId}</Description>
                  <Description term="客户">{showItem.custoer}</Description>
                  <Description term="供应商货号">{showItem.supplierId}</Description>
                  <Description term="供应商">{showItem.supplierProductNo}</Description>
                  <Description term="品牌">{showItem.brand}</Description>
                </DescriptionList>
                <span className={business.title_info}>
            备注
          </span>
                <Divider className={business.divder}/>
              </div>
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
                  审批
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

  handleSubmit = () => {

    const { dispatch, form } = this.props;
    const { showItem, isAdd } = this.state;
    form.validateFields((err, fieldsValue) => {

      if (err) {
        return;

      }
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
      this.setState({
        visible: false,
      });
    });


  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  handleNewProduct = () => {
    this.resetParse();
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

  pageProductChange = (page, pageSize) => {

  };
  clickToggleDrawer = () => {
    const { drawVisible } = this.state;

    if (!drawVisible) this.showDrawer();

  };

  showDrawer = () => {
    this.setState({
      drawVisible: true,
    });
  };

  parseProductNo = () => {
    const { cNoColorCode = '', cNoBrandNo = '', cNofCode = '', cNoUnitCode = '', cNoCustomerCombine = '' } = this.state;
    const { form: { setFieldsValue } } = this.props;
    const productNo = cNoBrandNo + cNofCode + '-' + cNoUnitCode + cNoColorCode + cNoCustomerCombine;
    this.setState({
      productNo,
    });
    setFieldsValue({
      productNo,
    });
    // setFieldsValue('productNo', productNo);

  };

  onClose = () => {
    this.setState({
      drawVisible: false,
    });
  };


  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  getProductModalContent = () => {

    const handleChange = info => {

      let fileList = [...info.fileList];

      const file = info.file;


      if (file.type) {
        const isJPG = file.type.indexOf('image') != -1;
        if (!isJPG) {
          message.error('只能上传图片格式的文件');
          return;
        }
      }

      fileList = fileList.slice(-10);
      fileList = fileList.map(file => {
        // console.log('image is the ', file);
        if (file.response) {
          file.url = file.response.url;
        }
        if (!file.url) {
          this.getBase64(file.originFileObj, imageUrl => {
            fileList.forEach((v, i) => {
              if (v.uid === info.file.uid) {
                fileList[i].url = imageUrl;
                // console.log("change file name =  ", v.name, info.file)
                this.setState({
                  fileList,
                  cropperVisible: true,
                  uploadFile: imageUrl,
                  uploadFileUid: v.uid,
                });
              }
            });
          });
        }

        return file;
      });

      this.setState({ fileList });
    };


    const { form: { getFieldDecorator } } = this.props;
    const { current = {}, productNo, customerShotName = '' } = this.state;

    // if(productNo)
    //   setFieldsValue({
    //     productNo
    //   })

    return (
      <div className={clientStyle.list_info}>
        <span className={business.sun_title_info}>类型</span>
        <Divider className={business.divder}/>
        <Form
          size={'small'}
          labelAlign="left"
          layout="inline"
          className={clientStyle.from_content}
          onSubmit={this.handleContactsSubmit}
        >
          <Row gutter={2}>
            <Col lg={6} md={6} sm={6} xs={6}>
              <FormItem
                label="产品编号"
                className={business.from_content_col}
                {...this.centerFormLayout}
              >
                {getFieldDecorator('productNo', {
                  rules: [{ required: true, message: '请输入姓名' }],
                  initialValue: current.productNo,
                  // })(<text>系统自动生成</text>)}
                })(<Input placeholder="自动生成编号"
                          readOnly={true}
                />)}
              </FormItem>
            </Col>
            <Col lg={6} md={6} sm={6} xs={6}>
              <FormItem
                label="中文名称"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('zhName', {
                  rules: [{ required: true, message: '请输入中文名称' }],
                  initialValue: current.mouldNo,
                })(<Input placeholder="请输入"/>)}
              </FormItem>
            </Col>

            <Col lg={6} md={6} sm={6} xs={6}>
              <FormItem
                label='英文名称'
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('enName', {
                  rules: [{ required: true, message: '请输入英文名称' }],
                  initialValue: current.productDesc,
                })(<Input placeholder="请输入"/>)}
              </FormItem>
            </Col>

            <Col lg={6} md={6} sm={6} xs={6}>
              <FormItem
                label="产品来源"{...this.centerFormLayout} className={business.from_content_col}>
                {getFieldDecorator('sourceOfProduct', {
                  rules: [{ required: true, message: '请输入产品来源' }],
                  initialValue: current.sourceOfProduct,
                })(<Dict dict="H005"  defaultValue="工厂" content={current.sourceOfProduct} placeholder="请输入"/>)}
              </FormItem>
            </Col>
          </Row>

          <Row>

            <Col lg={6} md={6} sm={6} xs={6}>
              <FormItem
                label="品牌"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('brand', {
                  rules: [{ required: true, message: '请输入品牌' }],
                  initialValue: current.brand,
                })
                (<BrandListSelect
                  placeholder="请输入"
                  onSelect={(v) => {
                    if (v.brandNo) {
                      this.state.cNoBrandNo = v.brandNo;
                      this.parseProductNo();
                    }
                  }
                  }
                  content={current.brand}
                />)
                }
              </FormItem>
            </Col>

            <Col lg={6} md={6} sm={6} xs={6}>
              <FormItem
                label="类别"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('productType', {
                  initialValue: current.productType,
                  rules: [{ required: true, message: '请输入类别' }],
                })(<ProductTypeListSelect
                  content={current.productType}
                  onSelect={(v) => {
                    if (v.fCode) {
                      this.state.cNofCode = v.fCode;
                      this.parseProductNo();
                    }
                  }
                  }/>)}
              </FormItem>
            </Col>
            <Col lg={6} md={6} sm={6} xs={6}>
              <FormItem
                label="模具号"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('mouldNo', {
                  rules: [{ message: '请输入' }],
                  initialValue: current.mouldNo,
                })(<Input placeholder="请输入"/>)}
              </FormItem>
            </Col>
            <Col lg={6} md={6} sm={6} xs={6}>
              <FormItem
                label="成色"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('productColor', {
                  rules: [{ required: true, message: '请输入成色' }],
                  initialValue: current.productColor,
                })(<Input placeholder="请输入"/>)}
              </FormItem>
            </Col>
          </Row>

          <Row>

            <Col lg={6} md={6} sm={6} xs={6}>
              <FormItem
                label='宝石颜色'
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('gemColor', {
                  rules: [{ required: true, message: '请输入宝石颜色' }],
                  initialValue: current.gemColor,
                })(<UnitColorListSelect
                  placeholder="请输入"
                  onSelect={(v) => {
                    if (v.unitCode) {
                      this.state.cNoUnitCode = v.unitCode;
                      this.parseProductNo();
                    }
                  }
                  }
                />)}
              </FormItem>
            </Col>

            <Col lg={6} md={6} sm={6} xs={6}>
              <FormItem
                label="电镀颜色"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('platingColor', {
                  rules: [{ required: true, message: '请输入电镀颜色' }],
                  initialValue: current.platingColor,
                })(<PlatingColorListSelect
                  placeholder="请输入"
                  onSelect={(v) => {
                    if (v.colorCode) {
                      this.state.cNoColorCode = v.colorCode;
                      this.parseProductNo();
                    }
                  }}
                />)}
              </FormItem>
            </Col>
            <Col lg={6} md={6} sm={6} xs={6}>
              <FormItem
                label='规格'
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('specification', {
                  rules: [{ message: '请输入规格' }],
                  initialValue: current.specification,
                })(<Input placeholder="请输入"/>)}
              </FormItem>
            </Col>
            <Col lg={6} md={6} sm={6} xs={6}>
              <FormItem
                label="计量单位"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('unitOfMeasurement', {
                  rules: [{ message: '请输入计量单位' }],
                  initialValue: current.unitOfMeasurement,
                })(<Input placeholder="请输入"/>)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col lg={6} md={6} sm={6} xs={6}>
              <FormItem
                label="重量单位"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('unitOfWeight', {
                  rules: [{ message: '请输入' }],
                  initialValue: current.unitOfWeight,
                })(<Input placeholder="请输入"/>)}
              </FormItem>
            </Col>
            <Col lg={6} md={6} sm={6} xs={6}>
              <FormItem
                label="成品重量"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('finishedWeight', {
                  rules: [{ message: '请输入规格' }],
                  initialValue: current.finishedWeight,
                })(<Input placeholder="请输入"/>)}
              </FormItem>
            </Col>
            <Col lg={6} md={6} sm={6} xs={6}>
              <FormItem
                label="产品描述"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('productDesc', {
                  rules: [{ message: '请输入规格' }],
                  initialValue: current.productDesc,
                })(<Input placeholder="请输入"/>)}
              </FormItem>
            </Col>

            <Col lg={6} md={6} sm={6} xs={6}>
              <FormItem
                label="备注"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('marks', {
                  rules: [{ required: true, message: '请输入备注' }],
                  initialValue: current.marks,
                })(<Input placeholder="请输入"/>)}
              </FormItem>
            </Col>
          </Row>

          <Row>

            <Col lg={12} md={12} sm={12} xs={12}>
              <FormItem
                label=''
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                <Upload
                  accept='image/*'
                  name='avatar'
                  beforeUpload={() => {
                    return false;
                  }}
                  listType='picture-card'
                  fileList={this.state.fileList ? this.state.fileList : []}
                  onChange={handleChange}
                >
                  <div>
                    <Icon type={this.state.loading ? 'loading' : 'plus'}/>
                    <div className="ant-upload-text">上传图片</div>
                  </div>
                </Upload>
              </FormItem>
            </Col>

          </Row>
        </Form>
        <span className={business.sun_title_info}>客户信息</span>
        <Divider className={business.divder}/>
        <Form
          size='small'
          labelAlign='left'
          layout='inline'
          className={business.from_content}
        >
          <Row>

            <Col lg={8} md={8} sm={8} xs={8}>
              <FormItem
                label='客户编号'
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('customerId', {
                  rules: [{ required: true, message: '请输入客户编号' }],
                  initialValue: current.customerId,
                })(<TerminalListSelected
                  content={current.customerId}
                  onSelectEndName={(file, customerCombine) => {

                    if (file && customerCombine) {
                      // console.log('end name ', file);
                      this.setState({
                        customerShotName: customerCombine,

                      });

                      // setFieldsValue({
                      //   customerShotName: customerCombine,
                      // });

                      this.state.cNoCustomerCombine = file + '-' + customerCombine,
                        this.parseProductNo();
                    }
                  }}
                />)}
              </FormItem>
            </Col>

            <Col lg={8} md={8} sm={8} xs={8}>
              <FormItem
                label="客户简称"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('customerShotName', {
                  rules: [{ message: '请输入客户简称' }],
                  initialValue: current.customerShotName,
                })(<div>
                  <Input
                    placeholder="请输入"
                    readOnly={true}
                    value={customerShotName ? customerShotName : current.endShotName}
                  />
                </div>)}
              </FormItem>
            </Col>

            <Col lg={8} md={8} sm={8} xs={8}>
              <FormItem
                label='客户货号'
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('custoerProductNo', {
                  rules: [{ message: '请输入货号' }],
                  initialValue: current.custoerProductNo,
                })(<Input placeholder="请输入"/>)}
              </FormItem>
            </Col>
          </Row>
        </Form>
        <span className={business.sun_title_info}>供应商信息</span>
        <Divider className={business.divder}/>
        <Form
          size={'small'}
          labelAlign="left"
          layout="inline"
          className={business.from_content}
        >
          <Row>
            <Col lg={8} md={8} sm={8} xs={8}>
              <FormItem
                label="供应商编号"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('supplierId', {
                  rules: [{ required: true, message: '请输入供应商编号' }],
                  initialValue: current.supplierId,
                })(<Input placeholder="请输入"/>)}
              </FormItem>
            </Col>

            <Col lg={8} md={8} sm={8} xs={8}>
              <FormItem
                label="供应商货号"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('supplierProductNo', {
                  rules: [{ message: '请输入供应商货号' }],
                  initialValue: current.supplierProductNo,
                })(<Input placeholder="请输入"/>)}
              </FormItem>
            </Col>
          </Row>
        </Form>

      </div>
    );
  };

}

export default ProductInfo;
