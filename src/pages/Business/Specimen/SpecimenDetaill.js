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
  Divider,
  Breadcrumb, Carousel, Modal, message, Upload, Spin,
} from 'antd';

import business from '../business.less';
import baseStyles from '../Client/base.less';
import DescriptionList from '@/components/DescriptionList';
import styles from './specimen.less'
import 'cropperjs/dist/cropper.css';
import clientStyle from '../Client/Client.less';
import BrandListSelect from './../Product/components/BrandListSelect';
import ProductTypeSelect from './../Product/components/ProductTypeSelect';
import UnitColorListSelect from './../Product/components/UnitColorListSelect';
import PlatingColorListSelect from './../Product/components/PlatingColorListSelect';
import Dict from '../Client/components/Dict';
import MoldListSelect from './../Product/components/MoldListSelect';
import PercentageSelect from './../Product/components/ProcentageSelect';
import BasicMeasureListSelect from './../Product/components/BasicMeasureListSelect';
import TerminalListSelected from './../Product/components/TerminalListSelected';
import Cropper from 'react-cropper';
import HttpFetch from '../../../utils/HttpFetch';
import Zmage from 'react-zmage';

const { Description } = DescriptionList;
import { connect } from 'dva';
import { getCurrentUser } from '../../../utils/authority';

const FormItem = Form.Item;

@connect(({ specimen, loading }) => {
  const { rtnCode, rtnMsg } = specimen;
  return {
    body: specimen.body,
    rtnCode,
    rtnMsg,
    productListloading: loading.effects['specimen/fetchListSpecimen'],
    productSaveloading: loading.effects['specimen/addSpecimen'],
    productUpdateloading: loading.effects['specimen/updateSpecimen'],
    productDeleteloading: loading.effects['specimen/deleteSpecimen'],
    productFreezeloading: loading.effects['specimen/freezeSpecimen'],
    productUnFreezeloading: loading.effects['specimen/unfreezeSpecimen'],
    queryProductLocking: loading.effects['specimen/querySpecimenLock'],
    updateProductUnLocking: loading.effects['specimen/updateSpecimenUnLock'],
  };
})
@Form.create()
class SpecimenDetaill extends Component {


  centerFormLayout = {
    labelCol: { span: 12 },
    wrapperCol: {
      span: 24,
    },
  };


  carouselsettings = {
    speed: 150,
    initialSlide: 0, // 修改组件初始化时的initialSlide 为你想要的值
  }

  constructor(props) {
    super(props);
    this.state = {
      drawVisible: false,
      visible: false,
      isEdit: true,
      imageObject: [],
      cNoBrandNo: '',
      cNofCode: '',
      cNofCodezhName: '',
      cNoUnitCode: '',
      cNoColorCode: '',
      productNo: '',
      cNoCustomerCombine: '',
      customerShotName: '',
      cNoenNameUniCode: '',
      cNozhNameUniCode: '',
      cNomainMold: '',
      cNoPercentageEnName: '',
      cNoPercentageZhName: '',
      isLoad: false,
      isLoadImage:true,
      productParams:{},
      isEditItem:false,
    };
  }


  componentDidMount() {
    // const { item } = this.props;
    // if (item)
    //   this.fetchImages(item);
  }

  render() {

    const {
      productListloading,
      productUpdateloading,
      productSaveloading,
      productFreezeloading,
      productUnFreezeloading,
      productDeleteloading,
      queryProductLocking,
      body = {},
      isloading,
      refarshList,
      isLoad,
      item,
    } = this.props;

    const { update , isLoadImage,productParams } = this.state;

    // (item)




    let isUpdate =
      productUpdateloading || productSaveloading || productFreezeloading || productDeleteloading ||productUnFreezeloading;

    if (isUpdate) {
      this.state.update = true;
      if (productUpdateloading||productSaveloading) {
        this.state.isUpdateFrom = true;
      }
    } else {
      if (update) {
        if (body.rtnCode === '000000') {
          this.state.requestState = 'success';
          message.success(body.rtnMsg);
        } else {
          message.error(body.rtnMsg);
          this.state.requestState = 'error';
        }

        this.productRefresh()
        // this.handleUpdateImage(productParams)
        this.state.update = false;
        if (this.state.isUpdateFrom) {
          this.state.isUpdateFrom = false;
        }

        if (refarshList)
          refarshList();


      }
    }


    let updat = isUpdate || productListloading;
    if (updat !== this.state.isLoad) {
      if (isloading)
        isloading(updat);
      this.state.isLoad = updat;
    }

    // if(this.state.isLoadImage&&item) {
    //   this.fetchImages(item);
    //   this.state.isLoadImage = false;
    // }

    return this.getDetailInfo();
  }

  resetParse = () => {
    this.setState({
      cNoBrandNo: '',
      cNofCode: '',
      cNoUnitCode: '',
      cNofCodezhName: '',
      cNoColorCode: '',
      productNo: '',
      cNoCustomerCombine: '',
      customerShotName: '',
      cNoenNameUniCode: '',
      cNozhNameUniCode: '',
      cNomainMold: '',
      cNoPercentageEnName: '',
      cNoPercentageZhName: '',
    });
  };

  componentWillReceiveProps(nextProps, nextContext) {
    // const { item } =this.props;
    // const {visible} = this.state;

    const { item } = nextProps;
    const {showItem} = this.state;


    // console.log("componentWillReceiveProps :",item)


    if(item&&(!showItem||item.id!==showItem.id)){
      this.state.showItem = item;
      this.productRefresh()
    }

    if(!item){
      this.state.showItem = false;
      this.setState({
        showItem:false
      })
    }

    // console.log(" component Props ",item)
  }


  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return true;
  }


  getDetailInfo = () => {
    const { imageObject, drawVisible, visible,showItem,isLoading } = this.state;
    const {  isProductUpdate } = this.props;
    const modalFooter = { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };



    let paths = [];

    if (imageObject.length > 0) {
      paths = imageObject.map(v => {
        return v.path;
      });
    }

    // console.log(" fetch isload ",showItem)
    // console.log(" data status ",showItem?showItem.status:'nudefine')

    if (!paths) paths = [];

    return (<div className={business.right_info}>
      <div className={business.list_info}>

      <span className={business.title_info} onClick={this.clickToggleDrawer}>
            新款输入
          </span>
        <Divider className={business.divder}/>

        <div className={baseStyles.content}>
          <div className={baseStyles.right_info}>
            {(showItem && showItem !== '') ? (
              <div>
                <Spin spinning={isLoading}>
                  <Carousel {...this.carouselsettings} className={business.carousel_content} initialSlide={0} autoplay>
                    {this.getImages(paths)}
                  </Carousel>
                  <DescriptionList size="small" col="1">
                    <Description term="名称">{showItem.zhName}</Description>
                    <Description term="编号">{showItem.productNo}</Description>
                    <Description term="类别">{showItem.productTypeName}</Description>
                    <Description term="重量">{showItem.finishedWeight}</Description>
                    <Description term="工价"></Description>
                  </DescriptionList>
                  <span className={business.title_info}>
            参数详情
          </span>
                  <Divider className={business.divder}/>
                  <DescriptionList size="small" col="2">
                    <Description term="颜色">{showItem.gemColorName}</Description>
                    <Description term="单位件数">{showItem.unitOfMeasurementName}</Description>
                    <Description term="报价重量">{showItem.finishedWeight}</Description>
                    <Description term="成色重量">{showItem.unitOfWeightName}</Description>
                    <Description term="电镀">{showItem.platingColorName}</Description>
                    <Description term="成色">{showItem.productColorName}</Description>
                    <Description term="产品来源">{showItem.sourceOfProductName}</Description>
                    <Description term="模具">{showItem.mouldNoName}</Description>
                    <Description term="客户货号">{showItem.custoerProductNo}</Description>
                    <Description term="客户">{showItem.customerNo}</Description>
                    <Description term="供应商货号">{showItem.supplierId}</Description>
                    <Description term="供应商">{showItem.supplierProductNo}</Description>
                    <Description term="品牌">{showItem.brandNo}</Description>
                  </DescriptionList>
                  <span className={business.title_info}>
            备注
          </span>
                  <Divider className={business.divder}/>
                  <DescriptionList size="small" col="1">
                    <Description>{showItem.marks}</Description>
                  </DescriptionList>
                </Spin>
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
                  disabled={!showItem || showItem === '' || !isProductUpdate || showItem.status==='2'}
                >
                  删除
                </Button>
                <Button
                  type="primary"
                  size={'small'}
                  className={business.buttomControl}
                  icon="edit"
                  disabled={!showItem || showItem === '' || !isProductUpdate || showItem.status==='2'}
                  onClick={this.handleEditProduct}
                >
                  编辑
                </Button>
                {
                  showItem&&showItem.status==='2'?<Button
                      className={business.buttomControl}
                      size={'small'}
                      type="danger"
                      icon="unlock"
                      onClick={this.handleUnFreezeProduct}
                      disabled={!showItem || showItem === '' || !isProductUpdate }
                    >
                      取消审批
                    </Button>
                    : <Button
                      className={business.buttomControl}
                      size={'small'}
                      type="primary"
                      icon="lock"
                      disabled={!showItem || showItem === '' || !isProductUpdate}
                      onClick={this.handleFreezeProduct}
                    >
                      审批
                    </Button>
                }

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
            <Modal
              width={1200}
              className={styles.standardListForm}
              destroyOnClose
              visible={visible}
              {...modalFooter}
            >
              {this.getProductModalContent()}
            </Modal>
          </Card>
        </div>

      </div>

    </div>);


  };

  getImages = paths => {
    return paths.map((
      v, // src={v}
    ) => (
      <div className={business.carousel_image_ground}>
        <Zmage
          alt="图片"
          align="center"
          className={styles.carousel_image}
          src={v}
          set={paths.map(image => ({ src: image }))}
        />
      </div>
    ));
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


    const modalCropperFooter = {
      okText: '保存',
      onOk: this.handleCropSubmit,
      onCancel: this.handleCropCancle,
    };

    const { form: { getFieldDecorator, getFieldValue } } = this.props;
    const { current = {}, productNo, customerShotName = '', cropperVisible } = this.state;


    const sourceOfProduct = getFieldValue('sourceOfProduct');
    // const supplierId = getFieldValue("supplierId");
    const productType = getFieldValue('productType');

    return (
      <div className={clientStyle.list_info}>
        <span className={business.sun_title_info}>新款输入</span>
        <Divider className={business.divder}/>
        <Form
          size={'small'}
          labelAlign="left"
          layout="inline"
          className={clientStyle.from_content}
          onSubmit={this.handleContactsSubmit}
        >
          <Row gutter={4}>
            <Col lg={4} md={4} sm={4} xs={4}>
              <FormItem
                label="流水号"
                className={business.from_content_col}
                {...this.centerFormLayout}
              >
                {getFieldDecorator('productNo', {
                  rules: [{ required: true, message: '请输入姓名' }],
                  initialValue: current.productNo,
                  // })(<text>系统自动生成</text>)}
                })(<Input placeholder="自动生成流水号"
                          readOnly={true}
                />)}
              </FormItem>
            </Col>
            <Col lg={4} md={4} sm={4} xs={4}>
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
                    if (v && v.brandNo) {
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
            <Col lg={4} md={4} sm={4} xs={4}>
              <FormItem
                label="类别"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('productType', {
                  initialValue: current.productType,
                  rules: [{ required: true, message: '请输入类别' }],
                })(<ProductTypeSelect
                  content={current.productType}
                  onSelect={(v) => {
                    // console.log(" select  ",v)
                    if (v.zhName) {
                      this.state.cNofCodezhName = v.zhName;
                      this.state.cNofCode = v.fCode;
                      this.parseProductNo();
                    }
                  }
                  }/>)}
              </FormItem>
            </Col>
            <Col lg={4} md={4} sm={4} xs={4}>
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
                  content={current.gemColor}
                  onSelect={(v) => {
                    if (v.unitCode) {
                      this.state.cNoUnitCode = v.unitCode;
                      this.state.cNozhNameUniCode = v.zhName;
                      this.state.cNoenNameUniCode = v.enName;
                      // console.log(' cNozhNameUniCode ', v.zhName,v.enName);
                      this.parseProductNo();

                    }
                  }
                  }
                />)}
              </FormItem>
            </Col>
            <Col lg={4} md={4} sm={4} xs={4}>
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
                  content={current.platingColor}
                />)}
              </FormItem>
            </Col>
            <Col lg={4} md={4} sm={4} xs={4}>
              <FormItem
                label="中文名称"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('zhName', {
                  rules: [{ required: true, message: '请输入中文名称' }],
                  initialValue: current.zhName,
                })(<Input placeholder="自动生成" readOnly={true}/>,
                )}
              </FormItem>
            </Col>
          </Row>

          <Row>


            <Col lg={4} md={4} sm={4} xs={4}>
              <FormItem
                label='英文名称'
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('enName', {
                  rules: [{ required: true, message: '请输入英文名称' }],
                  initialValue: current.enName,
                })(<Input placeholder="自动生成" readOnly={true}
                />)}
              </FormItem>
            </Col>
            <Col lg={4} md={4} sm={4} xs={4}>
              <FormItem
                label='产品来源'{...this.centerFormLayout} className={business.from_content_col}>
                {getFieldDecorator('sourceOfProduct', {
                  rules: [{ required: true, message: '请输入产品来源' }],
                })(<Dict dict="H005" content={current.sourceOfProduct ? current.sourceOfProduct : 'H005001'}
                         placeholder="请输入"/>)}
              </FormItem>
            </Col>
            <Col lg={4} md={4} sm={4} xs={4}>
              <FormItem
                label='模具号'
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('mouldNo', {
                  rules: [{ required: true, message: '请输入' }],
                  initialValue: current.mouldNo,
                })(<MoldListSelect content={current.mouldNo} placeholder="请输入"
                                   onSelect={(v) => {

                                     // console.log(" select mold ",v)
                                     if (v && v.mainMold)
                                       this.state.cNomainMold = v.mainMold;
                                     this.parseProductNo();
                                   }}
                />)}
              </FormItem>
            </Col>
            <Col lg={4} md={4} sm={4} xs={4}>
              <FormItem
                label="成色"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('productColor', {
                  rules: [{ required: true, message: '请输入成色' }],
                  initialValue: current.productColor,
                })(<PercentageSelect
                  placeholder="请输入"
                  content={current.productColor}
                  onSelect={(v) => {
                    if (v.zhName)
                      this.state.cNoPercentageZhName = v.zhName;

                    if (v.enName)
                      this.state.cNoPercentageEnName = v.enName;


                    this.parseProductNo();


                  }}
                />)}
              </FormItem>
            </Col>
            <Col lg={4} md={4} sm={4} xs={4}>
              <FormItem
                label='规格'
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('specification', {
                  rules: [{
                    required: (this.state.cNofCodezhName === '耳环' || this.state.cNofCodezhName === '项链' || this.state.cNofCodezhName === '手链'),
                    message: '请输入规格',
                  }],
                  initialValue: current.specification,
                })(<Input placeholder="请输入"/>)}
              </FormItem>
            </Col>
            <Col lg={4} md={4} sm={4} xs={4}>
              <FormItem
                label="计量单位"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('unitOfMeasurement', {
                  rules: [{ message: '请输入计量单位' }],
                  initialValue: current.unitOfMeasurement,
                })(<BasicMeasureListSelect
                  content={current.unitOfMeasurement ? current.unitOfMeasurement : 'ae32e48c2df27123682943b6effa72d3'}
                  placeholder="请输入"/>)}
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col lg={5} md={5} sm={5} xs={5}>
              <FormItem
                label="重量单位"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('unitOfWeight', {
                  rules: [{ message: '请输入' }],
                  initialValue: current.unitOfWeight,
                })(<BasicMeasureListSelect
                  content={current.unitOfWeight ? current.unitOfWeight : '8ee1cc72791578cfe122f6839487bbbe'}
                  placeholder="请输入"/>)}
              </FormItem>
            </Col>
            <Col lg={5} md={5} sm={5} xs={5}>
              <FormItem
                label="成品重量"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('finishedWeight', {
                  initialValue: current.finishedWeight,
                })(<Input placeholder="请输入"/>)}
              </FormItem>
            </Col>
            <Col lg={5} md={5} sm={5} xs={5}>
              <FormItem
                label="产品描述"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('productDesc', {
                  rules: [{ message: '请输入产品描述' }],
                  initialValue: current.productDesc,
                })(<Input placeholder="请输入"/>)}
              </FormItem>
            </Col>
            <Col lg={5} md={5} sm={5} xs={5}>
              <FormItem
                label="备注"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('marks', {
                  initialValue: current.marks,
                })(<Input placeholder="请输入"/>)}
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col lg={24} md={24} sm={24} xs={24}>
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

        <Form
          size='small'
          labelAlign='left'
          layout='inline'
          className={business.from_content}
        >
          <span className={business.sun_title_info}>客户信息</span>
          <Divider className={business.divder}/>
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

                      this.state.cNoCustomerCombine = customerCombine,
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
          <Modal {...modalCropperFooter} width={740} destroyOnClose visible={cropperVisible}>
            {this.openCutImageModal()}
          </Modal>
        </Form>

        {
          sourceOfProduct === 'H005005' ? <Form
            size={'small'}
            labelAlign="left"
            layout="inline"
            style={{ width: '100%' }}
            className={business.from_content}
          >
            <span className={business.sun_title_info}>供应商信息</span>
            <Divider className={business.divder}/>
            <Row style={{ width: '100%' }}>
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
          </Form> : ''


        }

      </div>
    );
  };

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  handleSubmit = () => {

    const { dispatch, form } = this.props;
    const { isAdd ,fileList,showItem} = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }

      let params = {};
      params.sample={ ...fieldsValue }

      const urls = fileList.map(v => v.url);
      const names = fileList.map(v => v.name);
      params.imgStr = urls;
      // params.imgStr = this.state.urls;
      params.fileName = names;
      // params.productId = item.productNo;
      // params.product = item;
      if (isAdd) {
        dispatch({
          type: 'specimen/addSpecimen',
          payload: {
            ...params,
          },
        });
        //todo

        this.setState({
          isEdit: true,
          update: true,
        });
      } else {
        params.sample.id = showItem.id;
        params.sample.version = showItem.version;
        dispatch({
          type: 'specimen/updateSpecimen',
          payload: {
            ...params,
          },
        });
      }

      this.setState({
        visible: false,
        productParams:params
      });
    });


  };


  handleUpdateImage=(item)=>{
    if(!item.id) return;
    console.log("  save image")
    const { fileList = [] } = this.state;

    const _this = this;
    let params = {};
    const urls = fileList.map(v => v.url);
    const names = fileList.map(v => v.name);
    params.imgStr = urls;
    // params.imgStr = this.state.urls;
    params.fileName = names;
    // params.productId = item.productNo;
    params.sample = item;



    fetch(HttpFetch.saveProductImage, {
      method: 'POST',
      credentials: 'include',
headers: {
        'Content-Type': 'application/json',
        'token': getCurrentUser()?getCurrentUser().token:'',
      },
      body: JSON.stringify(params),
    })
      .then(response => response.json())
      .then(d => {
        const head = d.head;

        if(head.rtnCode!=='000000')
        {
          message.error(head.rtnMsg);
        }

      })
      .catch(function(ex) {
        _this.setState({
          loading: false,
        });
      });
  }


  productRefresh=()=>{

    const item = this.state.showItem;

    const isEditItem = this.state.isEditItem;

    if(!item.id) return;

    const _this = this;
    _this.setState({
      isLoading: true,
    });


    let params = {};
    params.id = item.id;


    fetch(HttpFetch.querySpecimenList, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'token': getCurrentUser()?getCurrentUser().token:'',
      },
      body: JSON.stringify(params),
    })
      .then(response => response.json())
      .then(d => {
        const head = d.head;
        const body = d.body;
        let showItem = false;
        if (body.records.length > 0) {
          showItem = body.records[0];


          const current=isEditItem?{...showItem}:this.state.current;

          // console.log(" cur is ",current,isEditItem)

          this.setState({
            showItem,
            current,
          });
          // console.log(" update data ",showItem)
        }
        this.fetchImages(showItem)

        _this.setState({
          isLoading: false,
        });


      })
      .catch(function(ex) {
        _this.setState({
          isLoading: false,
        });
      });
  }

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
      fileList: [],
      isEditItem:false,
    });
  };

  handleEditProduct = () => {
    const { item } = this.props;
    this.resetParse();
    const { imageObject } = this.state;
    this.parseImages(imageObject)

    this.setState({
      current: item,
      visible: true,
      isAdd: false,
      fileList: this.state.fileList,//测试真实数据重接口获取
      isEditItem:true
    });

    this.state.isEditItem = true;
    this.productRefresh();
  };



  parseImages = item => {
    let fileList = [];
    if (item) {
      fileList = item.map(v => ({
        uid: v.id,
        name: v.fileName,
        status: 'done',
        url: v.path,
      }));
      this.state.imageUrl = item.map(v => {
        return v.path;
      });
      this.state.fileName = item.map(v => {
        return v.fileName;
      });
    } else {
      this.state.imageUrl = [];
      this.state.fileName = [];
    }
    // console.log("parse file list ",this.state.fileList,this.state.fileName,item)
    // console.log('upload edit list ',fileList)
    this.state.fileList = fileList;
    // this.setState({
    //   fileList,
    // });
  };

  handleDeleteProduct = () => {
    const { selectProductData } = this.props;


    const ids = selectProductData.map(v => {
      return v.id;
    });

    const { dispatch } = this.props;


    dispatch({
      type: 'specimen/deleteSpecimen',
      payload: { list: ids },
    });

    this.setState({
      isEdit: true,
      showItem:false,
    });
  };

  handleUnFreezeProduct = () => {

    const { selectProductData=[] } = this.props;
    const ids = selectProductData.map(v => {
      return v.id;
    });

    // console.log(" freeze ",ids)

    const { dispatch } = this.props;
    const data = [];
    // data.push(selectedRowKeys);

    dispatch({
      type: 'specimen/unfreezeSpecimen',
      payload: { list: ids },
    });
  };

  handleFreezeProduct = () => {

    const { selectProductData=[] } = this.props;
    const ids = selectProductData.map(v => {
      return v.id;
    });

    // console.log(" freeze ",ids)

    const { dispatch } = this.props;
    // data.push(selectedRowKeys);

    dispatch({
      type: 'specimen/freezeSpecimen',
      payload: { list: ids },
    });
  };


  openCutImageModal = () => {

    const { uploadFile } = this.state;

    return (
      <div className={baseStyles.cropper_view}>
        <Cropper
          ref="cropper"
          src={uploadFile}
          className={baseStyles.cropper}
          style={{ height: 400 }}
          preview=".img-preview"
          cropBoxResizable={false}
          viewMode={1} //定义cropper的视图模式
          zoomable={true} //是否允许放大图像
          guides={true}
          background={true}
          aspectRatio={800 / 800}
          // crop={this.crop}
        />
        <div className={styles.cropper_preview}>
          <div className="img-preview" style={{ width: '100%', height: '100%' }}/>
        </div>
      </div>
    );
  };

  fetchImages = item => {
    const _this = this;
    let params = {};
    params.productId = item.id;
    fetch(HttpFetch.queryProductImage, {
      method: 'POST',
      credentials: 'include',
headers: {
        'Content-Type': 'application/json',
        'token': getCurrentUser()?getCurrentUser().token:'',
      },
      body: JSON.stringify(params),
    })
      .then(response => response.json())
      .then(d => {
        const body = d.body;
        if (body && body.records) {
          if (body.records.length > 0) {
            const imageObject = body.records;
            this.state.imageObject = imageObject;
            _this.setState({
              imageObject,
              loading: false,
            });
            return;
          }
        }
        _this.setState({
          loading: false,
          imageObject:[],
        });
      })
      .catch(function(ex) {
        console.log('parsing failed', ex);
        _this.setState({
          loading: false,
        });
      });
    // }
  };

  handleCropSubmit = () => {
    const { uploadFileUid, fileList } = this.state;

    const cropImage = this.refs.cropper.getCroppedCanvas().toDataURL();

    fileList.forEach((v, i) => {
      if (v.uid === uploadFileUid) {
        fileList[i].name = 'crop' + Date.parse(new Date()) + fileList[i].name;
        fileList[i].url = cropImage;
        fileList[i].thumbUrl = cropImage;
        // console.log("set file url ",cropImage)
      }
    });

    this.setState({
      cropperVisible: false,
      fileList,
      cropImage,
    });
  };

  handleCropCancle = () => {
    this.setState({
      cropperVisible: false,
      cropImage: '',
      uploadFileUid: '',
    });
  };

  handleCropDone = () => {
    console.log('handleCropDone');
    this.setState({
      cropperVisible: false,
      cropImage: '',
      uploadFileUid: '',
    });
  };

  parseProductNo = () => {
    const { cNoColorCode = '', cNoBrandNo = '', cNofCode = '', cNofCodezhName = '', cNoUnitCode = '', cNoCustomerCombine = '', cNomainMold = '', cNozhNameUniCode, cNoenNameUniCode, cNoPercentageZhName = '', cNoPercentageEnName = '' } = this.state;
    const { form: { setFieldsValue } } = this.props;
    const showMold = cNomainMold !== '' ? cNomainMold.substr(2, cNomainMold.length) : '';
    // console.log(" showMold ",cNomainMold,showMold)
    const productNo = cNoBrandNo + cNofCode + '-' + showMold + cNoUnitCode + cNoColorCode + cNoCustomerCombine;
    const zhName = cNoPercentageZhName + cNozhNameUniCode + cNofCodezhName;
    const enName = cNoPercentageEnName + cNoenNameUniCode + cNofCode;
    //成色+宝石颜色+类别
    this.setState({
      productNo,
      zhName,
      enName,
    });
    setFieldsValue({
      productNo,
      zhName,
      enName,
    });

    // setFieldsValue('productNo', productNo);

  };


}

export default SpecimenDetaill;
