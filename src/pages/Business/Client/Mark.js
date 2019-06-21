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

const FormItem = Form.Item;
const { TextArea } = Input;
const { Description } = DescriptionList;
const listdata = [{

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

  }];


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
      provinces: [],
      areas: [],
      city: [],
    };
  }


  render() {

    const {
      location, body = {}, markSaveloading,
      markUpdateloading, markDeleteloading, markFreezeloading, markListloading,
    } = this.props;


    const { selectedItem, visible, current = {}, update } = this.state;

    const isUpdate = markUpdateloading || markSaveloading || markDeleteloading || markFreezeloading;
    if (isUpdate) {
      this.state.update = true;
      if (markUpdateloading) {
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
          this.loadMarklList();
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


    const getModalContent = () => {

      const normFile = (e) => {
        return this.state.imageUrl;
      };

      const handleChange = info => {

        // console.log('info = ', info);
        let fileList = [...info.fileList];

        this.state.imageUrl = false;
        this.state.fileName = false;

        if (info.file.status === 'done') {
          getBase64(info.file.originFileObj, imageUrl => {
              let imageName;
              if (info.file)
                imageName = info.file.name;
              this.setState({
                imageUrl,
                imageName,
                loading: false,
              });
              // console.log("上传的图片 ",imageUrl)
              this.state.imageUrl = imageUrl;
              this.state.fileName = imageName;
            },
          );
        }


        const file = info.file;

        if (file.type) {
          const isJPG = (file.type.indexOf('image') != -1);
          if (!isJPG) {
            message.error('只能上传图片格式的文件');
            return;
          }
        }
        if (file.size) {
          const isLt2M = file.size / 1024 / 1024 < 3;
          if (!isLt2M) {
            message.error('上传图片不能大于 3MB!');
            return;
          }
        }

        fileList = fileList.slice(-1);
        fileList = fileList.map(file => {
          if (file.response) {
            file.url = file.response.url;
          }
          return file;
        });

        this.setState({ fileList });

      };
      const { form: { getFieldDecorator } } = this.props;


      const imageUrl = this.state.imageUrl;
      return (

        <div className={clientStyle.list_info}>
          <span className={clientStyle.sun_title_info}>字印</span>
          <Divider className={clientStyle.divder}/>
          <Form
            layout="inline"
            size={'small'}
            className={styles.from_content}
            labelAlign="left"
            onSubmit={this.handleSubmit}>


            <Row gutter={2}>

              <Col lg={12} md={12} sm={12} xs={12}>

                <FormItem label="字印图片" {...this.formLayout} className={styles.from_content_col}>

                    <Upload
                      name="avatar"
                      listType="picture-card"
                      className="avatar-uploader"
                      fileList={this.state.fileList}
                      onChange={handleChange}
                    >
                      {/*{imageUrl?'':uploadButton}*/}
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
                    rules: [{ required: true, message: '请输入终客编号' }],
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
                <FormItem label="中文名" {...this.formLayout} className={styles.from_content_col}>
                  {getFieldDecorator('zhName', {
                    rules: [{ message: '请输入中文名' }],
                    initialValue: current.zhName,
                  })(
                    <Input placeholder="请输入"/>,
                  )}
                </FormItem>
              </Col>
              <Col lg={12} md={12} sm={12} xs={12}>

                <FormItem label="英文名" {...this.formLayout} className={styles.from_content_col}>
                  {getFieldDecorator('enName', {
                    rules: [{ message: '请输入英文名' }],
                    initialValue: current.enName,
                  })(
                    <Input placeholder="请输入"/>,
                  )}
                </FormItem>
              </Col>


            </Row>
            <Row gutter={2}>
              <Col lg={12} md={12} sm={12} xs={12}>
                <FormItem label="字印价" {...this.formLayout} className={styles.from_content_col}>
                  {getFieldDecorator('markingPrice', {
                    rules: [{ message: '字印价' }],
                    initialValue: current.markingPrice,
                  })(
                    <Input placeholder="请输入"/>,
                  )}
                </FormItem>
              </Col>
              <Col lg={12} md={12} sm={12} xs={12}>

                <FormItem label="字印说明" {...this.formLayout} className={styles.from_content_col}>
                  {getFieldDecorator('markingExplain', {
                    rules: [{ message: '请输入字印说明' }],
                    initialValue: current.markingExplain,
                  })(
                    <Input placeholder="请输入"/>,
                  )}
                </FormItem>
              </Col>


            </Row>


          </Form>
        </div>

      );
    };

    const modalFooter = this.state.done
      ? { footer: null, onCancel: this.handleDone }
      : { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };


    return (<div className={styles.content}>
      <div className={styles.right_info}>
        <List
          loading={isUpdate || markListloading}
          dataSource={(!this.state.isAddEdit) ? body.data : []}
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
                    size={'small'} onClick={this.clickNewFrom} disabled={this.state.isAddEdit}>新增</Button>
            <Button className={clientStyle.buttomControl} type="danger" icon="delete" size={'small'}
                    onClick={this.clickDeleteFrom} disabled={this.state.isEdit || this.state.isAddEdit}>删除</Button>
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
  }


  getContantItem = (item) => {

    const { selectedItem } = this.state;

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
            <Description size="small" term='字印编号'>{item.markingNo}</Description>
            <Description term='字印价'>{item.endNo}</Description>
          </DescriptionList>
          <DescriptionList size='small' col='1'>
            <Description term='字印英文名'>{item.enName}</Description>
            <Description term='字印中文名'>{item.zhName}</Description>
            <Description term='字印说明'>{item.markingExplain}</Description>
          </DescriptionList>
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
        <MarkListItem item={item} callbackUrl={this.callbackUrl}
                      isSelected={selectedItem === item}
        />
      </div>
    );
  };


  changeSelectItem = (item) => {
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
      payload: { 'customerId': this.state.customerId },
    });

  };


  callbackUrl = (item) => {

    let fileList = [];
    if (item && item.path) {

      fileList = [
        {
          uid: item.id,
          name: item.fileName,
          status: 'done',
          url: item.path,
        },
      ];
      this.state.imageUrl = item.path;
      this.state.fileName = item.fileName;
    } else {
      this.state.imageUrl = '';
      this.state.fileName = '';
    }
    this.setState({
      fileList,
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
    //

    this.state.isAdd = false;
    // this.state.selectedItem.markingPic="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAB2wAAAdsBV+WHHwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAIiSURBVEiJ7ZbPaxNBFMe/b6wxllLRg/jj7qU30Sp6UiokrbaQGslGiweT2pMU6t29tOBVlJJs6u8uhRYxlqyLh9KLPfRPEPFkRQp6UCto0/e82GQKSmZ3WfHQ72n2y7zvZ97sMAywrX8kMpnkWN4rAOd+lyyp3T9T1+4PfI0CVmbTaF9zLKf4e+KJbduGtRHARDwIYLVpyMChN923o4CNthoAKpe908JYAJDQVlQouumpMGDj7SpM974GYXSLKXK3lKudCAM27nhTTt6bhGBEsz5C4Xhxuvd9kJzAB4Q79t8AsKhZByColi7Mt8cKvl4+tp7YmbgI4F3DFBxVHaoUKxgArj7u+aRYZQCsNV26Usl5N00zAv9jXU7+ZQYic1oOk6j+wkyq1qo20iVQdNPPAEzoeUzsli2/K1YwAOypf7sFkL/5TUAnCT+IHZydzTJB1nSPCBw72LH8cQEGNWt1o75xqVVdpMNVydXyQvRUy/khwmeHZ84vtaoN3XEl73cL0ZQGhRCNmEBDgyez84dF+DmAZMMkujfsph+aZrQFhd5Je7vadmAOwEHNXlj5kBz9W82fFLjj5F5yQDjZMARvqa6y9uKZemxgx/LGSGSoycQXCPcXZlOfg+QAQR4COb9PiF+guVgGSabo9lWDQgHDjsuW38XE7pb5BDss1BhMkEcEdDYMoerKkeXxsFDA+FSL9pSVZdW+PmTbdstrcVv/hX4B64GpDsmUF3MAAAAASUVORK5CYII="
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
        type: 'mark/freezeMark',
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
      type: 'mark/fetchListMark',
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
    const { isAdd, customerId, selectedItem, imageUrl, imageName } = this.state;


    form.validateFields((err, fieldsValue) => {

      if (err) return;
      let params = {};
      const fiedls = { ...fieldsValue };
      // console.log("fiedl = ",fiedls)
      let marking = {};
      marking = fiedls;
      marking.customerId = this.state.customerId;
      params.imgStr = imageUrl ? imageUrl : '';
      params.fileName = imageName ? imageName : '';
      params.marking = marking;
      // console.log('提交文件名', imageName);
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

      // console.log(params);
    });
  };
}

export default Mark;
