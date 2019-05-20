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
} from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import  styles from './Client.less'
import { connect } from 'dva';
import StandardTable from '@/components/StandardTable';
import DescriptionList from '@/components/DescriptionList';

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
  componentDidMount() {
    // const { dispatch, match } = this.props;
    // const { params } = match;

    // dispatch({
    //   type: 'client/fetchBasic',
    //   payload: params.id || '1000000000',
    // });
  }

  constructor(props) {
    super(props);
    this.state = {
      expandForm: false,
    };
  }

  renderSimpleForm() {
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="类别代码">{<Input placeholder="请输入" />}</FormItem>
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
                展开 <Icon type="down" />
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
            <FormItem label="类别代码">{<Input placeholder="请输入" />}</FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="中文名称">
              {
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              }
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="类别">
              {
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              }
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="英文名称">{<InputNumber style={{ width: '100%' }} />}</FormItem>
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
              收起 <Icon type="up" />
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
    // const { client = {}, loading } = this.props;
    // const { basicProgress = [], clientInfo = [] } = client;

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 5,
      total: 50,
    };

    return (
      <PageHeaderWrapper title="客户资料">
        <GridContent className={styles.userCenter}>
          <Row gutter={24}>
            <Col lg={17} md={24}>
              <Card bordered={false} style={{ marginBottom: 24 }} loading={false}>
                <div style={{ marginBottom: 16 }}>
                  <div className={listStyles.tableListForm}>{this.renderForm()}</div>
                  <StandardTable
                    style={{ marginBottom: 20 }}
                    loading={false}
                    size={'small'}
                    dataSource={[]}
                    selectedRows={1}
                    pagination={paginationProps}
                    columns={clientColumns}
                    onSelectRow={this.handleSelectRows}
                  />

                  <StandardTable
                    pagination={paginationProps}
                    loading={false}
                    selectedRows={1}
                    dataSource={[]}
                    size={'small'}
                    columns={clientContentColumns}
                  />
                </div>
              </Card>
            </Col>

            <Col lg={7} md={24} >
              <Card
                bordered={false}
                style={{
                  marginBottom: 24,
                  maxHeight: window.innerHeight,
                  minHeight: window.innerHeight,
                }}
                loading={false}
              >
                <div>
                  <RadioGroup
                    defaultValue="客户"
                    size="small"
                    onChange={this.onChange}
                    buttonStyle="solid"
                  >
                    <Radio.Button value="客户">客户</Radio.Button>
                    <Radio.Button value="终客">终客</Radio.Button>
                    <Radio.Button value="字印">字印</Radio.Button>
                    <Radio.Button value="包装">包装</Radio.Button>
                    <Radio.Button value="产品">产品</Radio.Button>
                    <Radio.Button value="历史订单">历史订单</Radio.Button>
                  </RadioGroup>
                </div>
              </Card>
            </Col>
          </Row>
        </GridContent>
      </PageHeaderWrapper>
    );
  }

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
