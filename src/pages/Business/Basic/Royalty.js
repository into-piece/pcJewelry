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
    title: '提成编号',
    dataIndex: 'deliveryCode',
    key: 'code',
  },
  {
    title: '提成中文名',
    dataIndex: 'paymentZhName',
    key: 'paymentZhName',
  },
  {
    title: '提成英文名',
    dataIndex: 'paymentEnName',
    key: 'paymentEnName',
  },
  {
    title: '利润比例从(%)',
    dataIndex: 'profitShareFrom',
    key: 'profitShareFrom',
  },
  {
    title: '利润比例到(%)',
    dataIndex: 'profitShareTo',
    key: 'profitShareTo',
  },
  {
    title: '提成比率(%)',
    dataIndex: 'royaltyRate',
    key: 'royaltyRate',
  }, {
    title: '状态  ',
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

@connect(({ loading, royalty }) => {
  const { rtnCode,rtnMsg } = royalty;
  return {
    listLoading: loading.effects['royalty/fetchListRoyalty'],
    addloading: loading.effects['royalty/addRoyalty'],
    deleteloading: loading.effects['royalty/deleteRoyalty'],
    upateloading: loading.effects['royalty/updateRoyalty'],
    freezing: loading.effects['royalty/freezeRoyalty'],
    body: royalty.body,
    rtnCode,
    rtnMsg
  };
})
@Form.create()
class Royalty extends PureComponent {

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
      type: 'royalty/fetchListRoyalty',
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
          type: 'royalty/addRoyalty',
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
        data.paymentEnName = temp.paymentEnName;
        data.paymentZhName = temp.paymentZhName;
        data.profitShareFrom = temp.profitShareFrom;
        data.profitShareTo = temp.profitShareTo;
        data.royaltyRate = temp.royaltyRate;
        this.state.current ={...data};
        if (data.status === '冻结')
          data.status = 2;
        else if (data.status === '使用中')
          data.status = 1;
        else if (data.status === '草稿')
          data.status = 0;


        // console.log('update ' + Object.keys(current));
        dispatch({
          type: 'royalty/updateRoyalty',
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
      type: 'royalty/fetchListRoyalty',
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
          <FormItem label="提成编号" {...this.formLayout}>
            {getFieldDecorator('deliveryCode', {
              rules: [{  required: true, message: '品牌编号' }],
              initialValue: current.deliveryCode,
            })(<Input placeholder="请输入"/>)}
          </FormItem>
          <FormItem label="业务提成中文名" {...this.formLayout}>
            {getFieldDecorator('paymentZhName', {
              rules: [{ required: true, message: '请输入中文名称' }],
              initialValue: current.paymentZhName,
            })(
              <Input placeholder="请输入" />,
            )}
          </FormItem>
          <FormItem label="业务提成英文名称" {...this.formLayout}>
            {getFieldDecorator('paymentEnName', {
              rules: [{    message: '请输入品牌编号'}],
              initialValue: current.paymentEnName,
            })(
              <Input placeholder="请输入"/>,
            )}
          </FormItem>
          <FormItem label="利润比例从(%)" type="integer" {...this.formLayout}>
            {getFieldDecorator('profitShareFrom', {
              rules: [{ required: true, message: '请输入利润比例从', }],
              initialValue: current.profitShareFrom,
            })(
              <Input placeholder="请输入"  type='number'/>,
            )}
          </FormItem>
          <FormItem label="利润比例到(%)" {...this.formLayout}>
            {getFieldDecorator('profitShareTo', {
              rules: [{ required: true, message: '利润比例到' }],
              initialValue: current.profitShareTo,
            })(
              <Input placeholder="请输入"  type='number'/>,
            )}
          </FormItem>
          <FormItem label="提成比率(%)" {...this.formLayout}>
            {getFieldDecorator('royaltyRate', {
              rules: [{ required: true, message: '请输入提成比率' }],
              initialValue: current.royaltyRate,
            })(
              <Input placeholder="请输入"  type='number'/>,
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
          <Col  lg={16} md={24} className={styles.view_left_content}>
            <div>
              <div style={{ fontSize: 25, textAlign: 'vertical-center' }}>
                <Icon
                  style={{ width: 50, height: 50, paddingRight: 10, paddingTop: 10, paddingLeft: 10 }}
                  component={SvgUtil.percentage}/>
                <FormattedMessage id="app.basic.menuMap.royalty" defaultMessage="业务提成设当"/>
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
              <span title="业务提成设定"
                    style={{ marginBottom: 32, paddingLeft: 10, fontSize: 20, fontWeight: 'bold', color: '#35B0F4' }}>
              业务提成设定
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
    const RoyaltyNo = this.state.showItem;

    const { dispatch } = this.props;
    dispatch({
      type: 'royalty/deleteRoyalty',
      payload: {
        ...RoyaltyNo,
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
    const royaltyNo = this.state.showItem;

    const { dispatch } = this.props;
    dispatch({
      type: 'royalty/freezeRoyalty',
      payload: {
        ...royaltyNo,
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
    console.log('select the item');
  };


  getRenderitem = (item) => {
    return (
      <span style={{ marginLeft: 10, marginTop: 10 }} onClick={this.selectRowItem}>
        <DescriptionList className={styles.headerList} size='small' col='1'>
        <Description term='提成编号'>{item.deliveryCode}</Description>
        <Description term='提成中文名'>{item.paymentZhName}</Description>
        <Description term='提成英文名'>{item.paymentEnName}</Description>
        <Description term='利润比例从(%)'>{item.profitShareFrom}</Description>
        <Description term='利润比例到(%)'>{item.profitShareTo}</Description>
        <Description term='提成比率(%)'>{item.royaltyRate}</Description>
        </DescriptionList>
        {/* <Divider/>*/}
        </span>

    );
  };


}

export default Royalty;
