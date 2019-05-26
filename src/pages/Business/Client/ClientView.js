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
} from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { connect } from 'dva';
import styles from '../../Account/Center/Center.less';
import clientStyle from './Client.less';
import StandardTable from '@/components/StandardTable';
import DescriptionList from '@/components/DescriptionList';
import router from 'umi/router';

const FormItem = Form.Item;
const { Option } = Select;
const { TabPane } = Tabs;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import listStyles from './TableList.less';

const { Description } = DescriptionList;

const clientColumns = [
  {
    title: '类别代码',
    dataIndex: 'tcode',
    key: 'tcode',
  },
  {
    title: '中文名称',
    dataIndex: 'zhname',
    key: 'zhname',
  },
  {
    title: '类别',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '英文名',
    dataIndex: 'enname',
    key: 'enname',
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

const maintainsColumn =[
  {
    title: '维护人',
    dataIndex: 'code',
    key: 'code',
  },
]


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

// @connect(({ client, loading }) => ({
//   client,
//   loading: loading.effects['client/fetchAdvanced'],
// }))
class ClientView extends PureComponent {


  constructor(props) {
    super(props);

    this.state={
      selectTitle:'客户',
      expandForm: false,
      downTableColumn:clientContentColumns,
      downTableContent:[],
      rightlg:16,
      leftlg:8
    }
  }


  componentDidMount() {


    router.push('/business/client/emptyView')
    // const { dispatch, match } = this.props;
    // const { params } = match;

    // dispatch({
    //   type: 'client/fetchBasic',
    //   payload: params.id || '1000000000',
    // });
  }


  renderSimpleForm() {
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="类别代码">{<Input placeholder="请输入"/>}</FormItem>
          </Col>

          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down"/>
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    // const {
    //   form: { getFieldDecorator },
    // } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="horizontal">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="类别代码">{<Input placeholder="请输入"/>}</FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="中文名称">
              {
                <Input placeholder="请输入"/>
              }
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="类别">
              {
                <Input placeholder="请输入" />

              }
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="英文名称">{<InputNumber style={{ width: '100%' }}/>}</FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              重置
            </Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              收起 <Icon type="up"/>
            </a>
          </div>
        </div>
      </Form>
    );
  }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  render() {


    const { children } = this.props;

    const {selectTitle , downTableColumn ,downTableContent,rightlg,leftlg}=this.state

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 5,
    };

    return (

      <GridContent className={styles.userCenter}>
        <Row gutter={24}>
          <Col lg={rightlg} md={24}>
            <Card bordered={false} className={clientStyle.left_content} loading={false}>
              <div style={{ marginBottom: 16 }}>
                <div className={listStyles.tableListForm}>{this.renderForm()}</div>
                <Table
                  style={{ marginBottom: 20 }}
                  loading={false}
                  size="small"
                  dataSource={[]}
                  selectedRows={1}
                  pagination={paginationProps}
                  columns={clientColumns}
                  onSelectRow={this.handleSelectRows}
                />
                <Radio.Group defaultValue="show_clientlist" buttonStyle="solid">
                  <Radio.Button value="show_clientlist"  onClick={this.selectClients}>客户列表</Radio.Button>
                  <Radio.Button value="show_persion" onClick={this.selectMaintains}>共同维护人</Radio.Button>
                </Radio.Group>

                <Divider className={clientStyle.divder}/>

                <Button icon="plus" type="primary" style={{marginBottom:10}}> 新建</Button>

                <Table
                  pagination={paginationProps}
                  loading={false}
                  selectedRows={1}
                  dataSource={downTableContent}
                  size="small"
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
                  defaultValue="客户"
                  size="small"
                  className={clientStyle.right_content_tabgroud}
                  onChange={this.onChange}
                  buttonStyle="solid"
                >
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
                {children}
              </div>
              <Card bodyStyle={{ paddingLeft: 5, paddingRight: 5, paddingTop: 5, paddingBottom: 5 }}>
                <div
                  style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Button className={clientStyle.buttomControl} type="primary" icon="plus" size={'small'}>新增</Button>
                    <Button className={clientStyle.buttomControl} type="danger" icon="delete" size={'small'}
                    >删除</Button>
                    <Button className={clientStyle.buttomControl} type="primary" size={'small'}
                            icon="edit">编辑</Button>
                    <Button className={clientStyle.buttomControl} size={'small'} type="primary" icon="lock"
                    >冻结</Button>
                  </div>


                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingTop: 10 }}>
                    <Button className={clientStyle.buttomControl} type="primary" size={'small'}
                            icon="copy">复制</Button>
                    <Button className={clientStyle.buttomControl} size={'small'} type="primary" icon="rollback"
                    >撤销</Button>
                  </div>
                </div>

              </Card>

            </div>
          </Col>
        </Row>
      </GridContent>
    );
  }

  startClient = () => {
    this.setState(
      {
        selectTitle:'客户'
      }
    )
    router.push({ pathname: '/business/client/client', query: { id: 1 } });
  };

  startTerminal = () => {
    this.setState(
      {
        selectTitle:'终客'
      }
    )
    router.push({ pathname: '/business/client/terminal', query: { id: 1 } });
  };

  selectClients=()=>{

    this.setState({
      downTableColumn:clientContentColumns,
      downTableContent:[]
    })

  }

  selectMaintains =()=>{
    this.setState({
      downTableColumn:maintainsColumn,
      downTableContent:[]
    })
  }


  startMark = () => {
    this.setState(
      {
        selectTitle:'字印',
        rightlg:16,
        leftlg:8
      }
    )
    router.push({ pathname: '/business/client/marking', query: { id: 2 } });
  };


  startProduct = () => {
    this.setState(
      {
        selectTitle:'产品',
        rightlg:15,
        leftlg:9
      }
    )
    router.push({ pathname: '/business/client/product', query: { id: 3 } });
  };


  startPackageInfo = () => {
    this.setState(
      {
        selectTitle:'打包',
        rightlg:16,
        leftlg:8
      }
    )
    router.push({ pathname: '/business/client/package', query: { id: 4 } });
  };


  startHistory = () => {
    this.setState(
      {
        selectTitle:'历史',
        rightlg:14,
        leftlg:10
      }
    )
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
