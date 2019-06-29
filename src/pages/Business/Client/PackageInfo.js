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
  Upload,
  List,
  message,
} from 'antd';
import DescriptionList from '@/components/DescriptionList';
import clientStyle from './Client.less';
import styles from './base.less';
import { connect } from 'dva';
import ImageUpload from './components/ImageUpload';
import MarkListItem from './components/MarkListItem';
import PackageListItem from './components/PackageListItem';

import Cropper from 'react-cropper';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Description } = DescriptionList;


@connect(({ loading, packageinfo }) => {
  return {
    body: packageinfo.body,
    packageListloading: loading.effects['packageinfo/fetchListPackage'],
    packageSaveloading: loading.effects['packageinfo/addPackage'],
    packageUpdateloading: loading.effects['packageinfo/updatePackage'],
    packageDeleteloading: loading.effects['packageinfo/deletePackage'],
    packageFreezeloading: loading.effects['packageinfo/freezePackage'],
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
      fileList: [],
      cropperVisible: false,

    };
  }

  render() {

    const {
      location, body = {}, packageSaveloading,
      packageUpdateloading, packageDeleteloading, packageFreezeloading, packageListloading,
    } = this.props;


    const { selectedItem, visible, current = {}, update, fileList } = this.state;

    const isUpdate = packageUpdateloading || packageSaveloading || packageDeleteloading || packageFreezeloading;
    if (isUpdate) {
      this.state.update = true;
      if (packageUpdateloading) {
        this.state.isUpdateFrom = true;
      }
    } else {
      if (update) {
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


    if (location && location.params) {
      const data = location.params;
      if (data.customerId !== this.state.customerId) {
        this.state.customerId = data.customerId;
        if (data.customerId !== '')
          this.loadPackagelList();
      }

      if (data.customerId && data.customerId !== '')
        this.state.isAddEdit = false;
      else
        this.state.isAddEdit = true;

      if (selectedItem !== '')
        this.state.isEdit = false;
      else
        this.state.isEdit = true;


    } else {
      this.state.isAddEdit = true;
      this.state.isEdit = true;

    }


    const getBase64 = (img, callback) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => callback(reader.result));
      reader.readAsDataURL(img);
    };


    const modalFooter = this.state.done
      ? { footer: null, onCancel: this.handleDone }
      : { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };


    const modalCropperFooter = this.state.done
      ? { footer: null, onCancel: this.handleCropDone }
      : { okText: '保存', onOk: this.handleCropSubmit, onCancel: this.handleCropCancle };




    const getModalContent = () => {

      const openCutImageModal = () => {
        const crop = () => {
          // image in dataUrl
          const cropi = this.refs.cropper.getCroppedCanvas().toDataURL();
          // console.log("crop image "+cropi);
          this.setState({
            cropImage: cropi,
          });

        };

        const { cropImage, uploadFile } = this.state;

        return (
          <div className={styles.cropper_view}>
            <Cropper
              ref="cropper"
              src={uploadFile}
              className={styles.cropper}
              style={{ height: 400 }}
              preview='.cropper-preview'
              viewMode={1} //定义cropper的视图模式
              zoomable={true} //是否允许放大图像
              guides={true}
              background={true}
              crop={crop}
            />
            <img className={styles.cropper_preview} src={cropImage}/>
          </div>
        );
      };
      const handleChange = info => {


        let fileList = [...info.fileList];

        const file = info.file;

        if (file.type) {
          const isJPG = (file.type.indexOf('image') != -1);
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
            getBase64(file.originFileObj, imageUrl => {

              fileList.forEach(((v, i) => {

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
                ;
              }));
              return file;
            });
          }
          return file
        });
        this.setState({ fileList });
      };

      const { form: { getFieldDecorator } } = this.props;
      const { cropperVisible } = this.state;

      return (
        <div className={clientStyle.list_info}>
          <span className={clientStyle.sun_title_info}>包装</span>
          <Divider className={clientStyle.divder}/>
          <Form
            accept="image/*"
            layout="inline"
            size={'small'}
            className={styles.from_content}
            labelAlign="left"
            onSubmit={this.handleSubmit}>

            <Row gutter={2} justify="start">
              <Col lg={24} md={24} sm={24} xs={24}>

                <FormItem label="包装说明图片" {...this.formLayout} className={styles.from_content_col}>
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    beforeUpload={() => {
                      return false;
                    }}
                    fileList={this.state.fileList ? this.state.fileList : []}
                    onChange={handleChange}
                  >
                    <div>
                      <Icon type={this.state.loading ? 'loading' : 'plus'}/>
                      <div className="ant-upload-text">上传图片</div>
                    </div>
                  </Upload>,
                </FormItem>
              </Col>
            </Row>

            <Row gutter={2} justify="start">
              <Col lg={12} md={12} sm={12} xs={12}>
                <FormItem label="终客编号" {...this.formLayout} className={styles.from_content_col}>
                  {getFieldDecorator('endNo', {
                    rules: [{ message: '请输入终客编号' }],
                    initialValue: current.endNo,
                  })(
                    <Input placeholder="请输入"/>,
                  )}
                </FormItem>
              </Col>
              <Col lg={12} md={12} sm={12} xs={12}>

                <FormItem label="终客简称" {...this.formLayout} className={styles.from_content_col}>
                  {getFieldDecorator('endShotName', {
                    rules: [{ required: true, message: '请输入终客简称' }],
                    initialValue: current.endShotName,
                  })(
                    <Input placeholder="请输入"/>,
                  )}
                </FormItem>
              </Col>
            </Row>

            <Row gutter={2}>
              <Col lg={12} md={12} sm={12} xs={12}>
                <FormItem label="包装说明" {...this.formLayout} className={styles.from_content_col}>
                  {getFieldDecorator('packExplain', {
                    rules: [{ required: true, message: '请输入包装说明' }],
                    initialValue: current.packExplain,
                  })(
                    <Input placeholder="请输入"/>,
                  )}
                </FormItem>
              </Col>


            </Row>

          </Form>
          <Modal
            {...modalCropperFooter}
            width={740}
            destroyOnClose
            visible={cropperVisible}
          >
            {openCutImageModal()}
          </Modal>

        </div>)
        ;
    };


    return (<div className={styles.content}>
      <div className={styles.right_info}>
        <List
          loading={isUpdate || packageListloading}
          dataSource={(isUpdate || packageListloading) ? [] : (!this.state.isAddEdit) ? body.data : []}
          renderItem={this.getContantItem2}
          size="small"
          bordered={false}
          split={true}

        />
      </div>

      <Card bodyStyle={{ paddingLeft: 5, paddingRight: 5, paddingTop: 5, paddingBottom: 5 }}
            className={styles.cardconrtll}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            flexDirection: 'column',
          }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button className={clientStyle.buttomControl} type="primary" icon="plus"
                    disabled={this.state.isAddEdit} size={'small'} onClick={this.clickNewFrom}>新增</Button>
            <Button className={clientStyle.buttomControl} type="danger" icon="delete" size={'small'}
                    onClick={this.clickDeleteFrom}
                    disabled={this.state.isEdit || this.state.isAddEdit}>删除</Button>
            <Button className={clientStyle.buttomControl} type="primary" size={'small'}
                    icon="edit" onClick={this.clickEditFrom}
                    disabled={this.state.isEdit || this.state.isAddEdit}>编辑</Button>
            <Button className={clientStyle.buttomControl} size={'small'} type="primary" icon="lock"
                    onClick={this.clickFreezeFrom} disabled={this.state.isEdit || this.state.isAddEdit}>冻结</Button>
          </div>


          <div
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingTop: 10 }}>
            <Button className={clientStyle.buttomControl} type="primary" size={'small'}
                    icon="copy" disabled>复制</Button>
            <Button className={clientStyle.buttomControl} size={'small'} type="primary" icon="rollback"
                    disabled>撤销</Button>
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
        {getModalContent()}
      </Modal>
    </div>);
  };



  handleCropSubmit = () => {
    // console.log('handleCropSubmit');
    const { cropImage, uploadFileUid, fileList } = this.state;

    fileList.forEach(((v, i) => {
      if (v.uid === uploadFileUid) {
        fileList[i].name = 'crop'+Date.parse(new Date())+fileList[i].name;
        fileList[i].url = cropImage;
        fileList[i].thumbUrl = cropImage;
        // console.log("set file url ",cropImage)
      };
    }));

    this.setState({
      cropperVisible: false,
      fileList,
    });
  };


  handleCropCancle = () => {
    console.log('handleCropCancle');
    this.setState({
      cropperVisible: false,
      cropImage:'',
      uploadFileUid:''

    });


  };


  handleCropDone = () => {
    console.log('handleCropDone');
    this.setState({
      cropperVisible: false,
      cropImage:'',
      uploadFileUid:''
    });
  };



  getContantItem = (item) => {
    return (
      <Card
        hoverable
        className={selectedItem === item ? styles.list_selected_content : ''} onClick={() => {
        this.changeSelectItem(item);
      }}
        cover={<img alt="example"
                    src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559223238&di=bd3da77adf53b2475750e850b6106117&imgtype=jpg&er=1&src=http%3A%2F%2Fres.cngoldres.com%2Fupload%2F2014%2F1029%2F3c1910541d8059177e7d3f598611c859.jpg%3F_%3D1414568255062"/>}
      >
        <div>
          <DescriptionList size='small' col='2'>
            <Description size="small" term='终客编号'>{item.endNo}</Description>
            <Description size="small" term='终客简称'>{item.endShotName}</Description>
            <Description size="small" term='包装说明编码'>{item.packNo}</Description>
          </DescriptionList>

          <DescriptionList size="small" col="1"><Description
            term='包装说明'>{item.packExplain}</Description></DescriptionList>
        </div>
      </Card>
    );
  };


  getContantItem2 = (item) => {

    const { selectedItem } = this.state;

    return (

      <div onClick={() => {
        this.changeSelectItem(item);
      }}>
        <PackageListItem item={item} callbackUrl={this.callbackUrl}
                         isSelected={selectedItem === item}
        />
      </div>
    );
  };

  callbackUrl = (item) => {
    let fileList = [];
    if (item) {
      fileList = item.map(v => (
        {
          uid: v.id,
          name: v.fileName,
          status: 'done',
          url: v.path,
        }
      ));
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
    // console.log('upload edit list ', fileList);
    this.state.fileList = this.state.fileList;
    this.setState({
      fileList,
    });


  };


  changeSelectItem = (item) => {

    const { selectedItem } = this.state;
    let selectitem = selectedItem === item ? '' : item;

    this.setState({
      selectedItem: selectitem,
    });

  };

  loadPackagelList = () => {
    console.log('loadPackageList');
    const { dispatch } = this.props;
    dispatch({
      type: 'packageinfo/fetchListPackage',
      payload: { 'customerId': this.state.customerId },
    });

  };


  clickNewFrom = () => {
    this.setState({
      visible: true,
      isAdd: true,
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
      console.log('delet', keys, id);
      dispatch({
        type: 'packageinfo/deletePackage',
        payload: { 'list': keys },
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
        type: 'packageinfo/freezePackage',
        payload: { 'list': keys },
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
      type: 'packageinfo/fetchListPackage',
      payload: { 'customerId': this.state.customerId },
    });
    this.setState({
      visible: false,
      selectedItem: '',
      // fristLoad: true,
    });
  };


  handleSubmit = () => {


    const { dispatch, form } = this.props;
    const { isAdd, selectedItem, fileList, imageUrl, imageName } = this.state;


    form.validateFields((err, fieldsValue) => {

      if (err) return;


      let params = {};
      let urls, names;
      const fiedls = { ...fieldsValue };

      if (fileList.length > 0) {
        urls = fileList.map(v => (
          v.url
        ));

        names = fileList.map(v => (
          v.name
        ));
      }
      let pack = {};
      pack = fiedls;
      pack.customerId = this.state.customerId;
      params.imgStr = urls;
      params.fileName = names;
      params.pack = pack;
      console.log('package', params);
      if (!isAdd) {
        params.pack.id = selectedItem.id;
        params.pack.packNo = selectedItem.packNo;
      }

      dispatch({
        type: 'packageinfo/addPackage',
        payload: {
          ...params,
        },

      });

      this.setState({
        visible: false,
      });
    });
  };
}


export default PackageInfo;
