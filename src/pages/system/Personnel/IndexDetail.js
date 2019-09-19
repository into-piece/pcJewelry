import React, { Component } from 'react';
import {
  Card,
  Row,
  Col,
  Form,
  Button,
  Input,
  DatePicker,
  Divider, Carousel, Modal, message, Spin,Empty
} from 'antd';
import { statusConvert, YoNConvert, genderConvert } from '@/utils/convert';

import moment from 'moment';
import business from '@/pages/dev/business.less';
import baseStyles from '@/pages/Business/Client/base.less';
import DescriptionList from '@/components/DescriptionList';
import styles from './Index.less';
import 'cropperjs/dist/cropper.css';
import clientStyle from '@/pages/Business/Client/Client.less';
import ModalConfirm from '@/utils/modal';
import DeptListSelect from './components/DeptListSelect';
import YoNRadio from './components/YoNRadio';
import EducationSelect from './components/EducationSelect';
import SexRadio from './components/SexRadio';
import HttpFetch from '@/utils/HttpFetch';
import Zmage from 'react-zmage';
import { connect } from 'dva';
import { getCurrentUser } from '@/utils/authority';

const { TextArea } = Input;
const { Description } = DescriptionList;

const FormItem = Form.Item;

@connect(({ person, loading }) => {
  const { rtnCode, rtnMsg } = person;
  return {
    body: person.body,
    rtnCode,
    rtnMsg,
    personListloading: loading.effects['person/fetchListPerson'],
    personSaveloading: loading.effects['person/addPerson'],
    personUpdateloading: loading.effects['person/updatePerson'],
    personDeleteloading: loading.effects['person/deletePerson'],
    approvalPersonloading: loading.effects['person/approvalPerson'],
    unApprovaloading: loading.effects['person/unApprovalPerson'],
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
      personListloading,
      personSaveloading,
      personUpdateloading,
      personDeleteloading,
      approvalPersonloading,
      unApprovaloading,
      body = {},
      isloading,
      refarshList,
      isLoad,
      item,
    } = this.props;

    const { update } = this.state;

    // (item)


    const isUpdate =
      personSaveloading || personUpdateloading || personDeleteloading || unApprovaloading || approvalPersonloading;

    if (isUpdate) {
      this.state.update = true;
      if (personUpdateloading || personSaveloading) {
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


    const updat = isUpdate || personListloading;
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

    const v = showItem||{};
    v.statusVar = statusConvert[v.status];
    v.genderVar = genderConvert[v.gender];
    v.marriageVar = YoNConvert[v.marriage];
    v.isSleepOutVar = YoNConvert[v.isSleepOut];
    v.isDineInVar = YoNConvert[v.isDineIn];

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
                    <Description term="用户编号">{showItem.userName}</Description>
                    <Description term="状态">{showItem.statusVar}</Description>
                    <Description term="姓名">{showItem.zhName}</Description>
                    <Description term="英文名称">{showItem.enName}</Description>
                    <Description term="民族">{showItem.nation}</Description>
                    <Description term="性别">{showItem.genderVar}</Description>

                    <Description term="婚姻">{showItem.marriageVar}</Description>
                    <Description term="籍贯">{showItem.nativePlace}</Description>
                    <Description term="家庭地址">{showItem.address}</Description>
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

                    <Description term="部门">{showItem.deptName}</Description>
                    <Description term="职位">{showItem.position}</Description>
                    <Description term="短号">{showItem.cornet}</Description>
                    <Description term="邮箱">{showItem.email}</Description>
                    <Description term="宿舍">{showItem.dorm}</Description>
                    <Description term="入职日期">{showItem.hiredate}</Description>

                    <Description term="薪资">{showItem.salary}</Description>
                    <Description term="外宿">{showItem.isSleepOutVar}</Description>
                    <Description term="内食">{showItem.isDineInVar}</Description>
                    <Description term="离职日期">{showItem.terminationDate}</Description>
                    <Description term="离厂原因">{showItem.exFactoryReson}</Description>
                    <Description term="离职类别">{showItem.teminationType}</Description>

                    <Description term="有效期">{showItem.indate}</Description>
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
                  showItem && showItem.status === '2' ? <Button
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
                    : <Button
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
    const { form: { getFieldDecorator } } = this.props;
    const { current = {} } = this.state;

    return (
      <div className={clientStyle.list_info}>
        <span className={business.sun_title_info}>员工</span>
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
                label="用户编号"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('userName', {
                  rules: [{ required: true, message: '请输入用户编号' }],
                  initialValue: current.userName,
                })
                (<Input />)
                }
              </FormItem>
            </Col>
            <Col lg={4} md={4} sm={4} xs={4}>
              <FormItem
                label="姓名"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('zhName', {
                  rules: [{ required: true, message: '请输入姓名' }],
                  initialValue: current.zhName,
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
                })(<Input.Password />)}
              </FormItem>
            </Col>
            <Col lg={4} md={4} sm={4} xs={4}>
              <FormItem
                label='英文名称'
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('enName', {
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
                  rules: [{ required: true, message: '请选择性别' }],
                  initialValue: current.gender,
                })(<SexRadio name="gender" />)}
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
                })(<YoNRadio />)}
              </FormItem>
            </Col>
            <Col lg={4} md={4} sm={4} xs={4}>
              <FormItem
                label='籍贯'
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('nativePlace', {
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
                  initialValue:current.birthdate&& moment(current.birthdate),
                })(<DatePicker format="YYYY-MM-DD" />)}
              </FormItem>
            </Col>
            <Col lg={4} md={4} sm={4} xs={4}>
              <FormItem
                label="邮编"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('postcode', {
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
                  initialValue: current.idCard,

                })(<Input />)}
              </FormItem>
            </Col>
            <Col lg={4} md={4} sm={4} xs={4}>
              <FormItem
                label="家庭地址"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('address', {
                  initialValue: current.address,
                })(<Input />)}
              </FormItem>
            </Col>

          </Row>
          <Row>
            <Col lg={4} md={4} sm={4} xs={4}>
              <FormItem
                label="电话"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('phone', {
                  initialValue: current.phone,
                })(<Input />)}
              </FormItem>
            </Col>
            <Col lg={4} md={4} sm={4} xs={4}>
              <FormItem
                label='手机'
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('tel', {
                  initialValue: current.tel,
                })(<Input />)}
              </FormItem>
            </Col>
            <Col lg={4} md={4} sm={4} xs={4}>
              <FormItem
                label='学历'
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('education', {
                  initialValue: current.education,
                })(<EducationSelect />)}
              </FormItem>
            </Col>
            <Col lg={4} md={4} sm={4} xs={4}>
              <FormItem
                label='专业'
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('specialty', {
                  initialValue: current.specialty,
                })(<Input />)}
              </FormItem>
            </Col>
            <Col lg={4} md={4} sm={4} xs={4}>
              <FormItem
                label="体重"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('weight', {
                  initialValue: current.weight,
                })(<Input />)}
              </FormItem>
            </Col>
            <Col lg={4} md={4} sm={4} xs={4}>
              <FormItem
                label='身高'
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('stature', {
                  initialValue: current.stature,
                })(<Input />)}
              </FormItem>
            </Col>


          </Row>
          <Row>
            <Col lg={4} md={4} sm={4} xs={4}>
              <FormItem
                label="卡号"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('cardNo', {
                  initialValue: current.cardNo,
                })(<Input />)}
              </FormItem>
            </Col>
            <Col lg={4} md={4} sm={4} xs={4}>
              <FormItem
                label="短号"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('cornet', {
                  initialValue: current.cornet,
                })(<Input />)}
              </FormItem>
            </Col>

            <Col lg={4} md={4} sm={4} xs={4}>
              <FormItem
                label="部门"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('dept', {
                  initialValue: current.dept,
                })(<DeptListSelect showSearch />)}
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
                })(<Input />)}
              </FormItem>
            </Col>

            <Col lg={4} md={4} sm={4} xs={4}>
              <FormItem
                label="邮箱"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('email', {
                  rules: [{ type: 'email', message: '邮箱格式不正确' }],
                  initialValue: current.email,
                })(<Input type="email" />)}
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
                })(<Input />)}
              </FormItem>
            </Col>


          </Row>
          <Row lg={4} md={4} sm={4} xs={4}>
            <Col lg={4} md={4} sm={4} xs={4}>
              <FormItem
                label="入职日期"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('hiredate', {
                  initialValue: current.hiredate&&moment(current.hiredate),
                })(<DatePicker format="YYYY-MM-DD" />)}
              </FormItem>
            </Col>
            <Col lg={4} md={4} sm={4} xs={4}>
              <FormItem
                label="薪资"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('salary', {
                  rules: [{ required: true, message: '请输入薪资' }],
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
                  rules: [{ required: true, message: '请选择是否外宿' }],
                  initialValue: current.isSleepOut,
                })(<YoNRadio />)}
              </FormItem>
            </Col>
            <Col lg={4} md={4} sm={4} xs={4}>
              <FormItem
                label="内食"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('isDineIn', {
                  rules: [{ required: true, message: '请选择是否内食' }],

                  initialValue: current.isDineIn,
                })(<YoNRadio />)}
              </FormItem>
            </Col>
            <Col lg={4} md={4} sm={4} xs={4}>
              <FormItem
                label="离职日期"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('terminationDate', {
                  initialValue:current.terminationDate&& moment(current.terminationDate),
                })(<DatePicker format="YYYY-MM-DD" />)}
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
                })(<Input />)}
              </FormItem>
            </Col>

          </Row>
          <Row>
            <Col lg={4} md={4} sm={4} xs={4}>
              <FormItem
                label="离职类别"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('teminationType', {
                  initialValue: current.teminationType,
                })(<Input />)}
              </FormItem>
            </Col>
            <Col lg={4} md={4} sm={4} xs={4}>
              <FormItem
                label="有效期"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('indate', {
                  initialValue: current.indate&&moment(current.indate),
                })(<DatePicker format="YYYY-MM-DD" />)}
              </FormItem>
            </Col>
            <Col lg={16} md={16} sm={16} xs={16}>
              <FormItem
                label="备注"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('remarks', {
                  initialValue: current.remarks,
                })(<TextArea />)}
              </FormItem>
            </Col>
          </Row>

          {/* <Row> */}
          {/* <Col lg={24} md={24} sm={24} xs={24}> */}
          {/* <FormItem */}
          {/* label='头像' */}
          {/* {...this.centerFormLayout} */}
          {/* className={business.from_content_col} */}
          {/* > */}
          {/* <Upload */}
          {/* accept='image/*' */}
          {/* name='avatar' */}
          {/* beforeUpload={() => { */}
          {/* return false; */}
          {/* }} */}
          {/* listType='picture-card' */}
          {/* fileList={this.state.fileList ? this.state.fileList : []} */}
          {/* onChange={handleChange} */}
          {/* > */}
          {/* <div> */}
          {/* <Icon type={this.state.loading ? 'loading' : 'plus'} /> */}
          {/* <div className="ant-upload-text">上传图片</div> */}
          {/* </div> */}
          {/* </Upload> */}
          {/* </FormItem> */}
          {/* </Col> */}
          {/* </Row> */}
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

      const params = { ...fieldsValue };

      params.birthdate&&( params.birthdate=moment(params.birthdate).format('YYYY-MM-DD'));
      params.hiredate&&( params.hiredate=moment( params.hiredate).format('YYYY-MM-DD'));
      params.terminationDate&&( params.terminationDate=moment( params.terminationDate).format('YYYY-MM-DD'));
      params.indate&&( params.indate=moment( params.indate).format('YYYY-MM-DD'));


      if (isAdd) {
        dispatch({
          type: 'person/addPerson',
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
        params.id = showItem.id;
        params.version = showItem.version;
        dispatch({
          type: 'person/updatePerson',
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
    params.current = 1;
    params.size = 10;
    fetch(HttpFetch.queryPersonList, {
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
      type: 'person/deletePerson',
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
      type: 'person/unApprovalPerson',
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
      type: 'person/approvalPerson',
      payload: { list: ids },
    });
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


}

export default IndexDetail;
