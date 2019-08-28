import React, { PureComponent } from 'react';
import {
  Card,
  Row,
  Col,
  Table,
  Form,
  Radio,
  Button,
  Input,
  Divider,
  Modal,
  Breadcrumb,
  message,
  Drawer,
} from 'antd';
import { connect } from 'dva';
import styles from '../../Account/Center/Center.less';
// import clientStyle from './Client.less';
import DescriptionList from '@/components/DescriptionList';

import TerminalClient from "../client/TerminalClient";
import ClientInfo from "../client/ClientInfo";
import Mark from "../client/Mark";
import PackageInfo from "../client/PackageInfo";
import Product from "../client/Product";
import History from "../client/History";
import business from "../business.less";
import quote from './index.less';
import JewelryTable from '../../components/JewelryTable';
import CustomerSearchFrom from "../client/components/CustomerSearchFrom";
import HttpFetch from '../../../utils/HttpFetch';
import ContactsModalForm from "../client/components/form/ContactsModalForm";
import { pingYincompare, encompare, formDatecompare } from '@/utils/utils';
import TableSortView from '../../components/TableSortView';
import ProductSearchFrom from '../Product/components/ProductSearchFrom';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const { Description } = DescriptionList;



const clientContentColumns = [
  {
    title: <div className={quote.row_normal2}>客户编号</div>,
    dataIndex: 'customerNo',
    key: 'customerNo',
    // defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: <div className={quote.row_normal2}>简称</div>,
    dataIndex: 'shotName',
    key: 'shotName',
  },
  {
    title: <div className={quote.row_normal2}>英文名称</div>,
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
    title: <div className={quote.row_normal2}>中文名称</div>,
    dataIndex: 'zhName',
    key: 'zhName',
    sorter: (a, b) => {
      return pingYincompare(a.zhName, b.zhName);
    },
  },
  {
    title: <div className={quote.row_normal2}>联系人</div>,
    dataIndex: 'contacts',
    key: 'contacts',
    sorter: (a, b) => {
      return pingYincompare(a.zhName, b.zhName);
    },
  },
  {
    title: <div className={quote.row_normal2}>手机</div>,
    dataIndex: 'tel',
    key: 'tel',
  },

  {
    title: <div className={quote.row_normal2}>电话</div>,
    dataIndex: 'phone',
    key: 'phone',
  },

  {
    title: <div className={quote.row_normal2}>中文地址</div>,
    dataIndex: 'zhAddress',
    key: 'zhAddress',
    sorter: (a, b) => {
      return pingYincompare(a.zhName, b.zhName);
    },
  },

  {
    title: <div className={quote.row_normal2}>英文地址</div>,
    dataIndex: 'enAddress',
    key: 'enAddress',
    sorter: (a, b) => {
      encompare(a.enAddress, b.enAddress);
    },
  },
  {
    title: <div className={quote.row_normal2}>状态</div>,
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
    clientunFreezeloading: loading.effects['client/unfreezeClient'],
    customerListloading: loading.effects['customer/fetchListCustomer'],
    customerSaveloading: loading.effects['customer/addCustomer'],
    customerUpdateloading: loading.effects['customer/updateCustomer'],
    customerDeleteloading: loading.effects['customer/deleteCustomer'],
    customerFreezeloading: loading.effects['customer/freezeCustomer'],
  };
})
@Form.create()
class Quote extends PureComponent {
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

  clientColumns = [
    {
      title: () => {
        return (
          <TableSortView titleFontSize="small" column="客户编号" field="no" sortChange={this.clientSortFilter} />
        );
      },
      dataIndex: 'no',
      key: 'no',
    },
    {
      title: () => {
        return (
          <TableSortView titleFontSize="small" column="简称" field="简称" sortChange={this.clientSortFilter} />
        );
      },
      dataIndex: '简称',
      key: '简称',
    },
    {
      title: () => {
        return (
          <TableSortView
            column="报价单号"
            field="报价单号"
            titleFontSize="small"
            sortChange={this.clientSortFilter}
          />
        );
      },
      dataIndex: '报价单号',
      key: '报价单号',
    },
    {
      title: () => {
        return (
          <TableSortView
            column="类别"
            field="类别"
            titleFontSize="small"
            sortChange={this.clientSortFilter}
          />
        );
      },
      dataIndex: '类别',
      key: '类别',
    },
    {
      title: () => {
        return (
          <TableSortView
            column="报价日期"
            field="报价日期"
            titleFontSize="small"
            sortChange={this.clientSortFilter}
          />
        );
      },
      dataIndex: '报价日期',
      key: '报价日期',
    },
    {
      title: () => {
        return (
          <TableSortView
            column="数量"
            field="数量"
            titleFontSize="small"
            sortChange={this.clientSortFilter}
          />
        );
      },
      dataIndex: '数量',
      key: '数量',
    },
    {
      title: () => {
        return (
          <TableSortView
            column="重量"
            field="重量"
            titleFontSize="small"
            sortChange={this.clientSortFilter}
          />
        );
      },
      dataIndex: '重量',
      key: '重量',
    },
    {
      title: () => {
        return (
          <TableSortView
            column="总量"
            field="总量"
            titleFontSize="small"
            sortChange={this.clientSortFilter}
          />
        );
      },
      dataIndex: '总量',
      key: '总量',
    },
    {
      title: () => {
        return (
          <TableSortView
            column="总额"
            field="总额"
            titleFontSize="small"
            sortChange={this.clientSortFilter}
          />
        );
      },
      dataIndex: '总额',
      key: '总额',
    },
    {
      title: () => {
        return (
          <TableSortView
            column="有效期"
            field="有效期"
            titleFontSize="small"
            sortChange={this.clientSortFilter}
          />
        );
      },
      dataIndex: '有效期',
      key: '有效期',
    },
    {
      title: () => {
        return (
          <TableSortView
            column="终客号"
            field="终客号"
            titleFontSize="small"
            sortChange={this.clientSortFilter}
          />
        );
      },
      dataIndex: '终客号',
      key: '终客号',
    },
    {
      title: () => {
        return (
          <TableSortView
            column="终客简称"
            field="终客简称"
            titleFontSize="small"
            sortChange={this.clientSortFilter}
          />
        );
      },
      dataIndex: '终客简称',
      key: '终客简称',
    },
    {
      title: () => {
        return (
          <TableSortView
            column="产品说明"
            field="产品说明"
            titleFontSize="small"
            sortChange={this.clientSortFilter}
          />
        );
      },
      dataIndex: '产品说明',
      key: '产品说明',
    },
  ];

  contactsColumn = [
    {
      title: () => {
        return (
          <TableSortView
            column="联系人"
            field="contacts"
            sortChange={this.contactsSortFilter}
          />
        );
      },
      dataIndex: 'contacts',
      key: 'contacts',
    },
    {
      title: () => {
        return <TableSortView column="电话" field="tel" sortChange={this.contactsSortFilter} />;
      },
      dataIndex: 'tel',
      key: 'tel',
      field: 'tel',
    },
    {
      title: () => {
        return (
          <TableSortView column="手机" field="phone" sortChange={this.contactsSortFilter} />
        );
      },
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: () => {
        return (
          <TableSortView column="email" field="email" sortChange={this.contactsSortFilter} />
        );
      },
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: () => {
        return <TableSortView column="qq" field="qq" sortChange={this.contactsSortFilter} />;
      },
      dataIndex: 'qq',
      key: 'qq',
    },
    {
      title: () => {
        return (
          <TableSortView column="wechat" field="wechat" sortChange={this.contactsSortFilter} />
        );
      },
      dataIndex: 'wechat',
      key: 'wechat',
    },
    {
      title: () => {
        return (
          <TableSortView
            column="主联系人"
            field="is_primary_contact"
            sortChange={this.contactsSortFilter}
          />
        );
      },
      dataIndex: 'isPrimaryContact',
      key: 'isPrimaryContact',
    },
  ];

  clientContentColumns = [
    {
      // title: <div className={clientInfoStyle.row_normal2}>客户编号</div>,
      title: () => {
        return (
          <TableSortView
            column="客户编号"
            field="customer_no"
            sortChange={this.customerSortFilter}
          />
        );
      },
      dataIndex: 'customerNo',
      key: 'customerNo',
    },
    {
      // title: <div className={clientInfoStyle.row_normal2}>简称</div>,
      title: () => {
        return (
          <TableSortView column="简称" field="shot_name" sortChange={this.customerSortFilter} />
        );
      },
      dataIndex: 'shotName',
      key: 'shotName',
    },
    {
      // title: <div className={clientInfoStyle.row_normal2}>英文名称</div>,
      title: () => {
        return (
          <TableSortView
            column="英文名称"
            field="en_name"
            sortChange={this.customerSortFilter}
          />
        );
      },
      dataIndex: 'enName',
      key: 'enName',
    },
    {
      // title: <div className={clientInfoStyle.row_normal2}>中文名称</div>,
      title: () => {
        return (
          <TableSortView
            column="中文名称"
            field="zh_name"
            sortChange={this.customerSortFilter}
          />
        );
      },
      dataIndex: 'zhName',
      key: 'zhName',
    },
    {
      // title: <div className={clientInfoStyle.row_normal2}>联系人</div>,
      title: () => {
        return (
          <TableSortView
            column="联系人"
            field="contacts"
            sortChange={this.customerSortFilter}
          />
        );
      },
      dataIndex: 'contacts',
      key: 'contacts',
    },
    {
      // title: <div className={clientInfoStyle.row_normal2}>手机</div>,
      title: () => {
        return <TableSortView column="手机" field="tel" sortChange={this.customerSortFilter} />;
      },
      dataIndex: 'tel',
      key: 'tel',
    },

    {
      // title: <div className={clientInfoStyle.row_normal2}>电话</div>,
      title: () => {
        return (
          <TableSortView column="电话" field="phone" sortChange={this.customerSortFilter} />
        );
      },
      dataIndex: 'phone',
      key: 'phone',
    },

    {
      // title: <div className={clientInfoStyle.row_normal2}>中文地址</div>,
      title: () => {
        return (
          <TableSortView
            column="中文地址"
            field="zh_address"
            sortChange={this.customerSortFilter}
          />
        );
      },
      dataIndex: 'zhAddress',
      key: 'zhAddress',
    },

    {
      // title: <div className={clientInfoStyle.row_normal2}>英文地址</div>,
      title: () => {
        return (
          <TableSortView
            column="英文地址"
            field="en_address"
            sortChange={this.customerSortFilter}
          />
        );
      },
      dataIndex: 'enAddress',
      key: 'enAddress',
    },
    {
      // title: <div className={clientInfoStyle.row_normal2}>状态</div>,
      title: () => {
        return (
          <TableSortView column="状态" field="status" sortChange={this.customerSortFilter} />
        );
      },
      dataIndex: 'status',
      key: 'status',
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
      contactsSorts: [],
      clientSorts: [],
      customerSorts: [],
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

  renderSimpleForm = () => {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="中文名称" className={business.small_font}>
              {getFieldDecorator('selectZhName')(<Input size="small" placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="英文名称" className={business.small_font}>
              {getFieldDecorator('selectEnName')(<Input size="small" placeholder="请输入" />)}
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



  getModalContent = () => {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { current = {} } = this.state;

    return (
      <div>
        <span className={business.sun_title_info}>类型</span>
        <Divider className={business.divder} />
        <Form size="small" onSubmit={this.handleSubmit}>
          <FormItem label="中文名称" {...this.formLayout}>
            {getFieldDecorator('zhName', {
              rules: [{ required: true, message: '请输入中文名称' }],
              initialValue: current.zhName,
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem label="英文名称" {...this.formLayout}>
            {getFieldDecorator('enName', {
              rules: [{ message: '请输入英文名称' }],
              initialValue: current.enName,
            })(<Input placeholder="请输入" />)}
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
        <span className={business.sun_title_info}>共同维护人</span>
        <Divider className={business.divder} />
        <Form size="small" onSubmit={this.handleSubmit}>
          <FormItem label="共同维护人" {...this.formLayout}>
            {getFieldDecorator('salesmanId', {
              rules: [{ required: true, message: '请输入共同维护人' }],
              initialValue: current.salesmanId,
            })(<Input placeholder="请输入" />)}
          </FormItem>
        </Form>
      </div>
    );
  };

  contactsSortFilter = (field, sort) => {
    const { contactsSorts } = this.state;
    const newContacts = this.parseOrder(contactsSorts, field, sort);
    this.state.contactsSorts = newContacts;
    // console.log('change cantacts ', newContacts);
    this.loadContactsList();
  };

  customerSortFilter = (field, sort) => {
    const { customerSorts, showItem } = this.state;
    const newCustomer = this.parseOrder(customerSorts, field, sort);
    this.state.customerSorts = newCustomer;
    console.log('change  customer ', newCustomer);
    this.loadCustomerList(showItem.id);
  };

  parseOrder = (oldSort, field, sort) => {
    let newSort = [...oldSort];
    const findColumn = newSort.find(item => item.field === field);

    if (findColumn) {
      if (sort !== 'normal') {
        newSort = newSort.map(v => {
          if (v.field === field) {
            v.sort = sort;
          }
          return v;
        });
      } else {
        newSort.splice(newSort.findIndex(v => v.field === field), 1);
      }
    } else if (sort !== 'normal') {
      newSort.push({
        field,
        sort,
      });
    }

    return newSort;
  };

  clientSortFilter = (field, sort) => {
    const { clientSorts } = this.state;

    const newClients = this.parseOrder(clientSorts, field, sort);
    this.state.clientSorts = newClients;
    // console.log('change cantacts ', clientSorts);
    this.loadClientList();
  };

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
      <div className={quote.content_form}>
        <div className={quote.right_info}>
          {showItem ? (
            <DescriptionList size="small" col="1" style={{ paddingLeft: 10, paddingRight: 10 }}>
              <Description term="英文名">{showItem.enName}</Description>
              <Description term="中文名">{showItem.zhName}</Description>
              <Description term="创建日期">{showItem.createTime}</Description>
            </DescriptionList>
          ) : (
              <div />
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
                className={business.buttomControl}
                size="small"
                onClick={this.handleNewClient}
              >
                新增
              </Button>
              <Button
                type="danger"
                icon="delete"
                className={business.buttomControl}
                size="small"
                onClick={this.handleDeleteClients}
                disabled={isEdit}
              >
                删除
              </Button>
              <Button
                type="primary"
                size="small"
                className={business.buttomControl}
                icon="edit"
                disabled={isEdit}
                onClick={this.handleEditClient}
              >
                编辑
              </Button>

              {showItem.status === '审批' ? (
                <Button
                  className={business.buttomControl}
                  size="small"
                  type="danger"
                  icon="unlock"
                  disabled={isEdit}
                  onClick={this.handleUnFreezeClients}
                >
                  取消审批
                </Button>
              ) : (
                  <Button
                    className={business.buttomControl}
                    size="small"
                    type="primary"
                    icon="lock"
                    disabled={isEdit}
                    onClick={this.handleFreezeClients}
                  >
                    审批
                  </Button>
                )}
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
                className={business.buttomControl}
                type="primary"
                size="small"
                icon="copy"
                disabled
              >
                复制
              </Button>
              <Button
                className={business.buttomControl}
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
      </div>
    );
  };

  getDetailInfo = () => {
    const { children } = this.props;
    const { selectTitle, Component } = this.state;

    return (
      <div className={business.right_info}>
        <div className={business.right_content_tbs}>
          <RadioGroup
            defaultValue="类型"
            size="small"
            className={business.right_content_tabgroud}
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
        <div className={business.list_info}>
          <span className={business.title_info} onClick={this.clickToggleDrawer}>
            {selectTitle}
          </span>
          <Divider className={business.divder} />

          {/* { */}
          {/* selectTitle === '类型' ? this.getAddType() : children */}
          {/* } */}

          {selectTitle === '类型' ? this.getAddType() : Component}
        </div>
      </div>
    );
  };

  clickRowItem = record => {
    const { selectedRowKeys, rowSelectedData } = this.state;
    let { rowData } = this.state;
    const selects = selectedRowKeys || [];
    const { id } = record;

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
    let { rowCustomerData } = this.state;
    // const selects = selectedRowKeys ? selectedRowKeys : [];
    const selects = customerSelectedRowKeys || [];
    const { id } = record;

    if (selects.includes(id)) {
      selects.splice(selects.findIndex(index => index === id), 1);
      if (rowCustomerData.includes(record)) rowCustomerData = [];
      if (rowCustomerSelectedData.includes(record)) {
        rowCustomerSelectedData.splice(
          rowCustomerSelectedData.findIndex(item => item.id === id),
          1
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

      const params = {};
      params.zhName = data.selectZhName;
      params.enName = data.selectEnName;
      params.size = defaultPageSize;
      params.current = 1;
      this.getTabOrderBy(params, this.state.clientSorts);
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
    if (showItem) {
      const data = { ...customerParams };

      // data.typeId = showItem.id;
      this.state.searchCustomerParams = data;

      this.state.customerPageCurrent = 1;

      this.loadCustomerList(showItem.id);

      this.setState({
        customerPageCurrent: 0,
      });
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

  handleContactsSubmit = contacts => {
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

  handleUnFreezeClients = () => {
    const { selectedRowKeys } = this.state;

    const { dispatch } = this.props;
    const data = [];
    data.push(selectedRowKeys);

    dispatch({
      type: 'client/unfreezeClient',
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
    // console.log('selectChange');
  };

  pageChange = (page, pageSize) => {
    // console.log(page, pageSize);
    const { dispatch } = this.props;

    const { selectZhName, selectEnName } = this.state;
    const zhName = selectZhName || undefined;
    const enName = selectEnName || undefined;
    const params = {
      size: defaultPageSize,
      current: page,
      zhName,
      enName,
    };
    this.getTabOrderBy(params, this.state.clientSorts);
    dispatch({
      type: 'client/fetchListClient',
      payload: { ...params },
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
    // const { dispatch } = this.props;

    const { showItem, searchCustomerParams = {} } = this.state;
    // searchCustomerParams.size = defaultPageSize;
    // searchCustomerParams.current = page;
    // searchCustomerParams.typeId = showItem.id;
    //

    // let params = {
    //   size: defaultPageSize,
    //   current: page,
    //   typeId: showItem.id,
    // };
    //
    // this.getTabOrderBy(params, this.state.customerSorts);
    //
    // dispatch({
    //   type: 'customer/fetchListCustomer',
    //   payload: {
    //     ...params,
    //   },
    // });

    // const { form } = this.props;
    // form.resetFields();

    this.state.customerPageCurrent = page;

    this.loadCustomerList(showItem.id);

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

  // merchange
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
    const { dispatch } = this.props;
    const { customerPageCurrent } = this.state;

    const tyid = typeId || ' ';

    const params = this.state.searchCustomerParams;

    params.size = defaultPageSize;
    params.typeId = tyid;
    params.current = customerPageCurrent;

    this.getTabOrderBy(params, this.state.customerSorts);

    // console.log(' tab custom', params, this.state.customerSorts);

    dispatch({
      type: 'customer/fetchListCustomer',
      payload: { ...params },
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

    // 2019-06-22 15:23
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
      color = business.row_normal;
    }
    return color;
  };

  onSelectCustomerRowClass = (record, index) => {
    let color = business.row_normal2;
    if (index % 2 == 0) {
      color = business.row_normal;
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
      Component: <ClientInfo params={params} />,
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
      Component: <TerminalClient params={params} />,
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
      Component: <Mark params={params} />,
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
      Component: <Product />,
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
      Component: <PackageInfo params={params} />,
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
      Component: <History />,
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

    const params = { customerId: selectCustomerItem.id };

    fetch(HttpFetch.loadMaintainer, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        token: getCurrentUser() ? getCurrentUser().token : '',
      },
      body: JSON.stringify(params),
    })
      .then(response => response.json())
      .then(d => {
        const { body } = d;
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
        // console.log('result ', d);
      })
      .catch(function (ex) {
        // console.log('parsing failed', ex);
        message.error('加载失败！');
        _this.setState({
          maintainsLoading: false,
        });
      });
    // }
  };

  getTabOrderBy = (params, sorts) => {
    if (sorts && sorts.length > 0) {
      let orderByAsc;
      let orderByDesc;
      sorts.forEach(v => {
        if (v.sort === 'ascend') {
          if (orderByAsc) {
            orderByAsc += `,${v.field}`;
          } else {
            orderByAsc = v.field;
          }
          // orderByAsc+=(orderByAsc===undefined?'':',')+v.field;
        } else if (v.sort === 'descend') {
          if (orderByDesc) orderByDesc += `,${v.field}`;
          else orderByDesc = v.field;

          // orderByDesc+=(orderByDesc===undefined?'':',')+v.field;
        }
      });
      if (orderByAsc) params.orderByAsc = orderByAsc;
      else params.orderByAsc = undefined;

      if (orderByDesc) params.orderByDesc = orderByDesc;
      else params.orderByDesc = undefined;
    } else {
      params.orderByAsc = undefined;
      params.orderByDesc = undefined;
    }
  };

  loadClientList = () => {
    const { dispatch } = this.props;
    const { pageCurrent, selectZhName, selectEnName } = this.state;
    /*
    * selectZhName: data.selectZhName,
        selectEnName: data.selectEnName,
    * */
    const params = { size: defaultPageSize, current: pageCurrent };
    params.zhName = selectZhName || undefined;
    params.enName = selectEnName || undefined;
    this.getTabOrderBy(params, this.state.clientSorts);
    dispatch({
      type: 'client/fetchListClient',
      payload: { ...params },
    });
  };

  loadContactsList = () => {
    const { selectCustomerItem, contactsPage } = this.state;
    const _this = this;
    if (!selectCustomerItem || selectCustomerItem === '') {
      _this.setState({
        contactsLoading: false,
      });
      return;
    }
    _this.setState({
      contactsLoading: true,
    });


    const params = { customerId: selectCustomerItem.id, current: contactsPage, size: 5 };

    if (this.state.contactsSorts.length > 0) {
      let orderByAsc;
      let orderByDesc;
      this.state.contactsSorts.forEach(v => {
        if (v.sort === 'ascend') {
          if (orderByAsc) {
            orderByAsc += `,${v.field}`;
          } else {
            orderByAsc = v.field;
          }
          // orderByAsc+=(orderByAsc===undefined?'':',')+v.field;
        } else if (v.sort === 'descend') {
          if (orderByDesc) orderByDesc += `,${v.field}`;
          else orderByDesc = v.field;

          // orderByDesc+=(orderByDesc===undefined?'':',')+v.field;
        }
      });
      if (orderByAsc) params.orderByAsc = orderByAsc;

      if (orderByDesc) params.orderByDesc = orderByDesc;
    }

    fetch(HttpFetch.loadContacts, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        token: getCurrentUser() ? getCurrentUser().token : '',
      },
      body: JSON.stringify(params),
    })
      .then(response => response.json())
      .then(d => {
        const { body } = d;
        if (body && body.records) {
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
          }
          _this.setState({
            contactsTableBody: {},
            contactsLoading: false,
          });

        }
        _this.setState({
          contactsLoading: false,
        });
        // console.log('result ', d);
      })
      .catch(function (ex) {
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

    const params = {
      customerId: selectCustomerItem.id,
      salesmanId: item.salesmanId,
    };

    fetch(HttpFetch.saveMaintainer, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        token: getCurrentUser() ? getCurrentUser().token : '',
      },
      body: JSON.stringify(params),
    })
      .then(response => response.json())
      .then(d => {
        const { head } = d;

        if (!head) message.error('保存失败！');
        else if (head.rtnCode === '000000') message.success(head.rtnMsg);
        else message.success(head.rtnMsg);
        _this.setState({
          maintainsLoading: false,
        });
        // console.log('result ', d);
      })
      .catch(function (ex) {
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
    }
    this.setState({
      contactsLoading: true,
    });


    const params = item;

    if (item.isPrimaryContact == true) item.isPrimaryContact = '1';
    else item.isPrimaryContact = '0';

    if (contactsCurrent.id) params.id = contactsCurrent.id;

    console.log(' 关联客户', item.isPrimaryContact);
    params.customerId = selectCustomerItem.id;

    fetch(HttpFetch.saveContacts, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        token: getCurrentUser() ? getCurrentUser().token : '',
      },
      body: JSON.stringify(params),
    })
      .then(response => response.json())
      .then(d => {
        const { head } = d;

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
      .catch(function (ex) {
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
        token: getCurrentUser() ? getCurrentUser().token : '',
      },
      body: JSON.stringify(id),
    })
      .then(response => response.json())
      .then(d => {
        const { head } = d;

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
      .catch(function (ex) {
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
      clientunFreezeloading,
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
      pageSize: customerBody.size,
      current: customerPageCurrent,
      total: customerBody.total,
      onChange: this.pageCustomerChange,
    };

    const isUpdate =
      clientUpdateloading ||
      clientSaveloading ||
      clientDeleteloading ||
      clientFreezeloading ||
      clientunFreezeloading;
    const isCurstomerUpdate =
      customerDeleteloading ||
      customerSaveloading ||
      customerUpdateloading ||
      customerDeleteloading;

    if (body) {
      typeTableContent = body.data;
    }

    if (customerListloading) {
      this.state.customerLoad = true;
    } else if (this.state.customerLoad) {
      this.state.customerLoad = false;
      const { rowCustomerData } = this.state;
      // console.log('update list row ', rowCustomerData);
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
    } else if (this.state.customerLoading) {
      // this.startShowTab();
      this.state.customerLoading = false;
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
    } else if (update) {
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

    const { contactsItem } = this.state;

    return (
      <div className={business.page}>
        <div className={business.center_content}>
          <Row gutter={24}>
            <Col lg={rightlg} md={24}>
              <Card bordered={false} className={business.left_content} loading={false}>
                <div style={{ marginBottom: 16 }}>
                  <Radio.Group defaultValue="current_quote" buttonStyle="solid">
                    <Radio.Button value="current_quote">
                      当前报价
                    </Radio.Button>
                    <Radio.Button value="history_quote">
                      历史报价
                    </Radio.Button>
                  </Radio.Group>
                  <ProductSearchFrom />
                  <Table
                    style={{ marginBottom: 20 }}
                    loading={clientListloading || isUpdate}
                    size="middle"
                    dataSource={typeTableContent}
                    rowSelection={rowSelection}
                    pagination={paginationProps}
                    rowClassName={this.onSelectRowClass}
                    rowKey={record => record.id}
                    columns={this.clientColumns}
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
                  <Divider className={business.divder} />

                  {/* <Button icon="plus" type="primary" style={{ marginBottom: 10 }} onClick={() => this.setState({ */}
                  {/* maintainerAddVisible: true, */}
                  {/* })} disabled={(!selectCustomerItem) || selectCustomerItem === ''}> 新建</Button> */}

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
                    style={{
                      marginBottom: 10,
                      marginRight: 20,
                      display: selectType === 'contacts' ? '' : 'none',
                    }}
                    onClick={() => {
                      let contacts = contactsItem;
                      if (contactsTableBody && contactsTableBody.records) {
                        const showcons = contactsTableBody.records.filter(v => {
                          if (v.id === contactsItem.id) return v;
                        });
                        contacts = showcons[0] ? showcons[0] : contactsItem;
                      }

                      this.setState({
                        contactsCurrent: contacts,
                        contactsAddVisible: true,
                      });
                    }}
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
                    rowClassName={this.onSelectCustomerRowClass}
                    className={business.small2_table}
                    columns={this.clientContentColumns}
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
        {/* <Modal */}
        {/* width={720} */}
        {/* className={styles.standardListForm} */}
        {/* destroyOnClose */}
        {/* visible={contactsAddVisible} */}
        {/* {...contactsModalFooter} */}
        {/* > */}
        {/* {this.getContactsContent()} */}
        {/* </Modal> */}
      </div>
    );
  }
}

export default Quote;