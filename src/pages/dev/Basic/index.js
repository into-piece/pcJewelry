import React, { Component } from 'react';
import { connect } from 'dva';
import { Menu, Icon, Row, Col, Card, Button, Modal, Form, Input, notification } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import styles from './index.less';
import { measureUnit, lockTag, colorSetting } from '@/utils/SvgUtil';
import Table from '@/components/Table';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import DescriptionList from '@/components/DescriptionList';
import serviceObj from '@/services/dev';
// import Bread from '@/components/BreadCrumb'

// 面包屑数据
// const breadData = [
//   {
//     name: '主页', link: '/'
//   },
//   {
//     name: '开发', link: '/dev/basic'
//   },
//   {
//     name: '基础数据', link: ''
//   }
// ]

// 各menu数据
const iconObject = { measureUnit, colorSetting };
const { Description } = DescriptionList;
// const manuArr = ['measureUnit', 'categorySetting', 'colorPercentage', 'colorSetting', 'electroplateSetting', 'shapeSetting', 'specificationSetting', 'materialsGrade', 'stoneCutter', 'insertStoneTechnology', 'rubberMouldSetting', 'mouldPosition']
const manuArr = ['measureUnit', 'colorSetting'];
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
    colorSetList: dev.colorSetList,
    selectedRowKeys: dev.selectedRowKeys
    // listLoading: loading.effects['ringnum/fetchListRingNum'],
  };
})
class Info extends Component {
  state = {
    mode: 'inline',
    modalType: '',
    addData: {
      measureUnit: {
        unitCode: '',
        zhName: '',
        enName: ''
      },
      colorSetting: {}
    }
  };

  componentDidMount() {
    this.getList();
  }



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
    const { dispatch, pagination } = this.props;
    dispatch({
      type: 'dev/getSelectKey',
      payload: key,
    });
    this.getList(key)
  };

  getList = (key = this.props.selectKey) => {
    const { dispatch, pagination } = this.props;
    const arr = {
      colorSetting: 'getColorSetList',
      measureUnit: 'getMeasureUnit'
    }
    // getDevList
    console.log(arr[key])
    dispatch({
      type: `dev/${arr[key]}`,
      payload: pagination,
    });
  }

  // 列表对应操作button回调
  btnFn = modalType => {
    switch (modalType) {
      case 'add':
      case 'edit':
      default:
        this.setState({ modalType });
        break;
      case 'delete':
        this.handleDelect()
        break;
      case 'lock':
        break;
    }
  };


  // unitCode: '',
  //       zhName: '',
  //       enName: ''
  // button操作Modal的内容

  getModalContent = () => {
    const {
      selectKey,
      form: { getFieldDecorator },
    } = this.props;
    let content = ''
    let dataArr = []
    switch (selectKey) {
      case 'measureUnit':
        dataArr = [
          { key: '单位代码', value: 'unitCode' },
          { key: '中文名', value: 'zhName' },
          { key: '英文名', value: 'enName' },
        ]
        break
      default:
        content = ''
        break
    }
    return (
      <Form size="small" onSubmit={this.handleSubmit}>
        {
          dataArr.map(({ key, value }) => {
            return (
              <FormItem label={key} {...formLayout} key={key}>
                {getFieldDecorator(value, {
                  rules: [{ required: true, message: `请输入${key}` }],
                  initialValue: '',
                })(<Input placeholder="请输入" />)}
              </FormItem>
            )
          })
        }
        {content}
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

  // 新增回调
  handleAdd = () => {
    const { selectKey, form } = this.props
    const { addData } = this.state

    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        // this.setState({
        //   [selectKey]
        // })
        console.log(serviceObj, selectKey, addData)
        console.log(serviceObj[`addBasic${selectKey}`], addData[selectKey])
        // serviceObj[`addBasic${selectKey}`](addData[selectKey]).then()
        serviceObj[`addBasic${selectKey}`](values).then(res => {
          const { rtnCode, rtnMsg } = res.head
          if (rtnCode === '000000') {
            notification.success({
              message: rtnMsg,
            });
            this.getList()
            this.btnFn('');
          }
        })
      }
    });
  }

  // 删除回调
  handleDelect = () => {
    const { selectKey, selectedRowKeys } = this.props
    serviceObj[`deleteBasic${selectKey}`](selectedRowKeys).then(res => {
      const { rtnCode, rtnMsg } = res.head
      if (rtnCode === '000000') {
        notification.success({
          message: rtnMsg,
        });
        this.getList()
        this.btnFn('');
      }
    })
  }


  // 弹窗确定提交回调
  handleModalOk = () => {
    const { modalType } = this.state;
    switch (modalType) {
      case 'add':
        this.handleAdd()
        break;
      case 'edit':
        break;
      default:
        break;
    }

  }

  render() {
    const { state, props, btnFn, getModalContent, returnTitle, handleModalOk } = this;
    const { mode, modalType } = state;
    const { list, selectKey, choosenRowData } = props;
    return (
      <div className={styles.page}>
        {/* <Bread data={breadData} /> */}
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
          onOk={handleModalOk}
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


const colorSettingColumns = [
  {
    title: '产品材料',
    dataIndex: 'productMaterial',
    key: 'productMaterial',
  },
  {
    title: '中文名称',
    dataIndex: 'zhName',
    key: 'zhName',
  },
  {
    title: '英文名',
    dataIndex: 'enName',
    key: 'enName',
  },
  {
    title: '成色系列',
    dataIndex: 'assayingTheCoefficient',
    key: 'assayingTheCoefficient',
  },
  {
    title: '返主材类别',
    dataIndex: 'rtnMainMaterial',
    key: 'rtnMainMaterial',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: data => (Number(data) === 2 ? '已审批' : data === 0 ? '输入' : ''),
  },
]

const columnsArr = {
  measureUnit: measureUnitColumns,
  colorSetting: colorSettingColumns
};


// Table 中间列表内容
@connect(({ dev }) => {
  return {
    dev,
    pagination: dev.pagination,
    choosenRowData: dev.choosenRowData,
    selectedRowKeys: dev.selectedRowKeys
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


  // 更改table select数组
  onSelectChange = (selectedRowKeys) => {
    this.props.dispatch({
      type: 'dev/changeSelectedRowKeys',
      payload: selectedRowKeys,
    })
  };

  render() {
    const { onSelectChange, props } = this
    const { type, choosenRowData, pagination, dev, selectedRowKeys } = props;
    console.log(dev, type, dev[`${type}List`], columnsArr[type])
    const list = dev[`${type}List`]
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
            selectedRowKeys={selectedRowKeys}
            onSelectChange={onSelectChange}
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
