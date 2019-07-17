import React, { PureComponent } from 'react';

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
  Modal,
  Divider,
  List,
  Upload,
  message,
} from 'antd';
import styles from './base.less';
import DescriptionList from '@/components/DescriptionList';
import clientStyle from './Client.less';
import { connect } from 'dva';
import Deliver from '../Deliver/Deliver';
import MarkListItem from './components/MarkListItem';
import Cropper from 'react-cropper';
// import   '../../../../node_modules/cropperjs/dist/cropper.css'; //需要找到相对的 node_modules 路径，必须引入该css文件！
import 'cropperjs/dist/cropper.css';

import TerminalSelected from './components/TerminalSelected';

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
    // province: city.province,
    // areas: city.areas,
    // citys: city.citys,
    markListloading: loading.effects['mark/fetchListMark'],
    markSaveloading: loading.effects['mark/addMark'],
    markUpdateloading: loading.effects['mark/updateMark'],
    markDeleteloading: loading.effects['mark/deleteMark'],
    markFreezeloading: loading.effects['mark/freezeMark'],
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
      fileList: [],
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
      markListloading,
      params,
    } = this.props;

    const modalFooter = { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };

    const { selectedItem, visible, current = {}, update, fileList } = this.state;

    const isUpdate = markUpdateloading || markSaveloading || markDeleteloading || markFreezeloading;
    if (isUpdate) {
      this.state.update = true;
      if (markUpdateloading) {
        this.state.isUpdateFrom = true;
      }
    } else {
      if (update) {
        this.setState({
          terminalShotName: false,
        });
        // console.log('code '+body.rtnCode)
        if (body.rtnCode === '000000') {
          this.state.requestState = 'success';
          message.success(body.rtnMsg);
        } else {
          message.error(body.rtnMsg);
          this.state.requestState = 'error';
        }
        this.handleDone();

        this.state.update = false;
        if (this.state.isUpdateFrom) {
          this.state.isUpdateFrom = false;
          this.state.showItem = { ...current };
        }
      }
    }

    if (params) {
      const data = { ...params };
      if (data.customerId !== this.state.customerId) {
        this.state.customerId = data.customerId;
        if (data.customerId !== '') this.loadMarklList();
      }

      if (data.customerId && data.customerId !== '') this.state.isAddEdit = false;
      else this.state.isAddEdit = true;

      if (selectedItem !== '') this.state.isEdit = false;
      else this.state.isEdit = true;
    } else {
      this.state.isAddEdit = true;
      this.state.isEdit = true;
    }

    return (
      <div className={styles.content}>
        <div className={styles.right_info}>
          <List
            loading={isUpdate || markListloading}
            dataSource={isUpdate || markListloading ? [] : !this.state.isAddEdit ? body.data : []}
            renderItem={this.getContantItem2}
            size="small"
            style={{paddingLeft:10,paddingRight:10}}
            bordered={false}
            split={true}
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
                size={'small'}
                onClick={this.clickNewFrom}
                disabled={this.state.isAddEdit}
              >
                新增
              </Button>
              <Button
                className={clientStyle.buttomControl}
                type="danger"
                icon="delete"
                size={'small'}
                onClick={this.clickDeleteFrom}
                disabled={this.state.isEdit || this.state.isAddEdit}
              >
                删除
              </Button>
              <Button
                className={clientStyle.buttomControl}
                type="primary"
                size={'small'}
                icon="edit"
                onClick={this.clickEditFrom}
                disabled={this.state.isEdit || this.state.isAddEdit}
              >
                编辑
              </Button>
              <Button
                className={clientStyle.buttomControl}
                size={'small'}
                type="primary"
                icon="lock"
                onClick={this.clickFreezeFrom}
                disabled={this.state.isEdit || this.state.isAddEdit}
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
                className={clientStyle.buttomControl}
                type="primary"
                size={'small'}
                icon="copy"
                disabled
              >
                复制
              </Button>
              <Button
                className={clientStyle.buttomControl}
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
        <Modal
          width={640}
          className={styles.standardListForm}
          destroyOnClose
          visible={visible}
          {...modalFooter}
        >
          {this.getModalContent()}
        </Modal>
      </div>
    );
  }

  handleCropSubmit = () => {
    console.log('handleCropSubmit');
    const {  uploadFileUid, fileList } = this.state;

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
    console.log('handleCropCancle');


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



  getContantItem2 = item => {
    const { selectedItem } = this.state;

    return (
      <div
        onClick={() => {
          this.changeSelectItem(item);
        }}
      >
        <MarkListItem
          item={item}
          callbackUrl={this.callbackUrl}
          isSelected={selectedItem === item}
        />
      </div>
    );
  };

  changeSelectItem = item => {
    // console.log('changeSelectItem');

    const { selectedItem } = this.state;
    let selectitem = selectedItem === item ? '' : item;

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

  callbackUrl = item => {
    console.log("callbackUrl")
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
    // console.log('upload edit list ',fileList)
    // this.state.fileList = this.state.fileList;
    this.setState({
      fileList,
    });
  };

  clickNewFrom = () => {
    this.setState({
      visible: true,
      isAdd: true,
      terminalShotName:'',
      current: {},
      fileList: [],
    });
  };

  clickEditFrom = () => {
    this.state.isAdd = false;
    this.setState({
      current: this.state.selectedItem,
      visible: true,
    });
  };

  clickDeleteFrom = () => {
    const { selectedItem } = this.state;
    const { dispatch } = this.props;
    const id = selectedItem.id;
    if (id) {
      let keys = [];
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
  };

  clickFreezeFrom = () => {
    const { selectedItem } = this.state;
    const { dispatch } = this.props;

    const id = selectedItem.id;
    if (id) {
      let keys = [];
      keys.push(id);
      dispatch({
        type: 'mark/freezeMark',
        payload: { list: keys },
      });
    }
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  handleDone = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'mark/fetchListMark',
      payload: { customerId: this.state.customerId },
    });
    this.setState({
      visible: false,
      selectedItem: '',
      // fristLoad: true,
    });
  };

  handleSubmit = () => {
    const { dispatch, form } = this.props;
    const { isAdd, customerId, selectedItem, imageUrl, imageName, fileList } = this.state;

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      let params = {};
      const fiedls = { ...fieldsValue };

      const urls = fileList.map(v => v.url);

      const names = fileList.map(v => v.name);

      let marking = {};
      marking = fiedls;
      marking.customerId = this.state.customerId;
      params.imgStr = urls;
      // params.imgStr = this.state.urls;
      params.fileName = names;
      params.marking = marking;
      // console.log('file List ', urls, names,fileList);
      if (!isAdd) {
        params.marking.id = selectedItem.id;
        params.marking.markingNo = selectedItem.markingNo;
      }
      dispatch({
        type: 'mark/updateMark',
        payload: {
          ...params,
        },
      });
    });
  };

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };


  getModalContent = () => {

    const modalCropperFooter = {
      okText: '保存',
      onOk: this.handleCropSubmit,
      onCancel: this.handleCropCancle,
    };
    const handleChange = info => {
      // console.log("handleChange")
      const { current } = this.state;

      let fileList = [...info.fileList];

      // const imageUrl = this.state.imageUrl;

      const file = info.file;

      console.log('handleChange = ', file);

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
    const openCutImageModal = () => {

      const {  uploadFile } = this.state;

      return (
        <div className={styles.cropper_view}>
          <Cropper
            ref="cropper"
            src={uploadFile}
            className={styles.cropper}
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
          <div className="img-preview"   style={{width:'100%',height:'100%'}}/>
          </div>
        </div>
      );
    };
    const {
      form: { getFieldDecorator, setFieldsValue },
    } = this.props;

    const { cropperVisible, current = {}, terminalShotName } = this.state;

    return (
      <div className={clientStyle.list_info}>
        <span className={clientStyle.sun_title_info}>字印</span>
        <Divider className={clientStyle.divder} />
        <Form
          layout="inline"
          size={'small'}
          className={styles.from_content}
          labelAlign="left"
          onSubmit={this.handleSubmit}
        >
          <Row gutter={2}>
            <Col lg={24} md={24} sm={24} xs={24}>
              <FormItem label="字印图片" {...this.formLayout} className={styles.from_content_col}>
                <Upload
                  accept="image/*"
                  name="avatar"
                  beforeUpload={file => {
                    return false;
                  }}
                  // customRequest={this.customRequest}
                  listType="picture-card"
                  fileList={this.state.fileList ? this.state.fileList : []}
                  onChange={handleChange}
                >
                  {/*{imageUrl?'':uploadButton}*/}
                  <div>
                    <Icon type={this.state.loading ? 'loading' : 'plus'} />
                    <div className="ant-upload-text">上传图片</div>
                  </div>
                </Upload>
              </FormItem>
            </Col>
          </Row>

          <Row gutter={2} justify="start">
            <Col lg={12} md={12} sm={12} xs={12}>
              <FormItem label="终客编号" {...this.formLayout} className={styles.from_content_col}>
                {getFieldDecorator('endNo', {
                  initialValue: current.endNo,
                })(
                  <TerminalSelected
                    content={current.endNo}
                    onSelectEndName={file => {
                      // console.log('end name ', file);
                      this.setState({
                        terminalShotName: file,
                      });
                    }}
                  />
                )}
              </FormItem>
            </Col>
            <Col lg={12} md={12} sm={12} xs={12}>
              <FormItem label="终客简称" {...this.formLayout} className={styles.from_content_col}>
                {getFieldDecorator('endShotName', {
                  initialValue: terminalShotName ? terminalShotName : current.endShotName,
                })(
                  <div>
                    <Input
                      placeholder="请输入"
                      readOnly="true"
                      value={terminalShotName ? terminalShotName : current.endShotName}
                    />
                  </div>
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
        <Modal {...modalCropperFooter} width={740} destroyOnClose visible={cropperVisible}>
          {openCutImageModal()}
        </Modal>
      </div>
    );
  };





}

export default Mark;
