import React, { Component } from 'react';
import {
  Card,
  Row,
  Col,
  Icon,
  Form,
  Button,
  Input,
  Divider, Carousel, Modal, message, Upload, Spin,
} from 'antd';

import business from '@/pages/dev/business.less';
import baseStyles from '@/pages/Business/Client/base.less';
import DescriptionList from '@/components/DescriptionList';
import styles from './Index.less';
import 'cropperjs/dist/cropper.css';
import clientStyle from '@/pages/Business/Client/Client.less';
import Dict from '@/pages/Business/Client/components/Dict';
import MoldListSelect from './components/MoldListSelect';
import Cropper from 'react-cropper';
import HttpFetch from '@/utils/HttpFetch';
import Zmage from 'react-zmage';
import { connect } from 'dva';
import { getCurrentUser } from '@/utils/authority';

const { Description } = DescriptionList;

const FormItem = Form.Item;

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
    productUnFreezeloading: loading.effects['product/unfreezeProduct'],
    queryProductLocking: loading.effects['product/queryProductLock'],
    updateProductUnLocking: loading.effects['product/updateProductUnLock'],
  };
})
@Form.create()
class IndexDetail extends Component {


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
      cNoCustomerCombine: '',
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

  resetParse = () => {
    this.setState({
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
    const { imageObject, drawVisible, visible, showItem, isLoading } = this.state;
    const { isProductUpdate } = this.props;
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
            员工信息
        </span>
        <Divider className={business.divder} />

        <div className={baseStyles.content}>
          <div className={baseStyles.right_info}>
            {(showItem && showItem !== '') ? (
              <div>
                <Spin spinning={isLoading}>
                  <Carousel {...this.carouselsettings} className={business.carousel_content} initialSlide={0} autoplay>
                    {this.getImages(paths)}
                  </Carousel>
                  <DescriptionList size="small" col="1">
                    <Description term="ID">{showItem.id}</Description>
                    <Description term="姓名">{showItem.userName}</Description>
                    <Description term="密码">{showItem.password}</Description>
                    <Description term="英文名称">{showItem.enName}</Description>
                    <Description term="民族">{showItem.nation}</Description>
                    <Description term="性别">{showItem.gender}</Description>

                    <Description term="婚姻">{showItem.marriage}</Description>
                    <Description term="籍贯">{showItem.nativePlace}</Description>
                    <Description term="邮编">{showItem.postcode}</Description>
                    <Description term="身份证">{showItem.idCard}</Description>
                    <Description term="出生日期">{showItem.birthdate}</Description>
                    <Description term="电话">{showItem.phone}</Description>

                    <Description term="手机">{showItem.tel}</Description>
                    <Description term="学历">{showItem.education}</Description>
                    <Description term="专业">{showItem.specialty}</Description>
                    <Description term="体重">{showItem.weight}</Description>
                    <Description term="身高">{showItem.stature}</Description>
                    <Description term="卡号">{showItem.cardNo}</Description>

                    <Description term="部门">{showItem.dept}</Description>
                    <Description term="职位">{showItem.position}</Description>
                    <Description term="短号">{showItem.cornet}</Description>
                    <Description term="邮箱">{showItem.email}</Description>
                    <Description term="宿舍">{showItem.dorm}</Description>
                    <Description term="入职日期">{showItem.hiredate}</Description>

                    <Description term="薪资">{showItem.salary}</Description>
                    <Description term="外宿">{showItem.isSleepOut}</Description>
                    <Description term="内食">{showItem.isDineIn}</Description>
                    <Description term="离职日期">{showItem.terminationDate}</Description>
                    <Description term="离厂原因">{showItem.exFactoryReson}</Description>
                    <Description term="离职类别">{showItem.teminationType}</Description>

                    <Description term="有效期">{showItem.indate}</Description>
                    <Description term="头像">{showItem.profilePhoto}</Description>
                  </DescriptionList>
                  <span className={business.title_info}>
            备注
                  </span>
                  <Divider className={business.divder} />
                  <DescriptionList size="small" col="1">
                    <Description>{showItem.remarks}</Description>
                  </DescriptionList>
                </Spin>
              </div>
            ) : (
              <div />
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
                  onClick={this.handleDeleteProduct}
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
                  showItem && showItem.status === '2' ? <Button
                    className={business.buttomControl}
                    size="small"
                    type="danger"
                    icon="unlock"
                    onClick={this.handleUnFreezeProduct}
                    disabled={!showItem || showItem === '' || !isProductUpdate}
                  >
                      取消审批
                                                        </Button>
                    : <Button
                      className={business.buttomControl}
                      size="small"
                      type="primary"
                      icon="lock"
                      disabled={!showItem || showItem === '' || !isProductUpdate}
                      onClick={this.handleFreezeProduct}
                    >
                      审批/取消审批
                    </Button>
                }

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

      const {file} = info;


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
        <span className={business.sun_title_info}>产品</span>
        <Divider className={business.divder} />
        <Form
          size="small"
          labelAlign="left"
          layout="inline"
          className={clientStyle.from_content}
          onSubmit={this.handleContactsSubmit}
        >
          <Row gutter={4}>
            <Col lg={4} md={4} sm={4} xs={4}>
              <FormItem
                label="ID"
                className={business.from_content_col}
                {...this.centerFormLayout}
              >
                {getFieldDecorator('id', {
                  rules: [{ required: true, message: '请输入ID' }],
                  initialValue: current.id,
                })(<Input
                  placeholder="自动生成编号"
                  readOnly
                />)}
              </FormItem>
            </Col>
            <Col lg={4} md={4} sm={4} xs={4}>
              <FormItem
                label="姓名"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('userName', {
                  rules: [{ required: true, message: '请输入姓名' }],
                  initialValue: current.userName,
                })
                (<Input />)
                }
              </FormItem>
            </Col>
            <Col lg={4} md={4} sm={4} xs={4}>
              <FormItem
                label="密码"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('password', {
                  initialValue: current.password,
                  rules: [{ required: true, message: '请输入密码' }],
                })(<Input />)}
              </FormItem>
            </Col>
            <Col lg={4} md={4} sm={4} xs={4}>
              <FormItem
                label='英文名称'
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('enName', {
                  rules: [{ required: true, message: '请输入英文名称' }],
                  initialValue: current.enName,
                })(<Input />)}
              </FormItem>
            </Col>
            <Col lg={4} md={4} sm={4} xs={4}>
              <FormItem
                label="民族"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('nation', {
                  rules: [{ required: true, message: '请输入民族' }],
                  initialValue: current.nation,
                })(<Input />)}
              </FormItem>
            </Col>
            <Col lg={4} md={4} sm={4} xs={4}>
              <FormItem
                label="性别"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('gender', {
                  rules: [{ required: true, message: '请输入性别' }],
                  initialValue: current.gender,
                })(<Input   />,
                )}
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col lg={4} md={4} sm={4} xs={4}>
              <FormItem
                label='婚姻'
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('marriage', {
                  rules: [{ required: true, message: '请选择婚姻状况' }],
                  initialValue: current.marriage,
                })(<Input   />)}
              </FormItem>
            </Col>
            <Col lg={4} md={4} sm={4} xs={4}>
              <FormItem
                label='籍贯'
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('nativePlace', {
                  rules: [{ required: true, message: '请输入籍贯' }],
                  initialValue: current.nativePlace,
                })(<Input />)}
              </FormItem>
            </Col>
            <Col lg={4} md={4} sm={4} xs={4}>
              <FormItem
                label='出生日期'
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('birthdate', {
                  rules: [{ required: true, message: '请输入出生日期' }],
                  initialValue: current.birthdate,
                })(<Input />)}
              </FormItem>
            </Col>
            <Col lg={4} md={4} sm={4} xs={4}>
              <FormItem
                label="邮编"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('postcode', {
                  rules: [{ required: true, message: '请输入邮编' }],
                  initialValue: current.postcode,
                })(<Input />)}
              </FormItem>
            </Col>
            <Col lg={4} md={4} sm={4} xs={4}>
              <FormItem
                label='身份证'
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('idCard', {
                  rules: [{ required: true, message: '请输入邮编' }],
                  initialValue: current.idCard,
                })(<Input placeholder="请输入" />)}
              </FormItem>
            </Col>
            <Col lg={4} md={4} sm={4} xs={4}>
              <FormItem
                label="电话"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('phone', {
                  rules: [{ message: '请输入联系电话' }],
                  initialValue: current.phone,
                })(<Input />)}
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col lg={4} md={4} sm={4} xs={4}>
              <FormItem
                label="部门"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('dept', {
                  rules: [{ message: '请输入部门' }],
                  initialValue: current.dept,
                })(<Input />)}
              </FormItem>
            </Col>
            <Col lg={4} md={4} sm={4} xs={4}>
              <FormItem
                label="职位"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('position', {
                  initialValue: current.position,
                })(<Input placeholder="请输入职位" />)}
              </FormItem>
            </Col>
            <Col lg={4} md={4} sm={4} xs={4}>
              <FormItem
                label="短号"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('cornet', {
                  rules: [{ message: '请输入短号' }],
                  initialValue: current.cornet,
                })(<Input placeholder="请输入" />)}
              </FormItem>
            </Col>
            <Col lg={4} md={4} sm={4} xs={4}>
              <FormItem
                label="邮箱"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('email', {
                  initialValue: current.email,
                })(<Input placeholder="请输入" />)}
              </FormItem>
            </Col>
            <Col lg={4} md={4} sm={4} xs={4}>
              <FormItem
                label="宿舍"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('dorm', {
                  initialValue: current.dorm,
                })(<Input placeholder="请输入宿舍" />)}
              </FormItem>
            </Col>
            <Col lg={4} md={4} sm={4} xs={4}>
              <FormItem
                label="入职日期"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('hiredate', {
                  initialValue: current.hiredate,
                })(<Input placeholder="请输入入职日期" />)}
              </FormItem>
            </Col>
          </Row>



          <Row>
            <Col lg={4} md={4} sm={4} xs={4}>
              <FormItem
                label="薪资"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('salary', {
                  rules: [{ message: '请输入薪资' }],
                  initialValue: current.salary,
                })(<Input />)}
              </FormItem>
            </Col>
            <Col lg={4} md={4} sm={4} xs={4}>
              <FormItem
                label="外宿"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('isSleepOut', {
                  initialValue: current.isSleepOut,
                })(<Input placeholder="请输入外宿" />)}
              </FormItem>
            </Col>
            <Col lg={4} md={4} sm={4} xs={4}>
              <FormItem
                label="内食"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('isDineIn', {
                  rules: [{ message: '请输入内食' }],
                  initialValue: current.isDineIn,
                })(<Input placeholder="请输入" />)}
              </FormItem>
            </Col>
            <Col lg={4} md={4} sm={4} xs={4}>
              <FormItem
                label="离职日期"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('terminationDate', {
                  initialValue: current.terminationDate,
                })(<Input placeholder="请输入离职日期" />)}
              </FormItem>
            </Col>
            <Col lg={4} md={4} sm={4} xs={4}>
              <FormItem
                label="离厂原因"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('exFactoryReson', {
                  initialValue: current.exFactoryReson,
                })(<Input placeholder="请输入离厂原因" />)}
              </FormItem>
            </Col>
            <Col lg={4} md={4} sm={4} xs={4}>
              <FormItem
                label="离职类别"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('teminationType', {
                  initialValue: current.teminationType,
                })(<Input placeholder="请输入离职类别" />)}
              </FormItem>
            </Col>
          </Row>


          <Row>
            <Col lg={4} md={4} sm={4} xs={4}>
              <FormItem
                label="有效期"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('indate', {
                  rules: [{ message: '请输入有效期' }],
                  initialValue: current.indate,
                })(<Input />)}
              </FormItem>
            </Col>
          </Row>







          <Row>
            <Col lg={24} md={24} sm={24} xs={24}>
              <FormItem
                label='头像'
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
                    <Icon type={this.state.loading ? 'loading' : 'plus'} />
                    <div className="ant-upload-text">上传图片</div>
                  </div>
                </Upload>
              </FormItem>
            </Col>
          </Row>

        </Form>
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
    const { isAdd, fileList, showItem } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }

      const params = {};
      params.product = { ...fieldsValue };

      const urls = fileList.map(v => v.url);
      const names = fileList.map(v => v.name);
      params.imgStr = urls;
      // params.imgStr = this.state.urls;
      params.fileName = names;
      // params.productId = item.productNo;
      // params.product = item;
      if (isAdd) {
        dispatch({
          type: 'product/addProduct',
          payload: {
            ...params,
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
        });
      }

      this.setState({
        visible: false,
        productParams: params,
      });
    });


  };


  handleUpdateImage = (item) => {
    if (!item.id) return;
    // console.log('  save image');
    const { fileList = [] } = this.state;

    const _this = this;
    const params = {};
    const urls = fileList.map(v => v.url);
    const names = fileList.map(v => v.name);
    params.imgStr = urls;
    // params.imgStr = this.state.urls;
    params.fileName = names;
    // params.productId = item.productNo;
    params.product = item;


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
        const {head} = d;

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

    const {isEditItem} = this.state;

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
        'token': getCurrentUser()?getCurrentUser().token:'',
      },
      body: JSON.stringify(params),
    })
      .then(response => response.json())
      .then(d => {
        const {head} = d;
        const {body} = d;
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
        this.fetchImages(showItem);

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
    const { imageObject } = this.state;
    this.parseImages(imageObject);

    this.setState({
      current: item,
      visible: true,
      isAdd: false,
      fileList: this.state.fileList,// 测试真实数据重接口获取
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
          style={{ height: 400 }}
          preview=".img-preview"
          cropBoxResizable={false}
          viewMode={1} // 定义cropper的视图模式
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
        'token': getCurrentUser()?getCurrentUser().token:'',
      },
      body: JSON.stringify(params),
    })
      .then(response => response.json())
      .then(d => {
        const {body} = d;
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
        fileList[i].name = `crop${  Date.parse(new Date())  }${fileList[i].name}`;
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
    // console.log('handleCropDone');
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
    const productNo = `${cNoBrandNo + cNofCode  }-${  showMold  }${cNoUnitCode  }${cNoColorCode  }${cNoCustomerCombine}`;
    const zhName = cNoPercentageZhName + cNozhNameUniCode + cNofCodezhName;
    const enName = cNoPercentageEnName + cNoenNameUniCode + cNofCode;
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

    // setFieldsValue('productNo', productNo);

  };


}

export default IndexDetail;
