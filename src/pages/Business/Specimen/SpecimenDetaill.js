import React, { Component } from 'react';
import {
  Card,
  Row,
  Col,
  Icon,
  Form,
  Button,
  Input,
  Divider,
  Carousel,
  Modal,
  message,
  Upload,
  Spin,
} from 'antd';
import { formatMessage } from 'umi/locale';
import ModalConfirm from '@/utils/modal';
import BuildTitle from '@/components/BuildTitle';

import business from '../business.less';
import baseStyles from '../Client/base.less';
import DescriptionList from '@/components/DescriptionList';
import styles from './specimen.less';
import 'cropperjs/dist/cropper.css';
import clientStyle from '../Client/Client.less';
import BrandListSelect from '../Product/components/BrandListSelect';
import ProductTypeSelect from '../Product/components/ProductTypeSelect';
import UnitColorListSelect from '../Product/components/UnitColorListSelect';
import PlatingColorListSelect from '../Product/components/PlatingColorListSelect';
import Dict from '../Client/components/Dict';
import MoldListSelect from '../Product/components/MoldListSelect';
import PercentageSelect from '../Product/components/ProcentageSelect';
import BasicMeasureListSelect from '../Product/components/BasicMeasureListSelect';
import TerminalListSelected from '../Product/components/TerminalListSelected';
import Cropper from 'react-cropper';
import HttpFetch from '../../../utils/HttpFetch';
import Zmage from 'react-zmage';
import { connect } from 'dva';
import { getCurrentUser } from '../../../utils/authority';
import moment from 'moment';
import classNames from 'classnames';
import UploadImg from '@/components/UploadImg';
import { defaultImages } from '@/utils/utils';
import ProductForm from '@/pages/Business/Specimen/components/ProductForm';

const { Description } = DescriptionList;

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
    transferProductLoading: loading.effects['specimen/transferProduct'],
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
  };

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
      customerShotName: '',
      cNoenNameUniCode: '',
      cNozhNameUniCode: '',
      cNomainMold: '',
      cNoPercentageEnName: '',
      cNoPercentageZhName: '',
      isLoad: false,
      isLoadImage: true,
      productParams: {},
      isEditItem: false,
      showItem: {},
      swiProductvisible:false
    };
  }

  componentDidMount() {
    // const { item } = this.props;
    // if (item)
    //   this.fetchImages(item);
  }

  resetParse = () => {
    this.setState({
      cNoBrandNo: '',
      cNofCode: '',
      cNoUnitCode: '',
      cNofCodezhName: '',
      cNoColorCode: '',
      productNo: '',
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
    const { showItem } = this.state;

    // console.log("componentWillReceiveProps :",item)

    if (item && (!showItem || item.id !== showItem.id)) {
      this.state.showItem = item;
      this.productRefresh();
    }

    if (!item) {
      this.state.showItem = false;
      this.setState({
        showItem: false,
      });
    }

    // console.log(" component Props ",item)
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return true;
  }

  getDetailInfo = () => {
    const { imageObject, drawVisible, visible, showItem, isLoading, isAdd ,swiProductvisible} = this.state;
    const { isProductUpdate, productUpdateloading, productSaveloading } = this.props;
    const isBomStatus = (showItem.bomStatus==='2' && showItem.turnProductStatus === '0');
    const cancel = (showItem.status === '2' && showItem.bomStatus === '0');

    const modalFooter = isAdd
      ? [
          <Button key="back" onClick={this.handleCancel}>
            取消
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={productSaveloading}
            onClick={() => {
              this.handleSubmit(true);
            }}
          >
            保存
          </Button>,
          <Button
            key="continue"
            type="primary"
            loading={productSaveloading}
            onClick={() => {
              this.handleSubmit(false);
              this.parseProductNo2();
            }}
          >
            继续添加
          </Button>,
        ]
      : [
          <Button key="back" onClick={this.handleCancel}>
            取消
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={productUpdateloading}
            onClick={() => {
              this.handleSubmit(false);
            }}
          >
            保存
          </Button>,
        ];

    return (
      <div className={business.right_info}>
        <div className={business.list_info}>
          <div className={baseStyles.content}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              <div>
                <div
                  style={{
                    padding: '20px 20px 10px',
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: '#35B0F4',
                  }}
                >
                  {formatMessage({ id: 'menu.erp.business.specimen' })}
                </div>
                <Divider className={styles.divder} />
              </div>
              <Card bordered={false} style={{ overflow: 'auto' }}>
                {showItem && showItem !== '' ? (
                  <div>
                    <Spin spinning={isLoading}>
                      <Carousel
                        key={showItem.id}
                        {...this.carouselsettings}
                        className={business.carousel_content}
                        initialSlide={0}
                        autoplay
                      >
                        {this.getImages(
                          showItem.pictures &&
                            (showItem.pictures.length === 0 ? defaultImages : showItem.pictures)
                        )}
                      </Carousel>
                      {showItem.pictures && showItem.pictures.length > 0 && <Divider />}
                      <DescriptionList size="small" col="1">
                        <Description term="名称">{showItem.zhName}</Description>
                        <Description term="编号">{showItem.productNo}</Description>
                        <Description term="类别">{showItem.productTypeName}</Description>
                        <Description term="成品重量">{showItem.finishedWeight}</Description>
                        {/* <Description term="工价" /> */}
                      </DescriptionList>
                      <div className={business.title_info}>参数详情</div>
                      <Divider className={business.divder} style={{marginTop:10}}/>
                      <DescriptionList size="small" col="2">
                        <Description term="颜色">{showItem.gemColorName}</Description>
                        <Description term="单位件数">{showItem.unitOfMeasurementName}</Description>
                        {/* <Description term="报价重量">{showItem.finishedWeight}</Description> */}
                        {/* <Description term="成色重量">{showItem.unitOfWeightName}</Description> */}
                        <Description term="电镀">{showItem.platingColorName}</Description>
                        <Description term="成色">{showItem.productColorName}</Description>
                        <Description term="产品来源">{showItem.sourceOfProductName}</Description>
                        <Description term="客户货号">{showItem.customerProductNo}</Description>
                        <Description term="客户">{showItem.customerNo}</Description>
                        <Description term="供应商货号">{showItem.supplierId}</Description>
                        <Description term="供应商">{showItem.supplierProductNo}</Description>
                        <Description term="品牌">{showItem.brandNo}</Description>
                      </DescriptionList>
                      <div className={business.title_info}>备注</div>
                      <Divider className={business.divder} style={{marginTop:10}}/>
                      <DescriptionList size="small" col="1">
                        <Description>{showItem.marks}</Description>
                      </DescriptionList>
                      <Divider className={business.divder} style={{marginTop:10}}/>
                      <DescriptionList size="small" col="1">
                        <Description>{showItem.marks}</Description>
                        <Description term="新增人">{showItem.createUser}</Description>
                        <Description term="新增时间">{showItem.createTime}</Description>
                        <Description term="修改人">{showItem.modifier}</Description>
                        <Description term="修改时间">{showItem.mtime}</Description>
                      </DescriptionList>
                    </Spin>
                  </div>
                ) : (
                  <div />
                )}
              </Card>
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
                    size="small"
                    onClick={this.handleNewProduct}
                  >
                    新增
                  </Button>
                  <Button
                    type="danger"
                    icon="delete"
                    className={business.buttomControl}
                    size="small"
                    onClick={() => {
                      ModalConfirm({
                        content: '确定删除吗？',
                        onOk: () => {
                          this.handleDeleteProduct();
                        },
                      });
                    }}
                    disabled={
                      !showItem || showItem === '' || !isProductUpdate || showItem.status === '2'
                    }
                  >
                    删除
                  </Button>
                  <Button
                    type="primary"
                    size="small"
                    className={business.buttomControl}
                    icon="edit"
                    disabled={
                      !showItem || showItem === '' || !isProductUpdate || showItem.status === '2'
                    }
                    onClick={this.handleEditProduct}
                  >
                    编辑
                  </Button>
                  {showItem && showItem.status === '2' ? (
                    <Button
                      className={business.buttomControl}
                      size="small"
                      type="danger"
                      icon="unlock"
                      onClick={() => {
                        ModalConfirm({
                          content: '确定取消审批吗？',
                          onOk: () => {
                            this.handleUnFreezeProduct();
                          },
                        });
                      }}
                      // disabled={!showItem || showItem === '' || !isProductUpdate||isBomStatus}
                      disabled={!cancel}
                    >
                      取消审批
                    </Button>
                  ) : (
                    <Button
                      className={business.buttomControl}
                      size="small"
                      type="primary"
                      icon="lock"
                      disabled={!showItem || showItem === '' || !isProductUpdate}
                      onClick={() => {
                        ModalConfirm({
                          content: '确定审批吗？',
                          onOk: () => {
                            this.handleFreezeProduct();
                          },
                        });
                      }}
                    >
                      审批
                    </Button>
                  )}
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
                    size="small"
                    icon="copy"
                    disabled={
                      !showItem || showItem === '' || !isProductUpdate
                    }
                    onClick={this.handleCopySpecimen}
                  >
                    复制
                  </Button>
                  <Button
                    className={business.buttomControl}
                    size="small"
                    type="primary"
                    icon="rollback"
                    disabled
                  >
                    撤销
                  </Button>
                  <Button
                    className={business.buttomControl}
                    size="small"
                    type="primary"
                    icon="retweet"
                    disabled={!isBomStatus||!showItem || showItem === '' || !isProductUpdate}
                    onClick={() => {
                      this.setState({
                        swiProductvisible:true
                      })
                    }}
                  >
                    转产品
                  </Button>
                </div>
              </div>
              <Modal
                title={
                  <BuildTitle
                    title={
                      this.state.done ? null : formatMessage({ id: 'menu.erp.business.specimen' })
                    }
                  />
                }
                maskClosable={false}
                width={1200}
                className={styles.standardListForm}
                destroyOnClose
                visible={visible}
                footer={modalFooter}
                onCancel={this.handleCancel}
                bodyStyle={{ padding: '28px 0 0' }}
              >
                {this.getProductModalContent()}
              </Modal>

                 <ProductForm
                   title='转产品'
                   visible={swiProductvisible}
                   submit={this.handleSwiProductSave}
                   cancle={this.handleSwiProductCancle}
                 />
            </Card>
          </div>
        </div>
      </div>
    );
  };

  getImages = pictures => {
    const images = pictures && pictures.flatMap(e => e.picPath || e);
    if (!images) return;
    return images.map(v => (
      <div className={styles.carousel_image_ground} key={`as${Math.random(1)}`}>
        <Zmage
          alt="图片"
          align="center"
          className={styles.carousel_image}
          src={v}
          edge={20}
          set={images.map(image => ({ src: image, style: { minWidth: 800, minHeight: 800 } }))}
        />
      </div>
    ));
  };

  getProductModalContent = () => {
    const handleChange = info => {
      let fileList = [...info.fileList];

      const { file } = info;

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

    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;
    const { current = {}, productNo, customerShotName = '', cropperVisible } = this.state;

    const sourceOfProduct = getFieldValue('sourceOfProduct');
    // const supplierId = getFieldValue("supplierId");
    const productType = getFieldValue('productType');

    return (
      <div className={clientStyle.list_info}>
        <Form
          size="small"
          labelAlign="left"
          layout="inline"
          className={styles.standardListForm}
          onSubmit={this.handleContactsSubmit}
        >
          <div className={classNames('adddevModal', styles.maxline)}>
            <FormItem label="流水号" {...this.centerFormLayout}>
              {getFieldDecorator('productNo', {
                rules: [{ required: true, message: '请输入流水号' }],
                initialValue: current.productNo?current.productNo:`${moment().format('YYYYMMDDHHmmssSS')}`,
              })(<Input placeholder="自动生成流水号" readOnly />)}
            </FormItem>
          </div>
          <div className="adddevModal">
            <FormItem label="品牌" {...this.centerFormLayout}>
              {getFieldDecorator('brand', {
                rules: [{ required: true, message: '请输入品牌' }],
                initialValue: current.brand,
              })(
                <BrandListSelect
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  style={{ width: 180 }}
                  placeholder="请输入"
                  // onSelect={v => {
                  //   if (v && v.brandNo) {
                  //     this.parseProductNo();
                  //   }
                  // }}
                  content={current.brand}
                />
              )}
            </FormItem>
          </div>
          <div className="adddevModal">
            <FormItem label="类别" {...this.centerFormLayout}>
              {getFieldDecorator('productType', {
                initialValue: current.productType,
                rules: [{ required: true, message: '请输入类别' }],
              })(
                <ProductTypeSelect
                  content={current.productType}
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  style={{ width: 180 }}
                  onSelect={v => {
                    // console.log(" select  ",v)
                    if (v.zhName) {
                      this.state.cNofCodezhName = v.zhName;
                      this.state.cNofCode = v.unitCode;
                      this.parseProductNo();
                    }
                  }}
                />
              )}
            </FormItem>
          </div>
          <div className="adddevModal">
            <FormItem label="宝石颜色" {...this.centerFormLayout}>
              {getFieldDecorator('gemColor', {
                rules: [{ required: true, message: '请输入宝石颜色' }],
                initialValue: current.gemColor,
              })(
                <UnitColorListSelect
                  placeholder="请输入"
                  content={current.gemColor}
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  style={{ width: 180 }}
                  onSelect={v => {
                    if (v.unitCode) {
                      this.state.cNoUnitCode = v.unitCode;
                      this.state.cNozhNameUniCode = v.zhName;
                      this.state.cNoenNameUniCode = v.enName;
                      // console.log(' cNozhNameUniCode ', v.zhName,v.enName);
                      this.parseProductNo();
                    }
                  }}
                />
              )}
            </FormItem>
          </div>

          <div className={classNames('adddevModal', styles.maxline)}>
            <FormItem label="电镀颜色" {...this.centerFormLayout}>
              {getFieldDecorator('platingColor', {
                rules: [{ required: true, message: '请输入电镀颜色' }],
                initialValue: current.platingColor,
              })(
                <PlatingColorListSelect
                  placeholder="请输入"
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  style={{ width: 1040 }}
                  onSelect={v => {
                    if (v.colorCode) {
                      this.state.cNoColorCode = v.colorCode;
                      this.parseProductNo();
                    }
                  }}
                  content={current.platingColor}
                />
              )}
            </FormItem>
          </div>

          <div className="adddevModal">
            <FormItem label="中文名称" {...this.centerFormLayout}>
              {getFieldDecorator('zhName', {
                rules: [{ required: true, message: '请输入中文名称' }],
                initialValue: current.zhName,
              })(<Input placeholder="自动生成" readOnly />)}
            </FormItem>
          </div>
          <div className="adddevModal">
            <FormItem label="英文名称" {...this.centerFormLayout}>
              {getFieldDecorator('enName', {
                rules: [{ required: true, message: '请输入英文名称' }],
                initialValue: current.enName,
              })(<Input placeholder="自动生成" readOnly />)}
            </FormItem>
          </div>




          <div className="adddevModal">
            <FormItem label="产品来源" {...this.centerFormLayout}>
              {getFieldDecorator('sourceOfProduct', {
                rules: [{ required: true, message: '请输入产品来源' }],
              })(
                <Dict
                  dict="H005"
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  style={{ width: 180 }}
                  content={current.sourceOfProduct ? current.sourceOfProduct : 'H005001'}
                  placeholder="请输入"
                />
              )}
            </FormItem>
          </div>
          <div className="adddevModal">
            <FormItem label="成色" {...this.centerFormLayout}>
              {getFieldDecorator('productColor', {
                rules: [{ required: true, message: '请输入成色' }],
                initialValue: current.productColor,
              })(
                <PercentageSelect
                  placeholder="请输入"
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  style={{ width: 180 }}
                  content={current.productColor}
                  onSelect={v => {
                    if (v.zhName) this.state.cNoPercentageZhName = v.zhName;

                    if (v.enName) this.state.cNoPercentageEnName = v.enName;

                    this.parseProductNo();
                  }}
                />
              )}
            </FormItem>
          </div>
          <div className="adddevModal">
            <FormItem label="规格" {...this.centerFormLayout}>
              {getFieldDecorator('specification', {
                rules: [
                  {
                    required:
                      this.state.cNofCodezhName === '耳环' ||
                      this.state.cNofCodezhName === '项链' ||
                      this.state.cNofCodezhName === '手链',
                    message: '请输入规格',
                  },
                ],
                initialValue: current.specification,
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </div>
          <div className="adddevModal">
            <FormItem label="计量单位" {...this.centerFormLayout}>
              {getFieldDecorator('unitOfMeasurement', {
                rules: [{ message: '请输入计量单位' }],
                initialValue: current.unitOfMeasurement,
              })(
                <BasicMeasureListSelect
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  style={{ width: 180 }}
                  content={
                    current.unitOfMeasurement
                      ? current.unitOfMeasurement
                      : 'ae32e48c2df27123682943b6effa72d3'
                  }
                  placeholder="请输入"
                />
              )}
            </FormItem>
          </div>
          <div className="adddevModal">
            <FormItem label="重量单位" {...this.centerFormLayout}>
              {getFieldDecorator('unitOfWeight', {
                rules: [{ message: '请输入' }],
                initialValue: current.unitOfWeight,
              })(
                <BasicMeasureListSelect
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  style={{ width: 180 }}
                  content={
                    current.unitOfWeight ? current.unitOfWeight : '8ee1cc72791578cfe122f6839487bbbe'
                  }
                  placeholder="请输入"
                />
              )}
            </FormItem>
          </div>
          <div className="adddevModal">
            <FormItem label="成品重量" {...this.centerFormLayout}>
              {getFieldDecorator('finishedWeight', {
                initialValue: current.finishedWeight,
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </div>
          <div className={classNames('adddevModal', styles.maxline)}>
            <FormItem label="产品描述" {...this.centerFormLayout}>
              {getFieldDecorator('productDesc', {
                rules: [{ message: '请输入产品描述' }],
                initialValue: current.productDesc,
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </div>
          <div className={classNames('adddevModal', styles.maxline)}>
            <FormItem label="备注" {...this.centerFormLayout}>
              {getFieldDecorator('marks', {
                initialValue: current.marks,
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </div>

          <Row>
            <div className="adddevModal">
              <FormItem label="上传图片" {...this.centerFormLayout}>
                <UploadImg
                  key="uimg"
                  defaultFileList={this.state.fileList ? this.state.fileList : []}
                  fileListFun={imglist => {
                    this.setState({ fileList: imglist });
                  }}
                />
              </FormItem>
            </div>
          </Row>
        </Form>

        <Form size="small" labelAlign="left" layout="inline"  className={styles.standardListForm} style={{width:'100%'}}>
          <span className={business.sun_title_info}>客户信息</span>
          <Divider className={business.divder} />
          <Row>
            <div className="adddevModal">
              <FormItem label="客户编号" {...this.centerFormLayout}>
                {getFieldDecorator('customerId', {
                  rules: [{ required: true, message: '请输入客户编号' }],
                  initialValue: current.customerId,
                })(
                  <TerminalListSelected
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    style={{ width: 180 }}
                    content={current.customerId}
                    onSelectEndName={(v,no,name) => {
                      // debugger
                      this.setState(
                        {
                          customerNo: no,
                          customerShotName:name
                        },
                        () => {
                          this.parseProductNo();
                        }
                      );
                    }}
                  />
                )}
              </FormItem>
            </div>

            <div className="adddevModal">
              <FormItem label="客户简称" {...this.centerFormLayout}>
                {getFieldDecorator('customerShotName', {
                  rules: [{ message: '请输入客户简称' }],
                  initialValue: current.customerShotName,
                })(
                  <div>
                    <Input
                      placeholder="请输入"
                      readOnly
                      value={customerShotName || current.endShotName}
                    />
                  </div>
                )}
              </FormItem>
            </div>

            <div className="adddevModal">
              <FormItem label="客户货号" {...this.centerFormLayout}>
                {getFieldDecorator('customerProductNo', {
                  rules: [{ message: '请输入货号' }],
                  initialValue: current.customerProductNo,
                })(<Input placeholder="请输入" />)}
              </FormItem>
            </div>
          </Row>
          <Modal
            maskClosable={false}
            width={740}
            okText='保存'
            onOk={this.handleCropSubmit}
            onCancel={this.handleCropCancle}
            destroyOnClose
            visible={cropperVisible}
          >
            {this.openCutImageModal()}
          </Modal>
        </Form>

        {sourceOfProduct === 'H005005' ? (
          <Form
            size="small"
            labelAlign="left"
            layout="inline"
            style={{ width: '100%' }}
            className={business.from_content}
          >
            <span className={business.sun_title_info}>供应商信息</span>
            <Divider className={business.divder} />
            <Row style={{ width: '100%' }}>
              <div className="adddevModal">
                <FormItem label="供应商编号" {...this.centerFormLayout}>
                  {getFieldDecorator('supplierId', {
                    rules: [{ required: true, message: '请输入供应商编号' }],
                    initialValue: current.supplierId,
                  })(<Input placeholder="请输入" />)}
                </FormItem>
              </div>

              <div className="adddevModal">
                <FormItem label="供应商货号" {...this.centerFormLayout}>
                  {getFieldDecorator('supplierProductNo', {
                    rules: [{ message: '请输入供应商货号' }],
                    initialValue: current.supplierProductNo,
                  })(<Input placeholder="请输入" />)}
                </FormItem>
              </div>
            </Row>
          </Form>
        ) : (
          ''
        )}
      </div>
    );
  };

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  handleSubmit = close => {
    const { dispatch, form } = this.props;
    const { isAdd, fileList, showItem } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }

      const params = {};
      params.sample = { ...fieldsValue };

      // const urls = fileList.map(v => v.url);
      // const names = fileList.map(v => v.name);
      const filelistArr = fileList.flatMap(e => e.url);
      // params.imgStr = urls;
      // // params.imgStr = this.state.urls;
      // params.fileName = names;
      // params.productId = item.productNo;
      // params.product = item;

      params.picPath = filelistArr;
      if (isAdd) {
        dispatch({
          type: 'specimen/addSpecimen',
          payload: {
            ...params,
          },
          callback: () => {
            this.setState({
              visible: !close,
            });
          },
        });

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
          callback: () => {
            this.setState({
              visible: !close,
            });
          },
        });
      }

      this.setState({
        productParams: params,
      });
    });
  };

  handleUpdateImage = item => {
    if (!item.id) return;
    console.log('  save image');
    const { fileList = [] } = this.state;

    const _this = this;
    const params = {};
    const filelistArr = fileList.flatMap(e => e.url);
    params.picPath = filelistArr;

    params.sample = item;

    fetch(HttpFetch.saveProductImage, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        token: getCurrentUser() ? getCurrentUser().token : '',
      },
      body: JSON.stringify(params),
    })
      .then(response => response.json())
      .then(d => {
        const { head } = d;

        if (head.rtnCode !== '000000') {
          message.error(head.rtnMsg);
        }
      })
      .catch(function(ex) {
        _this.setState({
          loading: false,
        });
      });
  };

  productRefresh = () => {
    const item = this.state.showItem;

    const { isEditItem } = this.state;

    if (!item.id) return;

    const _this = this;
    _this.setState({
      isLoading: true,
    });

    const params = {};
    params.id = item.id;

    fetch(HttpFetch.querySpecimenList, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        token: getCurrentUser() ? getCurrentUser().token : '',
      },
      body: JSON.stringify(params),
    })
      .then(response => response.json())
      .then(d => {
        const { head } = d;
        const { body } = d;
        let showItem = false;
        if (body.records.length > 0) {
          showItem = body.records[0];

          const current = isEditItem ? { ...showItem } : this.state.current;

          // console.log(" cur is ",current,isEditItem)

          this.setState({
            showItem,
            current,
          });
          // console.log(" update data ",showItem)
        }
        // this.fetchImages(showItem);

        _this.setState({
          isLoading: false,
        });
      })
      .catch(function(ex) {
        _this.setState({
          isLoading: false,
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
      fileList: [],
      isEditItem: false,
    });
  };

  handleEditProduct = () => {
    const { item } = this.props;
    this.resetParse();
    this.setState({
      current: item,
      visible: true,
      isAdd: false,
      fileList: this.state.showItem.pictures, // 测试真实数据重接口获取
      isEditItem: true,
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
      showItem: false,
    });
  };

  handleUnFreezeProduct = () => {
    const { selectProductData = [] } = this.props;
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
    const { selectProductData = [] } = this.props;
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

  handleCopySpecimen = () => {
    const { item } = this.props;

    this.resetParse();

    this.setState({
      current: item,
      visible: true,
      isAdd:true,
      fileList: this.state.showItem.pictures, // 测试真实数据重接口获取
      isEditItem: false,
    });

    this.state.isEditItem = true;
    this.productRefresh();
  };

  handleTransferProduct = (modalNo) => {
    const { selectProductData = [] } = this.props;
    const ids = selectProductData.map(v => {
      return v.id;
    });
    const item = selectProductData[0];
    const parmas ={
      id:item.id,
      mould:modalNo.mould
    }
    // console.log(' handleTransferProduct ', item, modalNo,parmas);
    const { dispatch } = this.props;
    dispatch({
      type: 'specimen/transferProduct',
      payload: parmas,
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
          viewMode={0} // 定义cropper的视图模式
          zoomable // 是否允许放大图像
          guides
          background
          aspectRatio={800 / 800}
          // crop={this.crop}
        />
        <div className={styles.cropper_preview}>
          <div className="img-preview" style={{ width: '100%', height: '100%' }} />
        </div>
      </div>
    );
  };

  fetchImages = item => {
    const _this = this;
    const params = {};
    params.productId = item.id;
    fetch(HttpFetch.queryProductImage, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        token: getCurrentUser() ? getCurrentUser().token : '',
      },
      body: JSON.stringify(params),
    })
      .then(response => response.json())
      .then(d => {
        const { body } = d;
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
          imageObject: [],
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
        fileList[i].name = `crop${Date.parse(new Date())}${fileList[i].name}`;
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

  handleSwiProductSave=(modal)=>{
    this.handleTransferProduct(modal);
    this.setState({
      swiProductvisible:false
    })
  }

  handleSwiProductCancle=()=>{
    this.setState({
      swiProductvisible:false
    })
  }

  handleCropDone = () => {
    this.setState({
      cropperVisible: false,
      cropImage: '',
      uploadFileUid: '',
    });
  };

  parseProductNo = () => {
    const {
      cNofCode = '',
      cNofCodezhName = '',
      customerNo='',
      cNomainMold = '',
      cNozhNameUniCode,
      cNoenNameUniCode,
      cNoPercentageZhName = '',
      cNoPercentageEnName = '',
    } = this.state;
    const {
      form: { setFieldsValue ,getFieldValue},
    } = this.props;
    let productNo;
    const newProduct = getFieldValue("productNo");

    if(customerNo){
      if (newProduct.split("-").length === 2) {
        productNo = `${customerNo}-${newProduct.split("-")[1]}`;
      }else if(newProduct.split("-").length === 1){
        productNo = `${customerNo}-${newProduct}`;
      }
    }else{
      productNo = newProduct;
    }
    const zhName = `${cNoPercentageZhName} ${cNozhNameUniCode} ${cNofCodezhName}`;
    const enName = `${cNoPercentageEnName} ${cNoenNameUniCode} ${cNofCode}`;
    // 成色+宝石颜色+类别
    this.setState({
      zhName,
      enName,
      productNo,

    });
    setFieldsValue({
      zhName,
      enName,
      productNo,
    });
  };

  parseProductNo2 = () => {
    const { customerNo } = this.state;
    const {
      form: { setFieldsValue },
    } = this.props;
    const productNo = `${customerNo}-${moment().format('YYYYMMDDHHmmssSS')}`;
    this.setState({
      productNo,
    });
    setFieldsValue({
      productNo,
    });
  };

  render() {
    const {
      productListloading,
      productUpdateloading,
      productSaveloading,
      productFreezeloading,
      productUnFreezeloading,
      productDeleteloading,
      queryProductLocking,
      transferProductLoading,
      body = {},
      isloading,
      refarshList,
      isLoad,
      item,
    } = this.props;

    const { update, isLoadImage, productParams } = this.state;

    // (item)

    const isUpdate =
      productUpdateloading ||
      productSaveloading ||
      productFreezeloading ||
      transferProductLoading ||
      productDeleteloading ||
      productUnFreezeloading;

    if (isUpdate) {
      this.state.update = true;
      if (productUpdateloading || productSaveloading) {
        this.state.isUpdateFrom = true;
      }
    } else if (update) {
      if (body.rtnCode === '000000') {
        this.state.requestState = 'success';
        message.success(body.rtnMsg);
      } else {
        message.error(body.rtnMsg);
        this.state.requestState = 'error';
      }

      this.productRefresh();
      // this.handleUpdateImage(productParams)
      this.state.update = false;
      if (this.state.isUpdateFrom) {
        this.state.isUpdateFrom = false;
      }

      if (refarshList) refarshList();
    }

    const updat = isUpdate || productListloading;
    if (updat !== this.state.isLoad) {
      if (isloading) isloading(updat);
      this.state.isLoad = updat;
    }

    // if(this.state.isLoadImage&&item) {
    //   this.fetchImages(item);
    //   this.state.isLoadImage = false;
    // }

    return this.getDetailInfo();
  }
}

export default SpecimenDetaill;
