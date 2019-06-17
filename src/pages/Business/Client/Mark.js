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
    markListloading: loading.effects['mark/fetchListMark'],
    markSaveloading: loading.effects['mark/addMark'],
    markUpdateloading: loading.effects['mark/updateMark'],
    markDeleteloading: loading.effects['mark/deleteMark'],
    markFreezeloading: loading.effects['mark/freezeMark'],
  };

})
@Form.create()
class Mark extends PureComponent {


  componentWillMount() {


  }

  formLayout = {
    labelCol: { span: 12 },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
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


    function getBase64(img, callback) {
      const reader = new FileReader();
      reader.addEventListener('load', () => callback(reader.result));
      reader.readAsDataURL(img);
    }


    const getModalContent = () => {


      const beforeUpload=(file)=> {
        console.log("beforeUpload",file)
        const isUpload = (!(file.fileList&&file.fileList.lenght>1))
        // if(!isUpload)
        //   message.error('只能上传一张图片');
        console.log('iup',isUpload)
        return (!(file.fileList&&file.fileList.lenght>1))


      }

      const normFile = (e) => {
        // console.log("eve ",e.file.originFileObj)
        // const reader = new FileReader();
        // reader.readAsDataURL(e.file.originFileObj)
        // console.log('load file is ',reader.result);
        return this.state.imageUrl;
      };

      const handleChange = info => {

        console.log('info = ',info)
        if (info.file.status === 'done') {
          getBase64(info.file.originFileObj, imageUrl => {
              this.setState({
                imageUrl,
                loading: false,
              });
              this.state.imageUrl = imageUrl;
            },
          );
        }

        let fileList = [...info.fileList];
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

      const uploadButton = (
        <div>
          <Icon type={this.state.loading ? 'loading' : 'plus'}/>
          <div className="ant-upload-text">上传图片</div>
        </div>
      );
      const imageUrl = this.state.imageUrl;
      return (
        <Form
          layout="inline"
          size={'small'}
          className={styles.from_content}
          labelAlign="left"
          onSubmit={this.handleSubmit}>
          <Row gutter={2}>

            <Col lg={12} md={12} sm={12} xs={12}>

              <FormItem label="字印图片" {...this.formLayout} className={styles.from_content_col}>
                {getFieldDecorator('markingPic', {
                  initialValue: current.markingPic,
                  getValueFromEvent: normFile,
                })(
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    action="/"
                    beforeUpload={beforeUpload}
                    fileList={this.state.fileList}
                    onChange={handleChange}
                  >
                    {/*{imageUrl?'':uploadButton}*/}
                    { uploadButton}
                  </Upload>,
                )}
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
      );
    };

    const modalFooter = this.state.done
      ? { footer: null, onCancel: this.handleDone }
      : { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };


    return (<div className={styles.content}>
      <div className={styles.right_info}>
        <List
          loading={isUpdate || markListloading}
          dataSource={body.data}
          renderItem={this.getContantItem}
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
                    onClick={this.clickDeleteFrom} disabled={this.state.isEdit}>删除</Button>
            <Button className={clientStyle.buttomControl} type="primary" size={'small'}
                    icon="edit" onClick={this.clickEditFrom} disabled={this.state.isEdit}>编辑</Button>
            <Button className={clientStyle.buttomControl} size={'small'} type="primary" icon="lock"
                    onClick={this.clickFreezeFrom} disabled={this.state.isEdit}>冻结</Button>
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
        title={'任务添加'}
        width={640}
        className={styles.standardListForm}
        bodyStyle={{ padding: '28px 0 0' }}
        destroyOnClose
        visible={visible}
        {...modalFooter}
      >
        {getModalContent()}
      </Modal>
    </div>);
  }


  getContantItem = (item) => {
    return (
      <Card
        hoverable
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


  loadMarklList = () => {
    console.log('loadMarkList');
    const { dispatch } = this.props;
    dispatch({
      type: 'mark/fetchListMark',
      payload: { 'customerId': this.state.customerId },
    });

  };


  clickNewFrom = () => {
    this.setState({
      visible: true,
      isAdd: true,
      current: {},
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
    const { isAdd, customerId, selectedItem } = this.state;


    form.validateFields((err, fieldsValue) => {

      if (err) return;
      let params = {};
      const fiedls = { ...fieldsValue }
      // params.customerId = this.state.customerId;
      if (isAdd) {

        params.marking = fiedls;
        params.marking.customerId = this.state.customerId;
        params.file = fiedls.markingPic?fiedls.markingPic:''


        params.marking =   {
          customerId:'8b8723a4fe7f8a6c8e5e01c3821101d0',
          markingNo:"255633",
          zhName:'222updateCustomer',
          enName:'444rr',
          endShotName:'444rr3'
        }
        console.log(params);
        // if (isAdd) {
        dispatch({
          type: 'mark/addMark',
          payload: {
            ...params,
          },
        });
      } else {

        params.id = selectedItem.id;

        // this.state.current = { ...data };
        dispatch({
          type: 'mark/updateMark',
          payload: {
            ...params,
          },
        });
      }
    });
  };
}

export default Mark;
