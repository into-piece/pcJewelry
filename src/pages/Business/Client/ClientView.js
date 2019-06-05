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
  Divider,
  Modal,
  Breadcrumb,
  message,
} from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { connect } from 'dva';
import styles from '../../Account/Center/Center.less';
import clientStyle from './Client.less';
import DescriptionList from '@/components/DescriptionList';
import router from 'umi/router';

const FormItem = Form.Item;
const { Option } = Select;
const { TabPane } = Tabs;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import listStyles from './TableList.less';
import baseStyles from './base.less';

const { Description } = DescriptionList;

const clientColumns = [
  {
    title: '中文名称',
    dataIndex: 'zhName',
    key: 'zhName',
  },
  {
    title: '英文名称',
    dataIndex: 'enName',
    key: 'enName',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  },

];

const clientContentColumns = [
  {
    title: '客户编号',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: '简称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '英文名称',
    dataIndex: 'en_name',
    key: 'en_name',
  },
  {
    title: '中文名称',
    dataIndex: 'zh_name',
    key: 'zh_name',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  },
  // {
  //   title: '时间',
  //   dataIndex: 'time',
  //   key: 'time',
  // },
  // {
  //   title: '当前进度',
  //   dataIndex: 'rate',
  //   key: 'rate',
  // },
  // {
  //   title: '状态',
  //   dataIndex: 'status',
  //   key: 'status',
  // },
  // {
  //   title: '操作员ID',
  //   dataIndex: 'operator',
  //   key: 'operator',
  // },
  // {
  //   title: '耗时',
  //   dataIndex: 'cost',
  //   key: 'cost',
  // },
];

const maintainsColumn = [
  {
    title: '维护人',
    dataIndex: 'code',
    key: 'code',
  },
];


const operationTabList = [
  {
    key: 'client',
    tab: <span>客户</span>,
  },
  {
    key: 'devclient',
    tab: <span>终客</span>,
  },
  {
    key: 'marking',
    tab: <span>字印</span>,
  },
  {
    key: 'package',
    tab: <span>包装</span>,
  },
  {
    key: 'product',
    tab: <span>产品</span>,
  },
  {
    key: 'history',
    tab: <span>历史订单</span>,
  },
];

@connect(({ client, loading }) => {
  const { rtnCode, rtnMsg } = client;
  return {
    body: client.body,
    rtnCode,
    rtnMsg,
    clientListloading: loading.effects['client/fetchListClient'],
    clientSaveloading: loading.effects['client/addClient'],
    clientUpdateloading: loading.effects['client/updateClient'],
    clientDeleteloading: loading.effects['client/deleteClient'],
    clientFreezeloading: loading.effects['client/freezeClient'],
  };

})
@Form.create()
class ClientView extends PureComponent {

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  constructor(props) {
    super(props);

    this.state = {
      selectTitle: '类型',
      expandForm: false,
      downTableColumn: clientContentColumns,
      downTableContent: [],
      typeTableContent: [],
      rightlg: 16,
      leftlg: 8,
      defaultPageSize: 5,
      pageCurrent: 1,
      visible: false,
      showItem: false,
      pageChangeCurrent: 1,
      isEdit: true,
      selectZhName: false,
      selectEnName: false,
      selectedRowKeys: [],
    };
  }


  componentDidMount() {
    const { dispatch } = this.props;
    const { defaultPageSize } = this.state;
    dispatch({
      type: 'client/fetchListClient',
      payload: { size: defaultPageSize },
    });
    router.push('/business/client/emptyView');

  }


  renderSimpleForm() {

    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="中文名称">
              {getFieldDecorator('selectZhName')(<Input placeholder="请输入"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="英文名称">{getFieldDecorator('selectEnName')(<Input placeholder="请输入"/>)}</FormItem>
          </Col>

          <Col md={8} sm={24}>

              <span className={styles.submitButtons}>
              <Button type='primary' htmlType='submit'>
              查询
              </Button>
              <Button style={{ marginLeft: 5 }} onClick={this.handleFormReset}>
              重置
              </Button>
              </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderForm() {
    return this.renderSimpleForm();
  }


  render() {

    const modalFooter = { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };


    let {
      selectTitle, downTableColumn, typeTableContent, downTableContent, rightlg, leftlg, visible, current = {}, update,
      pageCurrent,
      selectedRowKeys,
    } = this.state;

    const rowSelection = {
      selectedRowKeys,
      type: 'checkbox',
      onChange: this.onSelectChange,
      onSelect: this.selectChange,
    };


    const {
      children, clientListloading,
      clientUpdateloading, clientSaveloading,
      clientFreezeloading, clientDeleteloading,
      body = {}, form: { getFieldDecorator },
    } = this.props;

    const paginationProps = {
      showQuickJumper: true,
      pageSize: body.size,
      current: pageCurrent,
      total: body.total,
      onChange: this.pageChange,

    };

    console.log('total = ' + body.total + ', size = ' + body.size);

    let isUpdate = clientUpdateloading || clientSaveloading || clientDeleteloading || clientFreezeloading;

    if (body) {
      typeTableContent = body.data;
    }


    if (isUpdate) {
      this.state.update = true;
      if (clientUpdateloading) {
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


    const getModalContent = () => {
      return (
        <Form
          size={'small'}
          onSubmit={this.handleSubmit}>
          <FormItem label="中文名称" {...this.formLayout}>
            {getFieldDecorator('zhName', {
              rules: [{ required: true, message: '请输入中文名称' }],
              initialValue: current.zhName,
            })(
              <Input placeholder="请输入"/>,
            )}
          </FormItem>
          <FormItem label="英文名称" {...this.formLayout}>
            {getFieldDecorator('enName', {
              rules: [{ message: '请输入英文名称' }],
              initialValue: current.enName,
            })(
              <Input placeholder="请输入"/>,
            )}
          </FormItem>

        </Form>
      );

    };


    return (

      <div className={clientStyle.page}>
        <div className={clientStyle.nav}>
          <Breadcrumb>
            <Breadcrumb.Item>主页</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">业务</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="/business/basic/base#/business/client/">客户资料</a>
            </Breadcrumb.Item>

          </Breadcrumb>
        </div>
        <div className={clientStyle.center_content}>
          <Row gutter={24}>
            <Col lg={rightlg} md={24}>
              <Card bordered={false} className={clientStyle.left_content} loading={false}>
                <div style={{ marginBottom: 16 }}>
                  <div className={listStyles.tableListForm}>{this.renderForm()}</div>
                  <Table
                    style={{ marginBottom: 20 }}
                    loading={clientListloading || isUpdate}
                    size="middle"
                    dataSource={typeTableContent}
                    rowSelection={rowSelection}
                    pagination={paginationProps}
                    rowClassName={this.onSelectRowClass}
                    rowKey={record =>
                      record.id
                    }
                    columns={clientColumns}
                    onSelectRow={this.handleSelectRows}
                  />
                  <Radio.Group defaultValue="show_clientlist" buttonStyle="solid">
                    <Radio.Button value="show_clientlist" onClick={this.selectClients}>客户列表</Radio.Button>
                    <Radio.Button value="show_persion" onClick={this.selectMaintains}>共同维护人</Radio.Button>
                  </Radio.Group>

                  <Divider className={clientStyle.divder}/>

                  <Button icon="plus" type="primary" style={{ marginBottom: 10 }}> 新建</Button>

                  <Table
                    loading={false}
                    selectedRows={1}
                    dataSource={downTableContent}
                    size="middle"
                    rowClassName={this.onSelectRowClass}
                    columns={downTableColumn}
                  />
                </div>
              </Card>
            </Col>
            <Col lg={leftlg} md={24}>
              <div
                className={clientStyle.right_info}
              >
                <div className={clientStyle.right_content_tbs}>
                  <RadioGroup
                    defaultValue="类型"
                    size="small"
                    className={clientStyle.right_content_tabgroud}
                    onChange={this.onChange}
                    buttonStyle="solid"
                  >
                    <Radio.Button value="类型" onClick={this.startType}>类型</Radio.Button>
                    <Radio.Button value="客户" onClick={this.startClient}>客户</Radio.Button>
                    <Radio.Button value="终客" onClick={this.startTerminal}>终客</Radio.Button>
                    <Radio.Button value="字印" onClick={this.startMark}>字印</Radio.Button>
                    <Radio.Button value="包装" onClick={this.startPackageInfo}>包装</Radio.Button>
                    <Radio.Button value="产品" onClick={this.startProduct}>产品</Radio.Button>
                    <Radio.Button value="历史订单" onClick={this.startHistory}>历史订单</Radio.Button>
                  </RadioGroup>
                </div>
                <div className={clientStyle.list_info}>
                  <span className={clientStyle.title_info}>{selectTitle}</span>
                  <Divider
                    className={clientStyle.divder}
                  />

                  {
                    selectTitle === '类型' ? this.getAddType() : children
                  }


                  {/*{children}*/}
                </div>


              </div>
            </Col>
          </Row>
        </div>

        <Modal
          // title={this.state.done ? null : `任务${current.brandNo ? '编辑' : '添加'}`}
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
      </div>
    );
  }


  getAddType = () => {

    const { showItem, isEdit } = this.state;
    const data = { ...showItem };


    return (<div className={baseStyles.content}>
      <div className={baseStyles.right_info}>


        {
          showItem ? (<DescriptionList size='small' col='1'>
            <Description term='英文名'>{showItem.enName}</Description>
            <Description term='中文名'>{showItem.zhName}</Description>
            <Description term='创建日期'>{showItem.createTime}</Description>
          </DescriptionList>) : (<div/>)
        }

      </div>

      <Card bodyStyle={{ paddingLeft: 5, paddingRight: 5, paddingTop: 5, paddingBottom: 5 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            flexDirection: 'column',
          }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button type="primary" icon="plus" className={clientStyle.buttomControl}
                    size={'small'} onClick={this.handleNewClient}>新增</Button>
            <Button type="danger" icon="delete" className={clientStyle.buttomControl}
                    size={'small'} onClick={this.handleDeleteClients} disabled={isEdit}>删除</Button>
            <Button type="primary" size={'small'} className={clientStyle.buttomControl}
                    icon="edit" disabled={isEdit} onClick={this.handleEditClient}>编辑</Button>
            <Button className={clientStyle.buttomControl} size={'small'} type="primary" icon="lock"
                    disabled={isEdit} onClick={this.handleFreezeClients}>冻结</Button>
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
    </div>);
  };


  handleSearch = () => {

    const { dispatch, form } = this.props;
    const { defaultPageSize } = this.state;
    form.validateFields((err, fieldsValue) => {

      console.log(err);

      const data = { ...fieldsValue };

      let params = {};
      params.zhName = data.selectZhName;
      params.enName = data.selectEnName;
      params.size = defaultPageSize;
      params.current = 1;
      console.log(params);
      dispatch({
        type: 'client/fetchListClient',
        payload: {
          ...params,
        },
      });

      this.setState({
        selectZhName: data.selectZhName,
        selectEnName: data.selectEnName,
        pageCurrent:1,
        selectedRowKeys:'',
        showItem:false,
      });

    });


  };


  handleSubmit = () => {
    const { dispatch, form } = this.props;
    const { showItem, isAdd } = this.state;
    form.validateFields((err, fieldsValue) => {

      if (err) return;
      console.log({ ...fieldsValue });
      if (isAdd) {

        console.log('add');
        dispatch({
          type: 'client/addClient',
          payload: {
            ...fieldsValue,
          },
        });

        this.setState({
          showItem: false,
          selectedRowKeys: '',
          isEdit: true,
          update: true,
        });

      } else {
        console.log(fieldsValue);
        console.log(showItem);
        const temp = { ...fieldsValue };
        const data = { ...showItem };
        data.zhName = temp.zhName;
        data.enName = temp.enName;
        this.state.current = { ...data };
        dispatch({
          type: 'client/updateClient',
          payload: {
            ...data,
          },
        });

      }


    });
    this.setState({
      visible: false,
    });

  };

  handleDone = () => {
    const { dispatch } = this.props;
    const { defaultPageSize, pageCurrent } = this.state;
    dispatch({
      type: 'client/fetchListClient',
      payload: {
        size: defaultPageSize,
        current: pageCurrent,
      },
    });
    this.setState({
      visible: false,
      // pageCurrent:1,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  handleNewClient = () => {
    this.setState({
      visible: true,
      isAdd: true,
      current: {},
    });

  };

  handleEditClient = () => {

    const { showItem } = this.state;

    console.log('edit');
    console.log(showItem);
    this.setState({
      current: showItem,
      visible: true,
      isAdd: false,
    });

  };


  handleDeleteClients = () => {
    const { selectedRowKeys } = this.state;

    const { dispatch } = this.props;
    const data = [];
    data.push(selectedRowKeys);

    dispatch({
      type: 'client/deleteClient',
      payload:
      // ...requestedNo,
        { 'list': selectedRowKeys }
      ,
    });


    this.setState({
      selectedRowKeys: '',
      showItem: false,
      isEdit: true,
      pageCurrent: 1,
    });

  };


  handleFreezeClients = () => {
    const { selectedRowKeys } = this.state;

    const { dispatch } = this.props;
    const data = [];
    data.push(selectedRowKeys);

    dispatch({
      type: 'client/freezeClient',
      payload:
      // ...requestedNo,
        { 'list': selectedRowKeys }
      ,
    });


    this.setState({
      selectedRowKeys: '',
      showItem: false,
      isEdit: true,
    });

  };

  selectChange = (record, index) => {


  };

  pageChange = (page, pageSize) => {
    console.log(page, pageSize);
    const { dispatch } = this.props;

    const { defaultPageSize ,selectZhName,selectEnName} = this.state;
    const zhName = selectZhName?selectZhName:undefined
    const enName = selectEnName?selectEnName:undefined
    dispatch({
      type: 'client/fetchListClient',
      payload: {
        size: defaultPageSize,
        current: page,
        zhName,
        enName
      },
    });

    this.setState({
      selectedRowKeys:'',
      showItem:false,
      pageCurrent: page,
    });

  };

  onSelectChange = (selectedRowKeys, selectedRows) => {

    console.log('onSelectChage');
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);


    if (selectedRowKeys.length > 0) {
      const recordK = selectedRowKeys[selectedRowKeys.length - 1];
      const record = selectedRows.filter(value => value.id == recordK);
      this.showSelectItem(record[0]);
    } else {
      this.setState({
        showItem: false,
        isEdit: true,
        current: false,
      });
    }


    this.setState({
      selectedRowKeys,
    });

  };


  showSelectItem = record => {
    let edit = false;
    if (record === '') {
      edit = true;
    }

    this.setState({
      showItem: { ...record },
      isEdit: edit,
      current: { ...record },
    });
  };

  onSelectRowClass = (record, index) => {
    let color = '';
    if (index % 2 == 0) {
      color = clientStyle.row_normal;
    }
    return color;
  };


  startType = () => {
    this.setState(
      {
        selectTitle: '类型',
        rightlg: 16,
        leftlg: 8,
      },
    );
  };

  startClient = () => {
    this.setState(
      {
        selectTitle: '客户',
        rightlg: 16,
        leftlg: 8,
      },
    );
    router.push({ pathname: '/business/client/client', query: { id: 1 } });
  };

  startTerminal = () => {
    this.setState(
      {
        selectTitle: '终客',
        rightlg: 16,
        leftlg: 8,
      },
    );
    router.push({ pathname: '/business/client/terminal', query: { id: 1 } });
  };

  selectClients = () => {

    this.setState({
      downTableColumn: clientContentColumns,
      downTableContent: [],

    });

  };

  selectMaintains = () => {
    this.setState({
      downTableColumn: maintainsColumn,
      downTableContent: [],
    });
  };


  startMark = () => {
    this.setState(
      {
        selectTitle: '字印',
        rightlg: 16,
        leftlg: 8,
      },
    );
    router.push({ pathname: '/business/client/marking', query: { id: 2 } });
  };


  startProduct = () => {
    this.setState(
      {
        selectTitle: '产品',
        rightlg: 15,
        leftlg: 9,
      },
    );
    router.push({ pathname: '/business/client/product', query: { id: 3 } });
  };


  startPackageInfo = () => {
    this.setState(
      {
        selectTitle: '打包',
        rightlg: 16,
        leftlg: 8,
      },
    );
    router.push({ pathname: '/business/client/package', query: { id: 4 } });
  };


  startHistory = () => {
    this.setState(
      {
        selectTitle: '历史',
        rightlg: 13,
        leftlg: 11,
      },
    );
    router.push({ pathname: '/business/client/history', query: { id: 5 } });
  };


  onChange = e => {
    console.log('select radio=' + e.target.value);
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };
}

export default ClientView;
