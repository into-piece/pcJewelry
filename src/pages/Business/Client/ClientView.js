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
    dataIndex: 'customerNo',
    key: 'customerNo',
  },
  {
    title: '简称',
    dataIndex: 'shotName',
    key: 'shotName',
  },
  {
    title: '英文名称',
    dataIndex: 'enName',
    key: 'enName',
  },
  {
    title: '中文名称',
    dataIndex: 'zhName',
    key: 'zhName',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  },
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

@connect(({ client, loading, customer }) => {
  const { rtnCode, rtnMsg } = client;
  return {
    body: client.body,
    customerBody: customer.body,
    rtnCode,
    rtnMsg,
    clientListloading: loading.effects['client/fetchListClient'],
    clientSaveloading: loading.effects['client/addClient'],
    clientUpdateloading: loading.effects['client/updateClient'],
    clientDeleteloading: loading.effects['client/deleteClient'],
    clientFreezeloading: loading.effects['client/freezeClient'],
    customerListloading: loading.effects['customer/fetchListCustomer'],
    customerSaveloading: loading.effects['customer/addCustomer'],
    customerUpdateloading: loading.effects['customer/updateCustomer'],
    customerDeleteloading: loading.effects['customer/deleteCustomer'],
    customerFreezeloading: loading.effects['customer/freezeCustomer'],
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
      selectCustomerItem: '',
      pageChangeCurrent: 1,
      isEdit: true,
      selectZhName: false,
      selectEnName: false,
      selectedRowKeys: [],
      customerSelectedRowKeys: [],
      fristLoad: true,
      rowSelectedData: [],
      rowData: [],
      rowCustomerData: [],
      rowCustomerSelectedData: [],
      selectType: 'client',
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
      pageCurrent, fristLoad, selectType,
      selectedRowKeys, customerSelectedRowKeys,
    } = this.state;

    const rowSelection = {
      selectedRowKeys,
      type: 'checkbox',
      onChange: this.onSelectChange,
      onSelect: this.selectChange,
    };

    const rowCustomerSelection = {
      selectedRowKeys: customerSelectedRowKeys,
      type: 'checkbox',
      onChange: this.selectCustomerChange,
      onSelect: this.selectChange,
    };

    let { children } = this.props;

    const {
      clientListloading,
      clientUpdateloading, clientSaveloading,
      clientFreezeloading, clientDeleteloading,
      customerBody = {},
      body = {}, form: { getFieldDecorator },
      customerListloading, customerSaveloading,
      customerUpdateloading, customerDeleteloading, customerFreezeloading,
    } = this.props;

    const paginationProps = {
      showQuickJumper: true,
      pageSize: body.size,
      current: pageCurrent,
      total: body.total,
      onChange: this.pageChange,

    };



    let isUpdate = clientUpdateloading || clientSaveloading || clientDeleteloading || clientFreezeloading;
    let isCurstomerUpdate = customerDeleteloading || customerSaveloading || customerUpdateloading || customerDeleteloading;

    if (body) {
      typeTableContent = body.data;
    }

    if(customerListloading)
    {
      this.state.customerLoad = true;
    }else
    {
      if(this.state.customerLoad)
      {
        this.state.customerLoad = false;
        const {rowCustomerData} =this.state;
        console.log("update list row ",rowCustomerData)
      }
    }

    if (customerBody.data) {
      customerBody.data.map((value) => {
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
    }

    if(isCurstomerUpdate)
    {
      this.state.customerLoading = true;
    }else
    {
      if(this.state.customerLoading)
      {
        //dd
        // this.state.
        this.startShowTab()
        this.state.customerLoading = false;
      }
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
                    onRow={record => {
                      return {
                        onClick: event => {
                          this.clickRowItem(record);
                        },
                      };
                    }}
                    onSelectRow={this.handleSelectRows}
                  />
                  <Radio.Group defaultValue="show_clientlist" buttonStyle="solid">
                    <Radio.Button value="show_clientlist" onClick={this.selectClients}>客户列表</Radio.Button>
                    <Radio.Button value="show_persion" onClick={this.selectMaintains}>共同维护人</Radio.Button>
                  </Radio.Group>

                  <Divider className={clientStyle.divder}/>

                  <Button icon="plus" type="primary" style={{ marginBottom: 10 }}> 新建</Button>

                  <Table
                    loading={isCurstomerUpdate || customerListloading}
                    dataSource={selectType === 'client' ? (fristLoad ? [] : customerBody.data) : []}
                    size="middle"
                    rowKey={record =>
                      record.id
                    }
                    rowSelection={rowCustomerSelection}
                    onRow={record => {
                      return {
                        onClick: event => {
                          this.clickCustomerRowItem(record);
                        },
                      };
                    }}
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
                    value={selectTitle}
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


  clickRowItem = (record) => {

    const { selectedRowKeys, rowSelectedData } = this.state;
    let rowData = this.state.rowData;
    const selects = selectedRowKeys ? selectedRowKeys : [];
    const id = record.id;

    if (selects.includes(id)) {
      selects.splice(selects.findIndex(index => index === id), 1);
      if (rowData.includes(record))
        rowData = [];
      if (rowSelectedData.includes(record)) {
        console.log('includes ' + record.id);
        rowSelectedData.splice(rowSelectedData.findIndex(item => item.id === id), 1);
      }
    } else {

      if (rowData.length > 0) {
        selects.splice(selects.findIndex(index => index === rowData[0].id), 1);
      }
      rowData = [];
      rowData.push({ ...record });
      selects.push(id);
      rowSelectedData.push(record);
    }

    if (selects.length > 0) {
      const recordK = selects[selects.length - 1];
      const r = rowSelectedData.filter(value => value.id == recordK);

      this.showSelectItem(r[0]);
    } else {
      this.setState({
        showItem: false,
        isEdit: true,
        current: false,
        fristLoad: true,
      });
      this.state.showItem = false;


    }

    this.state.selectCustomerItem=''
    this.setState({
      selectedRowKeys: [].concat(selects),
      rowData,
      customerSelectedRowKeys: [],
      selectCustomerItem: '',
      rowCustomerData: [],
      rowCustomerSelectedData: [],
    });

    // this.clearClient();
    this.startShowTab()
  };

  clickCustomerRowItem = (record) => {
    const { customerSelectedRowKeys, rowCustomerSelectedData } = this.state;
    let rowCustomerData = this.state.rowCustomerData;
    // const selects = selectedRowKeys ? selectedRowKeys : [];
    const selects = customerSelectedRowKeys ? customerSelectedRowKeys : [];
    const id = record.id;


    if (selects.includes(id)) {
      selects.splice(selects.findIndex(index => index === id), 1);
      if (rowCustomerData.includes(record))
        rowCustomerData = [];
      if (rowCustomerSelectedData.includes(record)) {
        console.log('includes ' + record.id);
        rowCustomerSelectedData.splice(rowCustomerSelectedData.findIndex(item => item.id === id), 1);
        // rowData.splice(rowData.findIndex(item => item.id === id), 1);
      }
    } else {

      // console.log("record is ",rowData)
      if (rowCustomerSelectedData.length > 0) {
        selects.splice(selects.findIndex(index => index === rowCustomerSelectedData[0].id), 1);
      }
      rowCustomerData = [];
      rowCustomerData.push({ ...record });
      selects.push(id);
      // rowData.push(record)
      rowCustomerSelectedData.push(record);


      // console.log("record puth ",rowData)
    }

    if (selects.length > 0) {
      const recordK = selects[selects.length - 1];
      const r = rowCustomerSelectedData.filter(value => value.id == recordK);
      this.state.selectCustomerItem = r[0];
      this.setState({
        selectCustomerItem: r[0],
      });
      console.log('selectCustomerItem = ', r);
      this.startClient();
    } else {
      this.state.selectCustomerItem = '';
      this.setState({
        selectCustomerItem: '',
      });
      // this.clearClient();
    }
    this.setState({
      customerSelectedRowKeys: [].concat(selects),
      rowCustomerData,
    });

    this.startShowTab();
    // this.showSelectItem(record)
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
        pageCurrent: 1,
        selectedRowKeys: '',
        showItem: false,
        selectCustomerItem: '',
        customerSelectedRowKeys: '',

      });

    });


  };


  startShowTab = () => {
    const { selectTitle } = this.state;
    if (selectTitle === '终客') {
      this.startTerminal();
    } else if (selectTitle === '字印') {
      this.startMark();
    }else if(selectTitle==='客户')
      this.startClient()
  };


  handleSubmit = () => {
    const { dispatch, form } = this.props;
    const { showItem, isAdd } = this.state;
    form.validateFields((err, fieldsValue) => {

      if (err) return;
      if (isAdd) {

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
          rowData: [],
          fristLoad: true,
          customerSelectedRowKeys: '',
          selectCustomerItem: '',
        });

      } else {
        // console.log(fieldsValue);
        // console.log(showItem);
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
      fristLoad: true,
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
      rowData: [],
      rowSelectedData: [],
      customerSelectedRowKeys: '',
      selectCustomerItem: '',
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
      customerSelectedRowKeys: '',
      selectCustomerItem: '',
      isEdit: true,
    });

  };

  selectChange = (record, index) => {


  };

  pageChange = (page, pageSize) => {
    // console.log(page, pageSize);
    const { dispatch } = this.props;

    const { defaultPageSize, selectZhName, selectEnName } = this.state;
    const zhName = selectZhName ? selectZhName : undefined;
    const enName = selectEnName ? selectEnName : undefined;
    dispatch({
      type: 'client/fetchListClient',
      payload: {
        size: defaultPageSize,
        current: page,
        zhName,
        enName,
      },
    });

    this.setState({
      selectedRowKeys: '',
      showItem: false,
      // selectPage:page,
      pageCurrent: page,
      customerSelectedRowKeys: '',
      selectCustomerItem: '',

    });

  };

  onSelectChange = (selectedRowKeys, selectedRows) => {

    // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);


    if (selectedRowKeys.length > 0) {
      const recordK = selectedRowKeys[selectedRowKeys.length - 1];
      const record = selectedRows.filter(value => value.id == recordK);
      this.showSelectItem(record[0]);
    } else {
      this.setState({
        showItem: false,
        isEdit: true,
        current: false,
        fristLoad: true,
      });
      this.state.showItem = false;

    }


    this.setState({
      selectedRowKeys,
      rowSelectedData: selectedRows,
      customerSelectedRowKeys: [],
      selectCustomerItem: '',
      rowCustomerData: [],
      rowCustomerSelectedData: [],
    });
    this.state.selectCustomerItem = '';
    // this.clearClient();
    this.startShowTab();

  };


  //merchange
  selectCustomerChange = (selectedRowKeys, selectedRows) => {
    console.log('selectCustomerChange');
    // this.state.customerSelectedRowKeys = selectedRowKeys;


    // console.log('selectCustomerChange');
    if (selectedRowKeys.length > 0) {
      const recordK = selectedRowKeys[selectedRowKeys.length - 1];
      const record = selectedRows.filter(value => value.id == recordK);
      const d = record[0];
      const selectCustomerItem = { ...d };
      this.setState({
        selectCustomerItem,
        rowCustomerData: selectedRows,
        customerSelectedRowKeys: selectedRowKeys,
      });
      this.state.selectCustomerItem = selectCustomerItem;

      // console.log('save select cu', this.state.selectCustomerItem);
      this.startClient();

    } else {
      this.state.selectCustomerItem = '';
      this.setState({
        selectCustomerItem: '',
        isEdit: true,
        rowCustomerData: selectedRows,
        customerSelectedRowKeys: selectedRowKeys,
        current: false,
      });
      // this.clearClient();
    }
    this.startShowTab();

  };


  loadCustomerList = typeId => {

    console.log('loadCustomerList');
    const { dispatch } = this.props;
    const { defaultPageSize } = this.state;
    dispatch({
      type: 'customer/fetchListCustomer',
      payload: {
        // size: defaultPageSize,
        typeId,
        // current:0
      },
    });


    this.setState({
      fristLoad: false,
    });


  };

  refreshCustomerList = () => {
    console.log('refreshCustomerList');

    const { showItem } = this.state;
    this.loadCustomerList(showItem.id);


    // this.clearClient();
    this.startShowTab();

  };

  showSelectItem = record => {
    let edit = false;
    if (record === '') {
      edit = true;
    }

    this.loadCustomerList(record.id);

    this.setState({
      showItem: { ...record },
      isEdit: edit,
      current: { ...record },
      selectCustomerItem: '',
    });
    this.state.showItem = { ...record };
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

    const { selectCustomerItem, showItem, customerSelectedRowKeys } = this.state;
    console.log(selectCustomerItem)
    this.setState(
      {
        selectTitle: '客户',
        rightlg: 16,
        leftlg: 8,
      },
    );


    const params = {};
    params.ref = this.refreshCustomerList;
    if (showItem) {
      params.typeId = showItem.id;
    } else {
      params.typeId = false;
    }
    params.content = '';

    // console.log('select customer ', selectCustomerItem, params);
    params.ref = this.refreshCustomerList;
    params.content = selectCustomerItem !== '' ? { ...selectCustomerItem } : '';
    params.ckeys = [].concat(customerSelectedRowKeys);
    console.log('keys ', customerSelectedRowKeys,selectCustomerItem);
    router.replace({ pathname: '/business/client/client', params: params });
  };


  clearClient = () => {

    const { showItem } = this.state;
    const params = {};
    params.ref = this.refreshCustomerList;
    if (showItem) {
      params.typeId = showItem.id;
    } else {
      params.typeId = false;
    }
    params.content = '';
    router.replace({ pathname: '/business/client/client', params: params });

    this.setState({
      customerSelectedRowKeys: '',
      rowCustomerSelectedData: [],
    });

  };

  startTerminal = () => {
    this.setState(
      {
        selectTitle: '终客',
        rightlg: 16,
        leftlg: 8,
      },
    );
    const { selectCustomerItem } = this.state;
    const params = {};
    if (selectCustomerItem) {
      params.customerId = selectCustomerItem.id;
    } else {
      params.customerId = '';
    }
    // console.log('select customer t', selectCustomerItem, params);
    router.replace({ pathname: '/business/client/terminal', params: params });
  };

  selectClients = () => {

    this.setState({
      downTableColumn: clientContentColumns,
      downTableContent: [],
      selectType: 'client',

    });

  };

  selectMaintains = () => {
    this.setState({
      downTableColumn: maintainsColumn,
      downTableContent: [],
      selectType: 'maintains',
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
    const { selectCustomerItem } = this.state;
    const params = {};
    if (selectCustomerItem) {
      params.customerId = selectCustomerItem.id;
    } else {
      params.customerId = '';
    }
    router.replace({ pathname: '/business/client/marking', params: params });
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
        selectTitle: '包装',
        rightlg: 16,
        leftlg: 8,
      },
    );
    const { selectCustomerItem } = this.state;
    const params = {};
    if (selectCustomerItem) {
      params.customerId = selectCustomerItem.id;
    } else {
      params.customerId = '';
    }
    router.replace({ pathname: '/business/client/package', params: params });
  };


  startHistory = () => {
    this.setState(
      {
        selectTitle: '历史订单',
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
