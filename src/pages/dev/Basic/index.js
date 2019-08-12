import React, { Component } from 'react';
import { connect } from 'dva';
import { Menu, Icon, Row, Col, Card, Button, Modal, Form, Input } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import styles from './index.less';
import { measureUnit, lockTag } from '@/utils/SvgUtil';
import Table from '@/components/Table';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import DescriptionList from '@/components/DescriptionList';
import Bread from '@/components/BreadCrumb'

// 面包屑数据
const breadData = [
  {
    name: '主页', link: '/'
  },
  {
    name: '开发', link: '/dev/basic'
  },
  {
    name: '基础数据', link: ''
  }
]

// 各menu数据
const iconObject = { measureUnit };
const { Description } = DescriptionList;
// const manuArr = ['measureUnit', 'categorySetting', 'colorPercentage', 'colorSetting', 'electroplateSetting', 'shapeSetting', 'specificationSetting', 'materialsGrade', 'stoneCutter', 'insertStoneTechnology', 'rubberMouldSetting', 'mouldPosition']
const manuArr = ['measureUnit'];
const { Item } = Menu;
const FormItem = Form.Item;

const menuMap = manuArr.map(item => ({
  value: <FormattedMessage id={`app.dev.menuMap.${item}`} defaultMessage="Basic Settings" />,
  key: item,
}));

// 弹窗form表单样式
const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: {
    span: 13,
  },
};

@Form.create()
@connect(({ dev }) => {
  return {
    list: dev.list,
    pagination: dev.pagination,
    selectKey: dev.selectKey,
    choosenRowData: dev.choosenRowData,
    // listLoading: loading.effects['ringnum/fetchListRingNum'],
  };
})
class Info extends Component {
  state = {
    mode: 'inline',
    modalType: '',
  };

  componentDidMount() {
    this.getList();
  }

  // 默认列表请求
  getList = () => {
    const { dispatch, pagination } = this.props;
    dispatch({
      type: 'dev/getDevList',
      payload: pagination,
    });
  };

  // 获取对应menu
  getmenu = () => {
    return menuMap.map(({ key, value }) => (
      <Item key={key} style={{ textAlign: 'vertical-center' }}>
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <Icon style={{ width: 25, height: 25 }} component={this.getMenuIcon(key)} />
          {value}
        </span>
      </Item>
    ));
  };


  getRightTitle = () => {
    const { selectKey } = this.props;
    return menuMap[selectKey];
  };

  getMenuIcon = key => {
    return iconObject[key];
  };

  handleSelectKey = ({ key }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'dev/getSelectKey',
      payload: key,
    });
  };

  // 列表对应操作button回调
  btnFn = modalType => {
    switch (modalType) {
      case 'add':
      case 'edit':
      default:
        this.setState({ modalType });
        break;
      case 'delete':
        break;
      case 'lock':
        break;
    }
  };

  // button操作Modal的内容
  getModalContent = () => {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form size="small" onSubmit={this.handleSubmit}>
        <FormItem label="英文名称" {...formLayout}>
          {getFieldDecorator('brandEnName', {
            rules: [{ required: true, message: '请输入品牌编号' }],
            initialValue: '',
          })(<Input placeholder="请输入" />)}
        </FormItem>
        <FormItem label="中文名称" {...formLayout}>
          {getFieldDecorator('brandZhName', {
            rules: [{ message: '请输入中文名称' }],
            initialValue: '',
          })(<Input placeholder="请输入" />)}
        </FormItem>
      </Form>
    );
  };

  // 获取Modal的标题
  returnTitle = () => {
    const { modalType } = this.state;
    let text = '';
    switch (modalType) {
      case 'add':
        text = '添加';
        break;
      case 'edit':
        text = '编辑';
        break;
      default:
        break;
    }
    return `任务${text}`;
  };

  render() {
    const { state, props, btnFn, getModalContent, returnTitle } = this;
    const { mode, modalType } = state;
    const { list, selectKey, choosenRowData } = props;

    return (
      <div className={styles.page}>
        <Bread data={breadData} />
        <div className={styles.center_content}>
          {/* lg={17} md={24} */}
          <div className={styles.main}>
            <div
              className={styles.leftmenu}
              ref={ref => {
                this.main = ref;
              }}
            >
              <Menu mode={mode} selectedKeys={[selectKey]} onClick={this.handleSelectKey}>
                {this.getmenu()}
              </Menu>
            </div>
            <div className={styles.right}>
              <RightContent
                type={selectKey}
                sourceList={list}
                choosenRowData={choosenRowData}
                btnFn={btnFn}
              />
            </div>
          </div>
        </div>
        <Modal
          title={returnTitle()}
          width={640}
          className={styles.standardListForm}
          bodyStyle={{ padding: '28px 0 0' }}
          destroyOnClose
          visible={modalType !== ''}
          onCancel={() => {
            btnFn('');
          }}
        >
          {getModalContent()}
        </Modal>
      </div>
    );
  }

  /* <Card bordered={false} style={{ minHeight: window.innerHeight, marginBottom: 24,padding:0 }} loading={false}> */
}

// 按钮集合
const btnGroup = [
  { name: '新增', tag: 'add' },
  { name: '删除', tag: 'delete' },
  { name: '编辑', tag: 'edit' },
  { name: '审批', tag: 'lock' },
];

// 计量单位表头
const measureUnitColumns = [
  {
    title: '单位代码',
    dataIndex: 'unitCode',
    key: 'unitCode',
    render: data => (
      <div className={styles.symbol}>
        {/* <img src={logo} alt='logo' /> */}
        <div className={styles.block}>
          <Icon
            style={{
              width: 20,
              height: 20,
            }}
            component={lockTag}
          />
        </div>
        <span />
        {data}
      </div>
    ),
  },
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
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: data => (Number(data) === 2 ? '已审批' : data === 0 ? '输入' : ''),
  },
];

// 各个menu列表的表头
const columnsArr = { measureUnit: measureUnitColumns };

// 右手边正文内容
const RightContent = ({ type, choosenRowData, btnFn }) => (
  <GridContent>
    <Row gutter={24} className={styles.row_content}>
      <Col lg={16} md={24}>
        <CenterInfo type={type} />
      </Col>

      <Col lg={8} md={24}>
        <div className={styles.view_right_content}>
          <Card bordered={false}>
            <div>
              <span
                style={{
                  marginBottom: 32,
                  paddingLeft: 10,
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#35B0F4',
                }}
              >
                <FormattedMessage id={`app.dev.menuMap.${type}`} defaultMessage="" />
              </span>
              <GetRenderitem data={choosenRowData} />
            </div>
          </Card>

          {/* </Card> */}
          <Card bodyStyle={{ paddingLeft: 5, paddingRight: 5 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {btnGroup.map(({ name, tag }) => (
                <Button
                  key={tag}
                  className={styles.buttomControl}
                  type="primary"
                  icon={tag}
                  size="small"
                  disabled={!choosenRowData.id && tag !== 'add'}
                  onClick={() => { btnFn(tag) }}
                >
                  {name}
                </Button>
              ))}
            </div>
          </Card>
        </div>
      </Col>
    </Row>
  </GridContent>
);

// Table 中间列表内容
@connect(({ dev }) => {
  return {
    list: dev.list,
    pagination: dev.pagination,
    choosenRowData: dev.choosenRowData,
  };
})
class CenterInfo extends Component {
  changePagination = obj => {
    const { dispatch } = this.props;
    dispatch({
      type: 'dev/getDevList',
      payload: obj,
    });
    dispatch({
      type: 'dev/getPagination',
      payload: obj,
    });
  };

  changeChoosenRow = rowData => {
    const { dispatch } = this.props;
    dispatch({
      type: 'dev/getChoosenRowData',
      payload: rowData,
    });
  };

  render() {
    const { type, list, choosenRowData, pagination } = this.props;
    return (
      <div className={styles.view_left_content}>
        <div className={styles.contentTitle}>
          <Icon
            style={{
              width: 50,
              height: 50,
              paddingRight: 10,
              paddingTop: 10,
              paddingLeft: 10,
            }}
            component={iconObject[type]}
          />
          <FormattedMessage id={`app.dev.menuMap.${type}`} defaultMessage="" />
        </div>

        <div className={styles.tableBox}>
          <Table
            columns={columnsArr[type]}
            body={list}
            changeChoosenRow={this.changeChoosenRow}
            selectKey={choosenRowData.id}
            pagination={pagination}
            changePagination={this.changePagination}
          />
        </div>
      </div>
    );
  }
}

// 右手边显示的详情信息
const GetRenderitem = ({ data }) => {
  const { zhName, enName, unitCode } = data;
  const selectRowItem = () => {
    // console.log('select the item');
  };
  return (
    <div style={{ marginLeft: 10, marginTop: 10 }} onClick={selectRowItem}>
      <DescriptionList className={styles.headerList} size="small" col="1">
        <Description term="单位编号">{unitCode}</Description>
        <Description term="中文名">{zhName}</Description>
        <Description term="英文名">{enName}</Description>
      </DescriptionList>
    </div>
  );
};

export default Info;
