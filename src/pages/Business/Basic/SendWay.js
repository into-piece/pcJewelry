import React, { PureComponent } from 'react';
import {
  Table,
  Card,
  Row,
  Col,
  Icon,
  Form,
  Select,
  Modal,
  Input,
  Button,
  Divider,
} from 'antd';
import styles  from './Royalty.less';
import GridContent from '../../../components/PageHeaderWrapper/GridContent';
import SvgUtil from '../../../utils/SvgUtil';
import formstyles from './BasicForm.less';
import { FormattedMessage } from 'umi-plugin-react/locale';
import Result from '@/components/Result';
import {connect} from 'dva'
import DescriptionList from '@/components/DescriptionList';
const FormItem = Form.Item;
const clientContentColumns = [
  {
    title: '送货方式代码',
    dataIndex: 'deliveryCode',
    key: 'deliveryCode',
  },
  {
    title: '中文名',
    dataIndex: 'deliveryZhName',
    key: 'deliveryZhName',
  },
  {
    title: '英文名',
    dataIndex: 'deliveryEnName',
    key: 'deliveryEnName',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  },
];



const paginationProps = {
  // showSizeChanger: true,
  showQuickJumper: true,
  pageSize: 10,
};
const { Description } = DescriptionList;

@connect(({ loading, sendway }) => {
  const { rtnCode,rtnMsg } = sendway;
  return {
    listLoading: loading.effects['sendway/fetchListSendWay'],
    addloading: loading.effects['sendway/addSendWay'],
    deleteloading: loading.effects['sendway/deleteSendWay'],
    upateloading: loading.effects['sendway/updateSendWay'],
    freezing: loading.effects['sendway/freezeSendWay'],
    body: sendway.body,
    rtnCode,
    rtnMsg
  };
})
@Form.create()
class Requested extends PureComponent {

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };


  constructor(props) {
    super(props);
    this.state={
      mode: 'inline',
      visible: false,
      done: false,
      list: [],
      selectedRowKeys: [],
      showItem: false,
      isEdit: true,
      update: false,
      isUpdateFrom: false,
      isAdd: true,
      requestState: 'success',
      requestMes: '保存成功！',
      isLoading:false,
      selectIndexAt:-1,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'sendway/fetchListSendWay',
    });
  }



  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form, rtnCode = {} } = this.props;


    const { showItem, isAdd } = this.state;

    form.validateFields((err, fieldsValue) => {

      if (err) return;


      if (isAdd) {

        console.log('data = '+Object.keys({ ...fieldsValue}))

        dispatch({
          type: 'sendway/addSendWay',
          payload: {
            ...fieldsValue,
          },
        });

        this.setState({
          selectedRowKeys: '',
          selectIndexAt:-1,
          showItem: false,
          isEdit: true,
        });

      } else {
        const temp = { ...fieldsValue };
        const data = { ...showItem };
        data.deliveryCode = temp.deliveryCode;
        data.deliveryZhName = temp.deliveryZhName;
        data.deliveryEnName = temp.deliveryEnName;
        this.state.current ={...data};
        if (data.status === '冻结')
          data.status = 2;
        else if (data.status === '使用中')
          data.status = 1;
        else if (data.status === '草稿')
          data.status = 0;


        // console.log('update ' + Object.keys(current));
        dispatch({
          type: 'sendway/updateSendWay',
          payload: {
            ...data,
          },
        });

      }
      this.setState({
        visible: false,

      });
    });
  };

  handleDone = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'sendway/fetchListSendWay',
    });

    this.setState({
      visible: false,
      done: false,
    });
  };


  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {

    const { selectedRowKeys=[], current = {}, isEdit, update } = this.state;


    const { listLoading, body = {}, dispatch, addloading, deleteloading, upateloading, freezing, form: { getFieldDecorator } } = this.props;

    this.state.isLoading = addloading || deleteloading || upateloading || freezing ||listLoading;

    if (addloading || deleteloading || upateloading || freezing) {
      this.state.update = true;
      if (upateloading) {
        this.state.isUpdateFrom = true;
      }
    } else {
      if (update) {

        console.log('rntCode=' + body.rtnCode);
        if(body.rtnCode==='000000')
        {
          this.state.requestState='success';
        }else {
          this.state.requestState='error';
        }

        this.state.requestMes =body.rtnMsg;
        console.log('result = '+this.state.requestMes)
        this.state.update = false;
        this.state.done = true;
        this.state.visible = true;
        if (this.state.isUpdateFrom) {
          this.state.isUpdateFrom = false;
          this.state.showItem = {...current};
        }
      }

    }

    if (listLoading && body && body.data && body.data.length > 0) {
      const newdata = body.data.map((value) => {
        const s = value.status;
        if (s == 0) {
          value.status = '草稿';
        } else if (s == 1) {
          value.status = '使用中';
        } else if (s == 2) {
          value.status = '冻结';
        }
        return value;
      });

      this.state.data = newdata;
    }



    console.log('rntCode=' + body.rtnCode+",data = "+(body.data));

    const rowSelection = {
      selectedRowKeys,
      type: 'radio',
      onChange: this.onSelectChange,
      onSelect: this.selectChange,
    };



    const getModalContent = () => {
      if (this.state.done) {
        return (
          <Result
            type={this.state.requestState}
            title={this.state.requestMes}
            description=""
            actions={
              <Button type="primary" onClick={this.handleDone}>
                知道了
              </Button>
            }
            className={formstyles.formResult}
          />
        );
      }
      return (
        <Form
          size={'small'}
          onSubmit={this.handleSubmit}>
          <FormItem label="配送方式编号" {...this.formLayout}>
            {getFieldDecorator('deliveryCode', {
              rules: [{ required: true, message: '配送编号' }],
              initialValue: current.deliveryCode,
            })(<Input placeholder="请输入"/>)}
          </FormItem>
          <FormItem label="中文名" {...this.formLayout}>
            {getFieldDecorator('deliveryZhName', {
              rules: [{ required: true, message: '请输入中文名称' }],
              initialValue: current.deliveryZhName,
            })(
              <Input placeholder="请输入"/>,
            )}
          </FormItem>
          <FormItem label="英文名" {...this.formLayout}>
            {getFieldDecorator('deliveryEnName', {
              rules: [{   message: '请输入英文名称'}],
              initialValue: current.deliveryEnName,
            })(
              <Input placeholder="请输入"/>,
            )}
          </FormItem>
        </Form>
      );
    };

    const modalFooter = this.state.done
      ? { footer: null, onCancel: this.handleDone }
      : { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };

    return (
      <GridContent>
        <Row gutter={24}  className={styles.row_content}>
          <Col  lg={16} md={24} >
            <div className={styles.view_left_content}>
              <div style={{ fontSize: 25, textAlign: 'vertical-center' }}>
                <Icon
                  style={{ width: 50, height: 50, paddingRight: 10, paddingTop: 10, paddingLeft: 10 }}
                  component={SvgUtil.delivery}/>
                <FormattedMessage id="app.basic.menuMap.way" defaultMessage="配送方式"/>
              </div>
              <Card
                bordered={false}
                loading={false}

              >
                <Table
                  loading={this.state.isLoading}
                  pagination={paginationProps}
                  dataSource={this.state.data}
                  filterMultiple={false}
                  bordered={false}
                  selectedRows={1}
                  rowClassName={this.onSelectRowClass}
                  onRow={(record, index) => {
                    return {
                      onClick: event => {
                        this.selectChange(record,index)

                      }
                    };
                  }}
                  size='middle'
                  columns={clientContentColumns}
                />
                <Modal
                  title={this.state.done ? null : `任务${current.brandNo ? '编辑' : '添加'}`}
                  width={640}
                  className={styles.standardListForm}
                  bodyStyle={this.state.done ? { padding: '72px 0' } : { padding: '28px 0 0' }}
                  destroyOnClose
                  visible={this.state.visible}
                  {...modalFooter}
                >
                  {getModalContent()}
                </Modal>
              </Card>
            </div>
          </Col>
          <Col lg={8} md={24}>
            <div className={styles.view_right_content}>
              <Card
                bordered={false}
              >
                <div>
              <span title="配送方式"
                    style={{ marginBottom: 32, paddingLeft: 10, fontSize: 20, fontWeight: 'bold', color: '#35B0F4' }}>
              配送方式信息
              </span>
                  <Divider/>
                  {(this.state.showItem) ? this.getRenderitem(this.state.showItem) : ''}

                </div>
              </Card>


              <Card bodyStyle={{ paddingLeft: 5, paddingRight: 5 }}>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Button className={styles.buttomControl} type="primary" icon="plus" size={'small'}
                          onClick={this.clickNewFrom}>新增</Button>
                  <Button className={styles.buttomControl} type="danger" icon="delete" size={'small'}
                          onClick={this.clickDeleteFrom}
                          disabled={isEdit}>删除</Button>
                  <Button className={styles.buttomControl} type="primary" size={'small'} onClick={this.clickEditFrom}
                          disabled={isEdit} icon="edit">编辑</Button>
                  <Button className={styles.buttomControl} size={'small'} type="primary" icon="lock"
                          onClick={this.clickFreezeFrom}
                          disabled={isEdit}>冻结</Button>
                </div>

              </Card>
            </div>
          </Col>
        </Row>
      </GridContent>
    );

  }

  onSelectRowClass = (record, index) => {
    let color = '';
    if (index % 2 == 0) {
      color = styles.row_normal;
    }

    return index == this.state.selectIndexAt ? styles.row_select : color;
    // return index == this.state.selectIndexAt ? styles.row_select :"";
  };

  clickNewFrom = () => {
    this.state.isAdd = true;
    this.setState({ visible: true, current: {} });
  };

  clickDeleteFrom = () => {
    const SendWayNo = this.state.showItem;

    const { dispatch } = this.props;
    dispatch({
      type: 'sendway/deleteSendWay',
      payload: {
        ... SendWayNo,
      },
    });


    this.setState({
      selectedRowKeys: '',
      selectIndexAt:-1,
      showItem: false,
      isEdit: true,
    });

  };

  clickEditFrom = () => {
    this.state.isAdd = false;
    this.setState({
      current: this.state.showItem,
      visible: true,
    });

  };


  clickFreezeFrom = () => {
    const sendWayNo = this.state.showItem;

    const { dispatch } = this.props;
    dispatch({
      type: 'sendway/freezeSendWay',
      payload: {
        ... sendWayNo,
      },
    });


  };


  selectChange = (record,index) => {

    let edit = false;
    if (record === '') {
      edit = true;
    }

    this.setState({
      showItem: { ...record },
      isEdit: edit,
      current: record,
      selectIndexAt: index,
    });
  };

  onSelectChange = (selectedRowKeys, selectedRows) => {
    console.log('onSelectChage');
    console.log('select key = ' + Object.keys(selectedRows));

    this.setState({
      selectedRowKeys,
    });
  };

  selectRowItem = () => {

  };


  getRenderitem = (item) => {
    return (
      <span style={{ marginLeft: 10, marginTop: 10 }} onClick={this.selectRowItem}>
        <DescriptionList className={styles.headerList} size='small' col='1'>
        <Description term='业务提出编号'>{item.deliveryCode}</Description>
        <Description term='中文名'>{item.deliveryZhName}</Description>
        <Description term='英文名'>{item.deliveryEnName}</Description>
        </DescriptionList>
        {/* <Divider/>*/}
        </span>

    );
  };

}

export default Requested;
