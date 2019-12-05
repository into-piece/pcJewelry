import React, { PureComponent } from 'react';

import {
  Card,
  Row,
  Col,
  Table,
  Icon,
  Form,
  Select,notification,
  InputNumber,
  DatePicker,
  Tabs,
  Radio,
  Button,
  Input,
  Modal,
  Divider,
  Upload,
  List,
  message,
} from 'antd';
import DescriptionList from '@/components/DescriptionList';
import { connect } from 'dva';
import Cropper from 'react-cropper';
import clientStyle from './Client.less';
import styles from './base.less';
import PackageListItem from './components/PackageListItem';
import UploadImg from '@/components/UploadImg';

const { Option } = Select;

const FormItem = Form.Item;
const { TextArea } = Input;
const { Description } = DescriptionList;
@connect(({ loading, packageinfo }) => {
  return {
    body: packageinfo.body,
    listEndCustomerDropDown: packageinfo.listEndCustomerDropDown,
    packageListloading: loading.effects['packageinfo/fetchListPackage'],
    packageSaveloading: loading.effects['packageinfo/addPackage'],
    packageUpdateloading: loading.effects['packageinfo/updatePackage'],
    packageDeleteloading: loading.effects['packageinfo/deletePackage'],
    packageFreezeloading: loading.effects['packageinfo/freezePackage'],
    packageunFreezeloading: loading.effects['packageinfo/unfreezePackage'],
  };
})
@Form.create()
class PackageInfo extends PureComponent {
  formLayout = {
    labelCol: { span: 12 },
    wrapperCol: {
      span: 24,
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
      terminalShotName: '',
    };
  }

  initDrop = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'packageinfo/querylistEndCustomerDropDown',
      payload: { key: this.state.customerId  },
    });
  };

  render() {
    const {
      location,
      body = {},
      packageSaveloading,
      packageUpdateloading,
      packageDeleteloading,
      packageFreezeloading,
      packageunFreezeloading,
      packageListloading,
      params,
      customLock
    } = this.props;

    const { selectedItem, visible, current = {}, update, filelist ,isAdd} = this.state;

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
        loading={packageSaveloading}
        onClick={() => {
          this.handleSubmit(true);
        }}
      >
        保存
      </Button>,
      <Button
        key="continue"
        type="primary"
        loading={packageSaveloading}
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
        loading={packageSaveloading}
        onClick={() => {
          this.handleSubmit(false);
        }}
      >
        保存
      </Button>,
    ];

    const isUpdate =
      packageUpdateloading || packageSaveloading || packageDeleteloading || packageFreezeloading ||packageunFreezeloading;
    if (isUpdate) {
      this.state.update = true;
      if (packageUpdateloading) {
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
        if (data.customerId !== '') this.loadPackagelList();
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

    const isFreeze = (selectedItem&&selectedItem.status==='2');

    return (
      <div className={styles.content}>
        <div className={styles.right_info}>
          <List
            loading={isUpdate || packageListloading}
            dataSource={
              isUpdate || packageListloading ? [] : !this.state.isAddEdit ? body.data : []
            }
            style={{ paddingLeft: 10, paddingRight: 10 }}
            renderItem={this.getContantItem2}
            size="small"
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
                disabled={this.state.isAddEdit||customLock}
                size="small"
                onClick={this.clickNewFrom}
              >
                新增
              </Button>
              <Button
                className={clientStyle.buttomControl}
                type="danger"
                icon="delete"
                size="small"
                onClick={this.clickDeleteFrom}
                disabled={this.state.isEdit || this.state.isAddEdit||isFreeze||customLock}
              >
                删除
              </Button>
              <Button
                className={clientStyle.buttomControl}
                type="primary"
                size="small"
                icon="edit"
                onClick={this.clickEditFrom}
                disabled={this.state.isEdit || this.state.isAddEdit||isFreeze||customLock}
              >
                编辑
              </Button>
              {
                isFreeze? <Button
                  className={clientStyle.buttomControl}
                  size="small"
                  type="danger"
                  icon="unlock"
                  onClick={this.clickUnFreezeFrom}
                  disabled={this.state.isEdit || this.state.isAddEdit||customLock}
                >
                  取消审批
                </Button>: <Button
                            className={clientStyle.buttomControl}
                            size="small"
                            type="primary"
                            icon="lock"
                            onClick={this.clickFreezeFrom}
                            disabled={this.state.isEdit || this.state.isAddEdit||customLock}
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

  getModalContent = () => {
    const {
      form: { getFieldDecorator },
      listEndCustomerDropDown
    } = this.props;
    const { cropperVisible, terminalShotName, current = {} } = this.state;

    return (
      <div className={clientStyle.list_info}>
        <span className={clientStyle.sun_title_info}>包装</span>
        <Divider className={clientStyle.divder} />
        <Form
          accept="image/*"
          layout="inline"
          size="small"
          className={styles.from_content}
          labelAlign="left"
          onSubmit={this.handleSubmit}
        >
          <Row gutter={2} justify="start">
            <Col lg={24} md={24} sm={24} xs={24}>
              <FormItem
                label="包装说明图片"
                {...this.formLayout}
                className={styles.from_content_col}
              >
                <UploadImg
                  key="uimg22"
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
                      const ff = listEndCustomerDropDown.filter(e=>e.id === v)
                      const { form } = this.props;
                      form.setFieldsValue({ endShotName: ff[0].endShotName });
                    }}
                  >
                    {listEndCustomerDropDown&&listEndCustomerDropDown.map(({ value, key }) =>
                      <Option value={value} key={value}>{key}</Option>,
                    )}
                  </Select>,
                )}
              </FormItem>
            </Col>
            <Col lg={12} md={12} sm={12} xs={12}>
              <FormItem label="终客简称" {...this.formLayout} className={styles.from_content_col}>
                {getFieldDecorator('endShotName', {
                  initialValue:  current.endShotName,
                })(
                  <Input
                    placeholder="请输入"
                    readOnly="true"
                  />
                )}
              </FormItem>
            </Col>
          </Row>

          <Row gutter={2}>
            <Col lg={24} md={24} sm={24} xs={24}>
              <FormItem label="包装说明" {...this.formLayout} className={styles.from_content_col}>
                {getFieldDecorator('packExplain', {
                  rules: [{ required: true, message: '请输入包装说明' }],
                  initialValue: current.packExplain,
                })(<TextArea placeholder="请输入" style={{height:200}} />)}
              </FormItem>
            </Col>
          </Row>
        </Form>

      </div>
    );
  };


  getContantItem = item => {
    return (
      <Card
        hoverable
        className={selectedItem === item ? styles.list_selected_content : ''}
        onClick={() => {
          this.changeSelectItem(item);
        }}
        cover={
          <img
            alt="example"
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559223238&di=bd3da77adf53b2475750e850b6106117&imgtype=jpg&er=1&src=http%3A%2F%2Fres.cngoldres.com%2Fupload%2F2014%2F1029%2F3c1910541d8059177e7d3f598611c859.jpg%3F_%3D1414568255062"
          />
        }
      >
        <div>
          <DescriptionList size="small" col="2">
            <Description size="small" term="终客编号">
              {item.endNo}
            </Description>
            <Description size="small" term="终客简称">
              {item.endShotName}
            </Description>
            <Description size="small" term="包装说明编码">
              {item.packNo}
            </Description>
          </DescriptionList>

          <DescriptionList size="small" col="1">
            <Description term="包装说明">{item.packExplain}</Description>
          </DescriptionList>
        </div>
      </Card>
    );
  };

  getContantItem2 = item => {
    const { selectedItem } = this.state;

    return (
      <div
        style={{marginBottom:'10px'}}
        key={item.id}
        onClick={() => {
          this.changeSelectItem(item);
        }}
      >
        <PackageListItem

          item={item}
          isSelected={selectedItem.id === item.id}
        />
      </div>
    );
  };

  changeSelectItem = item => {
    const { selectedItem } = this.state;
    const selectitem = selectedItem === item ? '' : item;

    this.setState({
      selectedItem: selectitem,
    });
  };

  loadPackagelList = () => {
    // console.log('loadPackageList');
    const { dispatch } = this.props;
    dispatch({
      type: 'packageinfo/fetchListPackage',
      payload: { customerId: this.state.customerId },
    });
  };

  clickNewFrom = () => {
    this.initDrop();
    this.setState({
      visible: true,
      isAdd: true,
      current: {},
      filelist: [],
    });
  };

  clickEditFrom = () => {
    this.initDrop();
    this.state.isAdd = false;
    this.setState({
      current: this.state.selectedItem,
      visible: true,
    });
  };

  clickDeleteFrom = () => {
    const { selectedItem } = this.state;
    const { dispatch } = this.props;
    const {id} = selectedItem;
    if (id) {
      const keys = [];
      keys.push(id);
      // console.log('delet', keys, id);
      dispatch({
        type: 'packageinfo/deletePackage',
        payload: { list: keys },
      });
    }

    this.setState({
      showItem: false,
      isEdit: true,
    });
  };

  clickFreezeFrom = () => {
    const { selectedItem } = this.state;
    const { dispatch } = this.props;

    const {id} = selectedItem;
    if (id) {
      const keys = [];
      keys.push(id);
      dispatch({
        type: 'packageinfo/freezePackage',
        payload: { list: keys },
      });
    }
  };

  clickUnFreezeFrom = () => {
    const { selectedItem } = this.state;
    const { dispatch } = this.props;

    const {id} = selectedItem;
    if (id) {
      const keys = [];
      keys.push(id);
      dispatch({
        type: 'packageinfo/unfreezePackage',
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
      type: 'packageinfo/fetchListPackage',
      payload: { customerId: this.state.customerId },
    });
    // this.setState({
    //   selectedItem: '',
    //   // fristLoad: true,
    // });
  };

  handleSubmit = (close) => {
    const { dispatch, form } = this.props;
    const { isAdd, selectedItem, filelist,  } = this.state;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      let params = {};
      const fiedls = { ...fieldsValue };

      let pack = {};
      pack = fiedls;
      pack.customerId = this.state.customerId;
      if (!isAdd) {
        pack.id = selectedItem.id;
        pack.packNo = selectedItem.packNo;
      }
      params ={...pack,picPath:filelist.map(e=>e.url)}
      dispatch({
        type: 'packageinfo/addPackage',
        payload: {
          ...params,
        },
        callback:()=>{
          this.setState({
            visible:!close,
            filelist:close?[] :filelist,
          })
        }
      });


    });
  };
}

export default PackageInfo;
