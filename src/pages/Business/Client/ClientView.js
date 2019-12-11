import React, { PureComponent } from 'react';
import {
  Table,
  Card,
  Row,
  Col,
  Form,
  Select,
  Tabs,
  Radio,
  Button,
  Input,
  Divider,
  Modal,
  notification,
  Breadcrumb,
  message,
  Drawer,
} from 'antd';
import ModalConfirm from '@/utils/modal';
import { connect } from 'dva';
import styles from '../../Account/Center/Center.less';
import clientStyle from './Client.less';
import DescriptionList from '@/components/DescriptionList';
import { statusConvert } from '@/utils/convert';
import { getCurrentUser } from '@/utils/authority';
import { pingYincompare, encompare, formDatecompare } from '@/utils/utils';
import CoMaintainerDDs from './components/CoMaintainerDDs';

import TerminalClient from './TerminalClient';
import ClientInfo from './ClientInfo';
import Mark from './Mark';
import PackageInfo from './PackageInfo';
import Product from './Product';
import History from './History';
import listStyles from './TableList.less';
import baseStyles from './base.less';
import business from '../business.less';
import clientInfoStyle from './ClientInfo.less';
import JewelryTable from '../../components/JewelryTable';
import CustomerSearchFrom from './components/CustomerSearchFrom';
import HttpFetch, { deleteMaintainer } from '../../../utils/HttpFetch';
import ContactsModalForm from './components/form/ContactsModalForm';
import RingsModalForm from './components/form/RingsModalForm';
import TableSortView from '../../components/TableSortView';
import { FormattedMessage } from 'umi-plugin-react/locale';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const { Description } = DescriptionList;

const clientContentColumns = [
  {
    title: <div className={clientInfoStyle.row_normal2}>客户编号</div>,
    dataIndex: 'customerNo',
    key: 'customerNo',
    // defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: <div className={clientInfoStyle.row_normal2}>简称</div>,
    dataIndex: 'shotName',
    key: 'shotName',
  },
  {
    title: <div className={clientInfoStyle.row_normal2}>英文名称</div>,
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
    title: <div className={clientInfoStyle.row_normal2}>中文名称</div>,
    dataIndex: 'zhName',
    key: 'zhName',
    sorter: (a, b) => {
      return pingYincompare(a.zhName, b.zhName);
    },
  },
  {
    title: <div className={clientInfoStyle.row_normal2}>联系人</div>,
    dataIndex: 'contacts',
    key: 'contacts',
    sorter: (a, b) => {
      return pingYincompare(a.zhName, b.zhName);
    },
  },
  {
    title: <div className={clientInfoStyle.row_normal2}>手机</div>,
    dataIndex: 'tel',
    key: 'tel',
  },

  {
    title: <div className={clientInfoStyle.row_normal2}>电话</div>,
    dataIndex: 'phone',
    key: 'phone',
  },

  {
    title: <div className={clientInfoStyle.row_normal2}>中文地址</div>,
    dataIndex: 'zhAddress',
    key: 'zhAddress',
    sorter: (a, b) => {
      return pingYincompare(a.zhName, b.zhName);
    },
  },

  {
    title: <div className={clientInfoStyle.row_normal2}>英文地址</div>,
    dataIndex: 'enAddress',
    key: 'enAddress',
    sorter: (a, b) => {
      encompare(a.enAddress, b.enAddress);
    },
  },
  {
    title: <div className={clientInfoStyle.row_normal2}>状态</div>,
    dataIndex: 'status',
    key: 'status',
  },
];

const defaultPageSize = 5;

let clientContentColumns2 = [
  {
    // title: <div className={clientInfoStyle.row_normal2}>客户编号</div>,
    title: '客户编号',
    dataIndex: 'customerNo',
    key: 'customerNo',
  },
  {
    // title: <div className={clientInfoStyle.row_normal2}>简称</div>,
    title: '简称',
    dataIndex: 'shotName',
    key: 'shotName',
  },
  {
    // title: <div className={clientInfoStyle.row_normal2}>英文名称</div>,
    title: '英文名称',
    dataIndex: 'enName',
    key: 'enName',
  },
  {
    // title: <div className={clientInfoStyle.row_normal2}>中文名称</div>,
    title: '中文名称',
    dataIndex: 'zhName',
    key: 'zhName',
  },
  {
    // title: <div className={clientInfoStyle.row_normal2}>联系人</div>,
    title: '联系人',
    dataIndex: 'contacts',
    key: 'contacts',
  },
  {
    // title: <div className={clientInfoStyle.row_normal2}>手机</div>,
    title: '手机',
    key: 'tel',
  },

  {
    // title: <div className={clientInfoStyle.row_normal2}>电话</div>,
    title: '电话',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    // title: <div className={clientInfoStyle.row_normal2}>状态</div>,
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: data => statusConvert[data],
  },
];

clientContentColumns2 = clientContentColumns2.map(row => ({ ...row, sorter: true }));

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

  clientColumns = [
    {
      title: () => {
        return (
          <TableSortView column="中文名称" field="zh_name" sortChange={this.clientSortFilter} />
        );
      },
      dataIndex: 'zhName',
      key: 'zhName',
    },
    {
      title: () => {
        return (
          <TableSortView column="英文名称" field="en_name" sortChange={this.clientSortFilter} />
        );
      },
      dataIndex: 'enName',
      key: 'enName',
    },
    {
      title: () => {
        return (
          <TableSortView column="创建时间" field="create_time" sortChange={this.clientSortFilter} />
        );
      },
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: () => {
        return <TableSortView column="状态" field="status" sortChange={this.clientSortFilter} />;
      },
      dataIndex: 'status',
      key: 'status',
      render: data => statusConvert[data],
    },
  ];

  maintainsColumns = [
    {
      title: '员工编号',
      dataIndex: 'salesmanId',
      key: 'salesmanId',
    },
    {
      title: '姓名',
      dataIndex: 'salesmanName',
      key: 'salesmanName',
    },
  ];

  ringsColumn = [
    {
      title: '圈戒编号',
      field: 'ringAroundName',
      dataIndex: 'ringAroundName',
      key: 'ringAroundName',
    },
  ];

  contactsColumn = [
    {
      title: () => {
        return (
          <TableSortView column="联系人" field="contacts" sortChange={this.contactsSortFilter} />
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
        return <TableSortView column="手机" field="phone" sortChange={this.contactsSortFilter} />;
      },
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: () => {
        return <TableSortView column="email" field="email" sortChange={this.contactsSortFilter} />;
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
      contactsCurrent: {},
      ringsAddVisible: false,
      modalkey: 'a',
      contactsTableContent: [],
      ringsTableContent: [],
      contactsTableBody: {},
      ringsTableBody: {},
      ringsItem: '',
      ringsData: {},
      Component: '',
      searchCustomerParams: {},
      radioType: 'show_clientlist',
      contactsPage: 1,
      ringsPage: 1,
      contactsItem: '',
      contactsData: [],
      contactsLoading: false,
      ringsLoading: false,
      contactsSorts: [],
      ringsSorts: [],
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

  // 第一部分 搜索框
  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="中文名称" className={clientStyle.small_font}>
              {getFieldDecorator('selectZhName')(<Input size="small" placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="英文名称" className={clientStyle.small_font}>
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
        <span className={clientStyle.sun_title_info}>类型</span>
        <Divider className={clientStyle.divder} />
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
    // const { current = {} } = this.state;
    return (
      <div>
        <span className={clientStyle.sun_title_info}>共同维护人</span>
        <Divider className={clientStyle.divder} />
        <Form size="small" onSubmit={this.handleSubmit}>
          <FormItem label="共同维护人" {...this.formLayout}>
            {getFieldDecorator('salesmanId', {
              rules: [{ required: true, message: '请输入共同维护人' }],
            })(<CoMaintainerDDs />)}
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
    this.loadCustomerList({ typeId: showItem.id });
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
        newSort.splice(
          newSort.findIndex(v => v.field === field),
          1
        );
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
    const { showItem, isEdit, selectedRowKeys, rowSelectedData } = this.state;

    return (
      <div className={baseStyles.content}>
        <div className={baseStyles.right_info}>
          {showItem ? (
            <DescriptionList size="small" col="2" style={{ padding: 10 }}>
              <Description term="英文名">{showItem.enName}</Description>
              <Description term="中文名">{showItem.zhName}</Description>
              {/* <Description term="创建日期">{showItem.createTime}</Description> */}
              <Description term="状态">{statusConvert[showItem.status]}</Description>
              <Description term="新增人">{showItem.createUser}</Description>
              <Description term="新增时间">{showItem.createTime}</Description>
              <Description term="修改人">{showItem.modifier}</Description>
              <Description term="修改时间">{showItem.mtime}</Description>
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
                className={clientStyle.buttomControl}
                size="small"
                onClick={this.handleNewClient}
              >
                新增
              </Button>
              <Button
                type="danger"
                icon="delete"
                className={clientStyle.buttomControl}
                size="small"
                onClick={() => {
                  ModalConfirm({
                    content: '确定删除吗？',
                    onOk: () => {
                      this.handleDeleteClients();
                    },
                  });
                }}
                disabled={
                  selectedRowKeys.length === 0 || !rowSelectedData.every(e => e.status === '0')
                }
              >
                删除
              </Button>
              <Button
                type="primary"
                size="small"
                className={clientStyle.buttomControl}
                icon="edit"
                disabled={selectedRowKeys.length === 0 || !showItem || showItem.status === '2'}
                onClick={this.handleEditClient}
              >
                编辑
              </Button>

              {showItem.status === '2' ? (
                <Button
                  className={clientStyle.buttomControl}
                  size="small"
                  type="danger"
                  icon="unlock"
                  disabled={
                    selectedRowKeys.length === 0 || !rowSelectedData.every(e => e.status === '2')
                  }
                  onClick={() => {
                    ModalConfirm({
                      content: '确定取消审批吗？',
                      onOk: () => {
                        this.handleUnFreezeClients();
                      },
                    });
                  }}
                >
                  取消审批
                </Button>
              ) : (
                <Button
                  className={clientStyle.buttomControl}
                  size="small"
                  type="primary"
                  icon="lock"
                  disabled={
                    selectedRowKeys.length === 0 || !rowSelectedData.every(e => e.status === '0')
                  }
                  onClick={() => {
                    ModalConfirm({
                      content: '确定审批吗？',
                      onOk: () => {
                        this.handleFreezeClients();
                      },
                    });
                  }}
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
                className={clientStyle.buttomControl}
                type="primary"
                size="small"
                icon="copy"
                disabled
              >
                复制
              </Button>
              <Button
                className={clientStyle.buttomControl}
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
          <Divider className={clientStyle.divder} />

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
      selects.splice(
        selects.findIndex(index => index === id),
        1
      );
      if (rowData.includes(record)) rowData = [];
      if (rowSelectedData.includes(record)) {
        // console.log('includes ' + record.id);
        rowSelectedData.splice(
          rowSelectedData.findIndex(item => item.id === id),
          1
        );
      }
    } else {
      if (rowData.length > 0) {
        selects.splice(
          selects.findIndex(index => index === rowData[0].id),
          1
        );
      }
      rowData = [];
      rowData.push({ ...record });
      selects.push(id);
      rowSelectedData.push(record);
    }

    if (selects.length > 0) {
      const recordK = selects[selects.length - 1];
      const r = rowSelectedData.filter(value => value.id == recordK);
      this.setState(
        {
          customerPageCurrent: 1,
        },
        () => {
          this.showSelectItem(r[0]);
        }
      );
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
      selects.splice(
        selects.findIndex(index => index === id),
        1
      );
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
        selects.splice(
          selects.findIndex(index => index === rowCustomerSelectedData[0].id),
          1
        );
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
    const { sort } = this.state;
    form.validateFields((err, fieldsValue) => {
      console.log(err);

      const data = { ...fieldsValue };

      let params = {
        zhName: data.selectZhName,
        enName: data.selectEnName,
        size: defaultPageSize,
        current: 1,
        ...sort,
      };
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

      this.loadCustomerList({ typeId: showItem.id });

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

  handleRingsSubmit = ids => {
    const { selectCustomerItem } = this.state;
    if (!selectCustomerItem || selectCustomerItem === '') {
      this.setState({
        ringsLoading: false,
      });
      return;
    }
    const _this = this;
    const params = {
      ringSizeIds: ids,
      customerId: selectCustomerItem.id,
    };
    fetch(HttpFetch.saveRings, {
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
          notification.success({
            message: head.rtnMsg,
          });
        }
        _this.setState({
          ringsLoading: false,
          ringsAddVisible: false,
        });

        this.loadRingsList();
      })
      .catch(function(ex) {
        message.error('保存数据失败！ 请重试');
        _this.setState({
          contactsLoading: false,
        });
      });
  };

  // 联系人添加
  handleContactsSubmit = (contacts, close) => {
    this.setState({
      contactsLoading: true,
    });

    this.saveContactsList({ ...contacts });

    this.setState({
      contactsAddVisible: !close,
    });
  };

  handleSubmit = close => {
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
          callback: () => {
            this.setState({
              visible: !close,
            });
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
          callback: () => {
            this.setState({
              visible: !close,
            });
          },
        });
      }
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
      fristLoad: true,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      maintainerAddVisible: false,
      contactsAddVisible: false,
      ringsAddVisible: false,
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
      rowSelectedData: [],
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
      rowSelectedData: [],
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

    const { selectZhName, selectEnName, sort } = this.state;
    const zhName = selectZhName || undefined;
    const enName = selectEnName || undefined;
    const params = {
      size: defaultPageSize,
      current: page,
      zhName,
      enName,
      ...sort,
    };
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

  handleRingsTableChange = (pagination, filters, sorter) => {
    this.setState({
      RingsPage: pagination.current,
      RingsSorter: sorter,
    });
    this.state.RingsPage = pagination.current;
    this.state.RingsSorter = sorter;
    this.loadContactsList();
  };

  handleContactsTableChange = (pagination, filters, sorter) => {
    this.setState({
      contactsPage: pagination.current,
      contactsSorter: sorter,
    });
    this.state.contactsPage = pagination.current;
    this.state.contactsSorter = sorter;
    this.loadRingsList();
  };

  handleMaintainsTableChange = (pagination, filters, sorter) => {
    this.setState({
      maintainsPage: pagination.current,
      maintainsSorter: sorter,
    });
    this.state.maintainsPage = pagination.current;
    this.state.maintainsSorter = sorter;
    this.loadmaintainerList();
  };

  pageCustomerChange = (page, pageSize, sorter) => {
    const { current } = page;
    const { showItem, searchCustomerParams = {} } = this.state;
    let orderKey;
    let params = {};
    if (sorter) {
      const { order, field } = sorter;
      orderKey = order === 'ascend' ? 'Asc' : order === 'descend' ? 'Desc' : '';
      params = { [`orderBy${orderKey}`]: field };
    }

    this.setState(
      {
        customerPageCurrent: current,
        sort: params,
      },
      () => {
        this.loadCustomerList({ typeId: showItem.id, ...params });
      }
    );
    this.state.customerPageCurrent = current;

    this.setState({
      customerPageCurrent: current,
      customerSelectedRowKeys: '',
      selectCustomerItem: '',
      contactsTableBody: [],
    });
    this.state.selectCustomerItem = '';
    this.startShowTab();
  };

  pageRingsChange = (page, pageSize) => {
    this.setState({
      ringsPage: page,
    });
    this.state.ringsPage = page;
    this.loadRingsList();
  };

  pageContactsChange = (page, pageSize) => {
    this.setState({
      contactsPage: page,
    });
    this.state.contactsPage = page;
    this.loadContactsList();
  };

  pageMaintainsChange = (page, pageSize) => {
    this.setState({
      maintainsPage: page,
    });
    this.state.maintainsPage = page;
    this.loadmaintainerList();
  };

  onSelectChange = (selectedRowKeys, selectedRows) => {
    console.log(111111, selectedRowKeys, selectedRows);
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

  // 客户列表选中 客户
  selectCustomerChange = (selectedRowKeys, selectedRows) => {
    console.log('selectCustomerChange', selectedRowKeys, selectedRows);

    if (selectedRowKeys.length > 0) {
      const recordK = selectedRowKeys[selectedRowKeys.length - 1];
      const record = selectedRows.filter(value => value.id == recordK);
      const d = record[0];
      const selectCustomerItem = { ...d };
      this.setState(
        {
          selectCustomerItem,
          rowCustomerData: selectedRows,
          customerSelectedRowKeys: selectedRowKeys,
          contactsTableBody: [],
          contactsItem: '',
          contactsPage: 1,
        },
        () => {
          // this.startClient();
          // 更新右视图
          this.startShowTab();
        }
      );
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
  };

  loadCustomerList = params => {
    const { dispatch } = this.props;
    const { customerPageCurrent, searchCustomerParams, customerSorts, sort } = this.state;

    const paramsObj = {
      ...searchCustomerParams,
      size: defaultPageSize,
      current: customerPageCurrent,
      ...sort,
      ...params,
    };
    // console.log(' tab custom', params, this.state.customerSorts);

    dispatch({
      type: 'customer/fetchListCustomer',
      payload: { ...paramsObj },
    });

    // const { form } = this.props;
    // form.resetFields();
    this.setState({
      fristLoad: false,
    });
  };

  refreshCustomerList = isdelete => {
    const { showItem } = this.state;
    this.loadCustomerList({ typeId: showItem.id });
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

    this.loadCustomerList({ typeId: record.id });

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

  onSelectCustomerRowClass = (record, index) => {
    let color = clientInfoStyle.row_normal2;
    if (index % 2 == 0) {
      color = clientInfoStyle.row_normal;
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
    console.log('keyscustomerSelectedRowKeys', customerSelectedRowKeys);
    console.log('keysselectCustomerItem', selectCustomerItem);
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
      Component: (
        <TerminalClient params={params} customLock={this.state.selectCustomerItem.status === '2'} />
      ),
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

  selectRings = () => {
    this.setState({
      ringsTableContent: [],
      selectType: 'rings',
      ringsLoading: true,
      radioType: 'show_ring',
    });
    this.loadRingsList();
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
      Component: <Mark params={params} customLock={this.state.selectCustomerItem.status === '2'} />,
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
      Component: <Product customLock={this.state.selectCustomerItem.status === '2'} />,
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
      Component: (
        <PackageInfo params={params} customLock={this.state.selectCustomerItem.status === '2'} />
      ),
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
      Component: <History customLock={this.state.selectCustomerItem.status === '2'} />,
    });
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
          _this.setState({
            maintainTableContent: body,
            maintainsLoading: false,
          });
          return;
        }
        _this.setState({
          maintainsLoading: false,
        });
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

  loadClientList = () => {
    const { dispatch } = this.props;
    const { pageCurrent, selectZhName, selectEnName, sort } = this.state;
    /*
    * selectZhName: data.selectZhName,
        selectEnName: data.selectEnName,
    * */
    const params = {
      size: defaultPageSize,
      current: pageCurrent,
      zhName: selectZhName || undefined,
      enName: selectEnName || undefined,
      ...sort,
    };
    dispatch({
      type: 'client/fetchListClient',
      payload: { ...params },
    });
  };

  loadRingsList = () => {
    const { selectCustomerItem, ringsPage } = this.state;
    const _this = this;
    if (!selectCustomerItem || selectCustomerItem === '') {
      _this.setState({
        ringsLoading: false,
      });
      return;
    }
    _this.setState({
      ringsLoading: true,
    });

    const params = { customerId: selectCustomerItem.id, current: ringsPage, size: 5 };

    fetch(HttpFetch.loadRings, {
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
              ringsTableContent: body.records,
              ringsTableBody: body,
              ringsLoading: false,
            });
            return;
          }
          _this.setState({
            ringsTableBody: {},
            ringsLoading: false,
          });
        }
        _this.setState({
          ringsLoading: false,
        });
      })
      .catch(function(ex) {
        message.error('加载失败！');
        _this.setState({
          ringsLoading: false,
        });
      });
    //
  };

  loadContactsList = () => {
    const { selectCustomerItem, contactsPage, sort } = this.state;
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

    const params = {
      customerId: selectCustomerItem.id,
      current: contactsPage,
      size: 5,
      ...sort,
    };

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

        if (!head) {
          notification.error({
            message: '保存失败！',
          });
        } else if (head.rtnCode === '000000') {
          notification.success({
            message: head.rtnMsg,
          });
        } else {
          notification.success({
            message: head.rtnMsg,
          });
        }
        _this.setState({
          maintainsLoading: false,
        });
        this.loadmaintainerList();
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
    }
    this.setState({
      contactsLoading: true,
    });

    const params = item;

    if (item.isPrimaryContact == true) item.isPrimaryContact = '1';
    else item.isPrimaryContact = '0';

    if (contactsCurrent.id) params.id = contactsCurrent.id;

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

        if (!head) {
          notification.error({
            message: '保存失败！',
          });
        } else {
          notification.success({
            message: head.rtnMsg,
          });
        }
        _this.setState({
          contactsLoading: false,
        });

        _this.loadContactsList();
      })
      .catch(function(ex) {
        message.error('保存数据失败！ 请重试');
        _this.setState({
          contactsLoading: false,
        });
      });
    // }
  };

  deleteMaintainsList = () => {
    const { selectCustomerItem, maintainsData } = this.state;
    const _this = this;
    if (!selectCustomerItem || selectCustomerItem === '') {
      this.setState({
        contactsLoading: false,
      });
      return;
    }

    const ids = maintainsData.map(v => {
      return v.id;
    });

    fetch(HttpFetch.deleteMaintainer, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        token: getCurrentUser() ? getCurrentUser().token : '',
      },
      body: JSON.stringify(ids),
    })
      .then(response => response.json())
      .then(d => {
        const { head } = d;

        if (!head) {
          notification.success({
            message: '删除失败！',
          });
        } else {
          notification.success({
            message: head.rtnMsg,
          });
        }
        _this.setState({
          maintainsLoading: false,
          maintainsItem: '',
        });

        _this.loadmaintainerList();
      })
      .catch(function(ex) {
        message.error('保存数据失败！ 请重试');
        _this.setState({
          maintainsLoading: false,
        });
      });
    // }
  };

  deleteRingsList = () => {
    const { selectCustomerItem, ringsData } = this.state;
    const _this = this;
    if (!selectCustomerItem || selectCustomerItem === '') {
      this.setState({
        contactsLoading: false,
      });
      return;
    }

    const ids = ringsData.map(v => {
      return v.id;
    });

    fetch(HttpFetch.deleteRings, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        token: getCurrentUser() ? getCurrentUser().token : '',
      },
      body: JSON.stringify(ids),
    })
      .then(response => response.json())
      .then(d => {
        const { head } = d;

        if (!head) {
          notification.success({
            message: '删除失败！',
          });
        } else {
          notification.success({
            message: head.rtnMsg,
          });
        }
        _this.setState({
          ringsLoading: false,
          ringsItem: '',
        });

        this.loadRingsList();
        // console.log('result ', d);
      })
      .catch(function(ex) {
        message.error('保存数据失败！ 请重试');
        _this.setState({
          ringsLoading: false,
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

        if (!head) {
          notification.success({
            message: '删除失败！',
          });
        } else {
          notification.success({
            message: head.rtnMsg,
          });
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

  returnTotal = total => (
    <p>
      <FormattedMessage id="app.table.total" defaultMessage="" />
      {total}
      <FormattedMessage id="app.table.totalEnd" defaultMessage="" />
    </p>
  );

  render() {
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
      isAdd,
      update,
      contactsTableBody,
      ringsTableBody,
      radioType,
      pageCurrent,
      customerPageCurrent,
      customerPageSize,
      customerPageTotal,
      fristLoad,
      selectType,
      selectCustomerItem,
      contactsAddVisible,
      ringsAddVisible,
      modalkey,
      contactsLoading,
      ringsLoading,
      selectedRowKeys,
      customerSelectedRowKeys,
      maintainsLoading,
      maintainTableContent,
      maintainerAddVisible,
      drawVisible,
      ringsItem,
      ringsData,
      maintainsItem,
      maintainsData,
      contactsTableContent,
      ringsTableContent,
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
      showTotal: this.returnTotal,
    };

    const paginationCustomerProps = {
      showQuickJumper: true,
      pageSize: customerBody.size,
      current: customerPageCurrent,
      total: customerBody.total,
      showTotal: this.returnTotal,
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
    if (customerBody && selectCustomerItem) {
      const ttt = customerBody.data.filter(e => e.id === selectCustomerItem.id);
      if (ttt.length > 0 && ttt[0].status !== selectCustomerItem.status) {
        this.setState({ selectCustomerItem: ttt[0] });
      }
    }

    if (customerListloading) {
      this.state.customerLoad = true;
    } else if (this.state.customerLoad) {
      this.state.customerLoad = false;
      const { rowCustomerData } = this.state;
      // console.log('update list row ', rowCustomerData);
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
        notification.success({
          message: body.rtnMsg,
        });
      } else {
        notification.error({
          message: body.rtnMsg,
        });
        this.state.requestState = 'error';
      }

      this.handleDone();

      this.state.update = false;
      if (this.state.isUpdateFrom) {
        this.state.isUpdateFrom = false;
        this.state.showItem = { ...current };
      }
    }

    const modalFooter = isAdd
      ? [
          <Button key="back" onClick={this.handleCancel}>
            取消
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={clientSaveloading}
            onClick={() => {
              this.handleSubmit(true);
            }}
          >
            保存
          </Button>,
          <Button
            key="continue"
            type="primary"
            loading={clientSaveloading}
            onClick={() => {
              this.handleSubmit(false);
            }}
          >
            继续添加
          </Button>,
        ]
      : [
          <Button key="back" onClick={this.handleCancel}>
            取消
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={clientUpdateloading}
            onClick={() => {
              this.handleSubmit(false);
            }}
          >
            保存
          </Button>,
        ];
    const { contactsItem } = this.state;

    console.log(clientContentColumns2);

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
                  {/* 中间第一部分 */}
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

                  {/* 中间第二部分 */}
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
                    <Radio.Button value="show_ring" onClick={this.selectRings}>
                      戒围资料
                    </Radio.Button>
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
                  <Divider className={clientStyle.divder} />

                  {/* <Button icon="plus" type="primary" style={{ marginBottom: 10 }} onClick={() => this.setState({ */}
                  {/* maintainerAddVisible: true, */}
                  {/* })} disabled={(!selectCustomerItem) || selectCustomerItem === ''}> 新建</Button> */}

                  {/* 共同维护人按钮 */}
                  <Button
                    icon="plus"
                    type="primary"
                    style={{
                      marginBottom: 10,
                      marginRight: 20,
                      display: selectType === 'maintains' ? '' : 'none',
                    }}
                    onClick={() =>
                      this.setState({
                        contactsCurrent: {},
                        maintainerAddVisible: true,
                        modalkey: `a${Math.random(1)}`,
                      })
                    }
                    disabled={
                      !selectCustomerItem ||
                      selectCustomerItem === '' ||
                      this.state.selectCustomerItem.status === '2'
                    }
                  >
                    新建
                  </Button>
                  <Button
                    icon="delete"
                    type="danger"
                    style={{ marginBottom: 10, display: selectType === 'maintains' ? '' : 'none' }}
                    onClick={() => {
                      ModalConfirm({
                        content: '确定删除吗？',
                        onOk: () => {
                          this.deleteMaintainsList();
                        },
                      });
                    }}
                    disabled={
                      !maintainsItem ||
                      maintainsItem === '' ||
                      this.state.selectCustomerItem.status === '2'
                    }
                  >
                    删除
                  </Button>
                  {/* 圈戒按钮 */}
                  <Button
                    icon="plus"
                    type="primary"
                    style={{
                      marginBottom: 10,
                      marginRight: 20,
                      display: selectType === 'rings' ? '' : 'none',
                    }}
                    onClick={() =>
                      this.setState({
                        contactsCurrent: {},
                        ringsAddVisible: true,
                        modalkey: `a${Math.random(1)}`,
                      })
                    }
                    disabled={
                      !selectCustomerItem ||
                      selectCustomerItem === '' ||
                      this.state.selectCustomerItem.status === '2'
                    }
                  >
                    新建
                  </Button>
                  <Button
                    icon="delete"
                    type="danger"
                    style={{ marginBottom: 10, display: selectType === 'rings' ? '' : 'none' }}
                    onClick={() => {
                      ModalConfirm({
                        content: '确定删除吗？',
                        onOk: () => {
                          this.deleteRingsList();
                        },
                      });
                    }}
                    disabled={
                      !ringsItem || ringsItem === '' || this.state.selectCustomerItem.status === '2'
                    }
                  >
                    删除
                  </Button>

                  {/* 联系人按钮 */}
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
                    disabled={
                      !selectCustomerItem ||
                      selectCustomerItem === '' ||
                      this.state.selectCustomerItem.status === '2'
                    }
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
                    disabled={
                      !contactsItem ||
                      contactsItem === '' ||
                      this.state.selectCustomerItem.status === '2'
                    }
                  >
                    编辑
                  </Button>

                  <Button
                    icon="delete"
                    type="danger"
                    style={{ marginBottom: 10, display: selectType === 'contacts' ? '' : 'none' }}
                    onClick={() => {
                      ModalConfirm({
                        content: '确定删除吗？',
                        onOk: () => {
                          this.deleteContactsList();
                        },
                      });
                    }}
                    disabled={
                      !contactsItem ||
                      contactsItem === '' ||
                      this.state.selectCustomerItem.status === '2'
                    }
                  >
                    删除
                  </Button>

                  {/* 第二部分列表  客户列表 */}
                  <Table
                    style={{ display: selectType === 'client' ? '' : 'none' }}
                    loading={isCurstomerUpdate || customerListloading}
                    dataSource={fristLoad ? [] : customerBody.data}
                    size="middle"
                    scroll={{ x: 1200 }}
                    rowKey={record => record.id}
                    rowSelection={rowCustomerSelection}
                    onRow={record => {
                      return {
                        onClick: event => {
                          this.clickCustomerRowItem(record);
                        },
                      };
                    }}
                    onChange={this.pageCustomerChange}
                    pagination={paginationCustomerProps}
                    rowClassName={this.onSelectCustomerRowClass}
                    className={business.small2_table}
                    columns={clientContentColumns2}
                  />
                  {/* 第二部分列表  维护人 */}
                  <JewelryTable
                    style={{ display: selectType === 'maintains' ? '' : 'none' }}
                    onSelectItem={(item, rows) => {
                      this.setState({
                        maintainsItem: item,
                        maintainsData: rows,
                      });
                    }}
                    loading={maintainsLoading}
                    body={maintainTableContent}
                    columns={this.maintainsColumns}
                    onChange={this.handleMaintainsTableChange}
                    pageChange={this.pageMaintainsChange}
                  />
                  {/* 第二部分列表  联系人 */}
                  <JewelryTable
                    style={{ display: selectType === 'contacts' ? '' : 'none' }}
                    onSelectItem={(item, rows) => {
                      this.setState({
                        contactsItem: item,
                        contactsData: rows,
                      });
                    }}
                    scroll={{ x: 1200 }}
                    loading={contactsLoading}
                    body={contactsTableBody}
                    columns={this.contactsColumn}
                    onChange={this.handleContactsTableChange}
                    pageChange={this.pageContactsChange}
                  />

                  {/* 第二部分列表  圈戒资料 */}
                  <JewelryTable
                    style={{ display: selectType === 'rings' ? '' : 'none' }}
                    onSelectItem={(item, rows) => {
                      this.setState({
                        ringsItem: item,
                        ringsData: rows,
                      });
                    }}
                    scroll={{ x: 1200 }}
                    loading={ringsLoading}
                    body={ringsTableBody}
                    columns={this.ringsColumn}
                    onChange={this.handleRingsTableChange}
                    pageChange={this.pageRingsChange}
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
          maskClosable={false}
          width={640}
          className={styles.standardListForm}
          destroyOnClose
          visible={visible}
          footer={modalFooter}
          onCancel={this.handleCancel}
        >
          {this.getModalContent()}
        </Modal>

        <Modal
          maskClosable={false}
          width={640}
          className={styles.standardListForm}
          destroyOnClose
          visible={maintainerAddVisible}
          {...maintainermodalFooter}
          onCancel={this.handleCancel}
        >
          {this.getMaintainerContent()}
        </Modal>

        <ContactsModalForm
          contactsCurrent={this.state.contactsCurrent}
          visible={contactsAddVisible}
          contactsLoading={contactsLoading}
          handleCancel={this.handleCancel}
          contactsSubmit={this.handleContactsSubmit}
        />
        <RingsModalForm
          visible={ringsAddVisible}
          handleCancel={this.handleCancel}
          Submit={this.handleRingsSubmit}
          key={`table${modalkey}`}
        />
        {/* <Modal maskClosable={false} */}
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

export default ClientView;
