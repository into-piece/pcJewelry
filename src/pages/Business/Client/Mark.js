import React, { PureComponent } from 'react';

import {
  Card,
  Row,
  Col,
  Icon,
  Form,
  Select,
  Button,
  Input,
  Modal,
  Divider,
  List,notification,
  Upload,
  message,
} from 'antd';
import { connect } from 'dva';
import Cropper from 'react-cropper';
import styles from './base.less';
import DescriptionList from '@/components/DescriptionList';
import clientStyle from './Client.less';
import Deliver from '../Deliver/Deliver';
import MarkListItem from './components/MarkListItem';
// import   '../../../../node_modules/cropperjs/dist/cropper.css'; //需要找到相对的 node_modules 路径，必须引入该css文件！
import 'cropperjs/dist/cropper.css';
import UploadImg from '@/components/UploadImg';


const { Option } = Select;

const FormItem = Form.Item;
const { TextArea } = Input;
const { Description } = DescriptionList;
const listdata = [
  {
    code: '8009',
    clientName: 'App',
    country: 'Thailand',
  },
  {
    code: '8009',
    clientName: 'App',
    country: 'Thailand',
  },
  {
    code: '8009',
    clientName: 'App',
    country: 'Thailand',
  },
];

@connect(({ loading, mark }) => {
  return {
    body: mark.body,
    listEndCustomerDropDown: mark.listEndCustomerDropDown,
    // province: city.province,
    // areas: city.areas,
    // citys: city.citys,
    markListloading: loading.effects['mark/fetchListMark'],
    markSaveloading: loading.effects['mark/addMark'],
    markUpdateloading: loading.effects['mark/updateMark'],
    markDeleteloading: loading.effects['mark/deleteMark'],
    markFreezeloading: loading.effects['mark/freezeMark'],
    markunFreezeloading: loading.effects['mark/unfreezeMark'],
  };
})
@Form.create()
class Mark extends PureComponent {
  formLayout = {
    labelCol: { span: 12 },
    wrapperCol: {
      span: 24,
      // xs: { span: 24 },
      // sm: { span: 12 },
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      isEdit: true,
      isAddEdit: true,
      isAdd: true,
      update: false,
      customerId: '',
      selectedItem: '',
      filelist: [],
      cropperVisible: false,
    };
  }

  render() {
    const {
      location,
      body = {},
      markSaveloading,
      markUpdateloading,
      markDeleteloading,
      markFreezeloading,
      markunFreezeloading,
      markListloading,
      params,
      customLock,
    } = this.props;


    const { selectedItem, visible, current = {}, update, fileList, isAdd } = this.state;

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
        loading={markUpdateloading}
        onClick={() => {
          this.handleSubmit(true);
        }}
      >
        保存
      </Button>,
      <Button
        key="continue"
        type="primary"
        loading={markUpdateloading}
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
        loading={markUpdateloading}
        onClick={() => {
          this.handleSubmit(false);
        }}
      >
        保存
      </Button>,
    ];

    const isUpdate = markUpdateloading || markSaveloading || markDeleteloading || markFreezeloading || markunFreezeloading;
    if (isUpdate) {
      this.state.update = true;
      if (markUpdateloading) {
        this.state.isUpdateFrom = true;
      }
    } else if (update) {
      this.setState({
        terminalShotName: false,
      });
      // console.log('code '+body.rtnCode)
      if (body.rtnCode === '000000') {
        this.state.requestState = 'success';

        notification.success({
          message: body.rtnMsg,
        });
      } else {

        notification.error({
          message: body.rtnMsg,
        });
        this.state.requestState = 'error';
      }
      this.handleDone();

      this.state.update = false;
      if (this.state.isUpdateFrom) {
        this.state.isUpdateFrom = false;
        this.state.showItem = { ...current };
      }
    }

    if (params) {
      const data = { ...params };
      if (data.customerId !== this.state.customerId) {
        this.state.customerId = data.customerId;
        if (data.customerId !== '') this.loadMarklList();
      }

      if (data.customerId && data.customerId !== '') {
        this.state.isAddEdit = false;
        if (selectedItem !== '') this.state.isEdit = false;
        else this.state.isEdit = true;
      } else {
        this.state.isAddEdit = true;
        this.state.isEdit = true;
        this.state.selectedItem = '';
      }
    } else {
      this.state.isAddEdit = true;
      this.state.isEdit = true;
    }


    const isFreeze = (selectedItem && selectedItem.status === '2');

    return (
      <div className={styles.content}>
        <div className={styles.right_info}>
          <List
            loading={isUpdate || markListloading}
            dataSource={isUpdate || markListloading ? [] : !this.state.isAddEdit ? body.data : []}
            renderItem={this.getContantItem2}
            size="small"
            rowKey={v => {
              return v.id;
            }}
            style={{ paddingLeft: 10, paddingRight: 10 }}
            bordered={false}
            split
          />
        </div>
        <Card
          bodyStyle={{ paddingLeft: 5, paddingRight: 5, paddingTop: 5, paddingBottom: 5 }}
          className={styles.cardconrtll}
        >
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
                className={clientStyle.buttomControl}
                type="primary"
                icon="plus"
                size="small"
                onClick={this.clickNewFrom}
                disabled={this.state.isAddEdit || customLock}
              >
                新增
              </Button>
              <Button
                className={clientStyle.buttomControl}
                type="danger"
                icon="delete"
                size="small"
                onClick={this.clickDeleteFrom}
                disabled={this.state.isEdit || this.state.isAddEdit || isFreeze || customLock}
              >
                删除
              </Button>
              <Button
                className={clientStyle.buttomControl}
                type="primary"
                size="small"
                icon="edit"
                onClick={this.clickEditFrom}
                disabled={this.state.isEdit || this.state.isAddEdit || isFreeze || customLock}
              >
                编辑
              </Button>
              {
                isFreeze ? <Button
                  className={clientStyle.buttomControl}
                  size="small"
                  type="danger"
                  icon="unlock"
                  onClick={this.clickUnFreezeFrom}
                  disabled={this.state.isEdit || this.state.isAddEdit || customLock}
                >
                  取消审批
                </Button> : <Button
                             className={clientStyle.buttomControl}
                             size="small"
                             type="primary"
                             icon="lock"
                             onClick={this.clickFreezeFrom}
                             disabled={this.state.isEdit || this.state.isAddEdit || customLock}
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
                className={clientStyle.buttomControl}
                type="primary"
                size="small"
                icon="copy"
                disabled
              >
                复制
              </Button>
              <Button
                className={clientStyle.buttomControl}
                size="small"
                type="primary"
                icon="rollback"
                disabled
              >
                撤销
              </Button>
            </div>
          </div>
        </Card>
        <Modal
          maskClosable={false}
          width={640}
          className={styles.standardListForm}
          destroyOnClose
          visible={visible}
          footer={modalFooter}
          onCancel={this.handleCancel}
        >
          {this.getModalContent()}
        </Modal>
      </div>
    );
  }



  getContantItem2 = item => {
    const { selectedItem } = this.state;
    console.log(selectedItem,item)

    return (
      <div
        style={{ marginBottom: '10px' }}
        onClick={() => {
          this.changeSelectItem(item);
        }}
      >
        <MarkListItem
          item={item}
          isSelected={selectedItem.id === item.id}
        />
      </div>
    );
  };

  changeSelectItem = item => {
    // console.log('changeSelectItem');

    const { selectedItem } = this.state;
    const selectitem = selectedItem === item ? '' : item;

    this.setState({
      selectedItem: selectitem,
    });
  };

  loadMarklList = () => {
    // console.log('loadMarkList');
    const { dispatch } = this.props;
    dispatch({
      type: 'mark/fetchListMark',
      payload: { customerId: this.state.customerId },
    });
  };



  initDrop = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'mark/querylistEndCustomerDropDown',
      payload: { key: '74ec9b5cc01d8d5946cb283c1abe79bc' },
    });
  };


  clickNewFrom = () => {
    this.setState({
      visible: true,
      isAdd: true,
      terminalShotName: '',
      current: {},
      fileList: [],
    });
    this.initDrop();
  };

  clickEditFrom = () => {
    this.setState({
      current: this.state.selectedItem,
      visible: true,
      isAdd: false,
    });
    this.initDrop();

  };

  clickDeleteFrom = () => {
    const { selectedItem } = this.state;
    const { dispatch } = this.props;
    const { id } = selectedItem;
    if (id) {
      const keys = [];
      keys.push(id);
      // console.log('delet', keys, id);
      dispatch({
        type: 'mark/deleteMark',
        payload: { list: keys },
      });
    }

    this.setState({
      showItem: false,
      isEdit: true,
    });
    this.state.isEdit = true;
  };

  clickFreezeFrom = () => {
    const { selectedItem } = this.state;
    const { dispatch } = this.props;

    const { id } = selectedItem;
    if (id) {
      const keys = [];
      keys.push(id);
      dispatch({
        type: 'mark/freezeMark',
        payload: { list: keys },
      });
    }
  };

  clickUnFreezeFrom = () => {
    const { selectedItem } = this.state;
    const { dispatch } = this.props;

    const { id } = selectedItem;
    if (id) {
      const keys = [];
      keys.push(id);
      dispatch({
        type: 'mark/unfreezeMark',
        payload: { list: keys },
      });
    }
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      filelist:[]
    });
  };

  handleDone = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'mark/fetchListMark',
      payload: { customerId: this.state.customerId },
    });
    // this.setState({
    //   selectedItem: '',
    //   // fristLoad: true,
    // });
  };

  handleSubmit = (close) => {
    const { dispatch, form } = this.props;
    const { isAdd, customerId, selectedItem, imageUrl, imageName, filelist } = this.state;

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      let params = {};
      const fiedls = { ...fieldsValue };
      let marking = {};
      marking = fiedls;
      marking.customerId = this.state.customerId;
      // params.imgStr = this.state.urls;
      if (!isAdd) {
        marking.id = selectedItem.id;
        marking.markingNo = selectedItem.markingNo;
      }

      params = {...marking,picPath: filelist.map(e=>e.url)};

      dispatch({
        type: 'mark/updateMark',
        payload: {
          ...params,
        },
        callback: () => {
          this.setState({
            visible: !close,
            filelist: close?[]:filelist,
          });
        },
      });
    });
  };


  getModalContent = () => {

    const {
      form: { getFieldDecorator },
      listEndCustomerDropDown,
    } = this.props;

    const { cropperVisible, current = {}, terminalShotName } = this.state;

    return (
      <div className={clientStyle.list_info}>
        <span className={clientStyle.sun_title_info}>字印</span>
        <Divider className={clientStyle.divder} />
        <Form
          layout="inline"
          size="small"
          className={styles.from_content}
          labelAlign="left"
          onSubmit={this.handleSubmit}
        >
          <Row gutter={2}>
            <Col lg={24} md={24} sm={24} xs={24}>
              <FormItem label="字印图片" {...this.formLayout} className={styles.from_content_col}>
                <UploadImg
                  key="uimg"
                  maxcount={10}
                  defaultFileList={current.pictures || []}
                  fileListFun={(list) => {
                        this.setState({ filelist: list });
                      }}
                />
              </FormItem>
            </Col>
          </Row>

          <Row gutter={2} justify="start">
            <Col lg={12} md={12} sm={12} xs={12}>
              <FormItem label="终客编号" {...this.formLayout} className={styles.from_content_col}>
                {getFieldDecorator('endNo', {
                  initialValue: current.endNo,
                })(
                  <Select
                    placeholder="请选择"
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    onChange={(v, o) => {
                      const ff = listEndCustomerDropDown.filter(e => e.id === v);
                      const { form } = this.props;

                      form.setFieldsValue({ endShotName: ff[0].endShotName });

                    }}
                  >
                    {listEndCustomerDropDown && listEndCustomerDropDown.map(({ value, key }) =>
                      <Option value={value} key={value}>{key}</Option>,
                    )}
                  </Select>,
                )}
              </FormItem>
            </Col>
            <Col lg={12} md={12} sm={12} xs={12}>
              <FormItem label="终客简称" {...this.formLayout} className={styles.from_content_col}>
                {getFieldDecorator('endShotName', {
                  initialValue: current.endShotName,
                })(
                  <Input
                    placeholder="请输入"
                    readOnly="true"
                  /> ,
                )}
              </FormItem>
            </Col>
          </Row>

          <Row gutter={2}>
            <Col lg={12} md={12} sm={12} xs={12}>
              <FormItem label="中文名" {...this.formLayout} className={styles.from_content_col}>
                {getFieldDecorator('zhName', {
                  rules: [{ required: true, message: '请输入中文名' }],
                  initialValue: current.zhName,
                })(<Input placeholder="请输入" />)}
              </FormItem>
            </Col>
            <Col lg={12} md={12} sm={12} xs={12}>
              <FormItem label="英文名" {...this.formLayout} className={styles.from_content_col}>
                {getFieldDecorator('enName', {
                  rules: [{ required: true, message: '请输入英文名' }],
                  initialValue: current.enName,
                })(<Input placeholder="请输入" />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={2}>
            <Col lg={12} md={12} sm={12} xs={12}>
              <FormItem label="字印价" {...this.formLayout} className={styles.from_content_col}>
                {getFieldDecorator('markingPrice', {
                  rules: [{ message: '字印价' }],
                  initialValue: current.markingPrice,
                })(<Input placeholder="请输入" />)}
              </FormItem>
            </Col>
            <Col lg={12} md={12} sm={12} xs={12}>
              <FormItem label="字印说明" {...this.formLayout} className={styles.from_content_col}>
                {getFieldDecorator('markingExplain', {
                  rules: [{ message: '请输入字印说明' }],
                  initialValue: current.markingExplain,
                })(<Input placeholder="请输入" />)}
              </FormItem>
            </Col>
          </Row>
        </Form>

      </div>
    );
  };


}

export default Mark;
