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
  Select,
  Carousel, Modal, message, Upload, Spin,
  Table,
  notification,
} from 'antd';
import { formatMessage } from 'umi/locale';
import classNames from 'classNames';
import ModalConfirm from '@/utils/modal';
import BuildTitle from '@/components/BuildTitle';
import business from '../business.less';
import baseStyles from '../Client/base.less';
import DescriptionList from '@/components/DescriptionList';
import styles from './product.less';
import 'cropperjs/dist/cropper.css';
import clientStyle from '../Client/Client.less';
import BrandListSelect from './components/BrandListSelect';
import ProductTypeSelect from './components/ProductTypeSelect';
import UnitColorListSelect from './components/UnitColorListSelect';
import PlatingColorListSelect from './components/PlatingColorListSelect';
import Dict from '../Client/components/Dict';
import MoldListSelect from './components/MoldListSelect';
import PercentageSelect from './components/ProcentageSelect';
import BasicMeasureListSelect from './components/BasicMeasureListSelect';
import TerminalListSelected from './components/TerminalListSelected';
import Cropper from 'react-cropper';
import HttpFetch from '../../../utils/HttpFetch';
import Zmage from 'react-zmage';
import { connect } from 'dva';
import { getCurrentUser } from '../../../utils/authority';
import batchUpdateArr from './config.json';
import UploadImg from '@/components/UploadImg';
import { queryListWordbook } from '@/services/api'; // 产品来源
import servicesConfig from '@/services/business';
// 客户编号 产品来源 模具号
const { productBatchUpdate } = servicesConfig;
const {
  queryBrands,
  queryproductDropDown2,
  queryProductMaterial,
  queryunitColor,
  queryPlatingColor,
  queryTerminalNoList,
  queryMstWordList,
  queryMoldList,// 模具号
  queryMeasureUniList, // 数量单位
} = HttpFetch;
const componentArr = {
  brand: BrandListSelect,
  productType: ProductTypeSelect,
  productColor: PercentageSelect,
  gemColor: UnitColorListSelect,
  platingColor: PlatingColorListSelect,
  customerId: TerminalListSelected,
  sourceOfProduct: Dict,
  mouldNo: MoldListSelect,
  unitOfMeasurement: BasicMeasureListSelect,
  unitOfWeight: BasicMeasureListSelect,
};
const fetchArr = [
  {
    key: 'brand',
    value: queryBrands,
    type: 1,
    key1: 'brandZhName',
    value1: 'brandNo',
    zhName:'brandZhName',
    enName:'brandEnName'
  },
  {
    key: 'productType',
    value: queryproductDropDown2,
    value1: 'unitCode',
  },
  {
    key: 'productColor',
    value: queryProductMaterial,
    value1: 'productMaterial',
  },
  {
    key: 'gemColor',
    value: queryunitColor,
    value1: 'unitCode',
  },
  {
    key: 'platingColor',
    value: queryPlatingColor,
    value1: 'colorCode',
  },
  {
    key: 'customerId',
    value: queryTerminalNoList,
    key1: 'customerNo',
    value1: 'customerCombine'
  },
  {
    key: 'sourceOfProduct',
    value: queryMstWordList,
    key1: 'wordbookContentZh',
    value1: 'wordbookCode',
    zhName:'wordbookContentZh',
    enName:'wordbookContentEn'
  },
  {
    key: 'unitOfMeasurement',
    value: queryMeasureUniList,
  },
  {
    key: 'unitOfWeight',
    value: queryMeasureUniList,
  },
];
const { Option } = Select;
const { Description } = DescriptionList;
const FormItem = Form.Item;
const { TextArea, Search } = Input;
// productColorName,gemColor,platingColor,customerId
const columnsArr = {
  productColorName: [
    {
      title: '编号',
      dataIndex: 'productNo',
      key: 'productNo',
      render: data => (data),
    },
    {
      title: '中文名',
      dataIndex: 'zhName',
      key: 'zhName',
      render: data => (data),
    },
  ],
  gemColor: [
    {
      title: '编号',
      dataIndex: 'productNo',
      key: 'productNo',
      render: data => (data),
    },
    {
      title: '中文名',
      dataIndex: 'zhName',
      key: 'zhName',
      render: data => (data),
    },
  ],
  platingColor: [
    {
      title: '编号',
      dataIndex: 'productNo',
      key: 'productNo',
      render: data => (data),
    },
    {
      title: '中文名',
      dataIndex: 'zhName',
      key: 'zhName',
      render: data => (data),
    },
  ],
  customerId: [
    {
      title: '编号',
      dataIndex: 'productNo',
      key: 'productNo',
      render: data => (data),
    },
    {
      title: '中文名',
      dataIndex: 'zhName',
      key: 'zhName',
      render: data => (data),
    },
  ],
};

@Form.create()
@connect(({ product, loading }) => {
  const { rtnCode, rtnMsg } = product;
  return {
    body: product.body,
    product,
    rtnCode,
    rtnMsg,
    productListloading: loading.effects['product/fetchListProduct'],
    productSaveloading: loading.effects['product/addProduct'],
    productUpdateloading: loading.effects['product/updateProduct'],
    productDeleteloading: loading.effects['product/deleteProduct'],
    productFreezeloading: loading.effects['product/freezeProduct'],
    productUnFreezeloading: loading.effects['product/unfreezeProduct'],
    queryProductLocking: loading.effects['product/queryProductLock'],
    updateProductUnLocking: loading.effects['product/updateProductUnLock'],
  };
})
class ProductDetail extends Component {

  state = {
    drawVisible: false,
    visible: false,
    isEdit: true,
    imageObject: [],
    cNoBrandNo: '',
    productType: '',
    cNofCodezhName: '',
    gemColor: '',
    platingColor: '',
    productNo: '',
    cNoCustomerCombine: '',
    customerShotName: '',
    cNoenNameUniCode: '',
    cNozhNameUniCode: '',
    mouldNo: '',
    cNoPercentageEnName: '',
    cNoPercentageZhName: '',
    isLoad: false,
    isLoadImage: true,
    productParams: {},
    isEditItem: false,
    batchUpdateShow: false,
    nowData : {
      brand: [],
      productType: [], 
      productColor: [],
      gemColor: [],
      platingColor: [],
      customerId: [],
      sourceOfProduct: [],
      unitOfMeasurement: [],
      unitOfWeight: [],
      finishedWeight: [],
      mouldNo: [],
    }
  };

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

  resetParse = () => {
    this.setState({
      cNoBrandNo: '',
      productType: '',
      cNofCodezhName: '',
      gemColor: '',
      platingColor: '',
      productNo: '',
      cNoCustomerCombine: '',
      customerShotName: '',
      cNoenNameUniCode: '',
      cNozhNameUniCode: '',
      mouldNo: '',
      productColor: '',
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

  getData = (paramsProps) => {
    const { value } = paramsProps
    const params = {}
    fetch(value, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'token': getCurrentUser() ? getCurrentUser().token : '',
      },
      body: JSON.stringify(params),
    })
      .then(response => response.json())
      .then(d => {
        const { body } = d;
        if (body && body.records) {
          // const selectItem = body.records.filter(v =>(v.id === content);
          if (body.records && body.records.length > 0) {
            this.props.dispatch({
              type: `product/changeList`,
              payload: { ...paramsProps, value: body.records },
            });
          }
        }
      });
  };

  batchUpdate = () => {
    fetchArr.forEach(item => {
      this.getData(item);
    });

    this.setState({
      batchUpdateShow: true,
    });
  };

  // 更改table select数组
  onSelectChange = (selectedRowKeys, value) => {
    console.log(selectedRowKeys, '==========selectedRowKeys');
    this.props.dispatch({
      type: 'product/changeState',
      payload: { key: `${value}Keys`, value: selectedRowKeys },
    });
  };

  onSearch = (v, type) => {

  };

  returnStyle = (v) => {
    if (v === 'marks') return { width: 1200 };
    return {};
  };

  handleImageChange = info => {
    let fileImgList = [...info.fileList];
    const { file } = info;

    if (file.type) {
      const isJPG = file.type.indexOf('image') != -1;
      if (!isJPG) {
        message.error('只能上传图片格式的文件');
        return;
      }
    }

    fileImgList = fileImgList.slice(-10).map(file => {
      // console.log('image is the ', file);
      if (file.response) {
        file.url = file.response.url;
      }
      if (!file.url) {
        this.getBase64(file.originFileObj, imageUrl => {
          fileImgList.forEach((v, i) => {
            if (v.uid === info.file.uid) {
              fileImgList[i].url = imageUrl;
              // console.log("change file name =  ", v.name, info.file)
              this.setState({
                fileImgList,
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

    this.setState({ fileImgList });
  };

  // 批量新增
  getBatchUpdat = () => {
    const { getList } = this;
    const {
      selectKey,
      product,
      form: { getFieldDecorator, getFieldValue },
    } = this.props;

    const sourceOfProduct = getFieldValue('sourceOfProduct');
    return (
      <Form size="small">
        {
          batchUpdateArr.map(({ key, value, noNeed, type, list, readOnly, placeholder, initialValue }) => {
            const arr = list && product[list] && product[list].length > 0 ? product[list] : [];
            return (
              <div className="adddevModal" key={key} style={this.returnStyle(value)}>
                <FormItem
                  label={key}
                  key={key}
                >
                  {
                    getFieldDecorator(value, {
                      rules: [{
                        required: !noNeed,
                        message: `请${type && (type === 2 || type === 3) ? '选择' : '输入'}${key}`,
                      }],
                      initialValue: initialValue || undefined,
                    })(
                      /* eslint-disable */
                      type && type === 2 ?
                        <Select
                          placeholder="请选择"
                          style={{ width: 180 }}
                          showSearch
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {arr.map(({ value, key }) =>
                            <Option value={value}>{key}</Option>,
                          )}
                        </Select> :
                        type && type === 3 ?
                          <TextArea rows={2} placeholder="请输入" style={{ width: 470 }} /> :
                          type && type === 4 ?
                            <Select
                              placeholder="请选择"
                              style={{ width: 180 }}
                              showSearch
                              optionFilterProp="children"
                              mode="multiple"
                              filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                              }
                            >
                              {arr.map(({ value, key }) =>
                                <Option value={value}>{key}</Option>,
                              )}
                            </Select>
                            :
                            <Input placeholder="请输入" readOnly={readOnly || false} placeholder={placeholder || undefined} />,
                    )
                  }
                </FormItem>
              </div>
            );
          })
        }
        {
          selectKey !== 'measureUnit' &&
          <div className="adddevModal" style={{ width: 1200 }}>
            <FormItem
              label="上传图片"
              key="uploadPic"
            >
              <UploadImg
                key="uimg"
                defaultFileList={this.state.fileList ? this.state.fileList : []}
                fileListFun={imglist => {
                  this.setState({ fileList: imglist });
                }}
              />
            </FormItem>
          </div>
        }
        {
          sourceOfProduct === 'H005005' &&
          <React.Fragment>
            <div className="adddevModal">
              <FormItem
                label="供应商编号"
              >
                {
                  getFieldDecorator('supplierId', {
                    rules: [{
                      required: true,
                      message: `请选择供应商编号`,
                    }],
                    initialValue: undefined,
                  })(
                    <Input placeholder="请输入" />,
                  )
                }
              </FormItem>
            </div>
            <div className="adddevModal">
              <FormItem
                label="供应商货号"
              >
                {
                  getFieldDecorator('supplierProductNo', {
                    rules: [{
                      required: false,
                      message: `请选择供应商货号`,
                    }],
                    initialValue: undefined,
                  })(
                    <Input placeholder="请输入" />,
                  )
                }
              </FormItem>
            </div>
          </React.Fragment>
        }
      </Form>
    );
  };

  closeModal = () => {
    this.setState({
      batchUpdateShow: false,
    });
  };

  // 批量新增 保存确认 提交回调
  handleBatchSubmit = () => {
    const { dispatch, form, product } = this.props;
    const { fileList } = this.state;

    const arr = ['customerId','productColor','gemColor','platingColor','brand','productType','sourceOfProduct','unitOfMeasurement','unitOfWeight','finishedWeight']
    form.validateFields(arr,(err, fieldsValue) => {
      if (err) {
        return;
      }
      console.log(fieldsValue, '===============');
      const {customerId,productColor,gemColor,platingColor} = product

    let customerV  = fieldsValue.customerId.map(item=> (customerId.filter(({ value }) => value === item)[0]))
    let productColorV  = fieldsValue.productColor.map(item=> (productColor.filter(({ value }) => value === item)[0]))
    let gemColorV  = fieldsValue.gemColor.map(item=> (gemColor.filter(({ value }) => value === item)[0]))
    let platingColorV  = fieldsValue.platingColor.map(item=> (platingColor.filter(({ value }) => value === item)[0]))

    const params = { ...fieldsValue, customer:customerV, productColor:productColorV, gemColor:gemColorV, platingColor:platingColorV};

      const key = ['brand','productType']
      key.map(item=>{
        params[item] = product[item].filter(({ value }) => value === fieldsValue[item]);
      })
      params.brand = params.brand[0]
      params.productType = params.productType[0]
      const filelistArr = fileList.flatMap(e => e.url);
      params.picPath = filelistArr
 

      productBatchUpdate(params).then(res => {
        this.setState({
          visible: false,
        });
        if (!res) return;
        const { rtnCode, rtnMsg } = res.head;
        if (rtnCode === '000000') {
          notification.success({
            message: rtnMsg,
          });
          this.closeModal();
        } else {
          notification.error({
            message: res.rtnMsg,
          });
        }
      });

      // todo

      this.setState({
        isEdit: true,
        update: true,
      });
    });
  };

  getDetailInfo = () => {
    const { imageObject, drawVisible, visible, showItem, isLoading, isAdd } = this.state;
    const { isProductUpdate, productSaveloading, productUpdateloading } = this.props;

    const modalFooter = isAdd ? [
      <Button
        key="back"
        onClick={this.handleCancel}
      >
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
        }}
      >
        继续添加
      </Button>,
    ] : [
        <Button
          key="back"
          onClick={this.handleCancel}
        >
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

    const batchFooter = [
      <Button
        key="back"
        onClick={this.closeModal}
      >
        取消
      </Button>,
      <Button
        key="submit"
        type="primary"
        loading={productSaveloading}
        onClick={this.handleBatchSubmit}
      >
        保存
      </Button>,
    ];

    const { batchUpdateShow } = this.state;
    return (
      <div className={business.right_info}>
        <div
          style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', overflow: 'hidden' }}
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
              {formatMessage({ id: 'menu.erp.business.product' })}
            </div>
            <Divider className={styles.divder} />
          </div>
          <Card bordered={false} style={{ overflow: 'auto' }}>

            {(showItem && showItem !== '') ? (
              <div>
                <Spin spinning={isLoading}>
                  <Carousel {...this.carouselsettings} className={business.carousel_content} autoplay>
                    {this.getImages(showItem.pictures)}
                  </Carousel>
                  {showItem.pictures && showItem.pictures.length > 0 && <Divider />}
                  <DescriptionList size="small" col="1">
                    <Description term="名称">{showItem.zhName}</Description>
                    <Description term="编号">{showItem.productNo}</Description>
                    <Description term="类别">{showItem.productTypeName}</Description>
                    <Description term="重量">{showItem.finishedWeight}</Description>
                    <Description term="工价" />
                  </DescriptionList>
                  <span className={business.title_info}>
                    参数详情
                  </span>
                  <Divider className={business.divder} />
                  <DescriptionList size="small" col="2">
                    <Description term="颜色">{showItem.gemColorName}</Description>
                    <Description term="数量单位">{showItem.unitOfMeasurementName}</Description>
                    <Description term="报价重量">{showItem.finishedWeight}</Description>
                    <Description term="成品重量">{showItem.unitOfWeightName}</Description>
                    <Description term="电镀">{showItem.platingColorName}</Description>
                    <Description term="成色">{showItem.productColorName}</Description>
                    <Description term="产品来源">{showItem.sourceOfProductName}</Description>
                    <Description term="模具">{showItem.mouldNo}</Description>
                    <Description term="客户货号">{showItem.custoerProductNo}</Description>
                    <Description term="客户">{showItem.customerNo}</Description>
                    <Description term="供应商货号">{showItem.supplierId}</Description>
                    <Description term="供应商">{showItem.supplierProductNo}</Description>
                    <Description term="品牌">{showItem.brandNo}</Description>
                  </DescriptionList>
                  <span className={business.title_info}>
                    备注
                  </span>
                  <Divider className={business.divder} />
                  <DescriptionList size="small" col="1">
                    <Description>{showItem.marks}</Description>
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
                    content: '确定删除吗？', onOk: () => {
                      this.handleDeleteProduct();
                    },
                  });
                }}

                disabled={!showItem || showItem === '' || !isProductUpdate || showItem.status === '2'}
              >
                删除
              </Button>
              <Button
                type="primary"
                size="small"
                className={business.buttomControl}
                icon="edit"
                disabled={!showItem || showItem === '' || !isProductUpdate || showItem.status === '2'}
                onClick={this.handleEditProduct}
              >
                编辑
              </Button>
              {
                showItem && showItem.status === '2' ?
                  <Button
                    className={business.buttomControl}
                    size="small"
                    type="danger"
                    icon="unlock"
                    onClick={() => {
                      ModalConfirm({
                        content: '确定取消审批吗？', onOk: () => {
                          this.handleUnFreezeProduct();
                        },
                      });
                    }}
                    disabled={!showItem || showItem === '' || !isProductUpdate}
                  >
                    取消审批
                  </Button>
                  :
                  <Button
                    className={business.buttomControl}
                    size="small"
                    type="primary"
                    icon="lock"
                    disabled={!showItem || showItem === '' || !isProductUpdate}
                    onClick={() => {
                      ModalConfirm({
                        content: '确定审批吗？', onOk: () => {
                          this.handleFreezeProduct();
                        },
                      });
                    }}
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
                size="small"
                icon="copy"
                disabled
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
                icon="rollback"
                onClick={this.batchUpdate}
              >
                批量新增
              </Button>
            </div>
          </div>
          <Modal
            maskClosable={false}
            title={<BuildTitle title="批量新增" />}
            width={1200}
            className={styles.standardListForm}
            bodyStyle={{ padding: '28px 0 0' }}
            destroyOnClose
            visible={batchUpdateShow}
            footer={batchFooter}
            onCancel={this.closeModal}
          >
            {this.getBatchUpdat()}
          </Modal>

          <Modal
            title={<BuildTitle title={this.state.done ? null : formatMessage({ id: 'menu.erp.business.product' })} />}
            maskClosable={false}
            width={1200}
            destroyOnClose
            visible={visible}
            footer={modalFooter}
            onCancel={this.handleCancel}
            bodyStyle={{ padding: '28px 0 0' }}

          >
            {this.getProductModalContent()}
          </Modal>
        </Card>
      </div>
    );
  };

  getImages = pictures => {
    const images = pictures && pictures.flatMap(e => e.picPath);
    if (!images) return;
    return images.map(v => (
      <div className={styles.carousel_image_ground} key={`as${Math.random(1)}`}>
        <Zmage
          alt="图片"
          align="center"
          className={styles.carousel_image}
          src={v}
          set={images.map(image => ({ src: image }))}
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

    const { form: { getFieldDecorator, getFieldValue } } = this.props;
    const { current = {}, productNo, customerShotName = '', cropperVisible, cNofCodezhName } = this.state;


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
            <FormItem
              label="产品编号"
            // labelCol={{ span: 12 }}
            // wrapperCol={{ span: 20 }}
            >
              {getFieldDecorator('productNo', {
                rules: [{ required: true, message: '请输入姓名' }],
                initialValue: current.productNo,
              })(<Input
                placeholder="自动生成编号"
                readOnly
              />)}
            </FormItem>
          </div>
          <div className="adddevModal">
            <FormItem
              label="品牌"
              {...this.centerFormLayout}
            >
              {getFieldDecorator('brand', {
                rules: [{ required: true, message: '请输入品牌' }],
                initialValue: current.brand,
              })
                (<BrandListSelect
                  disabled={cNofCodezhName === '套装'}
                  placeholder="请输入"
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  style={{ width: 180 }}
                  onSelect={(v) => {
                    if (v && v.brandNo) {
                      this.setState({
                        brand: v.brandNo
                      }, () => {
                        this.parseProductNo()
                      })
                    }
                  }
                  }
                  content={current.brand}
                />)
              }
            </FormItem>
          </div>
          <div className="adddevModal">
            <FormItem
              label="类别"
              {...this.centerFormLayout}
            >
              {getFieldDecorator('productType', {
                initialValue: current.productType,
                rules: [{ required: true, message: '请输入类别' }],
              })(<ProductTypeSelect
                content={current.productType}
                placeholder="请输入"
                style={{ width: 180 }}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                onSelect={(v) => {
                  // console.log(" select  ",v)
                  if (v.zhName) {
                    if (v.zhName === '套装') {
                      this.props.form.setFieldsValue({
                        brand: 'SET',
                      });
                      this.setState({
                        cNofCodezhName: v.zhName,
                        cNofCodeehName: v.enName,
                        productType: '',
                        brand: 'SET'
                      }, () => {
                        this.parseProductNo()
                      })
                    } else {
                      this.setState({
                        cNofCodezhName: v.zhName,
                        cNofCodeehName: v.enName,
                        productType: v.unitCode
                      }, () => {
                        this.parseProductNo()
                      });
                    }
                  }
                }}
              />)}
            </FormItem>
          </div>
          <div className="adddevModal" style={{ marginRight: 120 }}>
            <FormItem
              label='宝石颜色'
              {...this.centerFormLayout}
            >
              {getFieldDecorator('gemColor', {
                rules: [{ required: true, message: '请输入宝石颜色' }],
                initialValue: current.gemColor,
              })(<UnitColorListSelect
                style={{ width: 180 }}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                placeholder="请输入"
                content={current.gemColor}
                onSelect={(v) => {
                  if (v.unitCode) {
                    this.setState({
                      gemColor: v.unitCode,
                      cNozhNameUniCode: v.zhName,
                      cNoenNameUniCode: v.enName
                    }, () => {
                      this.parseProductNo();
                    })
                  }
                }
                }
              />)}
            </FormItem>
          </div>
          <div className="adddevModal" style={{ width: 1200 }}>
            <FormItem
              label="电镀颜色"
              {...this.centerFormLayout}
            >
              {getFieldDecorator('platingColor', {
                rules: [{ required: true, message: '请输入电镀颜色' }],
                initialValue: current.platingColor,
              })(<PlatingColorListSelect
                placeholder="请输入"
                style={{ width: 1040 }}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                onSelect={(v) => {
                  if (this.state.current.mouldNo) {
                    this.state.mouldNo = this.state.current.mouldNo;
                  }
                  if (v.colorCode) {
                    this.setState({
                      platingColor: v.colorCode
                    }, () => {
                      this.parseProductNo();
                    })
                  }
                }}
                content={current.platingColor}
              />)}
            </FormItem>
          </div>
          <div className="adddevModal">
            <FormItem
              label="中文名称"
              {...this.centerFormLayout}
            >
              {getFieldDecorator('zhName', {
                rules: [{ required: true, message: '请输入中文名称' }],
                initialValue: current.zhName,
              })(<Input placeholder="自动生成" readOnly />,
              )}
            </FormItem>
          </div>
          <div className="adddevModal">
            <FormItem
              label='英文名称'
              {...this.centerFormLayout}
            >
              {getFieldDecorator('enName', {
                rules: [{ required: true, message: '请输入英文名称' }],
                initialValue: current.enName,
              })(<Input
                placeholder="自动生成"
                readOnly
              />)}
            </FormItem>
          </div>
          <div className="adddevModal">
            <FormItem
              label='产品来源'
              {...this.centerFormLayout}
            >
              {getFieldDecorator('sourceOfProduct', {
                rules: [{ required: true, message: '请输入产品来源' }],
              })(<Dict
                dict="H005"
                style={{ width: 180 }}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                content={current.sourceOfProduct ? current.sourceOfProduct : 'H005001'}
                placeholder="请输入"
              />)}
            </FormItem>
          </div>
          <div className="adddevModal">
            <FormItem
              label='模具号'
              {...this.centerFormLayout}

            >
              {getFieldDecorator('mouldNo', {
                rules: [{ required: true, message: '请输入' }],
                initialValue: current.mouldNo,
              })(<MoldListSelect
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                style={{ width: 180 }}
                content={current.mouldNo}
                placeholder="请输入"
                onSelect={(v) => {
                  this.setState({ mouldNo: v }, () => {
                    this.parseProductNo();
                  });
                }}
                onChange={(v) => {
                  this.setState({ current: { ...this.state.current, mouldNo: v }, mouldNo: v }, () => {
                    this.parseProductNo();
                  });
                }}
              />)}
            </FormItem>
          </div>
          <div className="adddevModal">
            <FormItem
              label="成色"
              {...this.centerFormLayout}
            >
              {getFieldDecorator('productColor', {
                rules: [{ required: true, message: '请输入成色' }],
                initialValue: current.productColor,
              })(<PercentageSelect
                placeholder="请输入"
                content={current.productColor}
                style={{ width: 180 }}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                onSelect={(v) => {
                  if (v.zhName)
                    this.state.cNoPercentageZhName = v.zhName;

                  if (v.enName)
                    this.state.cNoPercentageEnName = v.enName;
                  if (v.productMaterial)
                    this.state.productColor = v.productMaterial;
                  this.parseProductNo();
                }}
              />)}
            </FormItem>
          </div>
          <div className="adddevModal">
            <FormItem
              label='规格'
              {...this.centerFormLayout}
            >
              {getFieldDecorator('specification', {
                rules: [{
                  required: this.state.cNofCodezhName === '耳环' || this.state.cNofCodezhName === '项链' || this.state.cNofCodezhName === '手链',
                  message: '请输入规格',
                }],
                initialValue: current.specification || '0.00',
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </div>
          <div className="adddevModal">
            <FormItem
              label="数量单位"
              {...this.centerFormLayout}
            >
              {getFieldDecorator('unitOfMeasurement', {
                rules: [{ message: '请输入数量单位' }],
                initialValue: current.unitOfMeasurement,
              })(<BasicMeasureListSelect
                style={{ width: 180 }}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                content={current.unitOfMeasurement ? current.unitOfMeasurement : 'ae32e48c2df27123682943b6effa72d3'}
                placeholder="请输入"
              />)}
            </FormItem>
          </div>
          <div className="adddevModal">
            <FormItem
              label="重量单位"
              {...this.centerFormLayout}
            >
              {getFieldDecorator('unitOfWeight', {
                rules: [{ message: '请输入' }],
                initialValue: current.unitOfWeight,
              })(<BasicMeasureListSelect
                style={{ width: 180 }}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                content={current.unitOfWeight ? current.unitOfWeight : '8ee1cc72791578cfe122f6839487bbbe'}
                placeholder="请输入"
              />)}
            </FormItem>
          </div>
          <div className="adddevModal">
            <FormItem
              label="成品重量"
              {...this.centerFormLayout}
            >
              {getFieldDecorator('finishedWeight', {
                initialValue: current.finishedWeight,
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </div>
          <div className="adddevModal" style={{ width: 1200 }}>
            <FormItem
              label="备注"
              {...this.centerFormLayout}
            >
              {getFieldDecorator('marks', {
                initialValue: current.marks,
              })(<TextArea style={{ width: 470 }} placeholder="请输入" />)}
            </FormItem>
          </div>
          <div className="adddevModal">
            <FormItem
              label='上传图片'
              {...this.centerFormLayout}
            >
              <UploadImg
                key="uimg"
                defaultFileList={this.state.fileList ? this.state.fileList : []}
                fileListFun={imglist => {
                  this.setState({ fileList: imglist });
                }}
              />
            </FormItem>
          </div>
        </Form>

        <Form
          size='small'
          labelAlign='left'
          layout='inline'
          className={business.from_content}
        >
          <span className={business.sun_title_info}>客户信息</span>
          <Divider className={business.divder} />
          <div className="adddevModal">
            <FormItem
              label='客户编号'
              {...this.centerFormLayout}
            >
              {getFieldDecorator('customerId', {
                rules: [{ required: true, message: '请输入客户编号' }],
                initialValue: current.customerId,
              })(<TerminalListSelected
                style={{ width: 180 }}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                content={current.customerId}
                onSelectEndName={(file, customerCombine) => {
                  if (file && customerCombine) {
                    // console.log('end name ', file);
                    this.setState({
                      customerShotName: customerCombine,
                      customerNo: customerCombine,
                    }, () => {
                      this.parseProductNo();
                    });
                    // setFieldsValue({
                    //   customerShotName: customerCombine,
                    // });
                  }
                }}
              />)}
            </FormItem>
          </div>
          <div className="adddevModal">
            <FormItem
              label="客户简称"
              {...this.centerFormLayout}

            >
              {getFieldDecorator('customerShotName', {
                rules: [{ message: '请输入客户简称' }],
                initialValue: current.customerShotName,
              })(<div>
                <Input
                  placeholder="请输入"
                  readOnly
                  value={customerShotName || current.endShotName}
                />
              </div>)}
            </FormItem>
          </div>
          <div className="adddevModal">
            <FormItem
              label='客户货号'
              {...this.centerFormLayout}

            >
              {getFieldDecorator('custoerProductNo', {
                rules: [{ message: '请输入货号' }],
                initialValue: current.custoerProductNo,
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </div>
          <div className="adddevModal">
            <FormItem
              label="产品描述"
              {...this.centerFormLayout}

            >
              {getFieldDecorator('productDesc', {
                rules: [{ message: '请输入产品描述' }],
                initialValue: current.productDesc,
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </div>
          {/* <Modal */}
          {/* maskClosable={false} */}
          {/* {...modalCropperFooter} */}
          {/* width={768} */}
          {/* destroyOnClose */}
          {/* visible={cropperVisible} */}
          {/* > */}
          {/* {this.openCutImageModal()} */}
          {/* </Modal> */}
        </Form>

        {
          sourceOfProduct === 'H005005' ? <Form
            size="small"
            labelAlign="left"
            layout="inline"
            style={{ width: '100%' }}
            className={business.from_content}
          >
            <span className={business.sun_title_info}>供应商信息</span>
            <Divider className={business.divder} />
            <div className="adddevModal">
              <FormItem
                label="供应商编号"
                {...this.centerFormLayout}

              >
                {getFieldDecorator('supplierId', {
                  rules: [{ required: true, message: '请输入供应商编号' }],
                  initialValue: current.supplierId,
                })(<Input placeholder="请输入" />)}
              </FormItem>
            </div>

            <div className="adddevModal">
              <FormItem
                label="供应商货号"
                {...this.centerFormLayout}


              >
                {getFieldDecorator('supplierProductNo', {
                  rules: [{ message: '请输入供应商货号' }],
                  initialValue: current.supplierProductNo,
                })(<Input placeholder="请输入" />)}
              </FormItem>
            </div>
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

  handleSubmit = (close) => {
    const { dispatch, form } = this.props;
    const { isAdd, fileList, showItem, current } = this.state;
    const arr = [
      'productNo',
      'brand',
      'productType',
      'gemColor',
      'platingColor',
      'zhName',
      'enName',
      'sourceOfProduct',
      'mouldNo',
      'productColor',
      'specification',
      'customerId',
    ];

    console.log(this.props.form.getFieldsValue(), current)
    form.validateFields(err => {
      if (err) {
        return;
      }

      const params = {};
      params.product = form.getFieldsValue();

      const filelistArr = fileList.flatMap(e => e.url);
      params.picPath = filelistArr

      if (isAdd) {
        dispatch({
          type: 'product/addProduct',
          payload: {
            ...params,
          },
          callback: () => {
            this.setState({
              visible: !close,
            });
          },
        });
        // todo

        this.setState({
          isEdit: true,
          update: true,
        });
      } else {
        params.product.id = showItem.id;
        params.product.version = showItem.version;
        dispatch({
          type: 'product/updateProduct',
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
        productParams: params,pi
      });
    });


  };


  handleUpdateImage = (item) => {
    if (!item.id) return;
    // console.log('  save image');
    const { fileList = [] } = this.state;

    const _this = this;
    const params = {};
    const filelistArr = fileList.flatMap(e => e.url);
    params.picPath = filelistArr
    params.product = item;


    fetch(HttpFetch.saveProductImage, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'token': getCurrentUser() ? getCurrentUser().token : '',
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
      .catch(function (ex) {
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
    fetch(HttpFetch.queryProductList, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'token': getCurrentUser() ? getCurrentUser().token : '',
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
          const current = isEditItem ? showItem : this.state.current;
          // console.log(" cur is ",current,isEditItem)
          this.setState({
            showItem,
            current,
          });
          // console.log(" update data ",showItem)
        }
        this.fetchImages(showItem);
        _this.setState({
          isLoading: false,
        });
      })
      .catch(function (ex) {
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
    const { imageObject } = this.state;
    this.parseImages(imageObject);

    this.setState({
      current: item,
      visible: true,
      isAdd: false,
      fileList: this.state.showItem.pictures,// 测试真实数据重接口获取
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
      type: 'product/deleteProduct',
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
      type: 'product/unfreezeProduct',
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
      type: 'product/freezeProduct',
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
          style={{ height: '400px', width: '400px' }}
          preview=".img-preview"
          cropBoxResizable={false}
          viewMode={0} // 定义cropper的视图模式
          dragMode="move"
          guides
          background
          aspectRatio={1 / 1}
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
        'token': getCurrentUser() ? getCurrentUser().token : '',
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
      .catch(function (ex) {
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
    // console.log('handleCropDone');
    this.setState({
      cropperVisible: false,
      cropImage: '',
      uploadFileUid: '',
    });
  };


  parseProductNo = () => {
    const { platingColor = '', productColor = '', cNofCodeehName = '', productType = '', cNofCodezhName = '', gemColor = '', mouldNo = '', cNozhNameUniCode, cNoenNameUniCode, cNoPercentageZhName = '', cNoPercentageEnName = '', customerNo = '', brand = '' } = this.state;
    const { form: { setFieldsValue } } = this.props;
    const showMold = mouldNo;
    // const showMold = mouldNo !== '' ? mouldNo.substr(2, mouldNo.length) : '';
    // console.log(" showMold ",mouldNo,showMold)
    const productNo = `${brand + productType}-${showMold}${productColor}${gemColor}${platingColor}${customerNo}`;
    const zhName = `${cNoPercentageZhName} ${cNozhNameUniCode} ${cNofCodezhName}`;
    const enName = `${cNoPercentageEnName} ${cNoenNameUniCode} ${cNofCodeehName}`;
    // 成色+宝石颜色+类别
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
      body = {},
      isloading,
      refarshList,
      isLoad,
      item,
    } = this.props;

    const { update, isLoadImage, productParams } = this.state;

    // (item)


    const isUpdate =
      productUpdateloading || productSaveloading || productFreezeloading || productDeleteloading || productUnFreezeloading;

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

      if (refarshList)
        refarshList();
    }


    const updat = isUpdate || productListloading;
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


}

export default ProductDetail;
