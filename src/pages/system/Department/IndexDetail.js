import React, { Component } from 'react';
import {
  Card,
  Row,
  Col,
  Form,
  Button,
  Input,
  Divider, Carousel, Modal, message, Spin,
} from 'antd';
import  ModalConfirm from '@/utils/modal';

import business from '@/pages/dev/business.less';
import baseStyles from '@/pages/Business/Client/base.less';
import DescriptionList from '@/components/DescriptionList';
import styles from './Index.less';
import 'cropperjs/dist/cropper.css';
import clientStyle from '@/pages/Business/Client/Client.less';
import HttpFetch from '@/utils/HttpFetch';
import Zmage from 'react-zmage';
import { connect } from 'dva';
import { getCurrentUser } from '@/utils/authority';

const { Description } = DescriptionList;

const FormItem = Form.Item;
const { TextArea } = Input;
@connect(({ dept, loading }) => {
  const { rtnCode, rtnMsg } = dept;
  return {
    body: dept.body,
    rtnCode,
    rtnMsg,
    addDeptloading: loading.effects['dept/addDept'],
    fetchListDeptloading: loading.effects['dept/fetchListDept'],
    deptUpdateloading: loading.effects['dept/updateDept'],
    deptDeleteloading: loading.effects['dept/deleteDept'],
    approvalDeptloading: loading.effects['dept/approvalDept'],
    cancelDeptloading: loading.effects['dept/cancelDept'],
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
      addDeptloading,
      fetchListDeptloading,
      deptUpdateloading,
      deptDeleteloading,
      approvalDeptloading,
      cancelDeptloading,
      body = {},
      isloading,
      refarshList,
      isLoad,
      item,
    } = this.props;

    const { update,  productParams } = this.state;

    // (item)


    const isUpdate =
      addDeptloading  || deptUpdateloading || deptDeleteloading  || approvalDeptloading || cancelDeptloading

    if (isUpdate) {
      this.state.update = true;
      if (deptUpdateloading || addDeptloading) {
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

        this.state.update = false;
        if (this.state.isUpdateFrom) {
          this.state.isUpdateFrom = false;
        }

        if (refarshList)
          refarshList();


      }


    const updat = isUpdate || fetchListDeptloading;
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
    const v = showItem||{};
    if (v.status == 0) {
      v.statusVar = '输入';
    } else if (v.status == 1) {
      v.statusVar = '使用中';
    } else if (v.status == 2) {
      v.statusVar = '审批';
    }
    // console.log(" fetch isload ",showItem)
    // console.log(" data status ",showItem?showItem.status:'nudefine')

    if (!paths) paths = [];

    return (<div className={business.right_info}>
      <div className={business.list_info}>

        <span className={business.title_info} onClick={this.clickToggleDrawer}>
            部门信息
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
                    <Description term="部门编号">{showItem.role}</Description>
                    <Description term="部门简称">{showItem.shortName}</Description>
                    <Description term="中文名">{showItem.zhName}</Description>
                    <Description term="英文名">{showItem.enName}</Description>
                    <Description term="状态">{showItem.statusVar}</Description>
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
                  onClick={()=>{ModalConfirm({content:"确定删除吗？",onOk:()=>{this.handleDeleteProduct();}});}}
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
                    onClick={()=>{ModalConfirm({content:"确定取消审批吗？",onOk:()=>{this.handleUnFreezeProduct();}});}}
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
                      onClick={()=>{ModalConfirm({content:"确定审批吗？",onOk:()=>{this.handleFreezeProduct();}});}}
                    >
                      审批
                    </Button>
                }

              </div>


            </div>
            <Modal
              width={600}
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

    const { form: { getFieldDecorator, getFieldValue } } = this.props;
    const { current = {}} = this.state;



    return (
      <div className={clientStyle.list_info}>
        <span className={business.sun_title_info}>部门信息</span>
        <Divider className={business.divder} />
        <Form
          size="small"
          labelAlign="left"
          layout="inline"
          className={clientStyle.from_content}
          onSubmit={this.handleContactsSubmit}
        >
          <Row gutter={2}>
            <Col lg={12} md={12} sm={12} xs={12}>
              <FormItem
                label="部门编号"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('role', {
                  rules: [{ required: true, message: '请输入部门编号' }],
                  initialValue: current.role,
                })
                (<Input  />)
                }
              </FormItem>
            </Col>

            <Col lg={12} md={12} sm={12} xs={12}>
              <FormItem
                label="部门简称"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('shortName', {
                  initialValue: current.shortName,
                  rules: [{ required: true, message: '请输入部门简称' }],
                })(<Input  />)}
              </FormItem>
            </Col>
          </Row>

          <Row gutter={2}>
            <Col lg={12} md={12} sm={12} xs={12}>
              <FormItem
                label='中文名称'
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('zhName', {
                  rules: [{ required: true, message: '请输入部门中文名称' }],
                  initialValue: current.zhName,
                })(<Input  />)}
              </FormItem>
            </Col>

            <Col lg={12} md={12} sm={12} xs={12}>
              <FormItem
                label="英文名称"
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('enName', {
                  rules: [{   message: '请输入部门英文名称' }],
                  initialValue: current.enName,
                })(<Input  />)}
              </FormItem>
            </Col>
          </Row>

          <Row gutter={2}>
            <Col lg={12} md={12} sm={12} xs={12}>
              <FormItem
                label='备注'
                {...this.centerFormLayout}
                className={business.from_content_col}
              >
                {getFieldDecorator('remarks', {
                  initialValue: current.remarks,
                })(<TextArea placeholder="请输入" />)}
              </FormItem>
            </Col>

          </Row>
        </Form>
      </div>
    );
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


    fetch(HttpFetch.queryDeptList, {
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


  handleDeleteProduct = () => {
    const { selectProductData } = this.props;


    const ids = selectProductData.map(v => {
      return v.id;
    });

    const { dispatch } = this.props;


    dispatch({
      type: 'dept/deleteDept',
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
    const { dispatch } = this.props;

    dispatch({
      type: 'dept/cancelDept',
      payload: { list: ids },
    });
  };

  handleFreezeProduct = () => {

    const { selectProductData = [] } = this.props;
    const ids = selectProductData.map(v => {
      return v.id;
    });
    const { dispatch } = this.props;

    dispatch({
      type: 'dept/approvalDept',
      payload: { list: ids },
    });
  };

  handleSubmit = () => {

    const { dispatch, form } = this.props;
    const { isAdd, fileList, showItem } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }

      const params   = { ...fieldsValue };

      const urls = fileList.map(v => v.url);
      const names = fileList.map(v => v.name);
      if (isAdd) {
        dispatch({
          type: 'dept/addDept',
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
          type: 'dept/updateDept',
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


}

export default IndexDetail;
