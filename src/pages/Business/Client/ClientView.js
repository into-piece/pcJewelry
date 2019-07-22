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
  Switch,
  Divider,
  Modal,
  Breadcrumb,
  message,
  Drawer,
} from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { connect } from 'dva';
import styles from '../../Account/Center/Center.less';
import clientStyle from './Client.less';
import DescriptionList from '@/components/DescriptionList';
import router from 'umi/router';

import TerminalClient from './TerminalClient';
import ClientInfo from './ClientInfo';
import Mark from './Mark';
import PackageInfo from './PackageInfo';
import Product from './Product';
import History from './History';

const FormItem = Form.Item;
const { Option } = Select;
const { TabPane } = Tabs;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import listStyles from './TableList.less';
import baseStyles from './base.less';
import maintainer from './models/maintainer';
import JewelryTable from '../../components/JewelryTable';
import CustomerSearchFrom from './components/CustomerSearchFrom';
import HttpFetch from '../../../utils/HttpFetch';
import ContactsModalForm from './components/form/ContactsModalForm';
import { pingYincompare, encompare, formDatecompare } from './../../../utils/utils';
import TableSortView from '../../components/TableSortView';

const { Description } = DescriptionList;

const clientColumns = [
  {
    title: '中文名称',
    dataIndex: 'zhName',
    key: 'zhName',
    sorter: (a, b) => {
      return pingYincompare(a.zhName, b.zhName);
    },
  },
  {
    title: '英文名称',
    dataIndex: 'enName',
    key: 'enName',
    onFilter: (value, record) => record.enName.includes(value),
    sorter: (a, b) => {
      if (/^\d/.test(a.enName) ^ /^\D/.test(b.enName)) return a.enName > b.enName ? 1 : (a.enName == b.enName ? 0 : -1);
      return a.enName > b.enName ? -1 : (a.enName == b.enName ? 0 : 1);
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    sorter: (a, b) => {
      return formDatecompare(a.createTime, b.createTime);
    },
  },
];


const clientContentColumns = [
  {
    title: '客户编号',
    dataIndex: 'customerNo',
    key: 'customerNo',
    // defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age,
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
    onFilter: (value, record) => record.enName.includes(value),
    // sorter: (a, b) => {
    //   if (/^\d/.test(a.enName) ^ /^\D/.test(b.enName)) return a.enName>b.enName?1:(a.enName==b.enName?0:-1);
    //   return a.enName>b.enName?-1:(a.enName==b.enName?0:1)
    // },

    sorter: (a, b) => {
      encompare(a.enName, b.enName);
    },
    // sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
  },
  {
    title: '中文名称',
    dataIndex: 'zhName',
    key: 'zhName',
    sorter: (a, b) => {
      return pingYincompare(a.zhName, b.zhName);
    },
  },
  {
    title: '联系人',
    dataIndex: 'contacts',
    key: 'contacts',
    sorter: (a, b) => {
      return pingYincompare(a.zhName, b.zhName);
    },
  },
  {
    title: '手机',
    dataIndex: 'tel',
    key: 'tel',
  },

  {
    title: '电话',
    dataIndex: 'phone',
    key: 'phone',
  },

  {
    title: '中文地址',
    dataIndex: 'zhAddress',
    key: 'zhAddress',
    sorter: (a, b) => {
      return pingYincompare(a.zhName, b.zhName);
    },
  },

  {
    title: '英文地址',
    dataIndex: 'enAddress',
    key: 'enAddress',
    sorter: (a, b) => {
      encompare(a.enAddress, b.enAddress);
    },
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
const defaultPageSize = 5;

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

  centerFormLayout = {
    labelCol: { span: 12 },
    wrapperCol: {
      span: 24,
    },
  };

    contactsColumn = [
    {
      // title: '联系人',
      title: () => {
        return (
          <TableSortView
            column={'联系人'}
            field={'contacts'}
            sortChange={this.contactsSortFilter}
          />
        )
      },
      dataIndex: 'contacts',
      key: 'contacts',
      // sorter: true,
      // field: 'contacts',
    },
    {
      // title: '手机',
      title: () => {
        return (
          <TableSortView
            column={'电话'}
            field={'tel'}
              sortChange={this.contactsSortFilter}
          />
        )
      },
      dataIndex: 'tel',
      key: 'tel',
      field: 'tel',
    },
    {
      // title: 'phone',
      title: () => {
        return (
          <TableSortView
            column={'手机'}
            field={'phone'}
            sortChange={this.contactsSortFilter}
          />
        )
      },
      dataIndex: 'phone',
      key: 'phone',
      // sorter: true,
    },
    {
      title: () => {
        return (
          <TableSortView
            column={'email'}
            field={'email'}
            sortChange={this.contactsSortFilter}
          />
        )
      },
      // title: 'email',
      dataIndex: 'email',
      key: 'email',
      // sorter: true,
      // field: 'email',
    },
    {
      // title: 'qq',
      title: () => {
        return (
          <TableSortView
            column={'qq'}
            field={'qq'}
            sortChange={this.contactsSortFilter}
          />
        )
      },
      dataIndex: 'qq',
      key: 'qq',
      // sorter: true,
      // field: 'qq',
    },
    {
      // title: 'wechat',
      title: () => {
        return (
          <TableSortView
            column={'wechat'}
            field={'wechat'}
            sortChange={this.contactsSortFilter}
          />
        )
      },
      dataIndex: 'wechat',
      key: 'wechat',
      // sorter: true,
      // field: 'wechat',
    },
    {
      // title: '主联系人',
      title: () => {
        return (
          <TableSortView
            column={'主联系人'}
            field={'is_primary_contact'}
            sortChange={this.contactsSortFilter}
          />
        )
      },
      dataIndex: 'isPrimaryContact',
      key: 'isPrimaryContact',
    },
  ];

  constructor(props) {
    super(props);

    this.state = {
      selectTitle: '类型',
      downTableColumn: clientContentColumns,
      downTableContent: [],
      typeTableContent: [],
      rightlg: 16,
      leftlg: 8,
      pageCurrent: 1,
      visible: false,
      showItem: false,
      selectCustomerItem: '',
      pageChangeCurrent: 1,
      customerPageCurrent: 1,
      isEdit: true,
      selectZhName: false,
      selectEnName: false,
      selectedRowKeys: [],
      customerSelectedRowKeys: [],
      fristLoad: true,
      rowSelectedData: [],
      rowData: [],
      contactsSelectedRowKeys: [],
      rowCustomerData: [],
      rowCustomerSelectedData: [],
      selectType: 'client',
      drawVisible: false,
      maintainerAddVisible: false,
      contactsAddVisible: false,
      contactsTableContent: [],
      contactsTableBody: {},
      Component: '',
      searchCustomerParams: {},
      radioType: 'show_clientlist',
      contactsPage: 1,
      contactsItem: '',
      contactsData: [],
      contactsLoading: false,
      contactsSorts:[],
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'client/fetchListClient',
      payload: { size: defaultPageSize },
    });
    // router.replace('/business/client/emptyView');
  }

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="中文名称" className={clientStyle.small_font}>
              {getFieldDecorator('selectZhName')(<Input size="small" placeholder="请输入"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="英文名称" className={clientStyle.small_font}>
              {getFieldDecorator('selectEnName')(<Input size="small" placeholder="请输入"/>)}
            </FormItem>
          </Col>

          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
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

    const maintainermodalFooter = {
      okText: '保存',
      onOk: this.handleMaintainerSubmit,
      onCancel: this.handleCancel,
    };

    const contactsModalFooter = {
      okText: '保存',
      onOk: this.handleContactsSubmit,
      onCancel: this.handleCancel,
    };

    let {
      selectTitle,
      downTableColumn,
      typeTableContent,
      downTableContent,
      rightlg,
      leftlg,
      visible,
      current = {},
      update,
      contactsTableBody,
      radioType,
      pageCurrent,
      customerPageCurrent,
      customerPageSize,
      customerPageTotal,
      fristLoad,
      selectType,
      selectCustomerItem,
      contactsAddVisible,
      contactsLoading,
      selectedRowKeys,
      customerSelectedRowKeys,
      maintainsLoading,
      maintainTableContent,
      maintainerAddVisible,
      drawVisible,
      contactsTableContent,
      contactsSelectedRowKeys,
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

    const rowMaintainerSelection = {
      selectedRowKeys: customerSelectedRowKeys,
      type: 'checkbox',
      onChange: this.selectCustomerChange,
      onSelect: this.selectChange,
    };

    const {
      clientListloading,
      clientUpdateloading,
      clientSaveloading,
      clientFreezeloading,
      clientDeleteloading,
      customerBody = {},
      body = {},
      form: { getFieldDecorator },
      customerListloading,
      customerSaveloading,
      customerUpdateloading,
      customerDeleteloading,
      customerFreezeloading,
    } = this.props;

    const paginationProps = {
      showQuickJumper: true,
      pageSize: body.size,
      current: pageCurrent,
      total: body.total,
      onChange: this.pageChange,
    };

    const paginationCustomerProps = {
      showQuickJumper: true,
      pageSize: 5,
      current: customerPageCurrent,
      total: customerBody.total,
      onChange: this.pageCustomerChange,
    };

    let isUpdate =
      clientUpdateloading || clientSaveloading || clientDeleteloading || clientFreezeloading;
    let isCurstomerUpdate =
      customerDeleteloading ||
      customerSaveloading ||
      customerUpdateloading ||
      customerDeleteloading;

    if (body) {
      typeTableContent = body.data;
    }

    if (customerListloading) {
      this.state.customerLoad = true;
    } else {
      if (this.state.customerLoad) {
        this.state.customerLoad = false;
        const { rowCustomerData } = this.state;
        // console.log('update list row ', rowCustomerData);
      }
    }

    if (customerBody.data) {
      customerBody.data.map(value => {
        const s = value.status;
        if (s == 0) {
          value.status = '输入';
        } else if (s == 1) {
          value.status = '使用中';
        } else if (s == 2) {
          value.status = '审批';
        }
        return value;
      });
    }

    if (isCurstomerUpdate) {
      this.state.customerLoading = true;
    } else {
      if (this.state.customerLoading) {
        // this.startShowTab();
        this.state.customerLoading = false;
      }
    }

    if (this.state.isDelete) {
      this.setState({});
      this.startShowTab();
      this.state.isDelete = false;
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

    const { contactsItem } = this.state;

    return (
      <div className={clientStyle.page}>
        <div className={clientStyle.nav}>
          <Breadcrumb style={{ display: 'none' }}>
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
                    rowKey={record => record.id}
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

                  <Radio.Group defaultValue="show_clientlist" value={radioType} buttonStyle="solid">
                    <Radio.Button value="show_clientlist" onClick={this.selectClients}>
                      客户列表
                    </Radio.Button>
                    <Radio.Button value="show_persion" onClick={this.selectMaintains}>
                      共同维护人
                    </Radio.Button>
                    <Radio.Button value="show_contacts" onClick={this.selectContacts}>
                      联系人
                    </Radio.Button>
                    <Radio.Button value="">圈戒资料</Radio.Button>
                  </Radio.Group>
                  <div
                    style={{
                      paddingTop: 5,
                      width: '100%',
                      display: selectType === 'client' ? '' : 'none',
                    }}
                  >
                    <CustomerSearchFrom
                      onCustomerSearch={this.handleCustomerSearch}
                      onCustomerReset={this.handleCustomerFormReset}
                    />
                  </div>
                  <Divider className={clientStyle.divder}/>

                  {/*<Button icon="plus" type="primary" style={{ marginBottom: 10 }} onClick={() => this.setState({*/}
                  {/*maintainerAddVisible: true,*/}
                  {/*})} disabled={(!selectCustomerItem) || selectCustomerItem === ''}> 新建</Button>*/}

                  <Button
                    icon="plus"
                    type="primary"
                    style={{
                      marginBottom: 10,
                      marginRight: 20,
                      display: selectType === 'contacts' ? '' : 'none',
                    }}
                    onClick={() =>
                      this.setState({
                        contactsCurrent: {},
                        contactsAddVisible: true,
                      })
                    }
                    disabled={!selectCustomerItem || selectCustomerItem === ''}
                  >
                    新建
                  </Button>

                  <Button
                    icon="edit"
                    type="primary"
                    style={{ marginBottom: 10, marginRight: 20, display: selectType === 'contacts' ? '' : 'none' }}
                    onClick={() => {
                      let contacts = contactsItem;
                      if (contactsTableBody && contactsTableBody.records) {
                        const showcons = contactsTableBody.records.filter(v => {
                          if (v.id === contactsItem.id)
                            return v;
                        });
                        contacts = showcons[0] ? showcons[0] : contactsItem;
                      }

                      this.setState({
                        contactsCurrent: contacts,
                        contactsAddVisible: true,
                      });
                    }
                    }
                    disabled={!contactsItem || contactsItem === ''}
                  >
                    编辑
                  </Button>

                  <Button
                    icon="delete"
                    type="danger"
                    style={{ marginBottom: 10, display: selectType === 'contacts' ? '' : 'none' }}
                    onClick={this.deleteContactsList}
                    disabled={!contactsItem || contactsItem === ''}
                  >
                    删除
                  </Button>

                  <Table
                    style={{ display: selectType === 'client' ? '' : 'none' }}
                    loading={isCurstomerUpdate || customerListloading}
                    dataSource={fristLoad ? [] : customerBody.data}
                    size="middle"
                    rowKey={record => record.id}
                    rowSelection={rowCustomerSelection}
                    onRow={record => {
                      return {
                        onClick: event => {
                          this.clickCustomerRowItem(record);
                        },
                      };
                    }}
                    pagination={paginationCustomerProps}
                    rowClassName={this.onSelectRowClass}
                    columns={clientContentColumns}
                  />

                  <Table
                    style={{ display: selectType === 'maintains' ? '' : 'none' }}
                    loading={maintainsLoading}
                    dataSource={maintainTableContent}
                    size="middle"
                    rowKey={record => record.id}
                    rowSelection={rowMaintainerSelection}
                    rowClassName={this.onSelectRowClass}
                    columns={maintainsColumn}
                  />

                  <JewelryTable
                    style={{ display: selectType === 'contacts' ? '' : 'none' }}
                    onSelectItem={(item, rows) => {
                      this.setState({
                        contactsItem: item,
                        contactsData: rows,
                      });
                    }}
                    loading={contactsLoading}
                    body={contactsTableBody}
                    columns={this.contactsColumn}
                    onChange={this.handleContactsTableChange}
                    pageChange={this.pageContactsChange}
                  />
                </div>
              </Card>
            </Col>
            <Col lg={leftlg} md={24}>
              {this.getDetailInfo()}
            </Col>
          </Row>
        </div>
        <Drawer width={720} onClose={this.onClose} visible={drawVisible}>
          {this.getDetailInfo()}
        </Drawer>

        <Modal
          width={640}
          className={styles.standardListForm}
          destroyOnClose
          visible={visible}
          {...modalFooter}
        >
          {this.getModalContent()}
        </Modal>

        <Modal
          width={640}
          className={styles.standardListForm}
          destroyOnClose
          visible={maintainerAddVisible}
          {...maintainermodalFooter}
        >
          {this.getMaintainerContent()}
        </Modal>

        <ContactsModalForm
          contactsCurrent={this.state.contactsCurrent}
          visible={contactsAddVisible}
          handleCancel={this.handleCancel}
          contactsSubmit={this.handleContactsSubmit}
        />
        {/*<Modal*/}
        {/*width={720}*/}
        {/*className={styles.standardListForm}*/}
        {/*destroyOnClose*/}
        {/*visible={contactsAddVisible}*/}
        {/*{...contactsModalFooter}*/}
        {/*>*/}
        {/*{this.getContactsContent()}*/}
        {/*</Modal>*/}
      </div>
    );
  }




  getModalContent = () => {

    const { form: { getFieldDecorator } } = this.props;
    const { current = {} } = this.state;

    return (
      <div>
        <span className={clientStyle.sun_title_info}>类型</span>
        <Divider className={clientStyle.divder}/>
        <Form size={'small'} onSubmit={this.handleSubmit}>
          <FormItem label="中文名称" {...this.formLayout}>
            {getFieldDecorator('zhName', {
              rules: [{ required: true, message: '请输入中文名称' }],
              initialValue: current.zhName,
            })(<Input placeholder="请输入"/>)}
          </FormItem>
          <FormItem label="英文名称" {...this.formLayout}>
            {getFieldDecorator('enName', {
              rules: [{ message: '请输入英文名称' }],
              initialValue: current.enName,
            })(<Input placeholder="请输入"/>)}
          </FormItem>
        </Form>
      </div>
    );
  };

  getMaintainerContent = () => {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { current = {} } = this.state;
    return (
      <div>
        <span className={clientStyle.sun_title_info}>共同维护人</span>
        <Divider className={clientStyle.divder}/>
        <Form size={'small'} onSubmit={this.handleSubmit}>
          <FormItem label="共同维护人" {...this.formLayout}>
            {getFieldDecorator('salesmanId', {
              rules: [{ required: true, message: '请输入共同维护人' }],
              initialValue: current.salesmanId,
            })(<Input placeholder="请输入"/>)}
          </FormItem>
        </Form>
      </div>
    );
  };


  contactsSortFilter=(field,sort)=>{


    const { contactsSorts } = this.state;

    console.log("contactsSortFilter ",field,sort,contactsSorts)
    let newContacts=[...contactsSorts];
    const findColumn = newContacts.find(item=>item.field===field);

    console.log("sort find ",findColumn)

    if(findColumn)
    {
      if(sort!=='normal'){
        newContacts = newContacts.map(v=>{
          if(v.field===field)
          {
            v.sort = sort;
          }
          return v;
        })

      }else
      {
        newContacts.splice(newContacts.findIndex(v=>v.field===field),1);
      }

    }else
    {
      if(sort!=='normal')
      {
        newContacts.push({
          field,
          sort
        })
      }
    }
    this.state.contactsSorts = newContacts;
    console.log("change cantacts ",newContacts)
    this.loadContactsList();
  }

  clickToggleDrawer = () => {
    const { drawVisible } = this.state;

    if (!drawVisible) this.showDrawer();

  };

  showDrawer = () => {
    this.setState({
      drawVisible: true,
    });
  };

  onClose = () => {
    this.setState({
      drawVisible: false,
    });
  };

  getAddType = () => {
    const { showItem, isEdit } = this.state;
    const data = { ...showItem };

    return (
      <div className={baseStyles.content}>
        <div className={baseStyles.right_info}>
          {showItem ? (
            <DescriptionList size="small" col="1" style={{ paddingLeft: 10, paddingRight: 10 }}>
              <Description term="英文名">{showItem.enName}</Description>
              <Description term="中文名">{showItem.zhName}</Description>
              <Description term="创建日期">{showItem.createTime}</Description>
            </DescriptionList>
          ) : (
            <div/>
          )}
        </div>

        <Card bodyStyle={{ paddingLeft: 5, paddingRight: 5, paddingTop: 5, paddingBottom: 5 }}>
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
                type="primary"
                icon="plus"
                className={clientStyle.buttomControl}
                size={'small'}
                onClick={this.handleNewClient}
              >
                新增
              </Button>
              <Button
                type="danger"
                icon="delete"
                className={clientStyle.buttomControl}
                size={'small'}
                onClick={this.handleDeleteClients}
                disabled={isEdit}
              >
                删除
              </Button>
              <Button
                type="primary"
                size={'small'}
                className={clientStyle.buttomControl}
                icon="edit"
                disabled={isEdit}
                onClick={this.handleEditClient}
              >
                编辑
              </Button>
              <Button
                className={clientStyle.buttomControl}
                size={'small'}
                type="primary"
                icon="lock"
                disabled={isEdit}
                onClick={this.handleFreezeClients}
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
      </div>
    );
  };

  getDetailInfo = () => {
    const { children } = this.props;
    const { selectTitle, Component } = this.state;

    return (
      <div className={clientStyle.right_info}>
        <div className={clientStyle.right_content_tbs}>
          <RadioGroup
            defaultValue="类型"
            size="small"
            className={clientStyle.right_content_tabgroud}
            onChange={this.onChange}
            buttonStyle="solid"
            value={selectTitle}
          >
            <Radio.Button value="类型" onClick={this.startType}>
              类型
            </Radio.Button>
            <Radio.Button value="客户" onClick={this.startClient}>
              客户
            </Radio.Button>
            <Radio.Button value="终客" onClick={this.startTerminal}>
              终客
            </Radio.Button>
            <Radio.Button value="字印" onClick={this.startMark}>
              字印
            </Radio.Button>
            <Radio.Button value="包装" onClick={this.startPackageInfo}>
              包装
            </Radio.Button>
            <Radio.Button value="产品" onClick={this.startProduct}>
              产品
            </Radio.Button>
            <Radio.Button value="历史订单" onClick={this.startHistory}>
              历史订单
            </Radio.Button>
          </RadioGroup>
        </div>
        <div className={clientStyle.list_info}>
          <span className={clientStyle.title_info} onClick={this.clickToggleDrawer}>
            {selectTitle}
          </span>
          <Divider className={clientStyle.divder}/>

          {/*{*/}
          {/*selectTitle === '类型' ? this.getAddType() : children*/}
          {/*}*/}

          {selectTitle === '类型' ? this.getAddType() : Component}
        </div>
      </div>
    );
  };

  clickRowItem = record => {
    const { selectedRowKeys, rowSelectedData } = this.state;
    let rowData = this.state.rowData;
    const selects = selectedRowKeys ? selectedRowKeys : [];
    const id = record.id;

    if (selects.includes(id)) {
      selects.splice(selects.findIndex(index => index === id), 1);
      if (rowData.includes(record)) rowData = [];
      if (rowSelectedData.includes(record)) {
        // console.log('includes ' + record.id);
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

    this.state.selectCustomerItem = '';
    this.setState({
      selectedRowKeys: [].concat(selects),
      rowData,
      customerSelectedRowKeys: [],
      selectCustomerItem: '',
      rowCustomerData: [],
      customerPageCurrent: 1,
      contactsPage: 1,
      contactsTableBody: {},
      rowCustomerSelectedData: [],
    });
    this.selectClients();
    // this.clearClient();
    this.startShowTab();
  };

  clickCustomerRowItem = record => {
    const { customerSelectedRowKeys, rowCustomerSelectedData } = this.state;
    let rowCustomerData = this.state.rowCustomerData;
    // const selects = selectedRowKeys ? selectedRowKeys : [];
    const selects = customerSelectedRowKeys ? customerSelectedRowKeys : [];
    const id = record.id;

    if (selects.includes(id)) {
      selects.splice(selects.findIndex(index => index === id), 1);
      if (rowCustomerData.includes(record)) rowCustomerData = [];
      if (rowCustomerSelectedData.includes(record)) {
        rowCustomerSelectedData.splice(
          rowCustomerSelectedData.findIndex(item => item.id === id),
          1,
        );
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
    }

    if (selects.length > 0) {
      const recordK = selects[selects.length - 1];
      const r = rowCustomerSelectedData.filter(value => value.id == recordK);
      this.state.selectCustomerItem = r[0];
      this.setState({
        selectCustomerItem: r[0],
      });
      // console.log('selectCustomerItem = ', r);
      this.startClient();
    } else {
      this.state.selectCustomerItem = '';
      this.setState({
        selectCustomerItem: '',
      });
    }
    this.setState({
      customerSelectedRowKeys: [].concat(selects),
      rowCustomerData,
      contactsPage: 1,
    });

    this.startShowTab();
  };

  handleSearch = () => {
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      console.log(err);

      const data = { ...fieldsValue };

      let params = {};
      params.zhName = data.selectZhName;
      params.enName = data.selectEnName;
      params.size = defaultPageSize;
      params.current = 1;
      // console.log(params);
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

  handleCustomerSearch = customerParams => {
    const { dispatch } = this.props;
    const { showItem } = this.state;
    // form.validateFields((err, fieldsValue) => {
    // console.log(err);
    if (showItem) {
      const data = { ...customerParams };

      data.typeId = showItem.id;
      this.state.searchCustomerParams = data;
      data.size = defaultPageSize;
      data.current = 0;
      // console.log("search data ", data);
      dispatch({
        type: 'customer/fetchListCustomer',
        payload: {
          ...data,
        },
      });

      this.setState({
        customerPageCurrent: 0,
      });

      // form.resetFields();

      // this.setState({
      //   selectZhName: data.selectZhName,
      //   selectEnName: data.selectEnName,
      //   pageCurrent: 1,
      //   selectedRowKeys: '',
      //   showItem: false,
      //   selectCustomerItem: '',
      //   customerSelectedRowKeys: '',
      //
      // });
    }
  };

  /**
   * 更新右视图
   */
  startShowTab = () => {
    // console.log('startShowTab');
    const { selectTitle } = this.state;
    if (selectTitle === '终客') {
      this.startTerminal();
    } else if (selectTitle === '字印') {
      this.startMark();
    } else if (selectTitle === '客户') this.startClient();
    else if (selectTitle === '包装') this.startPackageInfo();
  };

  handleMaintainerSubmit = () => {
    const { form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) console.log(err);

      this.saveMaintainerList({ ...fieldsValue });

      this.setState({
        maintainerAddVisible: false,
      });
    });
  };

  handleContactsSubmit = (contacts) => {

    // if (err) console.log(err);

    // console.log("handle   ",contacts)

    this.setState({
      contactsLoading: true,
    });

    this.saveContactsList({ ...contacts });

    this.setState({
      contactsAddVisible: false,
    });

  };

  handleSubmit = () => {
    const { dispatch, form } = this.props;
    const { showItem, isAdd } = this.state;
    form.validateFields((err, fieldsValue) => {
      // console.log('handlesub error', err);
      // if (err) return;
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
          contactsTableBody: [],
          contactsItem: '',
          selectCustomerItem: '',
        });
      } else {
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
    const { pageCurrent } = this.state;
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
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      maintainerAddVisible: false,
      contactsAddVisible: false,
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
      payload: { list: selectedRowKeys },
    });

    this.setState({
      selectedRowKeys: '',
      showItem: false,
      isEdit: true,
      pageCurrent: 1,
      rowData: [],
      contactsTableBody: [],
      contactsItem: '',
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
      payload: { list: selectedRowKeys },
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
    console.log('selectChange');
  };

  pageChange = (page, pageSize) => {
    // console.log(page, pageSize);
    const { dispatch } = this.props;

    const { selectZhName, selectEnName } = this.state;
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
      contactsTableBody: [],
      contactsItem: '',
      customerSelectedRowKeys: '',
      selectCustomerItem: '',
      customerPageCurrent: 1,
      isEdit: true,
    });
  };

  handleContactsTableChange = (pagination, filters, sorter) => {
    console.log('hanlde contacts pagination :', pagination, ', filters :', filters, 'sorter is ', sorter);
    this.setState({
      contactsPage: pagination.current,
      contactsSorter: sorter,
    });
    this.state.contactsPage = pagination.current;
    this.state.contactsSorter = sorter;
    this.loadContactsList();


  };

  pageCustomerChange = (page, pageSize) => {
    // console.log(page, pageSize);
    const { dispatch } = this.props;

    const { showItem, searchCustomerParams = {} } = this.state;
    searchCustomerParams.size = defaultPageSize;
    searchCustomerParams.current = page;
    searchCustomerParams.typeId = showItem.id;
    dispatch({
      type: 'customer/fetchListCustomer',
      payload: {
        size: defaultPageSize,
        current: page,
        typeId: showItem.id,
      },
    });

    // const { form } = this.props;
    // form.resetFields();

    this.setState({
      customerPageCurrent: page,
      customerSelectedRowKeys: '',
      selectCustomerItem: '',
      contactsTableBody: [],
    });
    this.state.selectCustomerItem = '';
    this.startShowTab();
  };


  pageContactsChange = (page, pageSize) => {
    this.setState({
      contactsPage: page,
    });
    this.state.contactsPage = page;
    this.loadContactsList();
  };
  onSelectChange = (selectedRowKeys, selectedRows) => {
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
      customerPageCurrent: 1,
      selectCustomerItem: '',
      rowCustomerData: [],
      contactsTableBody: [],
      contactsItem: '',
      rowCustomerSelectedData: [],
    });
    this.state.customerPageCurrent = 1;
    this.state.selectCustomerItem = '';
    // this.clearClient();
    this.selectClients();
    this.startShowTab();
  };

  //merchange
  selectCustomerChange = (selectedRowKeys, selectedRows) => {
    console.log('selectCustomerChange');

    if (selectedRowKeys.length > 0) {
      const recordK = selectedRowKeys[selectedRowKeys.length - 1];
      const record = selectedRows.filter(value => value.id == recordK);
      const d = record[0];
      const selectCustomerItem = { ...d };
      this.setState({
        selectCustomerItem,
        rowCustomerData: selectedRows,
        customerSelectedRowKeys: selectedRowKeys,
        contactsTableBody: [],
        contactsItem: '',
        contactsPage: 1,
      });
      this.state.selectCustomerItem = selectCustomerItem;

      this.startClient();
    } else {
      this.state.selectCustomerItem = '';
      this.setState({
        selectCustomerItem: '',
        isEdit: true,
        rowCustomerData: selectedRows,
        customerSelectedRowKeys: selectedRowKeys,
        contactsPage: 1,
        contactsTableBody: [],
        contactsItem: '',
        current: false,
      });
      // this.clearClient();
    }
    this.startShowTab();
  };

  loadCustomerList = typeId => {
    console.log('loadCustomerList');
    const { dispatch } = this.props;
    const { customerPageCurrent } = this.state;
    dispatch({
      type: 'customer/fetchListCustomer',
      payload: {
        size: defaultPageSize,
        typeId,
        current: customerPageCurrent,
      },
    });

    // const { form } = this.props;
    // form.resetFields();
    this.setState({
      fristLoad: false,
    });
  };

  refreshCustomerList = isdelete => {
    const { showItem } = this.state;
    this.loadCustomerList(showItem.id);
    this.state.isDelete = isdelete;

    // console.log('customer is  ', isdelete, ' delete');

    if (isdelete) {
      this.state.selectCustomerItem = '';
      this.setState({
        selectCustomerItem: '',
        customerSelectedRowKeys: '',
      });
      this.startClient();
    }

    //2019-06-22 15:23
    // this.startShowTab();
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
    this.setState({
      selectTitle: '类型',
      rightlg: 16,
      leftlg: 8,
    });
  };

  startClient = () => {
    const { selectCustomerItem, showItem, customerSelectedRowKeys } = this.state;
    // console.log(selectCustomerItem);
    this.setState({
      selectTitle: '客户',
      rightlg: 16,
      leftlg: 8,
    });

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
    // console.log('keys ', customerSelectedRowKeys, selectCustomerItem);
    // router.replace({ pathname: '/business/client/client', params: params });
    this.setState({
      Component: <ClientInfo params={params}/>,
    });
  };

  startTerminal = () => {
    this.setState({
      selectTitle: '终客',
      rightlg: 16,
      leftlg: 8,
    });
    const { selectCustomerItem } = this.state;
    const params = {};
    if (selectCustomerItem) {
      params.customerId = selectCustomerItem.id;
    } else {
      params.customerId = '';
    }
    this.setState({
      Component: <TerminalClient params={params}/>,
    });
    // console.log('select customer t', selectCustomerItem, params);
    // router.replace({ pathname: '/business/client/terminal', params: params });
  };

  selectClients = () => {
    this.setState({
      downTableColumn: clientContentColumns,
      downTableContent: [],
      selectType: 'client',
      radioType: 'show_clientlist',
    });
  };

  selectMaintains = () => {
    this.setState({
      maintainTableContent: [],
      selectType: 'maintains',
      maintainsLoading: true,
      radioType: 'show_persion',
    });
    this.loadmaintainerList();
  };

  selectContacts = () => {
    this.setState({
      contactsTableContent: [],
      selectType: 'contacts',
      contactsLoading: true,
      radioType: 'show_contacts',
    });
    this.loadContactsList();
  };

  startMark = () => {
    this.setState({
      selectTitle: '字印',
      rightlg: 16,
      leftlg: 8,
    });
    const { selectCustomerItem } = this.state;
    const params = {};
    if (selectCustomerItem) {
      params.customerId = selectCustomerItem.id;
    } else {
      params.customerId = '';
    }
    this.setState({
      Component: <Mark params={params}/>,
    });
    // router.replace({ pathname: '/business/client/marking', params: params });
  };

  startProduct = () => {
    this.setState({
      selectTitle: '产品',
      rightlg: 16,
      leftlg: 8,
    });
    this.setState({
      Component: <Product/>,
    });
    // router.replace({ pathname: '/business/client/product', query: { id: 3 } });
  };

  startPackageInfo = () => {
    this.setState({
      selectTitle: '包装',
      rightlg: 16,
      leftlg: 8,
    });
    const { selectCustomerItem } = this.state;
    const params = {};
    if (selectCustomerItem) {
      params.customerId = selectCustomerItem.id;
    } else {
      params.customerId = '';
    }
    this.setState({
      Component: <PackageInfo params={params}/>,
    });
    // router.replace({ pathname: '/business/client/package', params: params });
  };

  startHistory = () => {
    this.setState({
      selectTitle: '历史订单',
      rightlg: 16,
      leftlg: 8,
    });
    this.setState({
      Component: <History/>,
    });
    // router.replace({ pathname: '/business/client/history', query: { id: 5 } });
  };

  onChange = e => {
    // console.log('select radio=' + e.target.value);
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  loadmaintainerList = () => {
    const { selectCustomerItem } = this.state;
    const _this = this;
    // console.log('loadmaintainerList （', selectCustomerItem);
    if (!selectCustomerItem || selectCustomerItem === '') {
      _this.setState({
        maintainsLoading: false,
      });
      return;
    }

    let params = { customerId: selectCustomerItem.id };

    fetch(HttpFetch.loadMaintainer, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
      .then(response => response.json())
      .then(d => {
        const body = d.body;
        if (body && body.records) {
          if (body.records.length > 0) {
            _this.setState({
              maintainTableContent: body.records,
              maintainsLoading: false,
            });
            return;
          }
        }
        _this.setState({
          maintainsLoading: false,
        });
        console.log('result ', d);
      })
      .catch(function(ex) {
        // console.log('parsing failed', ex);
        message.error('加载失败！');
        _this.setState({
          maintainsLoading: false,
        });
      });
    // }
  };

  loadContactsList = () => {
    const { selectCustomerItem, contactsPage } = this.state;
    const _this = this;
    if (!selectCustomerItem || selectCustomerItem === '') {
      _this.setState({
        contactsLoading: false,
      });
      return;
    }else{
      _this.setState({
        contactsLoading: true,
      });
    }


    let params = { customerId: selectCustomerItem.id, current: contactsPage, size: 5 };

    if(this.state.contactsSorts.length>0) {
      let orderByAsc;
      let orderByDesc;
      this.state.contactsSorts.forEach(v=>{
        if(v.sort==='ascend'){
          if(orderByAsc)
          {
            orderByAsc+=","+v.field;
          }else
          {
            orderByAsc = v.field;
          }
          // orderByAsc+=(orderByAsc===undefined?'':',')+v.field;
        }else if(v.sort==='descend')
        {
          if(orderByDesc)
            orderByDesc+=","+v.field;
          else
            orderByDesc = v.field;

          // orderByDesc+=(orderByDesc===undefined?'':',')+v.field;
        }
      })
      if(orderByAsc)
        params.orderByAsc= orderByAsc;

      if(orderByDesc)
        params.orderByDesc= orderByDesc;
    }

    // if (contactsSorter) {
    //   // console.log('request sorter ', contactsSorter, contactsSorter.order);
    //   if(contactsSorter.column)
    //   if (contactsSorter.order === 'ascend') {
    //     params.orderByAsc = contactsSorter.column.field;
    //   } else
    //     params.orderByDesc = contactsSorter.column.field;
    // }

    // console.log(params);

    fetch(HttpFetch.loadContacts, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
      .then(response => response.json())
      .then(d => {
        const body = d.body;
        if (body && body.records) {

          //tcontactsTableBody

          const contactsRes = body.records.map(value => {
            const s = value.isPrimaryContact;
            if (s == 0) {
              value.isPrimaryContact = '非主联系人';
            } else if (s == 1) {
              value.isPrimaryContact = '主联系人';
            }
            return value;
          });
          body.records = contactsRes;
          if (body.records.length > 0) {
            _this.setState({
              contactsTableContent: body.records,
              contactsTableBody: body,
              contactsLoading: false,
            });
            return;
          } else {
            _this.setState({
              contactsTableBody: {},
              contactsLoading: false,
            });
          }
        }
        _this.setState({
          contactsLoading: false,
        });
        // console.log('result ', d);
      })
      .catch(function(ex) {
        // console.log('parsing failed', ex);
        message.error('加载失败！');
        _this.setState({
          contactsLoading: false,
        });
      });
    // }
  };

  saveMaintainerList = item => {
    const { selectCustomerItem } = this.state;
    const _this = this;
    console.log('saveMaintainerList （', selectCustomerItem);
    if (!selectCustomerItem || selectCustomerItem === '') {
      this.setState({
        maintainsLoading: false,
      });
      return;
    }

    let params = {
      customerId: selectCustomerItem.id,
      salesmanId: item.salesmanId,
    };

    fetch(HttpFetch.saveMaintainer, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
      .then(response => response.json())
      .then(d => {
        const head = d.head;

        if (!head) message.error('保存失败！');
        else {
          if (head.rtnCode === '000000') message.success(head.rtnMsg);
          else message.success(head.rtnMsg);
        }
        _this.setState({
          maintainsLoading: false,
        });
        // console.log('result ', d);
      })
      .catch(function(ex) {
        message.error('保存数据失败！ 请重试');
        _this.setState({
          maintainsLoading: false,
        });
      });
    // }
  };

  saveContactsList = item => {
    const { selectCustomerItem, contactsCurrent = {} } = this.state;
    const _this = this;
    // console.log('saveContactsList （', selectCustomerItem);
    if (!selectCustomerItem || selectCustomerItem === '') {
      this.setState({
        contactsLoading: false,
      });
      return;
    }else{
      this.setState({
        contactsLoading: true,
      });
    }

    let params = item;

    if (item.isPrimaryContact == true) item.isPrimaryContact = '1';
    else item.isPrimaryContact = '0';

    if (contactsCurrent.id)
      params.id = contactsCurrent.id;

    console.log(' 关联客户', item.isPrimaryContact);
    params.customerId = selectCustomerItem.id;


    fetch(HttpFetch.saveContacts, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
      .then(response => response.json())
      .then(d => {
        const head = d.head;

        if (!head) message.error('保存失败！');
        else {
          message.success(head.rtnMsg);
        }
        _this.setState({
          contactsLoading: false,
          contactsCurrent: '',
        });

        this.loadContactsList();
        // console.log('result ', d);
      })
      .catch(function(ex) {
        message.error('保存数据失败！ 请重试');
        _this.setState({
          contactsLoading: false,
        });
      });
    // }
  };

  deleteContactsList = () => {
    const { selectCustomerItem, contactsData } = this.state;
    const _this = this;
    if (!selectCustomerItem || selectCustomerItem === '') {
      this.setState({
        contactsLoading: false,
      });
      return;
    }

    const id = contactsData.map(v => {
      return v.id;
    });


    fetch(HttpFetch.deleteContacts, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(id),
    })
      .then(response => response.json())
      .then(d => {
        const head = d.head;

        if (!head) message.error('删除失败！');
        else {
          message.success(head.rtnMsg);
        }
        _this.setState({
          contactsLoading: false,
          contactsItem: '',
        });

        this.loadContactsList();
        // console.log('result ', d);
      })
      .catch(function(ex) {
        message.error('保存数据失败！ 请重试');
        _this.setState({
          contactsLoading: false,
        });
      });
    // }
  };

  handleCustomerFormReset = () => {
    this.setState({
      searchCustomerParams: {},
    });
  };
}

export default ClientView;
